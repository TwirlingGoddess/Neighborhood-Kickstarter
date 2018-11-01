import React from 'react';
import ProjectCard from './ProjectCard';
import { shallow } from 'enzyme';
import { NavLink } from 'react-router-dom';

describe('ProjectCard', () => {
  let wrapper;
  let mockResources = []
  it('should match the snapshot', () => {
    wrapper = shallow(<ProjectCard resources={mockResources}/>);
    expect(wrapper).toMatchSnapshot();
  });

  it('should call selectProject when viewComments is called', () => {
    let mockSelectProject = jest.fn();
    wrapper = shallow(<ProjectCard selectProject={mockSelectProject} resources={mockResources}/>);

    wrapper.instance().viewComments();

    expect(mockSelectProject).toHaveBeenCalled();
  });
}); 