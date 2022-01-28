import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useHistory, useLocation } from 'react-router';
import { SignInBlockProps, defaultProps } from './SignInBlock';
import { isEmptyString } from '../../../lib/utils';
import { defaultProps as defaultTextFieldProps } from '../../molecules/TextField/TextField';
import { defaultProps as defaultToastProps } from '../../atoms/Toast/Toast';
import { HTMLInputType } from '../../atoms/TextInput/TextInput';
import { SignInPayload } from '../../../modules/account/types';
import { verifyAccount } from '../../../modules/account/api';

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
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [passwordVisibility, setPasswordVisibility] = useState<HTMLInputType>('password');
    const [toastMessage, setToastMessage] = useState<string>('');
    const formInvalid = (isEmptyString(email) || isEmptyString(password));
    const location = useLocation();

    useEffect(() => {
      const accountVerificationApiCall = async (id: string, token: string) => {
        await verifyAccount({ id, token });
      }

      const query = new URLSearchParams(location.search);
      const verifyId = query.get('id');
      const verifyToken = query.get('token');

      if (verifyId && verifyToken) {
        accountVerificationApiCall(verifyId, verifyToken);
      }
    }, [location]);

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
      if (passwordVisibility === 'password') {
        setPasswordVisibility('text');
      } else {
        setPasswordVisibility('password');
      }
    };

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
          onTextChanged: handleEmail,
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
            onIconClicked: togglePasswordVisibility,
          },
          inputType: passwordVisibility,
        },
      },
      nextButton: {
        ...defaultProps.nextButton,
        text: {
          ...defaultProps.nextButton.text,
          value: t('button_text.next'),
        },
        onButtonClicked: handleNext,
        disabled: formInvalid,
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
      toastMessage,
      toastProps: {
        ...defaultToastProps,
        type: 'NoCloseButton',
        text: {
          ...defaultToastProps.text,
          style: 'Basic400',
          value: toastMessage,
        },
        style: 'Dark',
      },
    };

    return (
      <View
        {...props}
        {...signInProps}
      />
    );
  };

  return Presenter;
};

export default withPresenter;