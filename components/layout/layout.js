import { Fragment, useContext } from 'react';
import MainHeader from './main-header';
import Notification from '../notification/notification';
import NotificationContext from '../../store/context/notofication-context';

const Layout = (props) => {
  const { activeNotivication } = useContext(NotificationContext);

  return (
    <Fragment>
      <MainHeader />
      <main>{props.children}</main>
      {activeNotivication && (
        <Notification
          title={activeNotivication.title}
          message={activeNotivication.message}
          status={activeNotivication.status}
        />
      )}
    </Fragment>
  );
};

export default Layout;
