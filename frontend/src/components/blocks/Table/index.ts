import TableView, { TableProps } from './Table';
import withPresenter from './Table.presenter';
import withInteractor from './Table.interactor';

const Table = withInteractor(withPresenter(TableView));

export type { TableProps };
export default Table;
