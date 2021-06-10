import React from 'react';
import cx from 'classnames';

import styles from './GetQuotePage.module.scss';

import TopBar, { TopBarProps } from '../../organisms/TopBar';
import UserSelectionBlock, { UserSelectionBlockProps } from '../../blocks/UserSelectionBlock';

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
      align: 'Center',
      size: 'Large',
      type: 'Heading1',
    },
    cardList: {
      userSelectionCards: [
      ],
    },
  } as UserSelectionBlockProps,
};

export type GetQuotePageProps = {
  topBar?: TopBarProps;
  block?: UserSelectionBlockProps;
  className?: string;
};

const GetQuotePage: React.FC<GetQuotePageProps> = ({
  topBar,
  block,
  className,
}) => {
  return (
    <div className={cx(styles.getQuotePage, className)}>
      <TopBar
        className={styles.topBar}
        {...topBar} />
      <UserSelectionBlock
        className={styles.block}
        {...block} />
    </div>
  );
};

GetQuotePage.defaultProps = defaultProps;

export default GetQuotePage;
