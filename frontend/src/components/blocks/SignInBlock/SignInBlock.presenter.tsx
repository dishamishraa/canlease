import React, { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useHistory, useLocation } from 'react-router';
import { SignInBlockProps, defaultProps } from './SignInBlock';
import { isEmptyString, isEmail } from '../../../lib/utils';
import { SignInPayload, AccountTokenResponse } from '../../../modules/types';
import { defaultProps as defaultTextFieldProps, TextFieldStateType, TextFieldTypeType } from '../../molecules/TextField/TextField';
import { defaultProps as defaultToastProps, ToastProps, ToastStyleType, ToastTypeType } from '../../atoms/Toast/Toast';
import { HTMLInputType } from '../../atoms/TextInput/TextInput';
import { routes } from '../../pages/AuthPage/AuthPage'

export type SignInBlockPresenterProps = SignInBlockProps & {
  handleSignIn?: (payload: SignInPayload) => void;
  setToastMessage?: React.Dispatch<React.SetStateAction<string>>;
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
    const { state } = useLocation<{message: string}>();
    const { message } = state || {};
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [passwordVisibility, setPasswordVisibility] = useState<HTMLInputType>('password');
    const [toastMessage, setToastMessage] = useState<string>('');
    const formInvalid = (isEmptyString(email) || isEmptyString(password))

    useEffect(() => {
      if(state && message){
        setToastMessage(message)
      }
    },[state, message])

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

    const togglePasswordVisibility = () => {
      if(passwordVisibility === 'password'){
        setPasswordVisibility('text');
      }else{
        setPasswordVisibility('password');
      }
    }

    const handleForgetPassword = () => {
      history.push({ pathname: routes.forgotPassword });
    };

    const handleSignUp = () => {
      history.push({ pathname: routes.signUp });
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
          icon: {
            ...defaultTextFieldProps.textInput.icon,
            onIconClicked: togglePasswordVisibility
          },
          inputType: passwordVisibility
        },
      },
      nextButton: {
        ...defaultProps.nextButton,
        text: {
          ...defaultProps.nextButton.text,
          value: t('button_text.next'),
        },
        onButtonClicked: handleNext,
        disabled: formInvalid
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
      toastMessage: toastMessage,
      toastProps: {
        ...defaultToastProps,
        type: 'NoCloseButton',
        text: {
          ...defaultToastProps.text,
          style: 'Basic400',
          value: toastMessage
        },
        style: 'Dark',
      }
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
