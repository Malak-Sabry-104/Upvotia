import React from "react";
import { Routes, Route } from "react-router-dom";
import "./embla.css";
import Hero from "./Components/Hero";
import TrendingWishes from "./RelatedComponents/TrendingWishes";
import Contact from "./Components/Contact";
import HowItWorksCards from "./Components/HowItWorksCards";
import Layout from "./Components/Layout";
import ErrorPage from "./Routes/ErrorPage";
import Auth from "./Routes/Auth";
import Explore from "./Routes/Explore";
import BoostPage from "./Routes/BoostPage";
import Devhub from "./Routes/Devhub";
import Profile from "./Routes/Profile";
import About from "./Routes/About";
import IgniteForm from "./Routes/IgniteForm";
import TestConnection from "./Components/TestConnection";
import PrivacyPolicy from "./Routes/PrivacyPolicy";
import TermsOfService from "./Routes/TermsOfService";
import CookiePolicy from "./Routes/CookiePolicy";

const HomePage: React.FC = () => {
  return (
    <>
      <Hero />
      <HowItWorksCards />
      <TrendingWishes />
      <Contact />
    </>
  );
};

const App: React.FC = () => {
  return (
    <>
      <Routes>
        <Route element={<Layout />} path="/">
          <Route element={<HomePage />} index />
          <Route path="*" element={<ErrorPage />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/ideas" element={<Explore />} />
          <Route path="/boost/:id" element={<BoostPage />} />
          <Route path="/devhub" element={<Devhub />} />
          <Route path="/about-us" element={<About />} />
          <Route path="/profile/:id" element={<Profile />} />
          <Route path="/ignite" element={<IgniteForm />} />
          <Route path="/privacy" element={<PrivacyPolicy />} />
          <Route path="/terms" element={<TermsOfService />} />
          <Route path="/cookies" element={<CookiePolicy />} />
        </Route>
      </Routes>
      <TestConnection />
    </>
  );
};

export default App;