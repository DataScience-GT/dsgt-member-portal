import React, { lazy, Suspense } from 'react';

const LazyDocsWelcome = lazy(() => import('./DocsWelcome'));

const DocsWelcome = (props: JSX.IntrinsicAttributes & { children?: React.ReactNode; }) => (
  <Suspense fallback={null}>
    <LazyDocsWelcome {...props} />
  </Suspense>
);

export default DocsWelcome;
