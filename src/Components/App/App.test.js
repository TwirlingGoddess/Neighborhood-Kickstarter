import React from 'react';
import App from './App';
import { shallow, mount } from 'enzyme';
import ReactDOM from 'react-dom';
import { MemoryRouter } from 'react-router';
import WelcomePage from '../WelcomePage/WelcomePage';
import CreateUser from '../CreateUser/CreateUser';
import CreateUserGoogle from '../CreateUserGoogle/CreateUserGoogle';
import Landing from '../Landing/Landing';
import SignIn from '../SignIn/SignIn';
import CreateProject from '../CreateProject/CreateProject';
import UserProjects from '../UserProjects/UserProjects';
import Contributions from '../Contributions/Contributions';

describe('Contributions', () => {
  let wrapper;
  let initial;
  let expected;
  let mockUserState = {};
  let mockProjectState = {};
  let mockEvent = jest.fn();

  beforeEach(() => {
    wrapper = shallow(<App />);
  });

  it('should match the snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should have a valid path to the Landing', () => {
    const wrapper = mount(
      <MemoryRouter initialEntries={[ '/' ]}>
        <App/>
      </MemoryRouter>
    );
    expect(wrapper.find(WelcomePage)).toHaveLength(1);
  });

  it('should have a valid path to the Landing', () => {
    const wrapper = mount(
      <MemoryRouter initialEntries={[ '/CreateUser' ]}>
        <App/>
      </MemoryRouter>
    );
    expect(wrapper.find(CreateUser)).toHaveLength(1);
  });

  it('should have a valid path to the Landing', () => {
    const wrapper = mount(
      <MemoryRouter initialEntries={[ '/CreateUserGoogle' ]}>
        <App/>
      </MemoryRouter>
    );
    expect(wrapper.find(CreateUserGoogle)).toHaveLength(1);
  });

  it('should have a valid path to the Landing', () => {
    const wrapper = mount(
      <MemoryRouter initialEntries={[ '/Landing' ]}>
        <App/>
      </MemoryRouter>
    );
    expect(wrapper.find(Landing)).toHaveLength(1);
  });

  it('should have a valid path to the Landing', () => {
    const wrapper = mount(
      <MemoryRouter initialEntries={[ '/SignIn' ]}>
        <App/>
      </MemoryRouter>
    );
    expect(wrapper.find(SignIn)).toHaveLength(1);
  });

  it('should have a valid path to the Landing', () => {
    const wrapper = mount(
      <MemoryRouter initialEntries={[ '/CreateProject' ]}>
        <App/>
      </MemoryRouter>
    );
    expect(wrapper.find(CreateProject)).toHaveLength(1);
  });  

  it('should have a valid path to the Landing', () => {
    const wrapper = mount(
      <MemoryRouter initialEntries={[ '/UserProjects' ]}>
        <App/>
      </MemoryRouter>
    );
    expect(wrapper.find(UserProjects)).toHaveLength(1);
  }); 

  it('should have a valid path to the Landing', () => {
    const wrapper = mount(
      <MemoryRouter initialEntries={[ '/Contributions' ]}>
        <App/>
      </MemoryRouter>
    );
    expect(wrapper.find(Contributions)).toHaveLength(1);
  });


  it('Should update the state when updateUser is invoked', () => {
    wrapper = shallow(<App updateUser={mockEvent}/>);
    expect(wrapper).toMatchSnapshot();
  })

  it('Should update the state when logOutUser is invoked', () => {
    wrapper = shallow(<App logOutUser={mockEvent}/>);
    expect(wrapper).toMatchSnapshot();
  })
    
    // wrapper.instance().updateUser()
    // expect(mockEvent).toBeCalled();
    // const user = {user: 'name of user'}
    // wrapper.setState({ currentUser: user });
    // // expect(wrapper.find('.foo')).to.have.lengthOf(0);
    // expect(wrapper.state('currentUser')).toEqual(user)

})
