export const getNeighborhoods = async () => {
  const response = await fetch('https://guarded-garden-68388.herokuapp.com/api/v1/neighborhoods');
  const neighborhoods = await response.json();
  return neighborhoods
}

export const getProjects = async () => {
  const response = await fetch('https://guarded-garden-68388.herokuapp.com/api/v1/projects');
  const projects = await response.json();
  return projects
}

export const getNeighborhoodsById = async (id) => {
  const response = await fetch(`https://guarded-garden-68388.herokuapp.com/api/v1/neighborhoods/${id}`);
  const neighborhoodProjects = await response.json();
  return neighborhoodProjects
}

export const getUserProjects = async (userId) => {
  const response = await fetch(`https://guarded-garden-68388.herokuapp.com/api/v1/users/${userId}/projects`);
  const userProjects = await response.json();
  return userProjects
}

export const postNewProject = async (newProject, id) => {
  let userId = id
  try {
    await fetch(`https://guarded-garden-68388.herokuapp.com/api/v1/users/${userId}/projects`, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(newProject)
    })
  } catch (error) {
    throw new Error(error.message);
  }
}