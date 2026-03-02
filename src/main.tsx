import React, { Suspense, lazy } from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { ToastProvider } from '@/components/ui/Toast';
import { Preloader } from '@/components/layout/Preloader';
import { SuspenseFallback } from '@/components/ui/SuspenseFallback';
import App from '@/App';
import './index.css';

const HomePage = lazy(() => import('@/pages/HomePage'));
const EventsPage = lazy(() => import('@/pages/EventsPage'));
const EventDetailPage = lazy(() => import('@/pages/EventDetailPage'));
const AboutPage = lazy(() => import('@/pages/AboutPage'));
const ContactPage = lazy(() => import('@/pages/ContactPage'));
const FAQPage = lazy(() => import('@/pages/FAQPage'));
const NotFoundPage = lazy(() => import('@/pages/NotFoundPage'));

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        index: true,
        element: (
          <Suspense fallback={<SuspenseFallback />}>
            <HomePage />
          </Suspense>
        ),
      },
      {
        path: 'akce',
        element: (
          <Suspense fallback={<SuspenseFallback />}>
            <EventsPage />
          </Suspense>
        ),
      },
      {
        path: 'akce/:slug',
        element: (
          <Suspense fallback={<SuspenseFallback />}>
            <EventDetailPage />
          </Suspense>
        ),
      },
      {
        path: 'o-nas',
        element: (
          <Suspense fallback={<SuspenseFallback />}>
            <AboutPage />
          </Suspense>
        ),
      },
      {
        path: 'kontakt',
        element: (
          <Suspense fallback={<SuspenseFallback />}>
            <ContactPage />
          </Suspense>
        ),
      },
      {
        path: 'faq',
        element: (
          <Suspense fallback={<SuspenseFallback />}>
            <FAQPage />
          </Suspense>
        ),
      },
      {
        path: '*',
        element: (
          <Suspense fallback={<SuspenseFallback />}>
            <NotFoundPage />
          </Suspense>
        ),
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <HelmetProvider>
      <ToastProvider>
        <Preloader />
        <RouterProvider router={router} />
      </ToastProvider>
    </HelmetProvider>
  </React.StrictMode>
);
