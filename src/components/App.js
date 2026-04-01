import React, { Suspense, useEffect, lazy } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AnimatePresence, motion } from "motion/react";
import { Toaster } from "react-hot-toast";

import Header from "./Header";
import Footer from "./Footer";
import BackToTop from "./common/BackToTop";
import RouteAnnouncer from "./common/RouteAnnouncer";
import ScrollToTop from "./common/ScrollToTop";
import { ProductPageSkeleton } from "./common/Skeletons";

import { auth } from "../config/firebase";
import {
  clearOrders,
  clearProfile,
  setProfile,
  updateOrders,
} from "../redux/features/user/userSlice";
import getStorageKey from "../data/storageKey";

import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

import useDarkMode from "../hooks/useDarkMode";

/* ── Lazy-loaded pages ── */
const Home = lazy(() => import("./home/Home"));
const ProductPage = lazy(() => import("./home/ProductPage"));
const SearchPage = lazy(() => import("./search/SearchPage"));
const Checkout = lazy(() => import("./checkout/Checkout"));
const Payment = lazy(() => import("./payment/Payment"));
const Orders = lazy(() => import("./orders/Orders"));
const Login = lazy(() => import("./auth/Login"));
const SignUp = lazy(() => import("./auth/SignUp"));

const promise = loadStripe(
  "pk_test_51LKikxJIr5sMtV8TVVCP3FSBVbFYb87a2Al30jAkasBgTDe61U02aRDd5ZJKT68wknB9Woa8ZNReOfSBs1Q3Ip6g00TdXWcbbN"
);

/* ── Animated page wrapper ── */
const PageTransition = ({ children }) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    transition={{ duration: 0.25 }}
  >
    {children}
  </motion.div>
);

/* ── Page loading fallback ── */
const PageFallback = () => (
  <div
    style={{
      minHeight: "60vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    }}
    role="status"
    aria-label="Carregando página"
  >
    <ProductPageSkeleton />
  </div>
);

/* ── Animated Routes Wrapper ── */
function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route
          path="/"
          element={
            <PageTransition>
              <Header />
              <main id="main-content"><Home /></main>
              <Footer />
            </PageTransition>
          }
        />
        <Route
          path="/orders"
          element={
            <PageTransition>
              <Header />
              <main id="main-content"><Orders /></main>
              <Footer />
            </PageTransition>
          }
        />
        <Route path="/login" element={<PageTransition><Login /></PageTransition>} />
        <Route path="/signup" element={<PageTransition><SignUp /></PageTransition>} />
        <Route
          path="/product/:id"
          element={
            <PageTransition>
              <Header />
              <main id="main-content"><ProductPage /></main>
              <Footer />
            </PageTransition>
          }
        />
        <Route
          path="/search"
          element={
            <PageTransition>
              <Header />
              <main id="main-content"><SearchPage /></main>
              <Footer />
            </PageTransition>
          }
        />
        <Route
          path="/checkout"
          element={
            <PageTransition>
              <Header />
              <main id="main-content"><Checkout /></main>
              <Footer />
            </PageTransition>
          }
        />
        <Route
          path="/payment"
          element={
            <PageTransition>
              <Header />
              <main id="main-content">
                <Elements stripe={promise}><Payment /></Elements>
              </main>
              <Footer />
            </PageTransition>
          }
        />
      </Routes>
    </AnimatePresence>
  );
}

function App() {
  const dispatch = useDispatch();
  const { profile } = useSelector((state) => state.user);

  /* Initialize dark mode (sets data-theme on <html>) */
  useDarkMode();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        const { uid, email, displayName } = authUser;
        dispatch(setProfile({ uid, email, displayName }));
      } else {
        dispatch(clearProfile());
        dispatch(clearOrders());
      }
    });
    return () => unsubscribe();
  }, [dispatch]);

  useEffect(() => {
    const LOCAL_STORAGE_KEY = getStorageKey(profile?.uid);
    const currentProfileOrders = JSON.parse(
      localStorage.getItem(LOCAL_STORAGE_KEY)
    );
    if (profile && currentProfileOrders?.orders) {
      dispatch(updateOrders(currentProfileOrders.orders));
    }
  }, [profile, dispatch]);

  return (
    <Router>
      {/* Skip link — Acessibilidade */}
      <a href="#main-content" className="skip-link">
        Pular para o conteúdo principal
      </a>

      {/* Scroll progress bar */}
      <div className="scroll-progress" aria-hidden="true" />

      {/* Screen reader route announcer */}
      <RouteAnnouncer />

      {/* Scroll to top on route change */}
      <ScrollToTop />

      {/* Toast notifications */}
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 2500,
          style: {
            background: "var(--bg-card)",
            color: "var(--text-primary)",
            border: "1px solid var(--border)",
            borderRadius: "var(--radius-md)",
            boxShadow: "var(--shadow-md)",
            fontSize: "0.875rem",
          },
          success: { iconTheme: { primary: "#067d62", secondary: "#fff" } },
        }}
      />

      <div className="App">
        <BackToTop />
        <Suspense fallback={<PageFallback />}>
          <AnimatedRoutes />
        </Suspense>
      </div>
    </Router>
  );
}

export default App;
