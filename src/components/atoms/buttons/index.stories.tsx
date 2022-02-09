import React from 'react';
import DefaultButton from '.';
import {ComponentMeta, ComponentStory} from '@storybook/react';

export default {
  title: 'Atoms / DefaultButton',
  component: DefaultButton
} as ComponentMeta<typeof DefaultButton>;

const Template: ComponentStory<typeof DefaultButton> = (args) => <DefaultButton {...args} />;

const testCallback = () => {
  console.log('DefaultButton callback test');
};

export const Large = Template.bind({});
Large.args = {
  text: 'Large Button',
  textColor: 'white',
  size: 'large',
  callback: testCallback
};

export const Medium = Template.bind({});
Medium.args = {
  text: 'Medium Button',
  textColor: 'white',
  size: 'medium',
  callback: testCallback
};

export const Small = Template.bind({});
Small.args = {
  text: 'Small Button',
  textColor: 'white',
  size: 'small',
  callback: testCallback
};

export const justCallback = Template.bind({});
justCallback.args = {
  callback: testCallback
};

//const dummyData = {
//  text: 'test button'
//};

//export const index: React.FC = () => <Button1 text={text('content', 'Button')} />;

//const Template: Story = () => <DefaultButton {...dummyData} />;
//export const index = Template.bind({});
