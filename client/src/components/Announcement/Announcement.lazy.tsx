import React, { lazy, Suspense } from 'react';

const LazyAnnouncement = lazy(() => import('./Announcement'));

const Announcement = (props: JSX.IntrinsicAttributes & { children?: React.ReactNode; }) => (
  <Suspense fallback={null}>
    <LazyAnnouncement {...props} />
  </Suspense>
);

export default Announcement;
