import React, { Suspense, lazy } from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { ToastProvider } from '@/components/ui/Toast';
import { Preloader } from '@/components/layout/Preloader';
import { SuspenseFallback } from '@/components/ui/SuspenseFallback';
import { LangLayout } from '@/components/layout/LangLayout';
import '@/i18n';
import './index.css';

// Auto-reload on stale chunk errors (after deploy, old JS filenames 404)
function lazyRetry<T extends React.ComponentType<unknown>>(
  factory: () => Promise<{ default: T }>
) {
  return lazy(() =>
    factory().catch(() => {
      // If chunk fails to load, force a full page reload (once)
      const key = 'chunk-reload';
      if (!sessionStorage.getItem(key)) {
        sessionStorage.setItem(key, '1');
        window.location.reload();
      }
      return factory();
    })
  );
}

const HomePage = lazyRetry(() => import('@/pages/HomePage'));
const EventsPage = lazyRetry(() => import('@/pages/EventsPage'));
const EventDetailPage = lazyRetry(() => import('@/pages/EventDetailPage'));
const ContactPage = lazyRetry(() => import('@/pages/ContactPage'));
const BlogPage = lazyRetry(() => import('@/pages/BlogPage'));
const BlogDetailPage = lazyRetry(() => import('@/pages/BlogDetailPage'));
const TermsPage = lazyRetry(() => import('@/pages/TermsPage'));
const GdprPage = lazyRetry(() => import('@/pages/GdprPage'));
const NotFoundPage = lazyRetry(() => import('@/pages/NotFoundPage'));
const AboutPage = lazyRetry(() => import('@/pages/AboutPage'));
const FAQPage = lazyRetry(() => import('@/pages/FAQPage'));

function s(Component: React.LazyExoticComponent<() => JSX.Element | null>) {
  return (
    <Suspense fallback={<SuspenseFallback />}>
      <Component />
    </Suspense>
  );
}

/** Build route children for a single language */
function langRoutes(prefix: string, paths: {
  events: string; event: string; blog: string; blogPost: string;
  contact: string; terms: string; gdpr: string; about: string; faq: string;
}) {
  return {
    path: prefix || '/',
    element: <LangLayout />,
    children: [
      { index: true, element: s(HomePage) },
      { path: paths.events, element: s(EventsPage) },
      { path: paths.event, element: s(EventDetailPage) },
      { path: paths.blog, element: s(BlogPage) },
      { path: paths.blogPost, element: s(BlogDetailPage) },
      { path: paths.contact, element: s(ContactPage) },
      { path: paths.terms, element: s(TermsPage) },
      { path: paths.gdpr, element: s(GdprPage) },
      { path: paths.about, element: s(AboutPage) },
      { path: paths.faq, element: s(FAQPage) },
      { path: '*', element: s(NotFoundPage) },
    ],
  };
}

const router = createBrowserRouter([
  // Czech (default, no prefix)
  langRoutes('/', {
    events: 'akce', event: 'akce/:slug',
    blog: 'blog', blogPost: 'blog/:slug',
    contact: 'kontakt', terms: 'obchodni-podminky', gdpr: 'gdpr',
    about: 'o-nas', faq: 'faq',
  }),
  // English
  langRoutes('/en', {
    events: 'events', event: 'events/:slug',
    blog: 'blog', blogPost: 'blog/:slug',
    contact: 'contact', terms: 'terms', gdpr: 'gdpr',
    about: 'about', faq: 'faq',
  }),
  // Polish
  langRoutes('/pl', {
    events: 'wydarzenia', event: 'wydarzenia/:slug',
    blog: 'blog', blogPost: 'blog/:slug',
    contact: 'kontakt', terms: 'regulamin', gdpr: 'gdpr',
    about: 'o-nas', faq: 'faq',
  }),
  // Ukrainian
  langRoutes('/uk', {
    events: 'akce', event: 'akce/:slug',
    blog: 'blog', blogPost: 'blog/:slug',
    contact: 'kontakt', terms: 'gdpr', gdpr: 'gdpr',
    about: 'pro-nas', faq: 'faq',
  }),
  // Slovak
  langRoutes('/sk', {
    events: 'akcie', event: 'akcie/:slug',
    blog: 'blog', blogPost: 'blog/:slug',
    contact: 'kontakt', terms: 'obchodne-podmienky', gdpr: 'gdpr',
    about: 'o-nas', faq: 'faq',
  }),
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
