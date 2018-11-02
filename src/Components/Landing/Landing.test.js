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

  it('should log out the user if the log out button is called', () => {
    let mockCurrentUser = {first_name: 'Dennis'};
    let mockLogOut = jest.fn();
    wrapper = shallow(<Landing logOutUser={mockLogOut} currentUser={mockCurrentUser}/>);

    wrapper.find('.sign-out').simulate('click');

    expect(mockLogOut).toHaveBeenCalled();
  });

  it('should update state with the current user if a user is logged in', () => {
    let mockCurrentUser = {first_name: 'Stephen', neighborhood: 'Auraria'};
    wrapper = shallow(<Landing currentUser={mockCurrentUser}/>);

    expect(wrapper.state('currentUser')).toEqual(mockCurrentUser);
    expect(wrapper.state('neighborhood')).toEqual(mockCurrentUser.neighborhood);
  });

  it('should only render user nav link buttons if a user is signed in', () => {
    let mockCurrentUser = {first_name: 'Stephen', neighborhood: 'Auraria'};
    wrapper = shallow(<Landing currentUser={mockCurrentUser}/>);

    expect(wrapper.find('.user-buttons-section')).toHaveLength(1);
  });

  it('should not render the user button section if not signed in', () => {
    let mockCurrentUser = {};
    wrapper = shallow(<Landing currentUser={mockCurrentUser}/>);

    expect(wrapper.find('.user-buttons-section')).toHaveLength(0);
  });
}); 