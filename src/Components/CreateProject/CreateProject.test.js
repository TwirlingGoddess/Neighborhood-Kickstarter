import React from 'react';
import CreateProject from './CreateProject';
import { shallow } from 'enzyme';

describe('CreateProject', () => {
  let wrapper
  let mockCurrentUser = {}
  it('should match the snapshot', () => {
    wrapper = shallow(<CreateProject currentUser={mockCurrentUser}/>)
    expect(wrapper).toMatchSnapshot()
  })
}) 