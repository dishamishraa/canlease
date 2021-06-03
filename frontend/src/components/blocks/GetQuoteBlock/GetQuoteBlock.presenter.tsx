import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useHistory, useLocation } from 'react-router-dom';
import { APIResponse } from '../../../lib/api/types';
import { User } from '../../../modules/types';
import { SelectItem } from '../../atoms/Select/Select';
import { TextInputProps } from '../../atoms/TextInput';
import { SimplePageProps } from '../../pages/SimplePage';
import { GetQuoteBlockProps, defaultProps } from './GetQuoteBlock';


export type GetQuoteBlockPropsPresenterProps = {
//   error?: Error;
//   loading: boolean;
//   user: User | null;
//   refetchUser: (() => void) | null;
//   submitSignUpSurvey: (payload: SignUpSurveyPayload) => Promise<APIResponse<boolean>>;
//   recordRegistrationEvent: () => void;
};

const withPresenter = (
  View: React.FC<GetQuoteBlockProps>,
): React.FC<GetQuoteBlockPropsPresenterProps> => {
  const Presenter: React.FC<GetQuoteBlockPropsPresenterProps> = ({
    // loading,
    // error,
    // user,
    // refetchUser,
    // submitSignUpSurvey,
    // recordRegistrationEvent
  }) => {
    const { t } = useTranslation();
    // const history = useHistory();

    const { search } = useLocation();
    const queryParams = new URLSearchParams(search);
    const target = queryParams.get('target') || '/';

    const [companyName, setEquipmentName] = useState<string>('');

    const handleClickNextStep = () => {

    };

    const handleSubmit = async () => { 
      
    };

    const handleEquipmentName: TextInputProps['onTextChanged'] = ({ target: { value } }) => setEquipmentName(value);

    const companyIndustryOptions: SelectItem[] = [
      {
        label: t('sign_up_survey.company_industry.options.consumer_retail'),
        value: 'Consumer/Retail',
      },
      {
        label: t('sign_up_survey.company_industry.options.manufacturing_distribution'),
        value: 'Manufacturing/Distribution ',
      },
    ];

    const blockProps: GetQuoteBlockProps = {
      ...defaultProps,
      blockHeading: {
        ...defaultProps.blockHeading,
        value: t('get_quote_block.header'),
      },
      nameTextField:{
        ...defaultProps.nameTextField,
        label:t('get_quote_block.name.label'),
        textInput: {
          textPlaceholder: t('get_quote_block.name.placeholder'),
          onTextChanged: handleEquipmentName,
        },
      },
      costTextField: {
        ...defaultProps.costTextField,
      },
      leaseTypeSelectField: {
        ...defaultProps.leaseTypeSelectField,
      },
      nextButton:{
        ...defaultProps.nextButton,
      }
    };

    return (
      <View
        // loading={loading}
        // error={error}
        // header={defaultProps.header} 
        {...blockProps}
      />
    );
  };

  return Presenter;
};

export default withPresenter;
