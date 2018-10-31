import React from 'react';
import ProjectCard from './ProjectCard';
import { shallow } from 'enzyme';

describe('ProjectCard', () => {
  let wrapper
  it('should match the snapshot', () => {
    wrapper = shallow(<ProjectCard />)
    expect(wrapper).toMatchSnapshot()
  })
}) 