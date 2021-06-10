import React from 'react';
import TextInput from './TextInput';

export default {
  title: 'atoms/TextInput',
  component: TextInput,
};

export const Text: React.VFC<{}> = () => (
  <TextInput
    type='Text'
    />
);
export const Password: React.VFC<{}> = () => (
  <TextInput
    type='Password'
    />
);
export const TextArea: React.VFC<{}> = () => (
  <TextInput
    type='TextArea'
    />
);