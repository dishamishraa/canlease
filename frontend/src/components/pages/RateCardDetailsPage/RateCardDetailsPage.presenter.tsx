import React, { useEffect, useState } from 'react';
import { Rate } from '../../../modules/rateCard/types';
import RateCardDetailsPage, { RateCardDetailsPageProps, defaultProps } from './RateCardDetailsPage';

export type RateCardDetailsPagePresenterProps = RateCardDetailsPageProps & {
    rates: Rate[] | null;
    error?: Error;
    loading: boolean;
};

const withPresenter = (
    View: React.FC<RateCardDetailsPageProps>
) => {
    const Presenter: React.FC<RateCardDetailsPagePresenterProps> = (props) => {
        const rateCardDetailsPageProps: RateCardDetailsPageProps = {
            ...defaultProps,
            blockHeader: {
                ...defaultProps.blockHeader,
                text: {
                    ...defaultProps.blockHeader.text,
                    value: 'test'
                }
            }
        }
        return <View {...rateCardDetailsPageProps}/>;
    }
    return Presenter;
};
export default withPresenter;