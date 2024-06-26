import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router';
import { ForgotPasswordBlockProps, defaultProps } from './ForgotPasswordBlock';
import { isEmptyString, isEmail } from '../../../lib/utils';
import { APIResponse } from '../../../lib/api/types';
import { defaultProps as defaultTextFieldProps, TextFieldStateType } from '../../molecules/TextField/TextField';
import { forgotPassword } from '../../../modules/account/api';

export type ForgotPasswordBlockPresenterProps = ForgotPasswordBlockProps & {
  forgotPassword: (email: string) => Promise<APIResponse<void>>;
};

const withPresenter = (
  View: React.FC<ForgotPasswordBlockProps>,
): React.FC<ForgotPasswordBlockPresenterProps> => {
  const Presenter: React.FC<ForgotPasswordBlockPresenterProps> = (props) => {
    const { t } = useTranslation();
    const history = useHistory();
    const [email, setEmail] = useState<string>('');
    const [errorMessage, setErrorMessage] = useState<string>('');
    const [emailError, setEmailError] = useState<TextFieldStateType>('Default');

    const isFormValid = !isEmptyString(email);

    const handleEmail = ({ target: { value } }) => {
      setEmail(value);
      if (emailError === 'Error') {
        setEmailError('Default');
      }
    };

    const handleSignIn = () => {
      history.push('/account/signIn');
    };

    const handleSendLink = async () => {
      if (!isEmail(email)) {
        setEmailError('Error');
        setErrorMessage(t('error_message.invalid_email'));
      } else {
        await forgotPassword(email);
        history.push({
          pathname: '/account/resetSent',
          state: {
            email,
            contentType: 'ResetLink',
          },
        });
      }
    };

    const forgotPasswordBlockProps: ForgotPasswordBlockProps = {
      ...defaultProps,
      blockHeading: {
        ...defaultProps.blockHeading,
        value: t('forgot_password.header'),
      },
      description: {
        ...defaultProps.description,
        value: t('forgot_password.description'),
      },
      emailTextField: {
        ...defaultProps.emailTextField,
        label: {
          ...defaultProps.emailTextField.label,
          value: t('text_field_label.email'),
        },
        textInput: {
          textValue: email,
          onTextChanged: handleEmail,
        },
        errorMessage: {
          ...defaultTextFieldProps.errorMessage,
          value: errorMessage,
        },
        state: emailError,
      },
      sendLinkButton: {
        ...defaultProps.sendLinkButton,
        text: {
          ...defaultProps.sendLinkButton.text,
          value: t('button_text.send_link'),
        },
        onButtonClicked: handleSendLink,
        disabled: !isFormValid,
      },
      signInButton: {
        ...defaultProps.signInButton,
        text: {
          ...defaultProps.signInButton.text,
          value: t('button_text.sign_in'),
        },
        onButtonClicked: handleSignIn,
      },
    };

    return (
            <View
            {...props}
            {...forgotPasswordBlockProps}
            />
    );
  };

  return Presenter;
};

export default withPresenter;
