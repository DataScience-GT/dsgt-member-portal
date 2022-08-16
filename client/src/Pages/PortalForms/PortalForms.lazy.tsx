import React, { lazy, Suspense } from 'react';

const LazyPortalForms = lazy(() => import('./PortalForms'));

const PortalForms = (props: JSX.IntrinsicAttributes & { children?: React.ReactNode; }) => (
  <Suspense fallback={null}>
    <LazyPortalForms {...props} />
  </Suspense>
);

export default PortalForms;
