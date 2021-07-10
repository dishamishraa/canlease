import React from 'react';
import cx from 'classnames';

import styles from './Icon.module.scss';

import PlusAsset from '../../../resources/icons/Plus.svg';
import SettingsAsset from '../../../resources/icons/Settings.svg';
import CloseAsset from '../../../resources/icons/Close.svg';
import MoreHorizontalAsset from '../../../resources/icons/MoreHorizontal.svg';
import MoreVerticalAsset from '../../../resources/icons/MoreVertical.svg';
import ArrowLeftAsset from '../../../resources/icons/ArrowLeft.svg';
import ArrowRightAsset from '../../../resources/icons/ArrowRight.svg';
import ArrowUpAsset from '../../../resources/icons/ArrowUp.svg';
import ArrowDownAsset from '../../../resources/icons/ArrowDown.svg';
import ChevronUpAsset from '../../../resources/icons/ChevronUp.svg';
import ChevronDownAsset from '../../../resources/icons/ChevronDown.svg';
import ChevronLeftAsset from '../../../resources/icons/ChevronLeft.svg';
import ChevronRightAsset from '../../../resources/icons/ChevronRight.svg';
import AlertCircleAsset from '../../../resources/icons/AlertCircle.svg';
import AlertTriangleAsset from '../../../resources/icons/AlertTriangle.svg';
import QuestionMarkCircleAsset from '../../../resources/icons/QuestionMarkCircle.svg';
import TrashAsset from '../../../resources/icons/Trash.svg';
import PictureAsset from '../../../resources/icons/Picture.svg';
import FilmAsset from '../../../resources/icons/Film.svg';
import RadioButtonOnAsset from '../../../resources/icons/RadioButtonOn.svg';
import RadioButtonOffAsset from '../../../resources/icons/RadioButtonOff.svg';
import CheckboxUncheckedAsset from '../../../resources/icons/CheckboxUnchecked.svg';
import CheckboxCheckedAsset from '../../../resources/icons/CheckboxChecked.svg';
import HeartAsset from '../../../resources/icons/Heart.svg';
import HeartFilledAsset from '../../../resources/icons/HeartFilled.svg';
import OptionsAsset from '../../../resources/icons/Options.svg';
import CloseCircleFilledAsset from '../../../resources/icons/CloseCircleFilled.svg';
import CheckmarkCircleFilledAsset from '../../../resources/icons/CheckmarkCircleFilled.svg';
import CheckmarkCircleAsset from '../../../resources/icons/CheckmarkCircle.svg';
import MenuAsset from '../../../resources/icons/Menu.svg';
import ExternalLinkAsset from '../../../resources/icons/ExternalLink.svg';
import ShareAsset from '../../../resources/icons/Share.svg';
import Share2Asset from '../../../resources/icons/Share2.svg';
import ShowAsset from '../../../resources/icons/Show.svg';
import HideAsset from '../../../resources/icons/Hide.svg';
import DashboardAsset from '../../../resources/icons/Dashboard.svg';
import QuotesAsset from '../../../resources/icons/Quotes.svg';
import ApplicationsAsset from '../../../resources/icons/Applications.svg';
import RateCardsAsset from '../../../resources/icons/RateCards.svg';
import EmailIcon from '../../../resources/icons/Email.svg';
import CreateQuote from '../../../resources/icons/CreateQuote.svg';
import EditAsset from '../../../resources/icons/Edit.svg';

export type IconAssetType = 'Plus' | 'Settings' | 'Close' | 'MoreHorizontal' | 'MoreVertical' | 'ArrowLeft' | 'ArrowRight' | 'ArrowUp' | 'ArrowDown' | 'ChevronUp' | 'ChevronDown' | 'ChevronLeft' | 'ChevronRight' | 'AlertCircle' | 'AlertTriangle' | 'QuestionMarkCircle' | 'Trash' | 'Picture' | 'Film' | 'RadioButtonOn' | 'RadioButtonOff' | 'CheckboxUnchecked' | 'CheckboxChecked' | 'Heart' | 'HeartFilled' | 'Options' | 'CloseCircleFilled' | 'CheckmarkCircleFilled' | 'CheckmarkCircle' | 'Menu' | 'ExternalLink' | 'Share' | 'Share2' | 'Show' | 'Hide' | 'Dashboard' | 'Quotes' | 'Applications' | 'RateCards' | 'Edit' | 'EmailIcon' | 'CreateQuote';
export type IconStyleType = 'Basic800' | 'Brand500' | 'Basic100' | 'Basic400' | 'Red200';

