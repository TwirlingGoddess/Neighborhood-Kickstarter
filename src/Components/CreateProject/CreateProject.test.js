import React from 'react';
import CreateProject from './CreateProject';
import { postNewProject } from '../../utilities/apiCalls/apiCalls';
import { shallow } from 'enzyme';

describe('CreateProject', () => {
  let wrapper;
  let mockCurrentUser = {};

  it('should match the snapshot', () => {
    wrapper = shallow(<CreateProject currentUser={mockCurrentUser}/>);
    expect(wrapper).toMatchSnapshot();
  });

  it('should update state with the current user id if there is a current user', () => {
    mockCurrentUser = {id: 1};
    let id = mockCurrentUser.id;
    wrapper = shallow(<CreateProject currentUser={mockCurrentUser}/>);
    wrapper.instance().updateCurrentUser();
    expect(wrapper.state('currentUserId')).toEqual(id);
  });

  it('should not update state if there is not a current user', () => {
    mockCurrentUser = {};
    wrapper = shallow(<CreateProject currentUser={mockCurrentUser}/>);
    wrapper.instance().updateCurrentUser();
    expect(wrapper.state('currentUserId')).toEqual('');
  });

  it('should update state with the input information', () => {
    mockCurrentUser = {id: 1};
    let mockEvent = {target: {name: 'title', value: 'Yaassss'}};
    let userInput = 'Yaassss';
    wrapper = shallow(<CreateProject currentUser={mockCurrentUser}/>);
    wrapper.instance().handleChange(mockEvent);
    expect(wrapper.state('title')).toEqual(userInput);
  });

  it('should call handleSubmit when the submit button is clicked', () => {
    const mockUser = {id: 1}
    let mockedEvent = { target: {className: 'add-material-button'}, preventDefault: () => {} };
    let newResource = 'wood';
    let resource = { name: newResource};
    wrapper = shallow(<CreateProject currentUser={mockCurrentUser}/>);
    wrapper.setState({ newResource })
    wrapper.find('.submit-project-button').simulate('submit')
    wrapper.instance().handleSubmit(mockedEvent, resource)
    expect(wrapper.state('resources')).toHaveLength(0);
  })

  it('should return data from postNewProject fetch', async () => {
    const expected = undefined
    mockCurrentUser = {id: 1};
    let newResource = 'wood';
    let resource = { name: newResource};
    const mockProject= {
          title: 'Love',
          description: 'Never lasts',
          photo: 'https://apod.nasa.gov/apod/image/1811/CaliforniaNebula_Falls_960.jpg',
          resources: [ resource, resource ]
        }    
    let data = await postNewProject(mockProject, mockCurrentUser);
    expect(data).toEqual(undefined);
  });

  it('should add a resource if the submit resource button is clicked', () => {
    mockCurrentUser = {id: 1};
    let mockedEvent = { target: {className: 'add-material-button'}, preventDefault: () => {} };
    let newResource = 'wood';
    let resource = { name: newResource};
    wrapper = shallow(<CreateProject currentUser={mockCurrentUser}/>);
    wrapper.setState({ newResource });
    wrapper.instance().addResource(mockedEvent, resource);
    expect(wrapper.state('resources')).toHaveLength(1);
  });

  it('should delete a resource if the delete button is clicked', () => {
    mockCurrentUser = {id: 1};
    wrapper = shallow(<CreateProject currentUser={mockCurrentUser}/>);
    wrapper.setState({resources: [{name: 'wood'}]});
    expect(wrapper.state('resources')).toHaveLength(1);
    wrapper.find('.delete-material').simulate('click');
    expect(wrapper.state('resources')).toHaveLength(0);
  });

  it('should upload an image file when file upload input is clicked', () => {
    mockCurrentUser = {id: 1};
    const initial = ''
    const expected = 'https://apod.nasa.gov/apod/image/1811/CaliforniaNebula_Falls_960.jpg'
    wrapper = shallow(<CreateProject currentUser={mockCurrentUser}/>);
    expect(wrapper.state('photo')).toEqual(initial);
    wrapper.find('.choose-file').simulate('click');
    wrapper.setState({photo: expected});
    expect(wrapper.state('photo')).toEqual(expected);
  })

}); 