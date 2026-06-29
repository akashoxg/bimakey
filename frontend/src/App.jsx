import { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Home from './pages/Home';
import HealthIndex from './pages/HealthInsurance/index';
import HealthBasics from './pages/HealthInsurance/Basics';
import HealthPlans from './pages/HealthInsurance/Plans';
import HealthFamilyCoverage from './pages/HealthInsurance/FamilyCoverage';
import HealthBenefits from './pages/HealthInsurance/BenefitsFeatures';
import TermIndex from './pages/TermInsurance/index';
import TermBasics from './pages/TermInsurance/Basics';
import TermPlans from './pages/TermInsurance/Plans';
import TermForYourProfile from './pages/TermInsurance/ForYourProfile';
import TermBenefits from './pages/TermInsurance/BenefitsFeatures';
import MotorIndex from './pages/MotorInsurance/index';
import MotorBasics from './pages/MotorInsurance/Basics';
import MotorPlans from './pages/MotorInsurance/Plans';
import MotorByVehicle from './pages/MotorInsurance/ByVehicle';
import MotorBenefits from './pages/MotorInsurance/BenefitsFeatures';
import Contact from './pages/Contact';
import About from './pages/About';
import Experts from './pages/Experts';
import ClaimAssistance from './pages/ClaimAssistance';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsOfService from './pages/TermsOfService';
import NotFound from './pages/NotFound';
const ScrollToTop = () => {
  const { pathname } = useLocation();
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  
  return null;
};

function App() {
  const location = useLocation();

  return (
    <div className="min-h-screen flex flex-col bg-brand-white font-body">
      <ScrollToTop />
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>
      <Navbar />
      <main id="main-content" className="flex-1">
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<Home />} />

            {/* Health Insurance */}
            <Route path="/health-insurance" element={<HealthIndex />} />
            <Route path="/health-insurance/basics" element={<HealthBasics />} />
            <Route path="/health-insurance/plans" element={<HealthPlans />} />
            <Route path="/health-insurance/family-coverage" element={<HealthFamilyCoverage />} />
            <Route path="/health-insurance/benefits" element={<HealthBenefits />} />

            {/* Term / Life Insurance */}
            <Route path="/life-insurance" element={<TermIndex />} />
            <Route path="/life-insurance/basics" element={<TermBasics />} />
            <Route path="/life-insurance/plans" element={<TermPlans />} />
            <Route path="/life-insurance/for-your-profile" element={<TermForYourProfile />} />
            <Route path="/life-insurance/benefits" element={<TermBenefits />} />

            {/* Motor Insurance */}
            <Route path="/motor-insurance" element={<MotorIndex />} />
            <Route path="/motor-insurance/basics" element={<MotorBasics />} />
            <Route path="/motor-insurance/plans" element={<MotorPlans />} />
            <Route path="/motor-insurance/by-vehicle" element={<MotorByVehicle />} />
            <Route path="/motor-insurance/benefits" element={<MotorBenefits />} />

            {/* Other */}
            <Route path="/contact-us" element={<Contact />} />
            <Route path="/about" element={<About />} />
            <Route path="/experts" element={<Experts />} />
            <Route path="/claim-assistance" element={<ClaimAssistance />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/terms-of-service" element={<TermsOfService />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AnimatePresence>
      </main>
      <Footer />
    </div>
  );
}

export default App;
