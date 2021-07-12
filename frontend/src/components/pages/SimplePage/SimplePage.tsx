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
import { ContactInfo, EquipmentLeaseInfo } from '../../../modules/types';
import { UserType } from '../../../modules/profile/types';

export const defaultProps = {
};

export type SimplePageProps = {
  className?: string;
  showBackButton?: boolean;
  userType?: UserType;
  equipmentLeaseInfo?: EquipmentLeaseInfo;
  contactInfo?: ContactInfo;
  setUserType?: (userType: UserType) => void;
  setEquipmentLeaseInfo?: (equipmentLeaseInfo: EquipmentLeaseInfo) => void;
  handleCreateQuote?: (contactInfo: ContactInfo) => void;
};

const routes = {
  userSelection: '/',
  getQuote: '/getQuote',
  contactInformation: '/contactInformation',
  instaQuote: '/instaQuote/:quoteId',
  invalid: '/',
};

const SimplePage: React.FC<SimplePageProps> = ({
  showBackButton,
  className,
  userType,
  equipmentLeaseInfo,
  contactInfo,
  setUserType,
  setEquipmentLeaseInfo,
  handleCreateQuote,
}) => {
  const ContactInfoBlock = userType === 'vendor' ? ContactInfoVendorBlock : ContactInfoCustomerBlock;

  return (
    <div className={cx(styles.simplePage, className)}>
      <div className={styles.topContent}>
        {/* <TopBar
          className={styles.topBar}
          showBackButton={showBackButton} /> */}
        <Switch>
          <Route exact path={routes.userSelection}>
            <UserSelectionBlock
              className={styles.block}
              setUserType={setUserType}
              />
          </Route>
          <Route exact path={routes.getQuote}>
            <GetQuoteBlock
              className={styles.block}
              equipmentLeaseInfo={equipmentLeaseInfo}
              setEquipmentLeaseInfo={setEquipmentLeaseInfo}
              />
          </Route>
          <Route exact path={routes.contactInformation}>
            <ContactInfoBlock
              className={styles.block}
              contactInfo={contactInfo}
              handleCreateQuote={handleCreateQuote}
              />
          </Route>
          <Route exact path={routes.instaQuote}>
            <QuoteBlock
              className={styles.block} />
          </Route>
          <Route path={routes.invalid}>
            <Redirect to={routes.userSelection}/>
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
