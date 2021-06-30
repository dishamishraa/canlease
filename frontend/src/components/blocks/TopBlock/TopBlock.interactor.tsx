import React, { useContext } from 'react';
import { TopBlockProps } from './TopBlock';
import { TopBlockPresenterProps } from './TopBlock.presenter';
import useGetProfile from '../../../modules/profile/useGetProfile';
import { useParams } from 'react-router';

const withInteractor = (
  Presenter: React.FC<TopBlockPresenterProps>,
): React.FC <TopBlockProps> => {
  const Interactor: React.FC <TopBlockProps> = (props) => {
    const { portalId } = useParams<{portalId: string}>();
    const { data: profile } = useGetProfile(portalId);
  return<Presenter
    {...props}
    profile={profile}
    />;
  }
  return Interactor;
};
export default withInteractor;
