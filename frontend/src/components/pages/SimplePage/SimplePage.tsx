import React from 'react';
import cx from 'classnames';

import styles from './SimplePage.module.scss';

import UserSelectionBlock, { UserSelectionBlockProps } from '../../blocks/UserSelectionBlock';
import GetQuoteBlock, { GetQuoteBlockProps } from '../../blocks/GetQuoteBlock';
import ContactInfoCustomerBlock, { ContactInfoCustomerBlockProps } from '../../blocks/ContactInfoCustomerBlock';
import ContactInfoVendorBlock, { ContactInfoVendorBlockProps } from '../../blocks/ContactInfoVendorBlock';
import QuoteBlock, { QuoteBlockProps } from '../../blocks/QuoteBlock';
import ActionBlock, { ActionBlockProps } from '../../blocks/ActionBlock';
import { Route, Switch } from 'react-router-dom';

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
      label: {
        style: 'Basic800',
        align: 'Left',
        size: 'Medium',
        type: 'Paragraph2',
      },
      textInput: {
      },
    },
    costTextField: {
      state: 'Default',
      label: {
        style: 'Basic800',
        align: 'Left',
        size: 'Medium',
        type: 'Paragraph2',
      },
      textInput: {
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

const SimplePage: React.FC<SimplePageProps> = ({
  userSelectionBlock,
  getQuoteBlock,
  contactInfoCustomerBlock,
  quoteBlock,
  actionBlock,
  className,
}) => {
  return (
    <div className={cx(styles.simplePage, className)}>
      <Switch>
        <Route exact path='/'>
          <UserSelectionBlock
            className={styles.block} 
            {...userSelectionBlock} />
        </Route>
        <Route exact path='/getQuote'>
          <GetQuoteBlock
            className={styles.block}
            {...getQuoteBlock} />
        </Route>
        <Route exact path='/contactInformation'>
          <ContactInfoCustomerBlock
            className={styles.block}
            {...contactInfoCustomerBlock} />
        </Route>
        <Route exact path='/instaQuote'>
          <QuoteBlock
            className={styles.block}
            {...quoteBlock} />
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
