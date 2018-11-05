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

  // it.only('Should have an initial currentUser state of an empty object', () => {
  //   expected = {};
  //   expect(wrapper.state('currentUser')).toEqual(expected)
  // })

  // it('Should update the currentUser in state', () => {
  //   wrapper = shallow(<App updateUser={jest.fn}/>);
  //   wrapper.instance()

  // })

})
