import React from 'react';
import { addDecorator } from '@storybook/react';
import { MemoryRouter } from 'react-router';

import '../src/index.css';
import '../src/App.module.scss';

addDecorator(Story => (
  <MemoryRouter initialEntries={['/']}>
    <Story />
  </MemoryRouter>
));
