import React from 'react';
import Contributions from './Contributions';
import { getProjectsComments, postNewComment } from '../../utilities/apiCalls/apiCalls';
import { shallow } from 'enzyme';

describe('Contributions', () => {
  let wrapper;
  let mockCurrentUser = {};
  let mockCurrentProject = {};

  it('should match the snapshot', () => {
    wrapper = shallow(<Contributions currentUser={mockCurrentUser} currentProject={mockCurrentProject}/>);
    expect(wrapper).toMatchSnapshot();
  });

  it('should update state if there is a current project and it has an id', () => {
    mockCurrentProject = {id: 1, resources: []};
    wrapper = shallow(<Contributions currentUser={mockCurrentUser} currentProject={mockCurrentProject} />);
    wrapper.instance().setCurrentProject();
    expect(wrapper.state('selectedProject')).toEqual(mockCurrentProject);
  });

  it('should not update state if there is no current project id', () => {
    mockCurrentProject = {};
    wrapper = shallow(<Contributions currentUser={mockCurrentUser} currentProject={mockCurrentProject} />);
    wrapper.instance().setCurrentProject();
    expect(wrapper.state('selectedProject')).toEqual({});
  });

  it('should update state when a letter is pressed to add a comment', () => {
    let eventObject = { target: { name: 'comment', value: 'a' } };
    wrapper = shallow(<Contributions currentUser={mockCurrentUser} currentProject={mockCurrentProject} />);
    wrapper.instance().handleChange(eventObject);
    expect(wrapper.state('comment')).toEqual('a');
  });

  it('should return data from fetch', async () => {
    let data = await postNewComment();
    expect(data).toBe(undefined);
  })

  
}); 