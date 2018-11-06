import React from 'react';
import CreateUserGoogle from './CreateUserGoogle';
import { getNeighborhoods, addNewUser, sendEmailConfirmation } from '../../utilities/apiCalls/apiCalls';
import { shallow } from 'enzyme';

describe('CreateUserGoogle', () => {
  let wrapper;
  it('should match the snapshot', () => {
    wrapper = shallow(<CreateUserGoogle />);
    expect(wrapper).toMatchSnapshot();
  });

  it('should return data from addNewUser fetch', async () => {
    const userParam = {name: 'Lee', email: 'graham.la3@gmail.com'};
    const expected = {"message": "Incorrect parameters given!"};
    let data = await addNewUser(userParam);
    expect(data).toEqual(expected);
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