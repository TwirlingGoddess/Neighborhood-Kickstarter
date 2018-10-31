import React from 'react';
import UserProjects  from './UserProjects';
import { shallow } from 'enzyme';

describe('UserProjects', () => {
  let wrapper;
  it('should match the snapshot', () => {
    wrapper = shallow(<UserProjects />);
    expect(wrapper).toMatchSnapshot();
  });
});