import React from 'react';
import cx from 'classnames';

import styles from './TermsOfApplicationBlock.module.scss';

import Stepper, { StepperProps } from '../../atoms/Stepper';
import Text, { TextProps } from '../../atoms/Text';
import SimpleDetailsSection, { SimpleDetailsSectionProps } from '../../organisms/SimpleDetailsSection';
import CheckboxItem, { CheckboxItemProps } from '../../atoms/CheckboxItem';
import Button, { ButtonProps } from '../../atoms/Button';

export const defaultProps = {
  stepper: {
    text: {
      style: 'Brand500',
      align: 'Left',
      size: 'Medium',
      type: 'Paragraph3',
    },
  } as StepperProps,
  blockHeading: {
    style: 'Basic800',
    align: 'Left',
    size: 'Large',
    type: 'Heading1',
  } as TextProps,
  terms: {
    text: {
      style: 'Basic800',
      align: 'Left',
      size: 'Large',
      type: 'Paragraph1',
    },
  } as SimpleDetailsSectionProps,
  checkboxItem: {
    state: 'Unselected',
    icon: {
      asset: 'CheckboxUnchecked',
      style: 'Basic800',
    },
    text: {
      style: 'Basic800',
      align: 'Left',
      size: 'Large',
      type: 'Paragraph1',
    },
  } as CheckboxItemProps,
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
  } as ButtonProps,
};

export type TermsOfApplicationBlockProps = {
  stepper?: StepperProps;
  blockHeading?: TextProps;
  terms?: SimpleDetailsSectionProps;
  checkboxItem?: CheckboxItemProps;
  nextButton?: ButtonProps;
  className?: string;
  setCreditCheckConsent?: (consent: boolean) => void;
  creditCheckConsent?: boolean;
  stepperCurrentValue?: number;
  stepperTotalValue?: number;
};

const TermsOfApplicationBlock: React.FC<TermsOfApplicationBlockProps> = ({
  stepper,
  blockHeading,
  terms,
  checkboxItem,
  nextButton,
  className,
}) => (
    <div className={cx(styles.termsOfApplicationBlock, className)}>
      <div className={styles.topContent}>
        <Stepper
          className={styles.stepper}
          {...stepper} />
        <Text
          className={styles.blockHeading}
          {...blockHeading} />
      </div>
      <SimpleDetailsSection
        className={styles.terms}
        {...terms} />
      <CheckboxItem
        className={styles.checkboxItem}
        {...checkboxItem} />
      <Button
        className={styles.nextButton}
        {...nextButton} />
    </div>
);

TermsOfApplicationBlock.defaultProps = defaultProps;

export default TermsOfApplicationBlock;
