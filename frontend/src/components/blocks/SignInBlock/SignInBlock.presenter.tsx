import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useHistory, useLocation } from 'react-router';
import { SignInBlockProps, defaultProps } from './SignInBlock';
import { isEmptyString } from '../../../lib/utils';
import { defaultProps as defaultTextFieldProps } from '../../molecules/TextField/TextField';
import { defaultProps as defaultToastProps, ToastStyleType, ToastTypeType } from '../../atoms/Toast/Toast';
import { HTMLInputType } from '../../atoms/TextInput/TextInput';
import { SignInPayload, VerifyAccountPayload } from '../../../modules/account/types';
import { APIResponse } from '../../../lib/api/types';

export type SignInBlockPresenterProps = SignInBlockProps & {
  handleSignIn?: (payload: SignInPayload) => Promise<string | undefined>;
  setToastMessage?: React.Dispatch<React.SetStateAction<string>>;
  verifyAccount?: (payload: VerifyAccountPayload) => Promise<APIResponse<void>>;
};

const withPresenter = (
  View: React.FC<SignInBlockProps>,
): React.FC<SignInBlockPresenterProps> => {
  const Presenter: React.FC<SignInBlockPresenterProps> = (props) => {
    const {
      handleSignIn,
      verifyAccount,
    } = props;
    const { t } = useTranslation();
    const history = useHistory();
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [passwordVisibility, setPasswordVisibility] = useState<HTMLInputType>('password');
    const [toastMessage, setToastMessage] = useState<string>('');
    const [toastType, setToastType] = useState<ToastTypeType>('NoCloseButton');
    const [toastStyle, setToastStyle] = useState<ToastStyleType>('Danger');
    const formInvalid = (isEmptyString(email) || isEmptyString(password));
    const location = useLocation();

    useEffect(() => {
      const accountVerificationApiCall = async (id: string, token: string) => {
        if (verifyAccount) {
          const { error } = await verifyAccount({ id, token });
          if (!error) {
            setToastType('WithCloseButton');
            setToastStyle('Dark');
            setToastMessage(t("email_verification.success"));
          }
        }
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

    const handleNext = async () => {
      if (handleSignIn && !isEmptyString(email) && !isEmptyString(password)) {
        const error = await handleSignIn({
          email,
          password,
        });
        setToastMessage(error ?? '')
        setToastType('NoCloseButton');
        setToastStyle('Danger');
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

    const handleIconClick = () => {
      setToastMessage('');
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
        type: toastType,
        text: {
          ...defaultToastProps.text,
          style: 'Basic500',
          value: toastMessage,
        },
        style: toastStyle,
        icon: {
          ...defaultToastProps.icon,
          onIconClicked: handleIconClick,
        }
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