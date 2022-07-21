import React, { lazy, Suspense } from 'react';

const LazySidebarItem = lazy(() => import('./SidebarItem'));

const SidebarItem = (props: JSX.IntrinsicAttributes & { children?: React.ReactNode; }) => (
  <Suspense fallback={null}>
    <LazySidebarItem {...props} />
  </Suspense>
);

export default SidebarItem;
