import React from 'react';
import WelcomePage from './WelcomePage';
import { shallow } from 'enzyme';

describe('WelcomePage', () => {
  let wrapper
  it('should match the snapshot', () => {
    wrapper = shallow(<WelcomePage />)
    expect(wrapper).toMatchSnapshot()
  })
})  