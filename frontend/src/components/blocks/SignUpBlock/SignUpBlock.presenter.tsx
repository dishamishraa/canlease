import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router';
import { SignUpBlockProps, defaultProps } from './SignUpBlock';
import { isEmptyString, isEmail } from '../../../lib/utils';
import { APIResponse } from '../../../lib/api/types';
import { IdentityAccountPayload, AccountTokenResponse } from '../../../modules/types'
import { defaultProps as defaultTextFieldProps, TextFieldStateType } from '../../molecules/TextField/TextField'

export type SignUpBlockPresenterProps = SignUpBlockProps & {
    createIdentityAccount: (payload: IdentityAccountPayload) => Promise<APIResponse<AccountTokenResponse>>;
};

const withPresenter = (
    View: React.FC<SignUpBlockProps>,
): React.FC<SignUpBlockPresenterProps> => {
    const Presenter: React.FC<SignUpBlockPresenterProps> = (props) => {
        const {
            createIdentityAccount
        } = props;
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
        const handleCreateIdentityAccount = async() => {
            let identityAccountPayload: IdentityAccountPayload = {
                email: email,
                password: password,
                firstName: '',
                lastName: '',
                enabled: false
            }
            const { data, error } = await createIdentityAccount(identityAccountPayload);
            if(error){
                setEmailError('Error')
            }
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
                handleCreateIdentityAccount()

                // push verification page
                history.push({ pathname: '/account/verifyEmail' });
            }
        }

        const handleSignIn = () => {
            history.push({ pathname: '/account/signIn' });
        }

        const signUpProps: SignUpBlockProps = {
            ...defaultProps,
            blockHeading:{
                ...defaultProps.blockHeading,
                value: t('sign_up.heading_text')
            },
            description: {
                ...defaultProps.description,
                value: t('sign_up.description')
            },
            emailTextField: {
                ...defaultProps.emailTextField,
                label: {
                    ...defaultProps.emailTextField.label,
                    value: t('sign_up.email_label'),
                },
                textInput: {
                    textValue: email,
                    onTextChanged: handleEmail
                },
                errorMessage: {
                    ...defaultTextFieldProps.errorMessage,
                    value: t('sign_up.error_message.account_exist')
                },
                state: emailError
            },
            createPasswordField: {
                ...defaultProps.createPasswordField,
                label: {
                    ...defaultProps.createPasswordField.label,
                    value: t('sign_up.create_password_label')
                },
                textInput: {
                    ...defaultProps.createPasswordField.textInput,
                    textValue: password,
                    onTextChanged: handlePassowrd
                },
                errorMessage: {
                    ...defaultTextFieldProps.errorMessage,
                    value: t('sign_up.error_message.password_mismatch')
                },
                state: passwordError
            },
            confirmPasswordField: {
                ...defaultProps.confirmPasswordField,
                label: {
                    ...defaultProps.confirmPasswordField.label,
                    value: t('sign_up.confirm_password_label')
                },
                textInput: {
                    ...defaultProps.confirmPasswordField.textInput,
                    textValue: confirmPassword,
                    onTextChanged: handleConfirmPassword
                },
                errorMessage: {
                    ...defaultTextFieldProps.errorMessage,
                    value: t('sign_up.error_message.password_mismatch')
                },
                state: confirmPasswordError
            },
            signUpButton: {
                ...defaultProps.signUpButton,
                text: {
                    ...defaultProps.signUpButton.text,
                    value: t('sign_up.sign_up_button')
                },
                onButtonClicked: handleSignUp
            },
            bottomContent: {
                ...defaultProps.bottomContent,
                value: t('sign_up.bottom_content')
            },
            signInButton: {
                ...defaultProps.signInButton,
                text: {
                    ...defaultProps.signInButton.text,
                    value: t('sign_up.sign_in_button')
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
}

export default withPresenter;