import React from 'react';
import ProjectCard from './ProjectCard';
import { shallow } from 'enzyme';
import { wrap } from 'module';

describe('ProjectCard', () => {
  let wrapper
  it('should match the snapshot', () => {
    wrapper = shallow(<ProjectCard />)
    expect(wrapper).toMatchSnapshot()
  })

  it('should call selectProject when viewComments is called', () => {
    let mockSelectProject = jest.fn();
    wrapper = shallow(<ProjectCard selectProject={mockSelectProject}/>)

    wrapper.instance().viewComments();

    expect(mockSelectProject).toHaveBeenCalled()
  })
}) 