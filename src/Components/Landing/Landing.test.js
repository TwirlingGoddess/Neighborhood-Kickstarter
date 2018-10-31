import React from 'react';
import Landing from './Landing';
import { shallow } from 'enzyme';

describe('Landing', () => {
  let wrapper;
  let mockCurrentUser = {};
  it('should match the snapshot', () => {
    wrapper = shallow(<Landing currentUser={mockCurrentUser}/>);
    expect(wrapper).toMatchSnapshot();
  });
}); 