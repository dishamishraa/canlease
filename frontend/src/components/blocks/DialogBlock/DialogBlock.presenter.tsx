import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useHistory, useLocation, useParams } from 'react-router';
import { defaultProps, DialogBlockProps } from './DialogBlock';
import EmailImage from '../../../resources/images/email_verification.png';
import { APIResponse } from '../../../lib/api/types';
import { forgotPassword, resendVerifyAccount } from '../../../modules/account/api';

export type DialogBlockPresenterProps = DialogBlockProps & {
  resendVerifyAccount: (email: string) => Promise<APIResponse<void>>;
  forgotPassword: (email: string) => Promise<APIResponse<void>>;
};

interface DialogBlockContentType {
  email?: string;
  contentType: string;
}

const withPresenter = (
  View: React.FC<DialogBlockProps>,
): React.FC<DialogBlockPresenterProps> => {
  const Presenter: React.FC<DialogBlockPresenterProps> = (props) => {
    const { t } = useTranslation();
    const history = useHistory();
    const location = useLocation();
    const state = location.state as DialogBlockContentType;
    const { contentType, email } = state;
    const [header, setHeader] = useState<string>('');
    const [description, setDescription] = useState<string>('');
    const [questionText, setQuestionText] = useState<string>('');
    const [resolutionText, setResolutionText] = useState<string>('');
    const [doneButton, setDoneButton] = useState<{text: string; link: string}>({ text: '', link: '/' });

    // set states base on content type
    useEffect(() => {
      if (state) {
        switch (contentType) {
          case 'VerifyEmail':
            setHeader(t('email_verification.header.default'));
            setDescription(t('email_verification.description.default'));
            setQuestionText(t('email_verification.question'));
            setResolutionText(t('email_verification.resolution'));
            setDoneButton({ text: t('button_text.done'), link: '/account/signin' });
            break;
          case 'ResetLink':
            setHeader(t('email_verification.header.reset'));
            setDescription(t('email_verification.description.reset'));
            setQuestionText(t('email_verification.question'));
            setResolutionText(t('email_verification.resolution'));
            setDoneButton({ text: t('button_text.done'), link: '/account/signin' });
            break;
          default:
            break;
        }
      }
    }, [contentType, state, t]);

    const handleResend = async () => {
      if (email) {
        setHeader(t('email_verification.header.resent'));
        setDescription(t('email_verification.description.resent'));
        switch (contentType) {
          case 'VerifyEmail':
            resendVerifyAccount(email);
            break;
          case 'ResetLink':
            forgotPassword(email);
          default:
            break;
        }
      }
    };

    const handleDone = () => {
      history.push(doneButton.link);
    };

    const dialogBlockProps: DialogBlockProps = {
      ...defaultProps,
      image: {
        image: EmailImage,
      },
      blockHeading: {
        ...defaultProps.blockHeading,
        value: header,
      },
      description: {
        ...defaultProps.description,
        value: description,
      },
      questionText: {
        ...defaultProps.questionText,
        value: questionText,
      },
      resolutionText: {
        ...defaultProps.resolutionText,
        value: resolutionText,
      },
      doneButton: {
        ...defaultProps.doneButton,
        text: {
          ...defaultProps.doneButton.text,
          value: doneButton.text,
        },
        onButtonClicked: handleDone,
      },
    };

    return <View
          {...dialogBlockProps}
          />;
  };
  return Presenter;
};

export default withPresenter;
