// Use type safe message keys with `next-intl`
type Messages = typeof import('./messages/en.json')
declare interface IntlMessages extends Messages {}

declare module '*.md' {
  import React from 'react';
  const react: React.FunctionComponent;

  const attributes: any;
  export { react, attributes };
}