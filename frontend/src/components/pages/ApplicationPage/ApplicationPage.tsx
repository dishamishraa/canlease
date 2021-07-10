import React from 'react';
import cx from 'classnames';

import styles from './ApplicationPage.module.scss';
import { Switch, Route, Redirect } from 'react-router-dom';

import TopBar, { TopBarProps } from '../../organisms/TopBar';
import StartApplicationBlock, { StartApplicationBlockProps } from '../../blocks/StartApplicationBlock';
import AssetInformationBlock, { AssetInformationBlockProps } from '../../blocks/AssetInformationBlock';
import BusinessInformationBlock, { BusinessInformationBlockProps } from '../../blocks/BusinessInformationBlock';
import BusinessTypeBlock, { BusinessTypeBlockProps } from '../../blocks/BusinessTypeBlock';
import QuoteSelectionBlock, { QuoteSelectionBlockProps } from '../../blocks/QuoteSelectionBlock';
import ReviewApplicationInformationBlock, { ReviewApplicationInformationBlockProps } from '../../blocks/ReviewApplicationInformationBlock';
import TermsOfApplicationBlock, { TermsOfApplicationBlockProps } from '../../blocks/TermsOfApplicationBlock';
import { DefaultQuoteOption, AssetInfo, BusinessType } from '../../../modules/types';

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
  startApplicationBlock?: StartApplicationBlockProps;
  className?: string;
  assetInformationBlock?: AssetInformationBlockProps;
  businessInformationBlock?: BusinessInformationBlockProps;
  businessTypeBlock?: BusinessTypeBlockProps;
  quoteSelectionBlock?: QuoteSelectionBlockProps;
  reviewApplicationInformationBlock?: ReviewApplicationInformationBlockProps;
  termsOfApplicationBlock?: TermsOfApplicationBlockProps;
  setQuoteSelected?: React.Dispatch<React.SetStateAction<DefaultQuoteOption>>;
  setAssetInfo?: React.Dispatch<React.SetStateAction<AssetInfo>>;
  setBusinessTypeInfo?: React.Dispatch<React.SetStateAction<BusinessType>>;
  setCreditCheckConsent?: React.Dispatch<React.SetStateAction<boolean>>;
  quoteSelected?: DefaultQuoteOption;
  assetInfo?: AssetInfo
  businessTypeInfo?: BusinessType
  handleCreateApplication?: () => void;
  stepperCurrentValue?: number,
  setStepperCurrentValue?: React.Dispatch<React.SetStateAction<number>>;
  stepperTotalValue?: number,
  setStepperTotalValue?: React.Dispatch<React.SetStateAction<number>>;
};

export const routes = {
  applicationDetails: '/portal/application/:applicationDetails',
  startApplication: '/portal/application/startApplication',
  assetInformation: '/portal/application/assetInfo',
  termsOfApplication: '/portal/application/termsOfApplication',
  quoteSelection: '/portal/application/quoteSelection',
  reviewApplicationInformation: '/portal/application/reviewApplicationInfo',
  businessInformation: '/portal/application/businessInfo',
  businessType: '/portal/application/businessType',
  invalid: '/',
};

const ApplicationPage: React.FC<ApplicationPageProps> = ({
  topBar,
  startApplicationBlock,
  className,
  assetInformationBlock,
  businessInformationBlock,
  businessTypeBlock,
  quoteSelectionBlock,
  termsOfApplicationBlock,
  reviewApplicationInformationBlock,
  setQuoteSelected,
  setAssetInfo,
  setBusinessTypeInfo,
  setCreditCheckConsent,
  quoteSelected,
  assetInfo,
  businessTypeInfo,
  handleCreateApplication,
  stepperCurrentValue,
  setStepperCurrentValue,
  stepperTotalValue,
  setStepperTotalValue,
}) => {

  return (
    <div className={cx(styles.applicationPage, className)}>
      <TopBar
        className={styles.topBar}
        {...topBar} />
      <Switch>
        <Route exact path={routes.startApplication}>
            <StartApplicationBlock
              className={styles.block}
              {...startApplicationBlock}
               />
          </Route>
        <Route exact path={routes.quoteSelection}>
          <QuoteSelectionBlock
            className={styles.block}
            {...quoteSelectionBlock}
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
            {...assetInformationBlock}
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
            {...businessInformationBlock}
            />
        </Route>
        <Route exact path={routes.businessType}>
          <BusinessTypeBlock
            className={styles.block}
            {...businessTypeBlock}
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
            {...reviewApplicationInformationBlock}
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
            {...termsOfApplicationBlock}
            setCreditCheckConsent={setCreditCheckConsent}
            stepperCurrentValue={stepperCurrentValue}
            setStepperCurrentValue={setStepperCurrentValue}
            stepperTotalValue={stepperTotalValue}
            />
        </Route>
        <Route path={routes.applicationDetails}>
          <div>TODO add application details block</div>
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
