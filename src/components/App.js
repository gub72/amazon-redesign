import Header from "./Header";
import Footer from "./Footer";
import BackToTop from "./common/BackToTop";
import ProductPage from "./home/ProductPage";
import SearchPage from "./search/SearchPage";
import Home from "./home/Home";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Checkout from "./checkout/Checkout";
import Login from "./auth/Login";
import { useEffect } from "react";
import { auth } from "../config/firebase";
import Payment from "./payment/Payment";
import Orders from "./orders/Orders";
import SignUp from "./auth/SignUp";

import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

import { useDispatch, useSelector } from "react-redux";
import { clearOrders, clearProfile, setProfile, updateOrders } from "../redux/features/user/userSlice";
import getStorageKey from "../data/storageKey";

const promise = loadStripe(
  "pk_test_51LKikxJIr5sMtV8TVVCP3FSBVbFYb87a2Al30jAkasBgTDe61U02aRDd5ZJKT68wknB9Woa8ZNReOfSBs1Q3Ip6g00TdXWcbbN"
);

function App() {
  const dispatch = useDispatch();
  const { profile } = useSelector((state) => state.user);

  // Primeiro useEffect - corrigido
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        // The user logged in / was logged in
        const { uid, email, displayName } = authUser;
        dispatch(setProfile({ uid, email, displayName }));
      } else {
        // The user logged out
        dispatch(clearProfile());
        dispatch(clearOrders());
      }
    });

    // Cleanup subscription
    return () => unsubscribe();
  }, [dispatch]); // ✅ Adicionado dispatch como dependência

  // Segundo useEffect - já está correto
  useEffect(() => {
    const LOCAL_STORAGE_KEY = getStorageKey(profile?.uid);
    const currentProfileOrders = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
    if (profile && currentProfileOrders?.orders) {
      dispatch(updateOrders(currentProfileOrders.orders));
    }
  }, [profile, dispatch]); // ✅ Adicionado dispatch como dependência também

  return (
    <Router>
      <div className="App">
        <BackToTop />
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Header />
                <Home />
                <Footer />
              </>
            }
          />
          <Route
            path="/orders"
            element={
              <>
                <Header />
                <Orders />
                <Footer />
              </>
            }
          />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route
            path="/product/:id"
            element={
              <>
                <Header />
                <ProductPage />
                <Footer />
              </>
            }
          />
          <Route
            path="/search"
            element={
              <>
                <Header />
                <SearchPage />
                <Footer />
              </>
            }
          />
          <Route
            path="/checkout"
            element={
              <>
                <Header />
                <Checkout />
                <Footer />
              </>
            }
          />
          <Route
            path="/payment"
            element={
              <>
                <Header />
                <Elements stripe={promise}>
                  <Payment />
                </Elements>
                <Footer />
              </>
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;