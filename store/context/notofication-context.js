import { createContext, useEffect, useState } from 'react';

const NotificationContext = createContext({
  activeNotivication: null,
  showNotification: function (notificationData) {},
  hideNotification: function () {},
});

export function NotificationProvider(props) {
  const [activeNotivication, setActiveNotivication] = useState();

  useEffect(() => {
    if (
      activeNotivication &&
      (activeNotivication.status === 'success' ||
        activeNotivication.status === 'error')
    ) {
      const timer = setTimeout(() => {
        hideNotificationHandler();
      }, 3000);

      return () => {
        clearTimeout(timer);
      };
    }
  }, [activeNotivication]);

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
