import React from 'react';
import UserProjectCard from '../UserProjectCard/UserProjectCard';
import './UserProjectsContainer.css'

export const UserProjectsContainer = ({ userProjects, selectProject, currentUser }) => {
  let displayUserProjects = userProjects.map((project, index) => {
    return <UserProjectCard {...project}
                           key={index}
                           selectProject={selectProject}
                           currentUser={currentUser}

    />
  })

  return (
    <div className='user-projects-container'>
      {displayUserProjects}
    </div>
  )
}