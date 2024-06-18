import 'firebase/compat/database';
import './src/global.css';
import ClientOnlyVisibleWrapper from './src/components/ClientOnlyVisibleWrapper';

export const wrapPageElement = ({ element }) => {
  return <ClientOnlyVisibleWrapper>{element}</ClientOnlyVisibleWrapper>;
};
