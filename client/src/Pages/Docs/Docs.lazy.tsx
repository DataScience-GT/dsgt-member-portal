import React, { lazy, Suspense } from 'react';

const LazyDocs = lazy(() => import('./Docs'));

const Docs = (props: JSX.IntrinsicAttributes & { children?: React.ReactNode; }) => (
  <Suspense fallback={null}>
    <LazyDocs {...props} />
  </Suspense>
);

export default Docs;
