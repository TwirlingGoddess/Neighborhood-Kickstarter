import React from 'react';
import UserProjectCard from './UserProjectCard';
import { shallow } from 'enzyme';

describe('UserProjectCard', () => {
  let wrapper;
  it('should match the snapshot', () => {
    wrapper = shallow(<UserProjectCard />);
    expect(wrapper).toMatchSnapshot();
  });

  it('should call selectProject if a project edit button is clicked', () => {
    let mockSelectProject = jest.fn();
    let mockSelectedProject = {title: 'Yard'};
    wrapper = shallow(<UserProjectCard selectProject={mockSelectProject} project={mockSelectedProject} />);

    wrapper.instance().handleClick();
    expect(mockSelectProject).toHaveBeenCalled();
  });

  
}); 