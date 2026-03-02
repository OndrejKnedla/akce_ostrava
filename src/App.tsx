import { Outlet, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { ScrollProgress } from '@/components/layout/ScrollProgress';

import { BackToTop } from '@/components/ui/BackToTop';
import { SkipLink } from '@/components/ui/SkipLink';
import { CookieBanner } from '@/components/ui/CookieBanner';
import { ExitIntentPopup } from '@/components/ui/ExitIntentPopup';
import { NewsletterPopup } from '@/components/ui/NewsletterPopup';
import { SocialProofToast } from '@/components/ui/SocialProofToast';
import { useEffect } from 'react';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

export default function App() {
  const location = useLocation();

  return (
    <>
      <SkipLink />

      <ScrollProgress />
      <Navbar />
      <ScrollToTop />

      <main id="main-content">
        <AnimatePresence mode="wait">
          <Outlet key={location.pathname} />
        </AnimatePresence>
      </main>

      <Footer />

      {/* Overlays */}
      <CookieBanner />
      <ExitIntentPopup />
      <NewsletterPopup />
      <SocialProofToast />
      <BackToTop />
    </>
  );
}
