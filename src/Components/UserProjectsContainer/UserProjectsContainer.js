import React from 'react';
import UserProjectCard from '../UserProjectCard/UserProjectCard'

export const UserProjectsContainer = ({ userProjects, selectProject }) => {
  let displayUserProjects = userProjects.map((project, index) => {
    console.log(project)
    return <UserProjectCard {...project}
                           key={index}
                           selectProject={selectProject}

    />
  })

  return (
    <div>
      {displayUserProjects}
    </div>
  )
}