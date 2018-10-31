import React from 'react';
import { UserProjectsContainer } from './UserProjectsContainer';
import { shallow } from 'enzyme';

describe('UserProjectsContainer', () => {
  let wrapper
  let mockUserProjects = []
  it('should match the snapshot', () => {
    wrapper = shallow(<UserProjectsContainer userProjects={mockUserProjects}/>)
    expect(wrapper).toMatchSnapshot()
  })
}) 