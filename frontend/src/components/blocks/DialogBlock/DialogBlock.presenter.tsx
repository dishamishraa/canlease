import React, { useEffect, useState } from 'react';
import { Trans, useTranslation } from 'react-i18next';
import { useHistory, useLocation, useParams } from 'react-router';
import { defaultProps, DialogBlockProps } from './DialogBlock';
import EmailImage from '../../../resources/images/email_verification.png';
import { APIResponse } from '../../../lib/api/types';
import { Link } from 'react-router-dom';

export type DialogBlockPresenterProps = DialogBlockProps & {
  resendVerifyAccount: (email: string) => Promise<APIResponse<void>>;
  forgotPassword: (email: string) => Promise<APIResponse<void>>;
};

interface DialogBlockContentType {
  email?: string;
  contentType: 'VerifyEmail' | 'ResetLink';
}

type DialogBlockTextDisplay = {
  header: string,
  description: string,
  questionText: string,
  resolutionText: React.ReactNode,
  doneButton: string,
  url: string
}

const withPresenter = (
  View: React.FC<DialogBlockProps>,
): React.FC<DialogBlockPresenterProps> => {
  const Presenter: React.FC<DialogBlockPresenterProps> = (props) => {
    const {
      resendVerifyAccount,
      forgotPassword
    } = props
    const { t } = useTranslation();
    const history = useHistory();
    const location = useLocation();
    const state = location.state as DialogBlockContentType;
    const { contentType, email } = state || {};
    const [display, setDisplay] = useState<DialogBlockTextDisplay>({
      header: '',
      description: '',
      questionText: t('email_verification.question'),
      resolutionText: <Trans i18nKey="email_verification.resolution" t={t}>Check your spam folder or click <Link to={history.location} onClick={() => handleResend()}>here</Link> to resend the verification link.</Trans>,
      doneButton: t('button_text.done'),
      url: '/account/signin'
    });

    // set states base on content type
    useEffect(() => {
      if (state) {
        switch (contentType) {
          case 'VerifyEmail':
            setDisplay({
              ...display,
              header: t('email_verification.header.default'),
              description: t('email_verification.description.default'),
            });
            break;
          case 'ResetLink':
            setDisplay({
              ...display,
              header: t('email_verification.header.reset'),
              description: t('email_verification.description.reset'),
            });
            break;
          default:
            break;
        }
      }
    }, [contentType, state, t]);

    const handleResend = async () => {
      if (email) {
        setDisplay({
          ...display,
          header: t('email_verification.header.reset'),
          description: t('email_verification.description.resent'),
        });
        switch (contentType) {
          case 'VerifyEmail':
            await resendVerifyAccount(email);
            break;
          case 'ResetLink':
            await forgotPassword(email);
          default:
            break;
        }
      }
    };

    const handleDone = () => {
      history.push(display.url);
    };

    const dialogBlockProps: DialogBlockProps = {
      ...defaultProps,
      image: {
        image: EmailImage,
      },
      blockHeading: {
        ...defaultProps.blockHeading,
        value: display.header,
      },
      description: {
        ...defaultProps.description,
        value: display.description,
      },
      questionText: {
        ...defaultProps.questionText,
        value: display.questionText,
      },
      resolutionText: {
        ...defaultProps.resolutionText,
        value: display.resolutionText,
      },
      doneButton: {
        ...defaultProps.doneButton,
        text: {
          ...defaultProps.doneButton.text,
          value: display.doneButton,
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
