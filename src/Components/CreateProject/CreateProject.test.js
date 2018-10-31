import React from 'react';
import CreateProject from './CreateProject';
import { shallow } from 'enzyme';

describe('CreateProject', () => {
  let wrapper;
  let mockCurrentUser = {};
  it('should match the snapshot', () => {
    wrapper = shallow(<CreateProject currentUser={mockCurrentUser}/>)
    expect(wrapper).toMatchSnapshot();
  })

  it('should update state with the current user id if there is a current user', () => {
    mockCurrentUser = {id: 1};
    let id = mockCurrentUser.id;
    wrapper = shallow(<CreateProject currentUser={mockCurrentUser}/>)
    
    wrapper.instance().updateCurrentUser();

    expect(wrapper.state('currentUserId')).toEqual(id)
  })

  it('should not update state if there is not a current user', () => {
    mockCurrentUser = {};
    wrapper = shallow(<CreateProject currentUser={mockCurrentUser}/>)
    
    wrapper.instance().updateCurrentUser()

    expect(wrapper.state('currentUserId')).toEqual('')
  })

  it('should delete a resource if the delete button is clicked', () => {
    mockCurrentUser = {id: 1};
    wrapper = shallow(<CreateProject currentUser={mockCurrentUser}/>);

    wrapper.setState({resources: [{name: 'wood'}]});
    expect(wrapper.state('resources')).toHaveLength(1)

    wrapper.find('.delete-material').simulate('click');
    expect(wrapper.state('resources')).toHaveLength(0)

  })

  it('should add a resource if the submit resource button is clicked', () => {
    mockCurrentUser = {id: 1};
    let mockedEvent = { target: {className: 'add-material-button'}, preventDefault: () => {} }
    let newResource = 'wood'
    let resource = { name: newResource}
    wrapper = shallow(<CreateProject currentUser={mockCurrentUser}/>);

    wrapper.setState({ newResource })
    wrapper.instance().addResource(mockedEvent, resource)
    
    expect(wrapper.state('resources')).toHaveLength(1)
  })
}) 