import { fn } from '@storybook/test';
import { Button } from './Button';
import { Select } from './Select';

export default {
  title: 'Example/Form',
  component: Select,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  args: { onClick: fn() },
};

export const SelectDropdownField = {
  args: {
    label: 'Label',
  },
};

