import React from 'react';
import CreateUser from './CreateUser';
import { shallow } from 'enzyme';

describe('CreateUser', () => {
  let wrapper
  it('should match the snapshot', () => {
    wrapper = shallow(<CreateUser />)
    expect(wrapper).toMatchSnapshot()
  })

  it('should update state with the neighborhood selected', () => {
    let selectedOption = {value: 'Auraria', label: 'Aurarua', id: 1}
    wrapper = shallow(<CreateUser />)
    wrapper.instance().handleSelectChange(selectedOption)

    expect(wrapper.state('neighborhood')).toEqual(selectedOption)
  })
}) 