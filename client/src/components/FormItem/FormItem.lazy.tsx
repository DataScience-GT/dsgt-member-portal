import React, { lazy, Suspense } from 'react';

const LazyFormItem = lazy(() => import('./FormItem'));

const FormItem = (props: JSX.IntrinsicAttributes & { children?: React.ReactNode; }) => (
  <Suspense fallback={null}>
    <LazyFormItem {...props} />
  </Suspense>
);

export default FormItem;
