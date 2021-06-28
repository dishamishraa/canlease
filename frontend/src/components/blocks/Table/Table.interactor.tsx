import React, { useContext } from 'react';
import { TableProps } from './Table';
import { TablePresenterProps } from './Table.presenter';

const withInteractor = (
  Presenter: React.FC<TablePresenterProps>,
): React.FC <TableProps> => {
  const Interactor: React.FC <TableProps> = (props) => <Presenter
    {...props}
    />;
  return Interactor;
};
export default withInteractor;
