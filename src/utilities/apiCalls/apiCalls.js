export const getNeighborhoods = async () => {
  const response = await fetch('https://guarded-garden-68388.herokuapp.com/api/v1/neighborhoods');
  const neighborhoods = await response.json();
  return neighborhoods;
};

export const getProjects = async () => {
  const response = await fetch('https://guarded-garden-68388.herokuapp.com/api/v1/projects');
  const projects = await response.json();
  return projects;
};

export const getNeighborhoodProjectsById = async (id) => {
  const response = await fetch(`https://guarded-garden-68388.herokuapp.com/api/v1/neighborhoods/${id}`);
  const neighborhoodProjects = await response.json();
  return neighborhoodProjects;
};

export const getUserProjects = async (userId) => {
  const response = await fetch(`https://guarded-garden-68388.herokuapp.com/api/v1/users/${userId}/projects`);
  const userProjects = await response.json();
  return userProjects;
};

export const getAllUsers = async () => {
  const response = await fetch(`https://guarded-garden-68388.herokuapp.com/api/v1/users`);
  const users = await response.json();
  return users;
};

export const getProjectsComments = async (id) => {
  const response = await fetch(`https://guarded-garden-68388.herokuapp.com/api/v1/projects/${id}/comments`);
  const comments = response.json();
  return comments;
};

export const addNewUser = async (user) => {
  try {
    const response = await fetch(`https://guarded-garden-68388.herokuapp.com/api/v1/google_users`, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(user)
    });
    const currentUser = await response.json();
    return currentUser;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const addNewUserLocal = async (user) => {
  try {
    const response = await fetch('https://guarded-garden-68388.herokuapp.com/api/v1/users', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(user)
    });
    const currentUser = await response.json();
    return currentUser;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const postNewProject = async (newProject, id) => {
  try {
    await fetch(`https://guarded-garden-68388.herokuapp.com/api/v1/users/${id}/projects`, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(newProject)
    });
  } catch (error) {
    throw new Error(error.message);
  }
};

export const postNewComment = async (content, projectId) => {
  try { 
    await fetch(`https://guarded-garden-68388.herokuapp.com/api/v1/projects/${projectId}/comments`, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(content)
    });
  } catch (error) {
    throw new Error(error.message);
  }
};

export const editPostedProject = async (project, id) => {
  try {
    await fetch(`https://guarded-garden-68388.herokuapp.com/api/v1/projects/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(project)
    });
  } catch (error) {
    throw new Error(error.message);
  }
};

export const sendEmailConfirmation = async (user) => {
  try {
    await fetch(`https://shrieking-chupacabra-95509.herokuapp.com/api/v1/notification`, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(user)
    });
  } catch (error) {
    throw new Error(error.message);
  }
};