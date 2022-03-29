import React from 'react';
import TextField from './TextField';

export default {
  title: 'molecules/TextField',
  component: TextField,
};

export const DefaultText: React.VFC<{}> = () => (
  <TextField
    state='Default'
    type='Text'
    />
);
export const ErrorText: React.VFC<{}> = () => (
  <TextField
    state='Error'
    type='Text'
    />
);
export const DefaultPassword: React.VFC<{}> = () => (
  <TextField
    state='Default'
    type='Password'
    />
);
export const ErrorPassword: React.VFC<{}> = () => (
  <TextField
    state='Error'
    type='Password'
    />
);
export const DefaultTextArea: React.VFC<{}> = () => (
  <TextField
    state='Default'
    type='TextArea'
    />
);
export const ErrorTextArea: React.VFC<{}> = () => (
  <TextField
    state='Error'
    type='TextArea'
    />
);
