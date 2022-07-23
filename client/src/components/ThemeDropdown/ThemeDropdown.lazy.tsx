import React, { lazy, Suspense } from 'react';

const LazyThemeDropdown = lazy(() => import('./ThemeDropdown'));

const ThemeDropdown = (props: JSX.IntrinsicAttributes & { children?: React.ReactNode; }) => (
  <Suspense fallback={null}>
    <LazyThemeDropdown {...props} />
  </Suspense>
);

export default ThemeDropdown;
