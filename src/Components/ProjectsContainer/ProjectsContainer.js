import React from 'react';
import ProjectCard from '../ProjectCard/ProjectCard';
import './ProjectsContainer.css';

export const ProjectsContainer = ({ projects }) => {
  console.log(projects)
  const displayProjects = projects.map(project => {
    return <ProjectCard {...project}
                        key={project.id}
    />
  })

  return(
    <div className='Container'>
      {displayProjects}
    </div>
  )
}