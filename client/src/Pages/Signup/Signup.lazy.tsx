import React, { lazy, Suspense } from 'react';

const LazySignup = lazy(() => import('./Signup'));

const Signup = (props: JSX.IntrinsicAttributes & { children?: React.ReactNode; }) => (
  <Suspense fallback={null}>
    <LazySignup {...props} />
  </Suspense>
);

export default Signup;
