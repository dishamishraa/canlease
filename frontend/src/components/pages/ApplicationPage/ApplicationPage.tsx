import React from 'react';
import cx from 'classnames';

import styles from './ApplicationPage.module.scss';
import { Switch, Route, Redirect } from 'react-router-dom';

import TopBar, { TopBarProps } from '../../organisms/TopBar';
import StartApplicationBlock, { StartApplicationBlockProps } from '../../blocks/StartApplicationBlock';
import AssetInformationBlock from '../../blocks/AssetInformationBlock';
import BusinessInformationBlock from '../../blocks/BusinessInformationBlock';
import BusinessTypeBlock from '../../blocks/BusinessTypeBlock';
import QuoteSelectionBlock from '../../blocks/QuoteSelectionBlock';
import ReviewApplicationInformationBlock from '../../blocks/ReviewApplicationInformationBlock';
import TermsOfApplicationBlock from '../../blocks/TermsOfApplicationBlock';
import { AssetInfo, BusinessType, EquipmentLeaseInfo } from '../../../modules/types';
import UserSelectionBlock from '../../blocks/UserSelectionBlock';
import { UserType } from '../../../modules/profile/types';
import DialogBlock from '../../blocks/DialogBlock';
import LeaseInfoBlock from '../../blocks/LeaseInfoBlock';
import { QuoteOption } from '../../../modules/quote/types';

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
  block: {
    stepper: {
      text: {
        style: 'Brand500',
        align: 'Left',
        size: 'Medium',
        type: 'Paragraph3',
      },
    },
    blockHeading: {
      style: 'Basic800',
      align: 'Left',
      size: 'Large',
      type: 'Heading1',
    },
    nameTextField: {
      state: 'Default',
      type: 'Text',
      label: {
        style: 'Basic800',
        align: 'Left',
        size: 'Medium',
        type: 'Paragraph2',
      },
      textInput: {
        type: 'Text',
      },
    },
    costTextField: {
      state: 'Default',
      type: 'Text',
      label: {
        style: 'Basic800',
        align: 'Left',
        size: 'Medium',
        type: 'Paragraph2',
      },
      textInput: {
        type: 'Text',
      },
    },
    leaseTypeSelectField: {
      label: {
        style: 'Basic800',
        align: 'Left',
        size: 'Medium',
        type: 'Paragraph2',
      },
      select: {
        text: {
          style: 'Basic500',
          align: 'Left',
          size: 'Large',
          type: 'Paragraph1',
        },
        icon: {
          asset: 'ChevronDown',
          style: 'Basic800',
        },
      },
    },
    nextButton: {
      type: 'Button',
      size: 'Large',
      fill: 'Colour',
      colour: 'Brand',
      text: {
        style: 'Basic100',
        align: 'Center',
        size: 'Small',
        type: 'ButtonGiant',
      },
    },
  } as StartApplicationBlockProps,
};

export type ApplicationPageProps = {
  topBar?: TopBarProps;
  className?: string;
  setEquipInfo?: React.Dispatch<React.SetStateAction<EquipmentLeaseInfo>>;
  setQuoteSelected?: React.Dispatch<React.SetStateAction<QuoteOption>>;
  setAssetInfo?: React.Dispatch<React.SetStateAction<AssetInfo>>;
  setBusinessTypeInfo?: React.Dispatch<React.SetStateAction<BusinessType>>;
  setCreditCheckConsent?: React.Dispatch<React.SetStateAction<boolean>>;
  equipInfo?: EquipmentLeaseInfo;
  quoteSelected?: QuoteOption;
  assetInfo?: AssetInfo
  businessTypeInfo?: BusinessType
  handleCreateApplication?: () => void;
  stepperCurrentValue?: number,
  setStepperCurrentValue?: React.Dispatch<React.SetStateAction<number>>;
  stepperTotalValue?: number,
  setStepperTotalValue?: React.Dispatch<React.SetStateAction<number>>;
  setQuoteUserType?: (userType: UserType) => void;
  handleCreateQuote?: () => void;
};

