import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { defaultProps, DialogBlockProps } from './DialogBlock';
import { addLinksAndBreaks } from '../../../lib/reactUtils';
import EmailImage from '../../../resources/images/email_verification.png'
import { useHistory, useParams } from 'react-router';
import useResendVerifyAccount from '../../../modules/account/useResendVerifyAccount';

export type DialogBlockPresenterProps = DialogBlockProps & {
};

const withPresenter = (
    View: React.FC<DialogBlockProps>,
  ): React.FC<DialogBlockPresenterProps> => {
    const Presenter: React.FC<DialogBlockPresenterProps> = (props) => {
        const { t } = useTranslation();
        const history = useHistory();
        const { email } = useParams<{email: string}>();
        const [header, setHeader] = useState<string>(t('email_verification.header.default'));
        const [description, setDescription] = useState<string>(t('email_verification.description.default'));
        const handleResend = () => {
            setHeader(t('email_verification.header.resent'))
            setDescription(t('email_verification.description.resent'));
            // send the confirmation email
            if(email){
                useResendVerifyAccount(email)
            }
        }

        const handleDone = () => {
            history.push('/account/signin');
        }
        
        const dialogBlockProps: DialogBlockProps = {
            ...defaultProps,
            image: {
                image: EmailImage
            },
            blockHeading: {
                ...defaultProps.blockHeading,
                value: header
            },
            description: {
                ...defaultProps.description,
                value: description
            },
            questionText: {
                ...defaultProps.questionText,
                value: t('email_verification.question')
            },
            resolutionText: {
                ...defaultProps.resolutionText,
                value: addLinksAndBreaks(t('email_verification.resolution', {
                    resendLink: ''
                })) 
            },
            doneButton: {
                ...defaultProps.doneButton,
                text: {
                    ...defaultProps.doneButton.text,
                    value: t('button_text.done')
                },
                onButtonClicked: handleDone
            }
        }

        return <View
          {...dialogBlockProps}
          />;
    };
  return Presenter;
};

export default withPresenter