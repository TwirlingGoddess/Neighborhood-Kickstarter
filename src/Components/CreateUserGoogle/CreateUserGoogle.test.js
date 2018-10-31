import React from 'react';
import CreateUserGoogle from './CreateUserGoogle';
import { shallow } from 'enzyme';

describe('CreateUserGoogle', () => {
  let wrapper;
  it('should match the snapshot', () => {
    wrapper = shallow(<CreateUserGoogle />);
    expect(wrapper).toMatchSnapshot();
  });
}); 