export const getNeighborhoods = async() => {
  const response = await fetch('https://guarded-garden-68388.herokuapp.com/api/v1/neighborhoods');
  const neighborhoods = await response.json();
  return neighborhoods
}