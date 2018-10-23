import React from 'react';
const fakeArray = [
  {name: 'Fix my door', id: 1, email: 'Terry@aol.com', owner: 'Terry', description: 'Fix my door', materials:['nails', 'hammer', 'eggs']},
  {name: 'Fix roof', id: 2, email: 'Bob@aol.com', owner: 'Bob', description: 'Fix roof', materials:['nails', 'hammer', 'eggs']},
  {name: 'Fix my yard', id: 3, email: 'Jenny@aol.com', owner: 'Jenny', description: 'Fix my yard', materials:['nails', 'hammer', 'eggs']},
  {name: 'Paint my door', id: 4, email: 'Tom@aol.com', owner: 'Tom', description: 'Paint my door', materials:['nails', 'hammer', 'eggs']},
  {name: 'Fix my table', id: 5, email: 'Rita@aol.com', owner: 'Rita', description: 'Fix my table', materials:['nails', 'hammer', 'eggs']},
  {name: 'Carry my soil', id: 6, email: 'Brenda@aol.com', owner: 'Brenda', description: 'Carry my soil', materials:['nails', 'hammer', 'eggs']},
  {name: 'Fix my squeeky stairs', id: 7, email: 'John@aol.com', owner: 'John', description: 'Fix my squeeky stairs', materials:['nails', 'hammer', 'eggs']}
]

export const ProjectsContainer = () => {
  const displayProjects = fakeArray.map(project => {
    return <ProjecCards {...project}
                        key={project.id}
                        addNeeds={addNeeds}
    />
  })

  return(
    <div>
      {displayProjects}
    </div>
  )
}