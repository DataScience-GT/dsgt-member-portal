import React, { lazy, Suspense } from 'react';

const LazyDocsApiUser = lazy(() => import('./DocsApiUser'));

const DocsApiUser = (props: JSX.IntrinsicAttributes & { children?: React.ReactNode; }) => (
  <Suspense fallback={null}>
    <LazyDocsApiUser {...props} />
  </Suspense>
);

export default DocsApiUser;
