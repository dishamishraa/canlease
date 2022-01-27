import React from 'react';
import cx from 'classnames';

import styles from './CustomerBusinessInformationBlock.module.scss';

import Stepper, { StepperProps } from '../../atoms/Stepper';
import Text, { TextProps } from '../../atoms/Text';
import TextField, { TextFieldProps } from '../../molecules/TextField';
import SelectField, { SelectFieldProps } from '../../molecules/SelectField';
import RadioField, { RadioFieldProps } from '../../molecules/RadioField';
import Button, { ButtonProps } from '../../atoms/Button';
import { ApplicationBusinessInfo } from '../../../modules/types';

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
  fullLegalNameTextField: {
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
  } as TextFieldProps,
  operatingNameTextField: {
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
  } as TextFieldProps,
  businessSectorSelectField: {
    label: {
      style: 'Basic800',
      align: 'Left',
      size: 'Medium',
      type: 'Paragraph2',
    },
    select: {
      text: {
        style: 'Basic800',
        align: 'Left',
        size: 'Large',
        type: 'Paragraph1',
      },
      icon: {
        asset: 'ChevronDown',
        style: 'Basic800',
      },
    },
  } as SelectFieldProps,
  businessPhoneField: {
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
  } as TextFieldProps,
  websiteLinkTextField: {
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
  } as TextFieldProps,
  businessTypeRadioField: {
    label: {
      style: 'Basic800',
      align: 'Left',
      size: 'Medium',
      type: 'Paragraph2',
    },
    radioButtonItem: {
      state: 'Unselected',
      icon: {
        asset: 'RadioButtonOff',
        style: 'Basic800',
      },
      text: {
        style: 'Basic800',
        align: 'Left',
        size: 'Large',
        type: 'Paragraph1',
      },
    },
  } as RadioFieldProps,
  sinField: {
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
  } as TextFieldProps,
  dateOfBirthField: {
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
  } as TextFieldProps,
  bankruptcyRadioField: {
    label: {
      style: 'Basic800',
      align: 'Left',
      size: 'Medium',
      type: 'Paragraph2',
    },
    radioButtonItem: {
      state: 'Unselected',
      icon: {
        asset: 'RadioButtonOff',
        style: 'Basic800',
      },
      text: {
        style: 'Basic800',
        align: 'Left',
        size: 'Large',
        type: 'Paragraph1',
      },
    },
  } as RadioFieldProps,
  detailsTextArea: {
    state: 'Default',
    type: 'TextArea',
    label: {
      style: 'Basic800',
      align: 'Left',
      size: 'Medium',
      type: 'Paragraph2',
    },
    textInput: {
      type: 'TextArea',
    },
  } as TextFieldProps,
  disclaimerText: {
    style: 'Basic800',
    align: 'Left',
    size: 'Medium',
    type: 'Paragraph2',
  } as TextProps,
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

export type CustomerBusinessInformationBlockProps = {
  stepper?: StepperProps;
  blockHeading?: TextProps;
  fullLegalNameTextField?: TextFieldProps;
  operatingNameTextField?: TextFieldProps;
  businessSectorSelectField?: SelectFieldProps;
  businessPhoneField?: TextFieldProps;
  websiteLinkTextField?: TextFieldProps;
  businessTypeRadioField?: RadioFieldProps;
  sinField?: TextFieldProps;
  dateOfBirthField?: TextFieldProps;
  bankruptcyRadioField?: RadioFieldProps;
  detailsTextArea?: TextFieldProps;
  disclaimerText?: TextProps;
  nextButton?: ButtonProps;
  className?: string;
  setBusinessInfo?: (businessInfo: ApplicationBusinessInfo) => void;
  businessInfo?: ApplicationBusinessInfo;
  stepperCurrentValue?: number;
  stepperTotalValue?: number;
  showBusinessQuestions?: boolean;
};

const CustomerBusinessInformationBlock: React.FC<CustomerBusinessInformationBlockProps> = ({
  stepper,
  blockHeading,
  fullLegalNameTextField,
  operatingNameTextField,
  businessSectorSelectField,
  businessPhoneField,
  websiteLinkTextField,
  businessTypeRadioField,
  sinField,
  dateOfBirthField,
  bankruptcyRadioField,
  detailsTextArea,
  disclaimerText,
  nextButton,
  className,
  showBusinessQuestions,
}) => {
  let businessFormFields;
  if (showBusinessQuestions) {
    businessFormFields = (
      <>
         <TextField
            className={styles.businessPhoneField}
            {...sinField} />
          <TextField 
            className={styles.dateOfBirthField}
            {...dateOfBirthField} />
          <RadioField
            className={styles.bankruptcyRadioField}
            {...bankruptcyRadioField} />
          <TextField
            className={styles.detailsTextArea}
            {...detailsTextArea} />
          <Text
            className={styles.disclaimerText}
            {...disclaimerText} />
      </>
    );
  }
  return (
    <div className={cx(styles.customerBusinessInformationBlock, className)}>
      <div className={styles.topContent}>
        <div className={styles.headingContent}>
          <Stepper
            className={styles.stepper}
            {...stepper} />
          <Text
            className={styles.blockHeading}
            {...blockHeading} />
        </div>
        <div className={styles.form}>
          <TextField
            className={styles.fullLegalNameTextField}
            {...fullLegalNameTextField} />
          <TextField
            className={styles.operatingNameTextField}
            {...operatingNameTextField} />
          <SelectField
            className={styles.businessSectorSelectField}
            {...businessSectorSelectField} />
          <TextField
            className={styles.businessPhoneField}
            {...businessPhoneField} />
          <TextField
            className={styles.websiteLinkTextField}
            {...websiteLinkTextField} />
          <RadioField
            className={styles.businessTypeRadioField}
            {...businessTypeRadioField} />
          {businessFormFields}
          <Button
            className={styles.nextButton}
            {...nextButton} />
        </div>
      </div>
    </div>
  );
};

CustomerBusinessInformationBlock.defaultProps = defaultProps;

export default CustomerBusinessInformationBlock;
