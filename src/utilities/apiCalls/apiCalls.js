export const getNeighborhoods = async () => {
  try {
    const response = await fetch('https://guarded-garden-68388.herokuapp.com/api/v1/neighborhoods');
    const neighborhoods = await response.json();
    return neighborhoods;
  } catch (error) {
    throw new Error(error.message)
  }
};

export const getProjects = async () => {
  try {
    const response = await fetch('https://guarded-garden-68388.herokuapp.com/api/v1/projects');
    const projects = await response.json();
    return projects;
  } catch (error) {
    throw new Error(error.message)
  }
};

export const getNeighborhoodProjectsById = async (id) => {
  try {
    const response = await fetch(`https://guarded-garden-68388.herokuapp.com/api/v1/neighborhoods/${id}`);
    const neighborhoodProjects = await response.json();
    return neighborhoodProjects;
  } catch (error) {
    throw new Error(error.message)
  }
};

export const getUserProjects = async (userId) => {
  try {
    const response = await fetch(`https://guarded-garden-68388.herokuapp.com/api/v1/users/${userId}/projects`);
    const userProjects = await response.json();
    return userProjects;
  } catch (error) {
    throw new Error(error.message)
  }
};

export const getAllUsers = async () => {
  try {
    const response = await fetch(`https://guarded-garden-68388.herokuapp.com/api/v1/users`);
    const users = await response.json();
    return users;
  } catch (error) {
    throw new Error(error.message)
  }
};

export const getProjectsComments = async (id) => {
  try {
    const response = await fetch(`https://guarded-garden-68388.herokuapp.com/api/v1/projects/${id}/comments`);
    const comments = response.json();
    return comments;
  } catch (error) {
    throw new Error(error.message)
  }
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