import React from 'react';
import cx from 'classnames';

import { Redirect, Route, Switch } from 'react-router-dom';
import styles from './SimplePage.module.scss';

import UserSelectionBlock, { UserSelectionBlockProps } from '../../blocks/UserSelectionBlock';
import TopBar, { TopBarProps } from '../../organisms/TopBar';
import GetQuoteBlock, { GetQuoteBlockProps } from '../../blocks/GetQuoteBlock';
import ContactInfoCustomerBlock, { ContactInfoCustomerBlockProps } from '../../blocks/ContactInfoCustomerBlock';
import ContactInfoVendorBlock, { ContactInfoVendorBlockProps } from '../../blocks/ContactInfoVendorBlock';
import QuoteBlock, { QuoteBlockProps } from '../../blocks/QuoteBlock';
import ActionBlock, { ActionBlockProps } from '../../blocks/ActionBlock';
import { ContactInfo, EquipmentLeaseInfo } from '../../../lib/types';
import { UseCreateQuoteResult } from '../../../modules/quote/useCreateQuote';

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
  } as GetQuoteBlockProps,
  actionBlock: {
    text: {
      style: 'Basic800',
      align: 'Center',
      size: 'Large',
      type: 'Paragraph1',
    },
    button: {
      type: 'Button',
      size: 'Large',
      fill: 'Basic',
      colour: 'Basic',
      text: {
        style: 'Brand500',
        align: 'Center',
        size: 'Small',
        type: 'ButtonGiant',
      },
    },
  } as ActionBlockProps,
};

export type SimplePageProps = {
  userSelectionBlock?: UserSelectionBlockProps;
  getQuoteBlock?: GetQuoteBlockProps;
  contactInfoCustomerBlock?: ContactInfoCustomerBlockProps;
  contactInfoVendorBlock?: ContactInfoVendorBlockProps;
  quoteBlock?: QuoteBlockProps;
  topBar?: TopBarProps;
  block?: GetQuoteBlockProps;
  actionBlock?: ActionBlockProps;
  className?: string;
  setUserType?: React.Dispatch<React.SetStateAction<string>>;
  userType?: string;
  setEquipmentLeaseInfo?: React.Dispatch<React.SetStateAction<EquipmentLeaseInfo>>;
  equipmentLeaseInfo?: EquipmentLeaseInfo;
  setContactInfo?: React.Dispatch<React.SetStateAction<ContactInfo>>;
  contactInfo?: ContactInfo;
  createQuote?: UseCreateQuoteResult; 
};

const routes = {
  userSelection: '/',
  getQuote: '/getQuote',
  contactInformation: '/contactInformation',
  instaQuote: '/instaQuote',
  invalid: '/',
};

const SimplePage: React.FC<SimplePageProps> = (props) => {
  const {
    userSelectionBlock,
    getQuoteBlock,
    contactInfoCustomerBlock,
    quoteBlock,
    topBar,
    block,
    actionBlock,
    className,
    setUserType,
    setEquipmentLeaseInfo,
    setContactInfo,
    userType,
    equipmentLeaseInfo,
    contactInfo,
    createQuote
  } = props

  const ContactInfoBlock = userType === "vendor" ? ContactInfoVendorBlock : ContactInfoCustomerBlock;

  return (
    <div className={cx(styles.simplePage, className)}>
      <div className={styles.topContent}>
        <TopBar
          className={styles.topBar}
          {...topBar} />
        <Switch>
          <Route exact path={routes.userSelection}>
            <UserSelectionBlock
              className={styles.block}
              {...userSelectionBlock}
              setUserType={setUserType}
              />
          </Route>
          <Route exact path={routes.getQuote}>
            <GetQuoteBlock
              className={styles.block}
              {...getQuoteBlock} 
              setEquipmentLeaseInfo={setEquipmentLeaseInfo}
              />
          </Route>
          <Route exact path={routes.contactInformation}>
            <ContactInfoBlock
              className={styles.block}
              {...contactInfoCustomerBlock} 
              setContactInfo={setContactInfo}/>
          </Route>
          <Route exact path={routes.instaQuote}>
            <QuoteBlock
              className={styles.block}
              {...quoteBlock} />
          </Route>
          <Route path={routes.invalid}>
            <Redirect to={routes.userSelection}/>
          </Route>
        </Switch>
      </div>
      <ActionBlock
        className={styles.actionBlock}
        {...actionBlock} />
    </div>
  );
};

SimplePage.defaultProps = defaultProps;

export default SimplePage;
