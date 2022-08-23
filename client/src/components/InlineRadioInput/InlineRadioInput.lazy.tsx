import React, { lazy, Suspense } from 'react';

const LazyInlineRadioInput = lazy(() => import('./InlineRadioInput'));

const InlineRadioInput = (props: JSX.IntrinsicAttributes & { children?: React.ReactNode; }) => (
  <Suspense fallback={null}>
    <LazyInlineRadioInput {...props} />
  </Suspense>
);

export default InlineRadioInput;
