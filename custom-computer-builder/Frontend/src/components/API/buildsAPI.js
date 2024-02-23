// get all builds for user
export async function getAllUserBuilds(userId, token) {
    try {
      const response = await fetch(`https://custompc-backend.fly.dev/api/builds/user/${userId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `${token}`,
        },
      });  
      if (!response.ok) {
        console.error('Fetch failed with status:', response.status);
        return { success: false, message: 'Failed to fetch user builds' };
      }
  
      try {
        const data = await response.json();
        return { success: true, builds: data };
      } catch (error) {
        console.error('Error parsing JSON:', error);
        return { success: false, message: 'Invalid JSON response from server' };
      }
    } catch (error) {
      console.error('Error during fetch:', error);
      return { success: false, message: 'Failed to make the fetch request' };
    }
  }
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// fetch specific build by Id
export async function getBuildById(buildId, token) {
  try {
    const response = await fetch(`https://custompc-backend.fly.dev/api/builds/${buildId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `${token}`,
      }
    });

    if(!response.ok) {
      console.error('Fetch failed with status:', response.status);
      return { success: false, message: 'Failed to fetch build' };
    }

    try {
      const data = await response.json();
      return { success: true, build: data };
    } catch (error) {
      console.error('Error parsing JSON:', error);
      return { success: false, message: 'Invalid JSON response from server' };
    }
  } catch (error) {
    console.error('Error during fetch:', error);
    return { success: false, message: 'Failed to make the fetch request' };
  }
}