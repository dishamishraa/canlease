import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useHistory, useLocation } from 'react-router-dom';
import { QuoteBlockProps, defaultProps } from './QuoteBlock';


export type QuoteBlockPresenterProps = {

};

const withPresenter = (
    View: React.FC<QuoteBlockProps>
): React.FC<QuoteBlockPresenterProps> => {
    const Presenter: React.FC<QuoteBlockPresenterProps> = ({}) => {
        return (
            <View/>
        )
    }

    return Presenter;
}

export default withPresenter;