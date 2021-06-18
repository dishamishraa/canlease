import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { defaultProps, DialogBlockProps } from './DialogBlock';
import { addLinksAndBreaks } from '../../../lib/reactUtils';
import EmailImage from '../../../resources/images/email_verification.png'

export type DialogBlockPresenterProps = DialogBlockProps & {

};

const withPresenter = (
    View: React.FC<DialogBlockProps>,
  ): React.FC<DialogBlockPresenterProps> => {
    const Presenter: React.FC<DialogBlockPresenterProps> = (props) => {
        const { t } = useTranslation();

        const handleResend = () => {
            console.log('resend')
        }
        const dialogBlockProps: DialogBlockProps = {
            ...defaultProps,
            image: {
                image: EmailImage
            },
            blockHeading: {
                ...defaultProps.blockHeading,
                value: t('email_verification.header.default')
            },
            description: {
                ...defaultProps.description,
                value: t('email_verification.description.default')
            },
            questionText: {
                ...defaultProps.questionText,
                value: t('email_verification.question')
            },
            resolutionText: {
                ...defaultProps.resolutionText,
                value: addLinksAndBreaks(t('email_verification.resolution', {
                    resendLink: "https://www.google.com/"
                })) 
            },
            doneButton: {
                ...defaultProps.doneButton,
                text: {
                    ...defaultProps.doneButton.text,
                    value: t('email_verification.done_button')
                }
            }
        }

        return <View
          {...dialogBlockProps}
          />;
    };
  return Presenter;
};

export default withPresenter