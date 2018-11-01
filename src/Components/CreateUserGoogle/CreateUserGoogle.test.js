import React from 'react';
import CreateUserGoogle from './CreateUserGoogle';
import { shallow } from 'enzyme';

describe('CreateUserGoogle', () => {
  let wrapper;
  it('should match the snapshot', () => {
    wrapper = shallow(<CreateUserGoogle />);
    expect(wrapper).toMatchSnapshot();
  });

  it('should update state with the neighborhood selected', () => {
    let selectedOption = {value: 'Auraria', label: 'Aurarua', id: 1};
    wrapper = shallow(<CreateUserGoogle />);
    wrapper.instance().handleSelectChange(selectedOption);

    expect(wrapper.state('neighborhood')).toEqual(selectedOption);
  });

  it('should update the input thats being typed in, in state', () => {
    let eventObject = { target: { name: 'userName', value: 'dm' } };
    wrapper = shallow(<CreateUserGoogle/>);
    wrapper.find('.input-fields-google').simulate('change', eventObject);

    expect(wrapper.state('userName')).toEqual('dm');
  });

  it('should call addNewUser after googleResponse is called', () => {
    let mockAddUser = jest.fn();
    wrapper = shallow(<CreateUserGoogle addNewUser={mockAddUser}/>);

  });
}); 