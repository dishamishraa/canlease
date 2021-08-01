import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useHistory, useLocation } from 'react-router';
import { defaultProps, CreatePasswordBlockProps } from './CreatePasswordBlock';
import { APIResponse } from '../../../lib/api/types';
import { defaultProps as defaultTextFieldProps, TextFieldStateType } from '../../molecules/TextField/TextField';
import { isEmptyString } from '../../../lib/utils';
import { updatePassword } from '../../../modules/account/api';
import { HTMLInputType } from '../../atoms/TextInput/TextInput';
import { UpdatePasswordPayload } from '../../../modules/account/types';
import { extractJwtPayload } from '../../../lib/token';

export type CreatePasswordBlockPresenterProps = CreatePasswordBlockProps & {
  updatePassword?: (payload: UpdatePasswordPayload) => Promise<APIResponse<void>>;
};

const withPresenter = (
  View: React.FC<CreatePasswordBlockProps>,
): React.FC<CreatePasswordBlockPresenterProps> => {
  const Presenter: React.FC<CreatePasswordBlockPresenterProps> = (props) => {
    const { t } = useTranslation();
    const history = useHistory();
    const [createPassword, setCreatePassword] = useState<string>('');
    const [confirmPassword, setConfirmPassword] = useState<string>('');
    const [confirmPasswordError, setConfirmPasswordError] = useState<TextFieldStateType>('Default');
    const [passwordVisibility, setPasswordVisibility] = useState<HTMLInputType>('password');
    const [confirmPasswordVisibility, setConfirmPasswordVisibility] = useState<HTMLInputType>('password');

    const formInvalid = (isEmptyString(createPassword) || isEmptyString(confirmPassword));
    
    const { search } = useLocation();
    const query = new URLSearchParams(search);
    const token = query.get('token')

    const handleSignIn = () => {
      history.push({ pathname: '/account/signIn' });
    };

    const handleCreatePassword = ({ target: { value } }) => {
      setCreatePassword(value);
    };

    const handleConfirmPassword = ({ target: { value } }) => {
      setConfirmPassword(value);
      if (confirmPasswordError === 'Error') {
        setConfirmPasswordError('Default');
      }
    };

    const handleSavePassword = async () => {
      if (createPassword !== confirmPassword) {
        setConfirmPasswordError('Error');
      } else if (token){
          const { id } = extractJwtPayload(token);
          await updatePassword({
            id: id, 
            password: createPassword,
            token: token,
          }).then(() => {
            history.push({
              pathname: '/account/signIn',
              state: {
                message: t('toast_message.reset_password'),
              },
            });
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

    const toggleConfirmPasswordVisibility = () => {
      if (confirmPasswordVisibility === 'password') {
        setConfirmPasswordVisibility('text');
      } else {
        setConfirmPasswordVisibility('password');
      }
    };

    const createPasswordBlockProps: CreatePasswordBlockPresenterProps = {
      ...defaultProps,
      blockHeading: {
        ...defaultProps.blockHeading,
        value: t('create_password.header'),
      },
      description: {
        ...defaultProps.description,
        value: t('create_password.description'),
      },
      createPasswordField: {
        ...defaultProps.createPasswordField,
        label: {
          ...defaultProps.createPasswordField.label,
          value: t('text_field_label.create_password'),
        },
        textInput: {
          ...defaultProps.createPasswordField.textInput,
          textValue: createPassword,
          onTextChanged: handleCreatePassword,
          inputType: passwordVisibility,
          icon: {
            ...defaultTextFieldProps.textInput.icon,
            onIconClicked: togglePasswordVisibility,
          },
        },
      },
      confirmPasswordField: {
        ...defaultProps.confirmPasswordField,
        label: {
          ...defaultProps.confirmPasswordField.label,
          value: t('text_field_label.confirm_password'),
        },
        errorMessage: {
          ...defaultTextFieldProps.errorMessage,
          value: t('error_message.password_mismatch'),
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
        state: confirmPasswordError,
      },
      saveButton: {
        ...defaultProps.saveButton,
        text: {
          ...defaultProps.saveButton.text,
          value: t('button_text.save'),
        },
        onButtonClicked: handleSavePassword,
        disabled: formInvalid,
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

    return <View
      {...props}
      {...createPasswordBlockProps}
      />;
  };
  return Presenter;
};

export default withPresenter;
