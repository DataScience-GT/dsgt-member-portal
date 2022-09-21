import React, { lazy, Suspense } from 'react';

const LazyInlineLink = lazy(() => import('./InlineLink'));

const InlineLink = (props: JSX.IntrinsicAttributes & { children?: React.ReactNode; }) => (
  <Suspense fallback={null}>
    <LazyInlineLink {...props} />
  </Suspense>
);

export default InlineLink;
