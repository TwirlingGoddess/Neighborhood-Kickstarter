import React from 'react';
import UserProjects  from './UserProjects';
import { shallow } from 'enzyme';

describe('UserProjects', () => {
  let wrapper;
  it('should match the snapshot', () => {
    wrapper = shallow(<UserProjects />);
    expect(wrapper).toMatchSnapshot();
  });

  it('should have a default state', () => {
    expect(wrapper.state('userProjects')).toEqual([]);
    expect(wrapper.state('selectedProject')).toEqual({});
    expect(wrapper.state('editedResources')).toEqual([]);
  });
});