import React from 'react';
import cx from 'classnames';

import styles from './SimplePage.module.scss';

import UserSelectionBlock, { UserSelectionBlockProps } from '../../blocks/UserSelectionBlock';
import GetQuoteBlock, { GetQuoteBlockProps } from '../../blocks/GetQuoteBlock';
import ContactInfoCustomerBlock, { ContactInfoCustomerBlockProps } from '../../blocks/ContactInfoCustomerBlock';
import ContactInfoVendorBlock, { ContactInfoVendorBlockProps } from '../../blocks/ContactInfoVendorBlock';
import QuoteBlock, { QuoteBlockProps } from '../../blocks/QuoteBlock';
import ActionBlock, { ActionBlockProps } from '../../blocks/ActionBlock';
import { Redirect, Route, Switch } from 'react-router-dom';

export const defaultProps = {
  getQuoteBlock: {
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
  actionBlock?: ActionBlockProps;
  className?: string;
};

const routes = {
  userSelection: '/',
  getQuote: '/getQuote',
  contactInformation: '/contactInformation',
  instaQuote: '/instaQuote',
  invalid: '/',
}

const SimplePage: React.FC<SimplePageProps> = ({
  userSelectionBlock,
  getQuoteBlock,
  contactInfoCustomerBlock,
  quoteBlock,
  actionBlock,
  className,
}) => {
  
  const infoBlock = "vendor" === "vendor" ? 
    (<ContactInfoVendorBlock className={styles.block}
      {...contactInfoCustomerBlock} />):
    (<ContactInfoCustomerBlock
      className={styles.block}
      {...contactInfoCustomerBlock} />);

  return (
    <div className={cx(styles.simplePage, className)}>
      <Switch>
        <Route exact path={routes.userSelection}>
          <UserSelectionBlock
            className={styles.block} 
            {...userSelectionBlock} />
        </Route>
        <Route exact path={routes.getQuote}>
          <GetQuoteBlock
            className={styles.block}
            {...getQuoteBlock} />
        </Route>
        <Route exact path={routes.contactInformation}>
          {infoBlock}
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
      
      <ActionBlock
        className={styles.actionBlock}
        {...actionBlock} />
    </div>
  );
};

SimplePage.defaultProps = defaultProps;

export default SimplePage;
