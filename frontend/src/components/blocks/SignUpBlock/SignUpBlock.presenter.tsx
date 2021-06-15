import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router';
import { SignUpBlockProps, defaultProps } from './SignUpBlock';

export type SignUpBlockPresenterProps = SignUpBlockProps & {
};

const withPresenter = (
    View: React.FC<SignUpBlockProps>,
): React.FC<SignUpBlockPresenterProps> => {
    const Presenter: React.FC<SignUpBlockPresenterProps> = (props) => {
        const { t } = useTranslation();
        const history = useHistory();
        const [email, setEmail] = useState<string>('');
        const [password, setPassword] = useState<string>('');
        const [confirmPassword, setConfirmPassword] = useState<string>('');

        const handleEmail = ({ target: { value } }) => setEmail(value);
        const handlePassowrd = ({ target: { value } }) => setPassword(value);
        const handleConfirmPassword = ({ target: { value } }) => setConfirmPassword(value);

        const handleSignUp = () => {
            console.log('sign up')
            
            history.push({ pathname: '/account/verifyEmail' });
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
                }
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
                }
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