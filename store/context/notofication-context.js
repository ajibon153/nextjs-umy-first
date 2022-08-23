import { createContext, useState } from 'react';

const NotificationContext = createContext({
  activeNotivication: null,
  showNotification: function (notificationData) {},
  hideNotification: function () {},
});

export function NotificationProvider(props) {
  const [activeNotivication, setActiveNotivication] = useState();

  function showNotificationHandler(notificationData) {
    setActiveNotivication(notificationData);
  }

  function hideNotificationHandler() {
    setActiveNotivication(null);
  }

  const context = {
    activeNotivication: activeNotivication,
    showNotification: showNotificationHandler,
    hideNotification: hideNotificationHandler,
  };

  return (
    <NotificationContext.Provider value={context}>
      {props.children}
    </NotificationContext.Provider>
  );
}

export default NotificationContext;
