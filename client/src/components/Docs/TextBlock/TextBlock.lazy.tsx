import React, { lazy, Suspense } from 'react';

const LazyTextBlock = lazy(() => import('./TextBlock'));

const TextBlock = (props: JSX.IntrinsicAttributes & { children?: React.ReactNode; }) => (
  <Suspense fallback={null}>
    <LazyTextBlock {...props} />
  </Suspense>
);

export default TextBlock;
