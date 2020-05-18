import React, { useEffect } from "react";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import MainPage from "./MainPage";
import { loadLanguages, multilanguage } from "redux-multilanguage";
import { BreadcrumbsProvider } from "react-breadcrumbs-dynamic";
import { ConfigProvider } from "antd";
import vi_VN from 'antd/es/locale/vi_VN';

const Root = (props) => {
  useEffect(() => {
    props.dispatch(
      loadLanguages({
        languages: {
          en: require("../../translations/english.json"),
          vn: require("../../translations/vietnamese.json"),
        },
      })
    );
  });

  const { store, persistor, history } = props;
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <ConfigProvider locale={vi_VN}>
          <BreadcrumbsProvider>
            <MainPage store={store} history={history} persistor={persistor} />
          </BreadcrumbsProvider>
        </ConfigProvider>
      </PersistGate>
    </Provider>
  );
};

export default multilanguage(Root);
