import React from 'react';
import SignIn from './SignIn';
import { shallow } from 'enzyme';

describe('SignIn', () => {
  let wrapper;
  it('should match the snapshot', () => {
    wrapper = shallow(<SignIn />);
    expect(wrapper).toMatchSnapshot();
  });
}); 