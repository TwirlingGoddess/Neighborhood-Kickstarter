import React from 'react';
import SignIn from './SignIn';
import GoogleLogin from 'react-google-login';
import { shallow } from 'enzyme';

describe('SignIn', () => {
  let wrapper;
  it('should match the snapshot', () => {
    wrapper = shallow(<SignIn />);
    expect(wrapper).toMatchSnapshot();
  });

  it('should update state with the neighborhood selected', () => {
    let eventObject = { target: { name: 'userName', value: 'a' } };

    wrapper = shallow(<SignIn />);
    wrapper.find('.username').simulate('change', eventObject)
    expect(wrapper.state('userName')).toEqual('a');
  });

  it('should sign in with google if the google button is clicked', () => {
    let mockGetCurrentUser = jest.fn();

    wrapper = shallow(<SignIn getCurrentUser={mockGetCurrentUser}/>);
    wrapper.instance().responseGoogle();


  })
}); 