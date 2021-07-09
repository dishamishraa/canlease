import React from 'react';
import cx from 'classnames';

import styles from './RateCardTableItem.module.scss';

import Text, { TextProps } from '../../atoms/Text';
import Button, { ButtonProps } from '../../atoms/Button';

export type RateCardTableItemTypeType = 'Default' | 'Empty';

export const defaultProps = {
  type: 'Empty' as RateCardTableItemTypeType,
  companyName: {
    style: 'Basic600',
    align: 'Right',
    size: 'Medium',
    type: 'Paragraph2',
  } as TextProps,
  contactName: {
    style: 'Basic600',
    align: 'Right',
    size: 'Medium',
    type: 'Paragraph2',
  } as TextProps,
  status: {
    style: 'Basic600',
    align: 'Right',
    size: 'Medium',
    type: 'Paragraph2',
  } as TextProps,
  createOn: {
    style: 'Basic600',
    align: 'Right',
    size: 'Medium',
    type: 'Paragraph2',
  } as TextProps,
  assetName: {
    style: 'Basic600',
    align: 'Right',
    size: 'Medium',
    type: 'Paragraph2',
  } as TextProps,
  editButton: {
    type: 'Icon',
    size: 'Medium',
    fill: 'Basic',
    colour: 'Basic',
    icon: {
      asset: 'Edit',
      style: 'Brand500',
    },
  } as ButtonProps,
  deleteButton: {
    type: 'Icon',
    size: 'Medium',
    fill: 'Basic',
    colour: 'Basic',
    icon: {
      asset: 'Trash',
      style: 'Red200',
    },
  } as ButtonProps,
  button: {
    type: 'IconTextButton',
    size: 'Small',
    fill: 'None',
    colour: 'Basic',
    icon: {
      asset: 'Plus',
      style: 'Brand500',
    },
    text: {
      style: 'Brand500',
      align: 'Center',
      size: 'Small',
      type: 'ButtonGiant',
    },
  } as ButtonProps,
};

export type RateCardTableItemProps = {
  type?: RateCardTableItemTypeType;
  companyName?: TextProps;
  contactName?: TextProps;
  status?: TextProps;
  createOn?: TextProps;
  assetName?: TextProps;
  editButton?: ButtonProps;
  deleteButton?: ButtonProps;
  className?: string;
  button?: ButtonProps;
};

const RateCardTableItem: React.FC<RateCardTableItemProps> = ({
  type,
  companyName,
  contactName,
  status,
  createOn,
  assetName,
  editButton,
  deleteButton,
  className,
  button,
}) => {
  const currentStyle = styles[`rateCardTableItem${type}`];

  let companyNameView;
  let buttonView;
  let contactNameView;
  let statusView;
  let createOnView;
  let assetNameView;
  let buttonGroupView;

  switch (type) {
    case 'Default':
      companyNameView = (
        <Text
          className={styles.companyName}
          {...companyName} />
      );
      contactNameView = (
        <Text
          className={styles.contactName}
          {...contactName} />
      );
      statusView = (
        <Text
          className={styles.status}
          {...status} />
      );
      createOnView = (
        <Text
          className={styles.createOn}
          {...createOn} />
      );
      assetNameView = (
        <Text
          className={styles.assetName}
          {...assetName} />
      );
      buttonGroupView = (
        <div className={styles.buttonGroup}>
          <Button
            className={styles.editButton}
            {...editButton} />
          <Button
            className={styles.deleteButton}
            {...deleteButton} />
        </div>
      );
      break;
    case 'Empty':
      buttonView = (
        <Button
          className={styles.button}
          {...button} />
      );
      break;
  }

  return (
    <div className={cx(currentStyle, className)}>
      {companyNameView}
      {buttonView}
      {contactNameView}
      {statusView}
      {createOnView}
      {assetNameView}
      {buttonGroupView}
    </div>
  );
};

RateCardTableItem.defaultProps = defaultProps;

export default RateCardTableItem;
