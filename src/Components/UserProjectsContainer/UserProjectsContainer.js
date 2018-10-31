import React from 'react';
import UserProjectCard from '../UserProjectCard/UserProjectCard';
import './UserProjectsContainer.css';
import PropTypes from 'prop-types';

export const UserProjectsContainer = ({ userProjects, selectProject, currentUser }) => {
  let displayUserProjects = userProjects.map((project, index) => {
    return <UserProjectCard {...project}
      key={index}
      selectProject={selectProject}
      currentUser={currentUser}

    />;
  });

  return (
    <div className='user-projects-container'>
      {displayUserProjects}
    </div>
  );
};

UserProjectsContainer.propTypes = {
  userProjects: PropTypes.array,
  selectProject: PropTypes.func,
  currentUser: PropTypes.object
};
