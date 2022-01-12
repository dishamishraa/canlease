/* eslint-disable default-case, @typescript-eslint/no-use-before-define */
import React, { useState } from 'react';
import { Trans, useTranslation } from 'react-i18next';
import { useHistory, useLocation } from 'react-router';
import { Link } from 'react-router-dom';
import { defaultProps, DialogBlockProps } from './DialogBlock';
import EmailImage from '../../../resources/images/email_verification.png';
import EmailCheckMark from '../../../resources/images/email_check_mark.png';
import DefaultImage from '../../../resources/images/Image.png';
import { APIResponse } from '../../../lib/api/types';
import { CreateApplicationState } from '../../../modules/types';

export type DialogBlockPresenterProps = DialogBlockProps & {
  resendVerifyAccount: (email: string) => Promise<APIResponse<void>>;
  forgotPassword: (email: string) => Promise<APIResponse<void>>;
};

type DialogBlockTextDisplay = {
  header: string;
  description: string;
  questionText: string;
  resolutionText: React.ReactNode;
  doneButton: string;
  url: string;
};

const withPresenter = (
  View: React.FC<DialogBlockProps>,
): React.FC<DialogBlockPresenterProps> => {
  const Presenter: React.FC<DialogBlockPresenterProps> = (props) => {
    const {
      email,
      contentType,
      resendVerifyAccount,
      forgotPassword,
    } = props;
    const { t } = useTranslation();
    const history = useHistory();
    const { state: locationState } = useLocation<CreateApplicationState | undefined>();
    const { fromTab } = locationState || {};
    let imageDisplay = DefaultImage;

    const defaultDisplay: DialogBlockTextDisplay = {
      header: '',
      description: '',
      questionText: t('email_verification.question'),
      resolutionText: (
        <Trans i18nKey="email_verification.resolution" t={t}>
          Check your spam folder or
          <Link to={history.location} onClick={() => handleResend()}>
            click here
          </Link>
          to resend the verification link.
        </Trans>
      ),
      doneButton: t('button_text.done'),
      url: '/account/signin',
    };

    switch (contentType) {
      case 'VerifyEmail':
        imageDisplay = EmailImage;
        defaultDisplay.header = t('email_verification.header.default');
        defaultDisplay.description = t('email_verification.description.default');
        break;
      case 'ResetLink':
        imageDisplay = EmailCheckMark;
        defaultDisplay.header = t('email_verification.header.reset');
        defaultDisplay.description = t('email_verification.description.reset');
        break;
      case 'ApplicationSubmitted':
        defaultDisplay.header = t('application_form.application_submitted.header');
        defaultDisplay.description = t('application_form.application_submitted.description');
        defaultDisplay.questionText = '';
        defaultDisplay.resolutionText = '';
        if (fromTab === 'Customer') {
          defaultDisplay.url = '/portal/applications/customer';
        } else {
          defaultDisplay.url = '/portal/applications';
        }
        break;
    }

    const [display, setDisplay] = useState<DialogBlockTextDisplay>(defaultDisplay);

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
            break;
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
        image: imageDisplay,
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

    return <View {...props} {...dialogBlockProps} />;
  };

  return Presenter;
};

export default withPresenter;
