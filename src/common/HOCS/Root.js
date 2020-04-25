import React, { useEffect } from 'react'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import MainPage from './MainPage'
import { loadLanguages, multilanguage } from 'redux-multilanguage'
import { BreadcrumbsProvider } from 'react-breadcrumbs-dynamic'

const Root = (props) => {

  useEffect(() => {
    props.dispatch(
      loadLanguages({
        languages: {
          en: require("../../translations/english.json"),
          vn: require("../../translations/vietnamese.json"),
        }
      })
    );
  });

    const { store, persistor, history } = props
    return (
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <BreadcrumbsProvider>
            <MainPage
              store={store}
              history={history}
              persistor={persistor}
            />
          </BreadcrumbsProvider>
        </PersistGate>
      </Provider>
    )
  }

export default multilanguage(Root)
