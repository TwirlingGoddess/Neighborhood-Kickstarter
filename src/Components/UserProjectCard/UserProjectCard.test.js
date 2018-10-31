import React from 'react';
import UserProjectCard from './UserProjectCard';
import { shallow } from 'enzyme';

describe('UserProjectCard', () => {
  let wrapper
  it('should match the snapshot', () => {
    wrapper = shallow(<UserProjectCard />)
    expect(wrapper).toMatchSnapshot()
  })
}) 