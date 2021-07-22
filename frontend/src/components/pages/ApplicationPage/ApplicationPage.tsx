import React from 'react';
import cx from 'classnames';

import styles from './ApplicationPage.module.scss';
import { Switch, Route, Redirect } from 'react-router-dom';

import TopBar, { TopBarProps } from '../../organisms/TopBar';

import QuoteSelectionBlock from '../../blocks/QuoteSelectionBlock';
import CustomerPersonalInformationBlock from '../../blocks/CustomerPersonalInformationBlock';
import CustomerBusinessInformationBlock from '../../blocks/CustomerBusinessInformationBlock';
import BusinessTypeBlock from '../../blocks/BusinessTypeBlock';
import AssetInformationBlock from '../../blocks/AssetInformationBlock';
import ReviewApplicationInformationBlock from '../../blocks/ReviewApplicationInformationBlock';
import TermsOfApplicationBlock from '../../blocks/TermsOfApplicationBlock';
import DialogBlock from '../../blocks/DialogBlock';
import LeaseInfoBlock from '../../blocks/LeaseInfoBlock';

import { ApplicationBusinessInfo, ApplicationPersonalInfo, AssetInfo } from '../../../modules/types';
import { Quote, QuoteOption } from '../../../modules/quote/types';

export const defaultProps = {
  topBar: {
    backButton: {
      type: 'IconTextButton',
      size: 'Small',
      fill: 'None',
      colour: 'Basic',
      icon: {
        asset: 'ArrowLeft',
        style: 'Brand500',
      },
      text: {
        style: 'Brand500',
        align: 'Center',
        size: 'Small',
        type: 'ButtonGiant',
      },
    },
  } as TopBarProps,
};

export type ApplicationPageProps = {
  topBar?: TopBarProps;
  className?: string;
  stepperCurrentValue?: number,
  stepperTotalValue?: number,
  setQuoteSelected?: (quoteDetails: Quote, quoteSelected: QuoteOption) => void;
  setPersonalInfo?: (personalInfo: ApplicationPersonalInfo) => void;
  setBusinessInfo?: (businessType: ApplicationBusinessInfo) => void;
  setAssetInfo?: (assetInfo: AssetInfo) => void;
  setCreditCheckConsent?: (consent: boolean) => Promise<void>;
  quoteDetails?: Quote;
  quoteSelected?: QuoteOption;
  personalInfo?: ApplicationPersonalInfo;
  businessInfo?: ApplicationBusinessInfo;
  assetInfo?: AssetInfo;
  creditCheckConsent?: boolean;
  handleEditClicked?: (page: string) => void;
  fromTab?: string;
};

export const routes = {
  applyQuote: '/portal/application/applyQuote/:quoteId',
  personalInformation: '/portal/application/personalInfo',
  businessInformation: '/portal/application/businessInfo',
  assetInformation: '/portal/application/assetInfo',
  reviewApplicationInformation: '/portal/application/reviewApplicationInfo',
  termsOfApplication: '/portal/application/termsOfApplication',
  applicationSubmitted: '/portal/application/submitted',
  applicationDetails: '/portal/application/:applicationDetails',
  invalid: '/',
};

const ApplicationPage: React.FC<ApplicationPageProps> = ({
  topBar,
  className,
  stepperCurrentValue,
  stepperTotalValue,
  setQuoteSelected,
  setPersonalInfo,
  setBusinessInfo,
  setAssetInfo,
  setCreditCheckConsent,
  quoteDetails,
  quoteSelected,
  personalInfo,
  businessInfo,
  assetInfo,
  creditCheckConsent,
  handleEditClicked,
  fromTab,

}) => {
  const BusinessInfoBlock = fromTab === 'Customer' ? CustomerBusinessInformationBlock : BusinessTypeBlock;
  return (
    <div className={cx(styles.applicationPage, className)}>
      <TopBar
        className={styles.topBar}
        {...topBar} />
      <Switch>
        <Route exact path={routes.applyQuote}>
          <QuoteSelectionBlock
            className={styles.block}
            setQuoteSelected={setQuoteSelected}
            quoteSelected={quoteSelected}
            stepperCurrentValue={stepperCurrentValue}
            stepperTotalValue={stepperTotalValue}
            />
        </Route>
        <Route exact path={routes.personalInformation}>
          <CustomerPersonalInformationBlock
            className={styles.block}
            setPersonalInfo={setPersonalInfo}
            personalInfo={personalInfo}
            stepperCurrentValue={stepperCurrentValue}
            stepperTotalValue={stepperTotalValue}
            />
        </Route>
        <Route exact path={routes.businessInformation}>
          <BusinessInfoBlock
            className={styles.block}
            setBusinessInfo={setBusinessInfo}
            businessInfo={businessInfo}
            stepperCurrentValue={stepperCurrentValue}
            stepperTotalValue={stepperTotalValue}
            />
        </Route>
        <Route exact path={routes.assetInformation}>
          <AssetInformationBlock
            className={styles.block}
            setAssetInfo={setAssetInfo}
            assetInfo={assetInfo}
            stepperCurrentValue={stepperCurrentValue}
            stepperTotalValue={stepperTotalValue}
            />
        </Route>
        <Route exact path={routes.reviewApplicationInformation}>
          <ReviewApplicationInformationBlock
            className={styles.block}
            quoteDetailsSelected={quoteDetails}
            quoteSelected={quoteSelected}
            personalInfo={personalInfo}
            businessInfo={businessInfo}
            assetInfo={assetInfo}
            stepperCurrentValue={stepperCurrentValue}
            stepperTotalValue={stepperTotalValue}
            handleEditClicked={handleEditClicked}/>
        </Route>
        <Route exact path={routes.termsOfApplication}>
          <TermsOfApplicationBlock
            className={styles.block}
            setCreditCheckConsent={setCreditCheckConsent}
            creditCheckConsent={creditCheckConsent}
            stepperCurrentValue={stepperCurrentValue}
            stepperTotalValue={stepperTotalValue}
            />
        </Route>
        <Route exact path={routes.applicationSubmitted}>
          <DialogBlock
            className={styles.block}
            contentType='ApplicationSubmitted'
            email={''}
            />
        </Route>
        <Route path={routes.applicationDetails}>
          <LeaseInfoBlock
            className={styles.block}
            />
        </Route>
        <Route path={routes.invalid}>
          <Redirect to={'/'}/>
        </Route>
      </Switch>
    </div>
  );

};

ApplicationPage.defaultProps = defaultProps;

export default ApplicationPage;
