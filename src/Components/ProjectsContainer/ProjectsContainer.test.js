import React from 'react';
import { ProjectsContainer } from './ProjectsContainer';
import { shallow } from 'enzyme';

describe('ProjectsContainer', () => {
  let wrapper
  let mockProjects = []
  it('should match the snapshot', () => {
    wrapper = shallow(<ProjectsContainer projects={mockProjects}/>)
    expect(wrapper).toMatchSnapshot()
  })
}) 