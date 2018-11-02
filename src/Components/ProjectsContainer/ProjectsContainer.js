import React from 'react';
import ProjectCard from '../ProjectCard/ProjectCard';
import './ProjectsContainer.css';
import PropTypes from 'prop-types';

export const ProjectsContainer = ({ projects, selectProject, allUsers }) => {
  let displayProjects = projects.map(project => {
    let userInfo = allUsers.find(user => {
      return user.id === project.owner_id;
    });
    return <ProjectCard 
      {...project}
      {...userInfo}
      selectProject={selectProject}
      key={project.id}
    />;
  });
  if (projects.length) {
    return (
      <div className='Container'>
        {displayProjects}
      </div>
    );
  } else {
    return (
      <div>
        <h1>No projects in this neighborhood</h1>
      </div>
    );
  }
};

ProjectsContainer.propTypes = {
  projects: PropTypes.array,
  selectProject: PropTypes.func,
  allUsers: PropTypes.array
};