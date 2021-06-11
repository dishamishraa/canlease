import React from 'react';
import Toast from './Toast';

export default {
  title: 'atoms/Toast',
  component: Toast,
};

export const NoCloseButtonDark: React.VFC<{}> = () => (
  <Toast
    type='NoCloseButton'
    style='Dark'
    />
);
export const WithCloseButtonDark: React.VFC<{}> = () => (
  <Toast
    type='WithCloseButton'
    style='Dark'
    />
);
export const NoCloseButtonDanger: React.VFC<{}> = () => (
  <Toast
    type='NoCloseButton'
    style='Danger'
    />
);
