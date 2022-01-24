/* eslint-disable no-shadow */
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { RateCardTableItemListProps } from '../../organisms/RateCardTableItemList';
import { RateCardDetailsPageProps, defaultProps } from './RateCardDetailsPage';
import {
  defaultProps as defaultRateCardTableProps,
  RateCardTableProps,
} from '../../blocks/RateCardTable/RateCardTable';
import {
  RateCardTableItemProps,
  defaultProps as defaultRteCardTableItemProps,
} from '../../molecules/RateCardTableItem/RateCardTableItem';
import {
  NewRateModalProps,
  defaultProps as newRateModalDefaultProps,
} from '../../organisms/NewRateModal/NewRateModal';

import { isEmpty } from '../../../lib/utils';
import { defaultProps as defaultTextFieldProps } from '../../molecules/TextField/TextField';
import { defaultProps as defaultConfirmationModalProps } from '../../organisms/ConfirmationModal/ConfirmationModal';
import { defaultProps as defaultRateCardModalProps } from '../../organisms/NewRateCardModal/NewRateCardModal';

import { APIResponse } from '../../../lib/api/types';
import {
  CreateRate,
  Rate,
  RateCard,
  UpdateRate,
  UpdateRateCard,
} from '../../../modules/rateCard/types';

export type RateCardDetailsPagePresenterProps = RateCardDetailsPageProps & {
  rates: Rate[] | null;
  error?: Error;
  loading: boolean;
  rateCard?: RateCard | null;
  createRate?: (payload: CreateRate) => Promise<APIResponse<Rate>>;
  updateRate?: (payload: UpdateRate) => Promise<void>;
  refetchRates: () => void;
  rateCardName?: string;
  deleteRate: (rateId: number) => Promise<APIResponse<void>>;
  updateRateCard: (payload: UpdateRateCard) => Promise<void>;
  refetchRateCard: () => void;
  rateCardId?: number;
};

type FormState = {
  termError: string,
  minMonthlyReturnError: string,
  maxMonthlyReturnError: string,
  interestRateError: string,
  tenAtEndIRError: string
};

