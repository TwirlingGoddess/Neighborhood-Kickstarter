import React from 'react';
import UserProjectCard from '../UserProjectCard/UserProjectCard'

export const UserProjectsContainer = ({ userProjects }) => {
  let displayUserProjects = userProjects.map((project, index) => {
    console.log(project)
    return <UserProjectCard {...project}
                           key={index}

    />
  })

  return (
    <div>
      {displayUserProjects}
    </div>
  )
}