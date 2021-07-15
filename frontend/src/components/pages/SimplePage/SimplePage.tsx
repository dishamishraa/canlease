import React from 'react';
import cx from 'classnames';

import { Redirect, Route, Switch } from 'react-router-dom';
import styles from './SimplePage.module.scss';

import UserSelectionBlock from '../../blocks/UserSelectionBlock';
import TopBar from '../../organisms/TopBar';
import GetQuoteBlock from '../../blocks/GetQuoteBlock';
import ContactInfoCustomerBlock from '../../blocks/ContactInfoCustomerBlock';
import ContactInfoVendorBlock from '../../blocks/ContactInfoVendorBlock';
import QuoteBlock from '../../blocks/QuoteBlock';
import ActionBlock from '../../blocks/ActionBlock';
import { ContactInfo, EquipmentLeaseInfo, QuoteFlowType } from '../../../modules/types';
import { Profile, UserType } from '../../../modules/profile/types';

export const defaultProps = {
};

export type SimplePageProps = {
  className?: string;
  quoteUserType?: UserType;
  equipmentLeaseInfo?: EquipmentLeaseInfo;
  contactInfo?: ContactInfo;
  setQuoteUserType?: (userType: UserType) => void;
  setEquipmentLeaseInfo?: (equipmentLeaseInfo: EquipmentLeaseInfo) => Promise<void>;
  setContactInfo?: (contactInfo: ContactInfo) => Promise<void>;
  flowType?: QuoteFlowType;
  profile?: Profile;
};

const routes = {
  instaQuote: {
    userSelection: '/',
    getQuote: '/getQuote',
    contactInformation: '/contactInformation',
    instaQuote: '/instaQuote/:quoteId',
    invalid: '/',
  },
  createQuote: {
    typeSelection: '/portal/quote/selectType',
    getQuote: '/portal/quote/getQuote',
    customerInformation: '/portal/quote/customerInformation',
    quoteDetails: '/portal/quote/:quoteId',
    invalid: '/',
  },
};

const SimplePage: React.FC<SimplePageProps> = ({
  className,
  quoteUserType,
  equipmentLeaseInfo,
  contactInfo,
  setQuoteUserType,
  setEquipmentLeaseInfo,
  setContactInfo,
  flowType,
  profile,
}) => {
  const ContactInfoBlock = quoteUserType === 'vendor' && flowType === 'instaQuote' ? 
    ContactInfoVendorBlock : 
    ContactInfoCustomerBlock;

  // get correct routes based on the flow
  const currentFlow = flowType || 'instaQuote';

  let topBar;
  let defaultPath = routes.instaQuote.userSelection;
  if(currentFlow === 'createQuote') {
    topBar = (<TopBar
      className={styles.topBar}
      showBackButton={true} />);
    
    if(profile?.userType === 'customer') {
      defaultPath = routes.createQuote.getQuote;
    } else {
      defaultPath = routes.createQuote.typeSelection;
    }
  }

  return (
    <div className={cx(styles.simplePage, className)}>
      <div className={styles.topContent}>
        {topBar}
        <Switch>
          <Route exact 
            path={[
              routes.instaQuote.userSelection,
              routes.createQuote.typeSelection,
            ]}>
            <UserSelectionBlock
              className={styles.block}
              setQuoteUserType={setQuoteUserType}
              flowType={flowType}
              />
          </Route>
          <Route exact 
            path={[
              routes.instaQuote.getQuote,
              routes.createQuote.getQuote,
            ]}>
            <GetQuoteBlock
              className={styles.block}
              equipmentLeaseInfo={equipmentLeaseInfo}
              setEquipmentLeaseInfo={setEquipmentLeaseInfo}
              profile={profile}
              />
          </Route>
          <Route exact 
            path={[
              routes.instaQuote.contactInformation,
              routes.createQuote.customerInformation,
            ]}>
            <ContactInfoBlock
              className={styles.block}
              contactInfo={contactInfo}
              setContactInfo={setContactInfo}
              quoteUserType={quoteUserType}
              flowType={flowType}
              />
          </Route>
          <Route exact 
            path={[
              routes.instaQuote.instaQuote, 
              routes.createQuote.quoteDetails,
            ]}>
            <QuoteBlock
              className={styles.block}
              quoteUserType={quoteUserType}
              flowType={flowType} />
          </Route>
          <Route 
            path={[
              routes.instaQuote.invalid,
              routes.createQuote.invalid,
            ]}>
            <Redirect to={defaultPath}/>
          </Route>
        </Switch>
      </div>
      <ActionBlock
        className={styles.actionBlock} />
    </div>
  );
};

SimplePage.defaultProps = defaultProps;

export default SimplePage;
