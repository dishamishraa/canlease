/* eslint-disable no-restricted-properties */
import { MonthlyPayment } from './types';

export const $10 = '$10';
export const FMV = 'FMV';
export const STRETCH = 'buyout';

const VALID_PURCHASE_OPTION_TYPES = [
  STRETCH,
  FMV,
  $10,
] as const;
export type PurchaseOptionType = typeof VALID_PURCHASE_OPTION_TYPES[number];

export default class QuoteCalculator {
  calculatePayment(
    rate: number,
    period: number,
    pv: number,
    fv: number,
    type = 1,
  ): number {
    // Divide annual interest rate by 12 to get monthly rate and 100 to get decimal repesentation
    const monthlyRate = rate / 12 / 100;

    const payment = (pv - fv / Math.pow(1 + monthlyRate, period))
      / ((1 - 1 / Math.pow(1 + monthlyRate, period - type)) / monthlyRate + type);

    // TODO: implement better rounding(1.005 > 1.00 instead of 1.01 with below method)
    return Math.round(payment * 100) / 100;
  }

  calculateFutureValue(
    po: PurchaseOptionType,
    pvPlusFee: number,
  ): number {
    switch (po) {
      case FMV:
        return pvPlusFee * 0.05;
      case $10:
      case STRETCH:
        return 0;
      default:
        throw new Error('type not valid');
    }
  }

  calculateCostOfFinanceFutureValue(
    po: PurchaseOptionType,
    pv: number,
  ): number {
    switch (po) {
      case FMV:
        return 0;
      case STRETCH:
        return pv * 0.1;
      case $10:
        return 10;
      default:
        throw new Error('type not valid');
    }
  }

  calculateMonthlyPayments(
    amount: number,
    fee: number,
    purchaseOption: PurchaseOptionType,
    annualInterestRates: { [key: number]: number },
    terms: number[],
  ): MonthlyPayment[] {
    const amountWithFee = amount + (amount * fee) / 100;
    const fv = this.calculateFutureValue(purchaseOption, amountWithFee);
    const payments: MonthlyPayment[] = [];

    terms.forEach((term) => {
      const paymentAmount = this.calculatePayment(
        annualInterestRates[term],
        term,
        amountWithFee,
        fv,
      );
      const costOfFinanceRate = this.calculateCostOfFinanceRate(
        amount,
        paymentAmount,
        purchaseOption,
        term,
      );
      payments.push({
        amount: paymentAmount,
        costOfFinanceRate,
        term,
      });
    });
    return payments;
  }

  calculateCostOfFinanceRate(
    amount: number,
    monthlyPayment: number,
    po: PurchaseOptionType,
    period: number,
  ): number {
    // Here is the formula to derive the Cost of Finance on the lease quote. It will be different
    // for each term chosen:
    // Assume $10,500 deal over a 36/40M term with a $1,050 purchase option at 36M and monthly
    // lease payments of $330.70
    // 1. Determine ALL the payments that will be made on the lease for its full life, including
    // the purchase option
    // $330.70 X 36 = $11,905.20 plus PO of $1,050 = $12,955.20

    const totalCostToCustomer = monthlyPayment * period
      + this.calculateCostOfFinanceFutureValue(po, amount);

    // 2. Subtract the original cost of the equipment.
    // $12,955.20 - $10,500 = $2,455.20. This is the cost of finance over 36M
    const totalCostOfFinance = totalCostToCustomer - amount;

    // 3. Determine the Annual Cost of Finance
    // 36M term to the purchase Option/12 = 3 Years
    // $2,455.20/3 Years = $818.40. This is the Annual Cost of Finance
    const annualCostOfFinance = totalCostOfFinance / (period / 12);

    // 4. Divide the Annual Cost of Finance ($818.40)/The Original Cost of the equipment
    // ($10,500) = 7.8%. This is the annual cost of finance rate.
    const annualCostOfFinanceRate = annualCostOfFinance / amount;

    return parseFloat(annualCostOfFinanceRate.toFixed(4));
  }
}
