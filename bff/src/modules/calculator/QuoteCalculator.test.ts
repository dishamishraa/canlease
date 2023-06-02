import QuoteCalculator, { FMV, $10, STRETCH } from './QuoteCalculator';

describe('QuoteCalculator', () => {
  const quoteCalc = new QuoteCalculator();
  describe('calculatePayment', () => {
    test('That it calculates the correct monthly payment', () => {
      const ir = 31;
      const period = 24;
      const pv = 4995;
      const fv = 0;

      const payment = quoteCalc.calculatePayment(ir, period, pv, fv);

      expect(payment).toEqual(274.76);
    });
  });

  describe('calculateFutureValue', () => {
    const amount = 1000;
    const amountPlusFee = 1010; // (amount + amount*fee/100)

    test('That it calculates the correct future value of a $10', () => {
      const fv = quoteCalc.calculateFutureValue(
        STRETCH,
        amountPlusFee,
      );
      expect(fv).toEqual(0);
    });

    test('That it calculates the correct future value of a $100', () => {
      const fv = quoteCalc.calculateFutureValue(
        $10,
        amountPlusFee,
      );
      expect(fv).toEqual(0);
    });

    test('That it calculates the correct future value of a FMV', () => {
      const fv = quoteCalc.calculateFutureValue(
        FMV,
        amountPlusFee,
      );
      expect(fv).toEqual(amountPlusFee * 0.05);
    });
  });

  describe('calculateMonthlyPayments(amount, purchaseOption, annualInterestRates, terms)', () => {
    const terms = [24, 36, 48, 60];

    test('Calculates correct payments for $10 Leases', () => {
      const annualInterestRates = {
        24: 26,
        36: 18.75,
        48: 16.75,
        60: 15.75,
      };
      const expectedPayments: Record<number, number> = {
        24: 214.3,
        36: 146.17,
        48: 115.13,
        60: 97.02,
      };
      const amount = 4064;
      const payments = quoteCalc.calculateMonthlyPayments(
        amount,
        0,
        STRETCH,
        annualInterestRates,
        terms,
      );
      payments.forEach((payment) => {
        expect(payment.costOfFinanceRate).toBeTruthy();
        expect(payment.term).toBeTruthy();
        expect(payment.amount).toBeTruthy();
        expect(payment.amount).toEqual(expectedPayments[payment.term]);
      });
    });

    test('Calculates correct payments for $100 Leases', () => {
      const annualInterestRates = {
        24: 31,
        36: 24,
        48: 22,
        60: 21,
      };
      const expectedPayments: Record<number, number> = {
        24: 274.76,
        36: 192.13,
        48: 154.54,
        60: 132.81,
      };
      const amount = 4995;
      const payments = quoteCalc.calculateMonthlyPayments(
        amount,
        0,
        $10,
        annualInterestRates,
        terms,
      );
      payments.forEach((payment) => {
        expect(payment.costOfFinanceRate).toBeTruthy();
        expect(payment.term).toBeTruthy();
        expect(payment.amount).toBeTruthy();
        expect(payment.amount).toEqual(expectedPayments[payment.term]);
      });
    });

    test('Calculates correct payments for FMV Leases', () => {
      const annualInterestRates = {
        24: 32.75,
        36: 23,
        48: 18.75,
        60: 17.75,
      };
      const expectedPayments: Record<number, number> = {
        24: 66.85,
        36: 45.54,
        48: 35.2,
        60: 29.98,
      };

      const amount = 1230.0;
      const payments = quoteCalc.calculateMonthlyPayments(
        amount,
        0,
        FMV,
        annualInterestRates,
        terms,
      );

      payments.forEach((payment) => {
        expect(payment.costOfFinanceRate).toBeTruthy();
        expect(payment.term).toBeTruthy();
        expect(payment.amount).toBeTruthy();
        expect(payment.amount).toEqual(expectedPayments[payment.term]);
      });
    });
  });

  describe('calculateCostOfFinanceRate(amount, monthlyPayment, po, period)', () => {
    test('$10,500 deal over a 36/40M term with a $1,050 purchase option and monthly payment of $330.70 is 7.8% ', () => {
      expect(
        quoteCalc.calculateCostOfFinanceRate(10500, 330.7, STRETCH, 36),
      ).toBe(0.0779);
    });
  });
});
