import React, { lazy, Suspense } from 'react';

const LazyInlineTextBlock = lazy(() => import('./InlineTextBlock'));

const InlineTextBlock = (props: JSX.IntrinsicAttributes & { children?: React.ReactNode; }) => (
  <Suspense fallback={null}>
    <LazyInlineTextBlock {...props} />
  </Suspense>
);

export default InlineTextBlock;
