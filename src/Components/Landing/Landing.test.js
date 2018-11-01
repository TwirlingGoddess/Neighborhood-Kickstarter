import React from 'react';
import Landing from './Landing';
import { shallow } from 'enzyme';
import { wrap } from 'module';

describe('Landing', () => {
  let wrapper;
  let mockCurrentUser = {};
  it('should match the snapshot', () => {
    wrapper = shallow(<Landing currentUser={mockCurrentUser}/>);
    expect(wrapper).toMatchSnapshot();
  });

  it('should log out the user if the log out button is called', () => {
    let mockCurrentUser= {first_name: 'Dennis'};
    let mockLogOut = jest.fn();
    wrapper = shallow(<Landing logOutUser={mockLogOut} currentUser={mockCurrentUser}/>)

    wrapper.find('.sign-out').simulate('click');

    expect(mockLogOut).toHaveBeenCalled();
  })
}); 