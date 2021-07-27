import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router';
import { SignUpBlockProps, defaultProps } from './SignUpBlock';
import { isEmptyString, isEmail } from '../../../lib/utils';
import { defaultProps as defaultTextFieldProps, TextFieldStateType } from '../../molecules/TextField/TextField';
import { HTMLInputType } from '../../atoms/TextInput/TextInput';
import { SignUpPayload } from '../../../modules/account/types';

export type SignUpBlockPresenterProps = SignUpBlockProps & {
  handleSignUp?: (payload: SignUpPayload) => void;
};

const withPresenter = (
  View: React.FC<SignUpBlockProps>,
): React.FC<SignUpBlockPresenterProps> => {
  const Presenter: React.FC<SignUpBlockPresenterProps> = (props) => {
    const {
      handleSignUp: doSignUp,
    } = props;
    const { t } = useTranslation();
    const history = useHistory();
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [confirmPassword, setConfirmPassword] = useState<string>('');
    const [emailError, setEmailError] = useState<TextFieldStateType>('Default');
    const [emailErrorMessage, setEmailErrorMessage] = useState<string>(t('error_message.account_exist'));
    const [passwordError, setPasswordError] = useState<TextFieldStateType>('Default');
    const [confirmPasswordError, setConfirmPasswordError] = useState<TextFieldStateType>('Default');
    const [passwordVisibility, setPasswordVisibility] = useState<HTMLInputType>('password');
    const [confirmPasswordVisibility, setConfirmPasswordVisibility] = useState<HTMLInputType>('password');
    const FormInvalid = (isEmptyString(email) || isEmptyString(password) || isEmptyString(confirmPassword));

    const handleEmail = ({ target: { value } }) => {
      setEmail(value);
      if (emailError === 'Error') {
        setEmailError('Default');
      }
    };
    const handlePassowrd = ({ target: { value } }) => {
      setPassword(value);
      if (passwordError === 'Error') {
        setPasswordError('Default');
      }
    };
    const handleConfirmPassword = ({ target: { value } }) => {
      setConfirmPassword(value);
      if (confirmPasswordError === 'Error') {
        setConfirmPasswordError('Default');
      }
    };

    const handleSignUp = () => {
      // verify fields
      if (!FormInvalid) {
        if(!isEmail(email)){
          setEmailErrorMessage(t('error_message.invalid_email'));
          setEmailError('Error');
        }
        if (password !== confirmPassword) {
          // show error message when passwords don't match
          setConfirmPasswordError('Error');
          setPasswordError('Error');
        } else {
          // fields are valid, call sign up api
          if (doSignUp) {
            doSignUp({
              email,
              password,
              enabled: true,
            });
          }
        }
      }
    };

    const handleSignIn = () => {
      history.push('/account/signIn');
    };

    const togglePasswordVisibility = () => {
      if (passwordVisibility === 'password') {
        setPasswordVisibility('text');
      } else {
        setPasswordVisibility('password');
      }
    };

    const toggleConfirmPasswordVisibility = () => {
      if (confirmPasswordVisibility === 'password') {
        setConfirmPasswordVisibility('text');
      } else {
        setConfirmPasswordVisibility('password');
      }
    };

    const signUpProps: SignUpBlockProps = {
      ...defaultProps,
      blockHeading: {
        ...defaultProps.blockHeading,
        value: t('authentication.heading_text.sign_up'),
      },
      description: {
        ...defaultProps.description,
        value: t('authentication.description.sign_up'),
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
          value: emailErrorMessage,
        },
        state: emailError,
      },
      createPasswordField: {
        ...defaultProps.createPasswordField,
        label: {
          ...defaultProps.createPasswordField.label,
          value: t('text_field_label.create_password'),
        },
        textInput: {
          ...defaultProps.createPasswordField.textInput,
          textValue: password,
          onTextChanged: handlePassowrd,
          inputType: passwordVisibility,
          icon: {
            ...defaultTextFieldProps.textInput.icon,
            onIconClicked: togglePasswordVisibility,
          },
        },
        errorMessage: {
          ...defaultTextFieldProps.errorMessage,
          value: t('error_message.password_mismatch'),
        },
        state: passwordError,
      },
      confirmPasswordField: {
        ...defaultProps.confirmPasswordField,
        label: {
          ...defaultProps.confirmPasswordField.label,
          value: t('text_field_label.confirm_password'),
        },
        textInput: {
          ...defaultProps.confirmPasswordField.textInput,
          textValue: confirmPassword,
          onTextChanged: handleConfirmPassword,
          inputType: confirmPasswordVisibility,
          icon: {
            ...defaultTextFieldProps.textInput.icon,
            onIconClicked: toggleConfirmPasswordVisibility,
          },
        },
        errorMessage: {
          ...defaultTextFieldProps.errorMessage,
          value: t('error_message.password_mismatch'),
        },
        state: confirmPasswordError,
      },
      signUpButton: {
        ...defaultProps.signUpButton,
        text: {
          ...defaultProps.signUpButton.text,
          value: t('button_text.sign_up'),
        },
        onButtonClicked: handleSignUp,
        disabled: FormInvalid,
      },
      bottomContent: {
        ...defaultProps.bottomContent,
        value: t('authentication.bottom_content.sign_up'),
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
            {...signUpProps}
            />
    );
  };

  return Presenter;
};

export default withPresenter;
