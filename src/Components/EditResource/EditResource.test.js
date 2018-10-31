import React from 'react';
import EditResource from './EditResource';
import { shallow } from 'enzyme';

describe('EditResource', () => {
  let wrapper;
  let mockResource = {};
  it('should match the snapshot', () => {
    wrapper = shallow(<EditResource resource={mockResource}/>);
    expect(wrapper).toMatchSnapshot();
  });
}); 