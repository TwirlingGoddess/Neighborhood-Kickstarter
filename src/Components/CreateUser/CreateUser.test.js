import React from 'react';
import CreateUser from './CreateUser';
import { getNeighborhoods, addNewUserLocal, sendEmailConfirmation } from '../../utilities/apiCalls/apiCalls';
import { shallow } from 'enzyme';

describe('CreateUser', () => {
  let wrapper;

  it('should match the snapshot', () => {
    wrapper = shallow(<CreateUser />);
    expect(wrapper).toMatchSnapshot();
  });

  it('should have an initial state with the neighborhoods array', async () => {
    let selectedOptions = [];
    wrapper = shallow(<CreateUser />);
    wrapper.instance().setNeighborhoods(jest.fn());
    expect(wrapper.state('neighborhoods')).toEqual(selectedOptions);
  });

  it('should return data from getNeighborhoods fetch', async () => {
    const expected = [{"id": 24, "name": "Athmar Park"}, {"id": 1, "name": "Auraria"}, {"id": 70, "name": "Baker"}, {"id": 15, "name": "Barnum"}, {"id": 16, "name": "Barnum West"}, {"id": 13, "name": "Bear Valley"}, {"id": 3, "name": "Belcaro"}, {"id": 20, "name": "Berkeley"}, {"id": 50, "name": "Capitol Hill"}, {"id": 53, "name": "CBD"}, {"id": 22, "name": "Chaffee Park"}, {"id": 29, "name": "Cheesman Park"}, {"id": 7, "name": "Cherry Creek"}, {"id": 10, "name": "City Park"}, {"id": 61, "name": "City Park West"}, {"id": 52, "name": "Civic Center"}, {"id": 71, "name": "Clayton"}, {"id": 75, "name": "Cole"}, {"id": 60, "name": "College View - South Platte"}, {"id": 9, "name": "Congress Park"}, {"id": 2, "name": "Cory - Merrill"}, {"id": 8, "name": "Country Club"}, {"id": 78, "name": "DIA"}, {"id": 49, "name": "East Colfax"}, {"id": 69, "name": "Elyria Swansea"}, {"id": 65, "name": "Five Points"}, {"id": 12, "name": "Fort Logan"}, {"id": 58, "name": "Gateway - Green Valley Ranch"}, {"id": 66, "name": "Globeville"}, {"id": 44, "name": "Goldsmith"}, {"id": 32, "name": "Hale"}, {"id": 40, "name": "Hampden"}, {"id": 42, "name": "Hampden South"}, {"id": 47, "name": "Harvey Park"}, {"id": 59, "name": "Harvey Park South"}, {"id": 23, "name": "Highland"}, {"id": 30, "name": "Hilltop"}, {"id": 43, "name": "Indian Creek"}, {"id": 67, "name": "Jefferson Park"}, {"id": 39, "name": "Kennedy"}, {"id": 73, "name": "Lincoln Park"}, {"id": 57, "name": "Lowry Field"}, {"id": 48, "name": "Mar Lee"}, {"id": 11, "name": "Marston"}, {"id": 56, "name": "Montbello"}, {"id": 31, "name": "Montclair"}, {"id": 51, "name": "North Capitol Hill"}, {"id": 68, "name": "Northeast Park Hill"}, {"id": 33, "name": "North Park Hill"}, {"id": 37, "name": "Overland"}, {"id": 36, "name": "Platt Park"}, {"id": 21, "name": "Regis"}, {"id": 28, "name": "Rosedale"}, {"id": 38, "name": "Ruby Hill"}, {"id": 72, "name": "Skyland"}, {"id": 19, "name": "Sloan Lake"}, {"id": 41, "name": "Southmoor Park"}, {"id": 34, "name": "South Park Hill"}, {"id": 6, "name": "Speer"}, {"id": 55, "name": "Stapleton"}, {"id": 77, "name": "Sunnyside"}, {"id": 62, "name": "Sun Valley"}, {"id": 54, "name": "Union Station"}, {"id": 27, "name": "University"}, {"id": 46, "name": "University Hills"}, {"id": 35, "name": "University Park"}, {"id": 63, "name": "Valverde"}, {"id": 64, "name": "Villa Park"}, {"id": 45, "name": "Virginia Village"}, {"id": 4, "name": "Washington Park"}, {"id": 5, "name": "Washington Park West"}, {"id": 14, "name": "Washington Virginia Vale"}, {"id": 26, "name": "Wellshire"}, {"id": 17, "name": "West Colfax"}, {"id": 18, "name": "West Highland"}, {"id": 76, "name": "Westwood"}, {"id": 74, "name": "Whittier"}, {"id": 25, "name": "Windsor"}]
    let data = await getNeighborhoods();
    expect(data).toEqual(expected);
  });

  it('should update state with the input information', () => {
    let mockEvent = {target: {name: 'firstName', value: 'Bobby'}};
    let userInput = 'Bobby';
    wrapper = shallow(<CreateUser />);
    wrapper.instance().handleChange(mockEvent);
    expect(wrapper.state('firstName')).toEqual(userInput);
  });

  it('should update state with the neighborhood selected', () => {
    let selectedOption = {value: 'Auraria', label: 'Aurarua', id: 1};
    wrapper = shallow(<CreateUser />);
    wrapper.instance().handleSelectChange(selectedOption);
    expect(wrapper.state('neighborhood')).toEqual(selectedOption);
  });

  it('should update the input thats being typed in, in state', () => {
    let eventObject = { target: { name: 'firstName', value: 'a' } };
    wrapper = shallow(<CreateUser />);
    wrapper.find('.first-name-input').simulate('change', eventObject);
    expect(wrapper.state('firstName')).toEqual('a');
  });

  it('should return data from addNewUserLocal fetch', async () => {
    const userParam = {name: 'Lee', email: 'graham.la3@gmail.com'};
    const expected = {"message": "Incorrect parameters given!"};
    let data = await addNewUserLocal(userParam);
    expect(data).toEqual(expected);
  });

  it('should return data from sendEmailConfirmation fetch', async () => {
    const userParam = {name: 'Lee', email: 'graham.la3@gmail.com'};
    const expected = undefined;
    let data = await sendEmailConfirmation(userParam);
    expect(data).toEqual(expected);
  });

  it('should call handleSubmit when the submit button is clicked', () => {
    const mockUser = {id: 1}
    let mockedEvent = { target: {className: 'add-material-button'}, preventDefault: () => {} };
    let userName = 'Tommy'
    let user = {userName: userName}
    wrapper.setState({ userName })
    wrapper = shallow(<CreateUser updateUser={mockUser}/>);
    wrapper.find('.create-user-form').simulate('submit')
    wrapper.instance().handleSubmit(mockedEvent, user)
    expect(wrapper.state('allUsers')).toHaveLength(0);
  })
}); 