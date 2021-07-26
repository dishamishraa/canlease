import React from 'react';
import cx from 'classnames';

import styles from './RateCardDetailsPage.module.scss';

import TopBar, { TopBarProps } from '../../organisms/TopBar';
import BlockHeader, { BlockHeaderProps } from '../../molecules/BlockHeader';
import RateCardTable, { RateCardTableProps } from '../../blocks/RateCardTable';
import NewRateModal, { NewRateModalProps } from '../../organisms/NewRateModal/NewRateModal';

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
  blockHeader: {
    style: 'Heading1',
    type: 'WithButton',
    text: {
      style: 'Basic800',
      align: 'Left',
      size: 'Large',
      type: 'Heading1',
    },
    button: {
      type: 'Button',
      size: 'Medium',
      fill: 'Basic',
      colour: 'Basic',
      text: {
        style: 'Brand500',
        align: 'Center',
        size: 'Small',
        type: 'ButtonGiant',
      },
    },
  } as BlockHeaderProps,
  rateCardTable: {
    rateCardTableHeader: {
      companyName: {
        style: 'Basic800',
        align: 'Left',
        size: 'Medium',
        type: 'Paragraph3',
      },
      contactName: {
        style: 'Basic800',
        align: 'Left',
        size: 'Medium',
        type: 'Paragraph3',
      },
      status: {
        style: 'Basic800',
        align: 'Left',
        size: 'Medium',
        type: 'Paragraph3',
      },
      createOn: {
        style: 'Basic800',
        align: 'Left',
        size: 'Medium',
        type: 'Paragraph3',
      },
      assetName: {
        style: 'Basic800',
        align: 'Left',
        size: 'Medium',
        type: 'Paragraph3',
      },
      cost: {
        style: 'Basic800',
        align: 'Left',
        size: 'Medium',
        type: 'Paragraph3',
      },
    },
    rateCardTableItemList: {
      rateCardTableItems: [
      ],
    },
  } as RateCardTableProps,
};

export type RateCardDetailsPageProps = {
  topBar?: TopBarProps;
  blockHeader?: BlockHeaderProps;
  className?: string;
  rateCardTable?: RateCardTableProps;
  newRateModal?: NewRateModalProps;
  showRateModal?: boolean;
};

const RateCardDetailsPage: React.FC<RateCardDetailsPageProps> = ({
  topBar,
  blockHeader,
  className,
  rateCardTable,
  showRateModal,
  newRateModal
}) => {
  let modalDisplay;
  if (showRateModal) {
    modalDisplay = (
      <NewRateModal className={styles.newRateModal} {...newRateModal}/>
    );
  }
  return (
    <div className={cx(styles.rateCardDetailsPage, className)}>
      <TopBar
        className={styles.topBar}
        {...topBar} />
      <BlockHeader
        className={styles.blockHeader}
        {...blockHeader} />
      <RateCardTable
        className={styles.rateCardTable}
        {...rateCardTable} />
        {modalDisplay}
    </div>
)};

RateCardDetailsPage.defaultProps = defaultProps;

export default RateCardDetailsPage;
