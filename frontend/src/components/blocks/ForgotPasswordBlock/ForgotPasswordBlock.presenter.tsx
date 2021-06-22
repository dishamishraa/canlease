import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useHistory, useLocation } from 'react-router';
import { ForgotPasswordBlockProps, defaultProps } from './ForgotPasswordBlock';
import { isEmptyString, isEmail } from '../../../lib/utils';
import { APIResponse } from '../../../lib/api/types';
import { defaultProps as defaultTextFieldProps, TextFieldStateType } from '../../molecules/TextField/TextField' 

export type ForgotPasswordBlockPresenterProps = ForgotPasswordBlockProps & {
};

const withPresenter = (
    View: React.FC<ForgotPasswordBlockProps>,
): React.FC<ForgotPasswordBlockPresenterProps> => {
    const Presenter: React.FC<ForgotPasswordBlockPresenterProps> = (props) => {
        const {
        } = props
        const { t } = useTranslation();
        const history = useHistory();
        const [email, setEmail] = useState<string>('');

        const handleEmail = ({ target: { value } }) => {
            setEmail(value);
        }

        const handleSignIn = () => {
            history.push('/account/signin');
        }

        const handleSendLink = () => {
            // call send reset link email api then push reset email message
            history.push('/account/resetSent')
        }

        const forgotPasswordBlockProps: ForgotPasswordBlockProps = {
            ...defaultProps,
            blockHeading: {
                ...defaultProps.blockHeading,
                value: t('forgot_password.header')
            },
            description: {
                ...defaultProps.description,
                value: t('forgot_password.description')
            },
            emailTextField: {
                ...defaultProps.emailTextField,
                label: {
                    ...defaultProps.emailTextField.label,
                    value: t('text_field_label.email')
                },
                textInput: {
                    textValue: email,
                    onTextChanged: handleEmail
                },
            },
            sendLinkButton: {
                ...defaultProps.sendLinkButton,
                text: {
                    ...defaultProps.sendLinkButton.text,
                    value: t('button_text.send_link')
                },
                onButtonClicked: handleSendLink
            },
            signInButton: {
                ...defaultProps.signInButton,
                text: {
                    ...defaultProps.signInButton.text,
                    value: t('button_text.sign_in')
                },
                onButtonClicked: handleSignIn
            }
        }

        return (
            <View 
            {...forgotPasswordBlockProps}
            />
        );
    };

    return Presenter;
};

export default withPresenter;