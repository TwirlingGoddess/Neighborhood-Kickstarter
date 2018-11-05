import React from 'react';
import App from './App';
import { shallow, mount } from 'enzyme';
import ReactDOM from 'react-dom';
import { MemoryRouter } from 'react-router';
import WelcomePage from '../WelcomePage/WelcomePage';
import Landing from '../Landing/Landing';

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



})