export const defaultProps = {
  asset: 'Edit' as IconAssetType,
  style: 'Brand500' as IconStyleType,
};

export type IconProps = {
  asset?: IconAssetType;
  style?: IconStyleType;
  contentAlt?: string;
  className?: string;
  onIconClicked?: (event?: React.MouseEvent<HTMLImageElement>) => void;
};

const Icon: React.FC<IconProps> = ({
  asset,
  style,
  contentAlt,
  className,
  onIconClicked,
}) => {
  const currentStyle = styles[`icon${asset}${style}`];

  let content = '';
  switch (asset) {
    case 'Plus':
      content = PlusAsset;
      break;
    case 'Settings':
      content = SettingsAsset;
      break;
    case 'Close':
      content = CloseAsset;
      break;
    case 'MoreHorizontal':
      content = MoreHorizontalAsset;
      break;
    case 'MoreVertical':
      content = MoreVerticalAsset;
      break;
    case 'ArrowLeft':
      content = ArrowLeftAsset;
      break;
    case 'ArrowRight':
      content = ArrowRightAsset;
      break;
    case 'ArrowUp':
      content = ArrowUpAsset;
      break;
    case 'ArrowDown':
      content = ArrowDownAsset;
      break;
    case 'ChevronUp':
      content = ChevronUpAsset;
      break;
    case 'ChevronDown':
      content = ChevronDownAsset;
      break;
    case 'ChevronLeft':
      content = ChevronLeftAsset;
      break;
    case 'ChevronRight':
      content = ChevronRightAsset;
      break;
    case 'AlertCircle':
      content = AlertCircleAsset;
      break;
    case 'AlertTriangle':
      content = AlertTriangleAsset;
      break;
    case 'QuestionMarkCircle':
      content = QuestionMarkCircleAsset;
      break;
    case 'Trash':
      content = TrashAsset;
      break;
    case 'Picture':
      content = PictureAsset;
      break;
    case 'Film':
      content = FilmAsset;
      break;
    case 'RadioButtonOn':
      content = RadioButtonOnAsset;
      break;
    case 'RadioButtonOff':
      content = RadioButtonOffAsset;
      break;
    case 'CheckboxUnchecked':
      content = CheckboxUncheckedAsset;
      break;
    case 'CheckboxChecked':
      content = CheckboxCheckedAsset;
      break;
    case 'Heart':
      content = HeartAsset;
      break;
    case 'HeartFilled':
      content = HeartFilledAsset;
      break;
    case 'Options':
      content = OptionsAsset;
      break;
    case 'CloseCircleFilled':
      content = CloseCircleFilledAsset;
      break;
    case 'CheckmarkCircleFilled':
      content = CheckmarkCircleFilledAsset;
      break;
    case 'CheckmarkCircle':
      content = CheckmarkCircleAsset;
      break;
    case 'Menu':
      content = MenuAsset;
      break;
    case 'ExternalLink':
      content = ExternalLinkAsset;
      break;
    case 'Share':
      content = ShareAsset;
      break;
    case 'Share2':
      content = Share2Asset;
      break;
    case 'Show':
      content = ShowAsset;
      break;
    case 'Hide':
      content = HideAsset;
      break;
    case 'Dashboard':
      content = DashboardAsset;
      break;
    case 'Quotes':
      content = QuotesAsset;
      break;
    case 'Applications':
      content = ApplicationsAsset;
      break;
    case 'RateCards':
      content = RateCardsAsset;
      break;
    case 'EmailIcon':
      content = EmailIcon;
      break;
    case 'CreateQuote':
      content = CreateQuote;
    case 'Edit':
      content = EditAsset;
      break;
    default:
      break;
  }

  return (
    <div className={cx(currentStyle, className)}>
      <img
        className={styles.content}
        alt={contentAlt}
        src={content}
        onClick={onIconClicked} />
    </div>
  );
};

Icon.defaultProps = defaultProps;

export default Icon;
