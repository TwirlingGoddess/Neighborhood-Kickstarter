import React from 'react';
import ProjectCard from './ProjectCard';
import { shallow } from 'enzyme';
import { NavLink } from 'react-router-dom';

describe('ProjectCard', () => {
  let wrapper;
  it('should match the snapshot', () => {
    wrapper = shallow(<ProjectCard />);
    expect(wrapper).toMatchSnapshot();
  });

  it('should call selectProject when viewComments is called', () => {
    let mockSelectProject = jest.fn();
    wrapper = shallow(<ProjectCard selectProject={mockSelectProject}/>);

    wrapper.instance().viewComments();

    expect(mockSelectProject).toHaveBeenCalled();
  });

  it('should only render a view comments button if there is a current user', () => {
    let mockCurrentUser = {};
    wrapper = shallow(<ProjectCard currentUser={mockCurrentUser}/>);

    expect(wrapper.find(NavLink)).toHaveLength(0);
  });
}); 