const withPresenter = (
  View: React.FC<RateCardDetailsPageProps>,
) => {
  const Presenter: React.FC<RateCardDetailsPagePresenterProps> = (props) => {
    const {
      rateCardName,
      rateCard,
      rates,
      createRate,
      updateRate,
      refetchRates,
      deleteRate,
      className,
    } = props;

    const { t } = useTranslation();
    const [showRateModal, setShowRateModal] = useState(false);
    const [term, setTerm] = useState<number | null>();
    const [currRate, setCurrRate] = useState<Rate | null>();
    const [minMonthlyReturn, setMinMonthlyReturn] = useState<number | null>();
    const [maxMonthlyReturn, setMaxMonthlyReturn] = useState<number | null>();
    const [interestRate, setInterestRate] = useState<number | null>();
    const [tenAtEndIR, setTenAtEndIR] = useState<number | null>();
    const [formState, setFormState] = useState<FormState>();

    const [deleteModalOpen, setDeleteModalOpen] = useState(false);
    const [deleteRateId, setDeleteRateId] = useState<number>();
    const [rateCardModalOpen, setRateCardModalOpen] = useState(false);
    const [newRateCardName, setNewRateCardName] = useState(rateCardName);

    let currFormState: FormState = {
      termError: "",
      minMonthlyReturnError: "",
      maxMonthlyReturnError: "",
      interestRateError: "",
      tenAtEndIRError: ""
    };


    const handleChangeTerm = ({ target: { value } }) => {
      setTerm(value);
    };

    const handleChangeMin = ({ target: { value } }) => {
      setMinMonthlyReturn(value);
    };

    const handleChangeMax = ({ target: { value } }) => {
      setMaxMonthlyReturn(value);
    };

    const handleChangeInterestRate = ({ target: { value } }) => {
      setInterestRate(value);
    };

    const handleChangeTenAtEndIR = ({ target: { value } }) => {
      setTenAtEndIR(value);
    };

    const onCloseRateModal = () => {
      setShowRateModal(false);
      setTerm(null);
      setMinMonthlyReturn(null);
      setMaxMonthlyReturn(null);
      setInterestRate(null);
      setTenAtEndIR(null);
      setCurrRate(null);
      setFormState(undefined);
    };

    const handleOpenAddRateModal = () => {
      setCurrRate(null);
      setShowRateModal(true);
    };

    const handleOpenEditRateModal = (rate: Rate) => () => {
      const {
        tenatendir, term, minmonthlyreturn, maxmonthlyreturn, regularir,
      } = rate;
      setTerm(term);
      setMinMonthlyReturn(minmonthlyreturn);
      setMaxMonthlyReturn(maxmonthlyreturn);
      setInterestRate(regularir);
      setTenAtEndIR(tenatendir);
      setCurrRate(rate);
      setShowRateModal(true);
    };

    const isTermValid = (term: number): boolean => {
      return (term > 0 && term <= 60 && term % 12 === 0);
    }

    const isMonthlyReturnValid = (monthlyReturn: number): boolean => {
      return (monthlyReturn > 0);
    }

    const isInterestRateValid = (interestRate: number): boolean => {
      return (interestRate >= 0 && interestRate <= 100);
    }

    const isFormValid = !isEmpty(term) && !isEmpty(minMonthlyReturn)
      && !isEmpty(maxMonthlyReturn) && !isEmpty(interestRate)
      && !isEmpty(tenAtEndIR);

    const handleSaveRate = async () => {
      if (term && minMonthlyReturn && maxMonthlyReturn
        && interestRate && tenAtEndIR && rateCard && refetchRates) {

        let allFieldsAreValid: boolean = true;
        if (!isTermValid(term)) {
          allFieldsAreValid = false;
          currFormState.termError = t('new_rate_modal.error_message');
        }
        if (!isMonthlyReturnValid(minMonthlyReturn)) {
          allFieldsAreValid = false;
          currFormState.minMonthlyReturnError = t('new_rate_modal.error_message');
        }
        if (!isMonthlyReturnValid(maxMonthlyReturn)) {
          allFieldsAreValid = false;
          currFormState.maxMonthlyReturnError = t('new_rate_modal.error_message');
        }
        if (!isInterestRateValid(interestRate)) {
          allFieldsAreValid = false;
          currFormState.interestRateError = t('new_rate_modal.error_message');
        }
        if (!isInterestRateValid(tenAtEndIR)) {
          allFieldsAreValid = false;
          currFormState.tenAtEndIRError = t('new_rate_modal.error_message');
        }

        if (allFieldsAreValid) {
          if (!currRate && createRate) {
            await createRate({
              term,
              minmonthlyreturn: minMonthlyReturn,
              maxmonthlyreturn: maxMonthlyReturn,
              regularir: interestRate,
              tenatendir: tenAtEndIR,
              ratecardid: rateCard?.id,
            });
          } else if (currRate && updateRate) {
            await updateRate({
              rateId: currRate.id,
              term,
              minmonthlyreturn: minMonthlyReturn,
              maxmonthlyreturn: maxMonthlyReturn,
              regularir: interestRate,
              tenatendir: tenAtEndIR,
              ratecardid: rateCard?.id,
            });
          }
          onCloseRateModal();
          refetchRates();
        } else {
          setFormState(currFormState);
        }
      }
    };

    const handleDeleteRate = async (): Promise<void> => {
      if (deleteRateId) {
        await deleteRate(deleteRateId);
      }
      setDeleteModalOpen(false);
      refetchRates();
      setDeleteRateId(undefined);
    };

    const handleCloseDeleteModal = (): void => {
      setDeleteModalOpen(false);
    };
    const handleOpenDeleteModal = (id: number) => () => {
      setDeleteRateId(id);
      setDeleteModalOpen(true);
    };

    const handleCloseRateCardModal = (): void => {
      setRateCardModalOpen(false);
      setNewRateCardName('');
    };

    const newRateModal: NewRateModalProps = {
      ...newRateModalDefaultProps,
      icon: {
        ...newRateModalDefaultProps.icon,
        onIconClicked: onCloseRateModal,
      },
      title: {
        ...newRateModalDefaultProps.title,
        value: t('new_rate_modal.title'),
      },
      textFieldList: {
        ...newRateModalDefaultProps.textFieldList,
        textFields: [
          {
            ...defaultTextFieldProps,
            errorMessage: {
              ...defaultTextFieldProps.errorMessage,
              value: formState?.termError
            },
            label: {
              ...defaultTextFieldProps.label,
              value: t('new_rate_modal.term'),
            },
            textInput: {
              inputType: 'number',
              textValue: term ? `${term}` : undefined,
              onTextChanged: handleChangeTerm,
            },
          },
          {
            ...defaultTextFieldProps,
            errorMessage: {
              ...defaultTextFieldProps.errorMessage,
              value: formState?.minMonthlyReturnError
            },
            label: {
              ...defaultTextFieldProps.label,
              value: t('new_rate_modal.min'),
            },
            textInput: {
              ...defaultTextFieldProps.textInput,
              inputType: 'number',
              textValue: minMonthlyReturn ? `${minMonthlyReturn}` : undefined,
              onTextChanged: handleChangeMin,
            },
          },
          {
            ...defaultTextFieldProps,
            errorMessage: {
              ...defaultTextFieldProps.errorMessage,
              value: formState?.maxMonthlyReturnError
            },
            label: {
              ...defaultTextFieldProps.label,
              value: t('new_rate_modal.max'),
            },
            textInput: {
              ...defaultTextFieldProps.textInput,
              inputType: 'number',
              textValue: maxMonthlyReturn ? `${maxMonthlyReturn}` : undefined,
              onTextChanged: handleChangeMax,
            },
          },
          {
            ...defaultTextFieldProps,
            errorMessage: {
              ...defaultTextFieldProps.errorMessage,
              value: formState?.interestRateError
            },
            label: {
              ...defaultTextFieldProps.label,
              value: t('new_rate_modal.interest_rate'),
            },
            textInput: {
              ...defaultTextFieldProps.textInput,
              inputType: 'number',
              textValue: interestRate ? `${interestRate}` : undefined,
              onTextChanged: handleChangeInterestRate,
            },
          },
          {
            ...defaultTextFieldProps,
            errorMessage: {
              ...defaultTextFieldProps.errorMessage,
              value: formState?.tenAtEndIRError
            },
            label: {
              ...defaultTextFieldProps.label,
              value: t('new_rate_modal.ten'),
            },
            textInput: {
              ...defaultTextFieldProps.textInput,
              inputType: 'number',
              textValue: tenAtEndIR ? `${tenAtEndIR}` : undefined,
              onTextChanged: handleChangeTenAtEndIR,
            },
          },
        ],
      },
      primary: {
        ...newRateModalDefaultProps.primary,
        text: {
          ...newRateModalDefaultProps.primary.text,
          value: t('new_rate_modal.primary'),
        },
        disabled: !isFormValid,
        onButtonClicked: handleSaveRate,
      },
      secondary: {
        ...newRateModalDefaultProps.secondary,
        text: {
          ...newRateModalDefaultProps.secondary.text,
          value: t('new_rate_modal.secondary'),
        },
        onButtonClicked: onCloseRateModal,
      },
    };

    const blockHeader = {
      ...defaultProps.blockHeader,
      text: {
        ...defaultProps.blockHeader.text,
        value: rateCard?.cardtype,
      },
    };

    const rateCardTableHeader = {
      ...defaultRateCardTableProps.rateCardTableHeader,
      term: {
        ...defaultRateCardTableProps.rateCardTableHeader.term,
        value: t('rate_card_table.headers.term'),
      },
      minMonthlyReturn: {
        ...defaultRateCardTableProps.rateCardTableHeader.minMonthlyReturn,
        value: t('rate_card_table.headers.min_monthly_return'),
      },
      maxMonthlyReturn: {
        ...defaultRateCardTableProps.rateCardTableHeader.maxMonthlyReturn,
        value: t('rate_card_table.headers.max_monthly_return'),
      },
      interestRate: {
        ...defaultRateCardTableProps.rateCardTableHeader.interestRate,
        value: t('rate_card_table.headers.interest_rate'),
      },
      tenAtEndOfInterestRate: {
        ...defaultRateCardTableProps.rateCardTableHeader.interestRate,
        value: t('rate_card_table.headers.ten_end_interest_rate'),
      },
      action: {
        ...defaultRateCardTableProps.rateCardTableHeader.action,
        value: t('rate_card_table.headers.action'),
      },
    };

    const rateCardTableItems: RateCardTableItemProps[] = [];

    const sortedRates = rates?.sort((a, b) => (a.id > b.id ? 1 : -1));
    sortedRates?.forEach((rate) => {
      const {
        term, minmonthlyreturn, maxmonthlyreturn, regularir, tenatendir, id,
      } = rate;
      const rateCardTableItem: RateCardTableItemProps = {
        ...defaultRteCardTableItemProps,
        type: 'Default',
        term: {
          ...defaultRteCardTableItemProps.term,
          value: term,
        },
        minMonthlyReturn: {
          ...defaultRteCardTableItemProps.minMonthlyReturn,
          value: minmonthlyreturn,
        },
        maxMonthlyReturn: {
          ...defaultRteCardTableItemProps.maxMonthlyReturn,
          value: maxmonthlyreturn,
        },
        interestRate: {
          ...defaultRteCardTableItemProps.interestRate,
          value: regularir,
        },
        tenAtEndOfInterestRate: {
          ...defaultRteCardTableItemProps.tenAtEndOfInterestRate,
          value: tenatendir,
        },
        editButton: {
          ...defaultRteCardTableItemProps.editButton,
          onButtonClicked: handleOpenEditRateModal(rate),
        },
        deleteButton: {
          ...defaultRteCardTableItemProps.deleteButton,
          onButtonClicked: handleOpenDeleteModal(id),
        },
        id: `${id}`,
      };
      rateCardTableItems.push(rateCardTableItem);
    });

    const rateCardTableItemList = {
      ...defaultRateCardTableProps.rateCardTableItemList,
      rateCardTableItems: [
        ...rateCardTableItems,
        {
          type: 'Empty',
          button: {
            ...defaultRteCardTableItemProps.button,
            text: {
              ...defaultRteCardTableItemProps.button.text,
              value: t('rate_card_table.addButton'),
            },
            onButtonClicked: handleOpenAddRateModal,
          },
          id: 'add_rate',
        },
      ],
    } as RateCardTableItemListProps;

    const rateCardTable = {
      ...defaultRateCardTableProps,
      rateCardTableHeader,
      rateCardTableItemList,
    } as RateCardTableProps;

    const confirmationModal = {
      ...defaultConfirmationModalProps,
      icon: {
        ...defaultConfirmationModalProps.icon,
        onIconClicked: handleCloseDeleteModal,
      },
      title: {
        ...defaultConfirmationModalProps.title,
        value: t('delete_rate_entry.heading'),
      },
      body: {
        ...defaultConfirmationModalProps.body,
        value: t('delete_rate_entry.body'),
      },
      primary: {
        ...defaultConfirmationModalProps.primary,
        text: {
          ...defaultConfirmationModalProps.primary.text,
          value: t('delete_rate_entry.delete_button'),
        },
        onButtonClicked: handleDeleteRate,
      },
      secondary: {
        ...defaultConfirmationModalProps.secondary,
        text: {
          ...defaultConfirmationModalProps.secondary.text,
          value: t('delete_rate_entry.cancel_button'),
        },
        onButtonClicked: handleCloseDeleteModal,
      },
    };

    const rateCardModal = {
      ...defaultRateCardModalProps,
      icon: {
        ...defaultRateCardModalProps.icon,
        onIconClicked: handleCloseRateCardModal,
      },
      title: {
        ...defaultRateCardModalProps.title,
        value: t('add_rate_card.heading'),
      },
      secondary: {
        ...defaultRateCardModalProps.secondary,
        text: {
          ...defaultRateCardModalProps.secondary.text,
          value: t('add_rate_card.cancel_button'),
        },
        onButtonClicked: handleCloseRateCardModal,
      },
    };

    const rateCardDetailsPageProps: RateCardDetailsPageProps = {
      ...defaultProps,
      blockHeader,
      rateCardTable,
      confirmationModal,
      rateCardModal
    };

    return (
      <View
        {...rateCardDetailsPageProps}
        newRateModal={newRateModal}
        showRateModal={showRateModal}
        deleteModalOpen={deleteModalOpen}
        className={className}
        rateCardModalOpen={rateCardModalOpen}
      />
    );
  };

  return Presenter;
};

export default withPresenter;
