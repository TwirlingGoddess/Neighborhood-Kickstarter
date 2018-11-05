import React from 'react';
import App from './App';
import { shallow } from 'enzyme';

describe('Contributions', () => {
  let wrapper;
  let mockUserState = {};
  let mockProjectState = {};

  it.only('should match the snapshot', () => {
    wrapper = shallow(<App />);
    expect(wrapper).toMatchSnapshot();
  });

})
