import React from "react";
import AppRoutes from "./routes";
import NotificationContainer from "./shared/notificationContainer";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { configureStore } from "./redux/store";
import "react-notifications/lib/notifications.css";
const { store, persistor } = configureStore();
const App = () => (
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <AppRoutes />
      <NotificationContainer />
    </PersistGate>
  </Provider>
);
export default App;
