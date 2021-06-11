import React from 'react';
import cx from 'classnames';

import styles from './QuotesPage.module.scss';

import TopBar, { TopBarProps } from '../../organisms/TopBar';
import QuoteBlock, { QuoteBlockProps } from '../../blocks/QuoteBlock';

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
    quoteRateSection: {
      text: {
        style: 'Basic800',
        align: 'Left',
        size: 'Large',
        type: 'Heading2',
      },
      detailItemList: {
        quoteDetailItems: [
        ],
      },
      rateCardList: {
        rateCards: [
        ],
      },
    },
    disclaimerText: {
      style: 'Basic800',
      align: 'Left',
      size: 'Medium',
      type: 'Paragraph3',
    },
    detailItemList: {
      quoteDetailItems: [
      ],
    },
    validText: {
      style: 'Basic800',
      align: 'Left',
      size: 'Medium',
      type: 'Paragraph3',
    },
    learnMoreText: {
      style: 'Basic800',
      align: 'Left',
      size: 'Medium',
      type: 'Paragraph2',
    },
    viewQuoteButton: {
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
  } as QuoteBlockProps,
};

export type QuotesPageProps = {
  topBar?: TopBarProps;
  block?: QuoteBlockProps;
  className?: string;
};

const QuotesPage: React.FC<QuotesPageProps> = ({
  topBar,
  block,
  className,
}) => (
    <div className={cx(styles.quotesPage, className)}>
      <TopBar
        className={styles.topBar}
        {...topBar} />
      <QuoteBlock
        className={styles.block}
        {...block} />
    </div>
);

QuotesPage.defaultProps = defaultProps;

export default QuotesPage;
