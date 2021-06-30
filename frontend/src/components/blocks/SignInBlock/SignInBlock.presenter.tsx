import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router';
import { SignInBlockProps, defaultProps } from './SignInBlock';
import { isEmptyString, isEmail } from '../../../lib/utils';
import { SignInPayload, AccountTokenResponse } from '../../../modules/types';
import { defaultProps as defaultTextFieldProps, TextFieldStateType } from '../../molecules/TextField/TextField';

export type SignInBlockPresenterProps = SignInBlockProps & {
  handleSignIn?: (payload: SignInPayload) => void;
};

const withPresenter = (
  View: React.FC<SignInBlockProps>,
): React.FC<SignInBlockPresenterProps> => {
  const Presenter: React.FC<SignInBlockPresenterProps> = (props) => {
    const {
      handleSignIn,
    } = props;
    const { t } = useTranslation();
    const history = useHistory();
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    const handleEmail = ({ target: { value } }) => {
      setEmail(value);
    };
    const handlePassword = ({ target: { value } }) => {
      setPassword(value);
    };

    const handleNext = () => {
      if (handleSignIn && !isEmptyString(email) && !isEmptyString(password)) {
        handleSignIn({
          email,
          password,
        });
      }
    };

    const handleIconClick = () => {
      console.log('click')
    }

    const handleForgetPassword = () => {
      history.push('/account/forgotPassword');
    };

    const handleSignUp = () => {
      history.push('/account/signUp');
    };

    const signInProps: SignInBlockProps = {
      ...defaultProps,
      blockHeading: {
        ...defaultProps.blockHeading,
        value: t('authentication.heading_text.sign_in'),
      },
      description: {
        ...defaultProps.description,
        value: t('authentication.description.sign_in'),
      },
      emailTextField: {
        ...defaultProps.emailTextField,
        label: {
          ...defaultProps.emailTextField.label,
          value: t('text_field_label.email'),
        },
        textInput: {
          textValue: email,
          onTextChanged: handleEmail
        },
        errorMessage: {
          ...defaultTextFieldProps.errorMessage,
          value: t('authentication.error_message.account_exist'),
        },
      },
      passwordField: {
        ...defaultProps.passwordField,
        label: {
          ...defaultProps.passwordField.label,
          value: t('text_field_label.password'),
        },
        textInput: {
          ...defaultProps.passwordField.textInput,
          textValue: password,
          onTextChanged: handlePassword,
          // icon: {
          //   ...defaultTextFieldProps.textInput.icon,
          //   onIconClicked: handleIconClick
          // }
        },
      },
      nextButton: {
        ...defaultProps.nextButton,
        text: {
          ...defaultProps.nextButton.text,
          value: t('button_text.next'),
        },
        onButtonClicked: handleNext,
      },
      forgotPasswordButton: {
        ...defaultProps.forgotPasswordButton,
        text: {
          ...defaultProps.forgotPasswordButton.text,
          value: t('button_text.forgot_password'),
        },
        onButtonClicked: handleForgetPassword,
      },
      bottomContent: {
        ...defaultProps.bottomContent,
        value: t('authentication.bottom_content.sign_in'),
      },
      signUpButton: {
        ...defaultProps.signUpButton,
        text: {
          ...defaultProps.signUpButton.text,
          value: t('button_text.sign_up'),
        },
        onButtonClicked: handleSignUp,
      },
    };

    return (
            <View
            {...signInProps}
            />
    );
  };

  return Presenter;
};

export default withPresenter;