export const routes = {
  applicationDetails: '/portal/application/:applicationDetails',
  userSelection: '/portal/application/userSelection',
  startApplication: '/portal/application/startApplication',
  assetInformation: '/portal/application/assetInfo',
  termsOfApplication: '/portal/application/termsOfApplication',
  quoteSelection: '/portal/application/quoteSelection',
  reviewApplicationInformation: '/portal/application/reviewApplicationInfo',
  businessInformation: '/portal/application/businessInfo',
  businessType: '/portal/application/businessType',
  applicationSubmitted: '/portal/application/submitted',
  invalid: '/',
};

const ApplicationPage: React.FC<ApplicationPageProps> = ({
  topBar,
  className,
  setEquipInfo,
  setQuoteSelected,
  setAssetInfo,
  setBusinessTypeInfo,
  setCreditCheckConsent,
  equipInfo,
  quoteSelected,
  assetInfo,
  businessTypeInfo,
  handleCreateApplication,
  stepperCurrentValue,
  setStepperCurrentValue,
  stepperTotalValue,
  setStepperTotalValue,
  setQuoteUserType,
  handleCreateQuote
}) => {
  return (
    <div className={cx(styles.applicationPage, className)}>
      <TopBar
        className={styles.topBar}
        {...topBar} />
      <Switch>
        <Route exact path={routes.userSelection}>
          <UserSelectionBlock
            className={styles.block}
            setQuoteUserType={setQuoteUserType}
              />
        </Route>
        <Route exact path={routes.startApplication}>
            <StartApplicationBlock
              className={styles.block}
              equipInfo={equipInfo}
              setEquipInfo={setEquipInfo}
              stepperCurrentValue={stepperCurrentValue}
              setStepperCurrentValue={setStepperCurrentValue}
              stepperTotalValue={stepperTotalValue}
              setStepperTotalValue={setStepperTotalValue}
              handleCreateQuote={handleCreateQuote}
               />
          </Route>
        <Route exact path={routes.quoteSelection}>
          <QuoteSelectionBlock
            className={styles.block}
            setQuoteSelected={setQuoteSelected}
            quoteSelected={quoteSelected}
            stepperCurrentValue={stepperCurrentValue}
            setStepperCurrentValue={setStepperCurrentValue}
            stepperTotalValue={stepperTotalValue}
            setStepperTotalValue={setStepperTotalValue}
            />
        </Route>
        <Route exact path={routes.assetInformation}>
          <AssetInformationBlock
            className={styles.block}
            setAssetInfo={setAssetInfo}
            assetInfo={assetInfo}
            stepperCurrentValue={stepperCurrentValue}
            setStepperCurrentValue={setStepperCurrentValue}
            stepperTotalValue={stepperTotalValue}
            />
        </Route>
        <Route exact path={routes.businessInformation}>
          <BusinessInformationBlock
            className={styles.block}
            />
        </Route>
        <Route exact path={routes.businessType}>
          <BusinessTypeBlock
            className={styles.block}
            setBusinessTypeInfo={setBusinessTypeInfo}
            businessTypeInfomation={businessTypeInfo}
            stepperCurrentValue={stepperCurrentValue}
            setStepperCurrentValue={setStepperCurrentValue}
            stepperTotalValue={stepperTotalValue}
            />
        </Route>
        <Route exact path={routes.reviewApplicationInformation}>
          <ReviewApplicationInformationBlock
            className={styles.block}
            quoteSelected={quoteSelected}
            assetInfo={assetInfo}
            businessTypeInfo={businessTypeInfo}
            stepperCurrentValue={stepperCurrentValue}
            setStepperCurrentValue={setStepperCurrentValue}
            stepperTotalValue={stepperTotalValue}/>
        </Route>
        <Route exact path={routes.termsOfApplication}>
          <TermsOfApplicationBlock
            className={styles.block}
            setCreditCheckConsent={setCreditCheckConsent}
            stepperCurrentValue={stepperCurrentValue}
            setStepperCurrentValue={setStepperCurrentValue}
            stepperTotalValue={stepperTotalValue}
            handleCreateApplication={handleCreateApplication}
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
            setStepperTotalValue={setStepperTotalValue}
            />
        </Route>
        <Route path={routes.invalid}>
          <Redirect to={routes.startApplication}/>
        </Route>
      </Switch>
    </div>
  );

};

ApplicationPage.defaultProps = defaultProps;

export default ApplicationPage;
