import React from 'react';
import Button from './Button';

export default {
  title: 'atoms/Button',
  component: Button,
};

export const ButtonLargeColourBrand: React.VFC<{}> = () => (
  <Button
    type='Button'
    size='Large'
    fill='Colour'
    colour='Brand'
    />
);
export const ButtonLargeBasicBasic: React.VFC<{}> = () => (
  <Button
    type='Button'
    size='Large'
    fill='Basic'
    colour='Basic'
    />
);
export const ButtonMediumColourBrand: React.VFC<{}> = () => (
  <Button
    type='Button'
    size='Medium'
    fill='Colour'
    colour='Brand'
    />
);
export const ButtonMediumBasicBasic: React.VFC<{}> = () => (
  <Button
    type='Button'
    size='Medium'
    fill='Basic'
    colour='Basic'
    />
);
export const ButtonLargeColourDanger: React.VFC<{}> = () => (
  <Button
    type='Button'
    size='Large'
    fill='Colour'
    colour='Danger'
    />
);
export const ButtonMediumColourDanger: React.VFC<{}> = () => (
  <Button
    type='Button'
    size='Medium'
    fill='Colour'
    colour='Danger'
    />
);
export const TextIconButtonLargeBasicBasic: React.VFC<{}> = () => (
  <Button
    type='TextIconButton'
    size='Large'
    fill='Basic'
    colour='Basic'
    />
);
export const IconTextButtonSmallNoneBasic: React.VFC<{}> = () => (
  <Button
    type='IconTextButton'
    size='Small'
    fill='None'
    colour='Basic'
    />
);
export const ButtonSmallNoneBasic: React.VFC<{}> = () => (
  <Button
    type='Button'
    size='Small'
    fill='None'
    colour='Basic'
    />
);
export const TextIconButtonLargeColourBrand: React.VFC<{}> = () => (
  <Button
    type='TextIconButton'
    size='Large'
    fill='Colour'
    colour='Brand'
    />
);
