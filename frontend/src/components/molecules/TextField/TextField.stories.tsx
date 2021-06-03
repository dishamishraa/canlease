import React from 'react';
import TextField from './TextField';

export default {
  title: 'molecules/TextField',
  component: TextField,
};

export const Default: React.VFC<{}> = () => (
  <TextField
    state='Default'
    />
);
export const Error: React.VFC<{}> = () => (
  <TextField
    state='Error'
    />
);