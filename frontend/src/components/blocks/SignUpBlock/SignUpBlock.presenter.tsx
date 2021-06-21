import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router';
import { SignUpBlockProps, defaultProps } from './SignUpBlock';
import { isEmptyString, isEmail } from '../../../lib/utils';
import { APIResponse } from '../../../lib/api/types';
import { IdentityAccountPayload, AccountTokenResponse } from '../../../modules/types'
import { defaultProps as defaultTextFieldProps, TextFieldStateType } from '../../molecules/TextField/TextField'

export type SignUpBlockPresenterProps = SignUpBlockProps & {
    handleCreateIdentityAccount?: (payload: IdentityAccountPayload)=>void
};

const withPresenter = (
    View: React.FC<SignUpBlockProps>,
): React.FC<SignUpBlockPresenterProps> => {
    const Presenter: React.FC<SignUpBlockPresenterProps> = (props) => {
        const {
            handleCreateIdentityAccount
        } = props
        const { t } = useTranslation();
        const history = useHistory();
        const [email, setEmail] = useState<string>('');
        const [password, setPassword] = useState<string>('');
        const [confirmPassword, setConfirmPassword] = useState<string>('');
        const [emailError, setEmailError] = useState<TextFieldStateType>('Default');
        const [passwordError, setPasswordError] = useState<TextFieldStateType>('Default');
        const [confirmPasswordError, setConfirmPasswordError] = useState<TextFieldStateType>('Default')

        const handleEmail = ({ target: { value } }) => {
            setEmail(value);
            setEmailError('Default')
        }
        const handlePassowrd = ({ target: { value } }) => {
            setPassword(value);
        }
        const handleConfirmPassword = ({ target: { value } }) => {
            setConfirmPassword(value);
        }

        const handleSignUp = () => {
            // verify fields
            if(isEmptyString(email) || isEmptyString(password) || isEmptyString(confirmPassword)){
                if(!(password === confirmPassword)){
                    //show error message when passwords don't match
                    setConfirmPasswordError('Error')
                    setPasswordError('Error')
                }
            }else{
                // fields are valid, call sign up api
                if(handleCreateIdentityAccount){
                    handleCreateIdentityAccount({
                        email: email,
                        password: password,
                        firstName: '',
                        lastName: '',
                        enabled: false
                    })
                }
            }
        };

        const handleSignIn = () => {
            history.push({ pathname: '/account/signIn' });
        }

        const signUpProps: SignUpBlockProps = {
            ...defaultProps,
            blockHeading:{
                ...defaultProps.blockHeading,
                value: t('authentication.heading_text.sign_up')
            },
            description: {
                ...defaultProps.description,
                value: t('authentication.description.sign_up')
            },
            emailTextField: {
                ...defaultProps.emailTextField,
                label: {
                    ...defaultProps.emailTextField.label,
                    value: t('authentication.email_label'),
                },
                textInput: {
                    textValue: email,
                    onTextChanged: handleEmail
                },
                errorMessage: {
                    ...defaultTextFieldProps.errorMessage,
                    value: t('authentication.error_message.account_exist')
                },
                state: emailError
            },
            createPasswordField: {
                ...defaultProps.createPasswordField,
                label: {
                    ...defaultProps.createPasswordField.label,
                    value: t('authentication.create_password_label')
                },
                textInput: {
                    ...defaultProps.createPasswordField.textInput,
                    textValue: password,
                    onTextChanged: handlePassowrd
                },
                errorMessage: {
                    ...defaultTextFieldProps.errorMessage,
                    value: t('authentication.error_message.password_mismatch')
                },
                state: passwordError
            },
            confirmPasswordField: {
                ...defaultProps.confirmPasswordField,
                label: {
                    ...defaultProps.confirmPasswordField.label,
                    value: t('authentication.confirm_password_label')
                },
                textInput: {
                    ...defaultProps.confirmPasswordField.textInput,
                    textValue: confirmPassword,
                    onTextChanged: handleConfirmPassword
                },
                errorMessage: {
                    ...defaultTextFieldProps.errorMessage,
                    value: t('authentication.error_message.password_mismatch')
                },
                state: confirmPasswordError
            },
            signUpButton: {
                ...defaultProps.signUpButton,
                text: {
                    ...defaultProps.signUpButton.text,
                    value: t('authentication.sign_up_button')
                },
                onButtonClicked: handleSignUp
            },
            bottomContent: {
                ...defaultProps.bottomContent,
                value: t('authentication.bottom_content.sign_up')
            },
            signInButton: {
                ...defaultProps.signInButton,
                text: {
                    ...defaultProps.signInButton.text,
                    value: t('authentication.sign_in_button')
                },
                onButtonClicked: handleSignIn
            }
        }

        return (
            <View 
            {...signUpProps}
            />
        );
    };

    return Presenter;
};

export default withPresenter;