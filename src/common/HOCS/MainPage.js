import React, { useState, useEffect, useCallback, Suspense } from "react";
import { connect } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import Routes from "../routes";
import PageLoading from "../components/widgets/PageLoading";
import ProgressLoading from "../components/widgets/ProgressLoading";
import Loading from "../components/widgets/Loading";
import userHandler from "../../modules/LoginAndRegister/handlers";

import "react-chat-widget/lib/styles.css";
import ChatBox from "../components/widgets/ChatBox/ChatBox";
import LoadingBar from "react-redux-loading-bar";
import cartHandlers from "../../modules/Shop/Cart/handlers";
import wishListHandlers from "../../modules/Shop/WishList/handlers";
import ScrollToTop from "../components/widgets/ScrollToTop";
import { ModalContextProvider } from "../context/ModalContext";
import { LoadingContextProvider } from "../context/LoadingContext";

const MainPage = (props) => {
  const [loading, setLoading] = useState(false);

  const { user, getUser, store, getAllCartDetails, getAllWishList } = props;

  

  const getUserCart = useCallback(async () => {
    if (user && user.id && user.customer) {
      await getAllCartDetails();
      await getAllWishList();
    }
  }, [user, getAllCartDetails, getAllWishList]);

  useEffect(() => {
    getUserCart();
  }, [getUserCart]);

  useEffect(() => {
    const checkUser = async (user) => {
      if (user && user.id) {
        try {
          const result = await getUser(user.id);
          if(result.status === 3 )
          {
            window.location.reload()
          }
          setLoading(false);
        } catch (err) {}
      }
    }
    checkUser(user)
  }, [user, getUser]);

  if (loading) {
    return <Loading />;
  }
  return (
    <>
      <LoadingContextProvider>
        <ModalContextProvider>
          <LoadingBar className="loading-progress-bar" />
          <BrowserRouter>
            <ScrollToTop />
            <Suspense
              fallback={
                <div className="flone-preloader-wrapper">
                  <div className="flone-preloader">
                    <span></span>
                    <span></span>
                  </div>
                </div>
              }
            >
              <Routes store={store} />
            </Suspense>
          </BrowserRouter>
          <ChatBox user={user || null} />
          <ProgressLoading.Component />
          <PageLoading.Component type="bars" />
        </ModalContextProvider>
      </LoadingContextProvider>
    </>
  );
};

export default connect(
  (state) => {
    return {
      user: state.user ? state.user.user : {},
    };
  },
  (dispatch, props) => ({
    dispatch,
    ...cartHandlers(dispatch, props),
    ...wishListHandlers(dispatch, props),
    ...userHandler(dispatch, props),
  })
)(MainPage);
