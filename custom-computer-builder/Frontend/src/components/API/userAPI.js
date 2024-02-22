import jwt_decode from 'jwt-decode';

// login function///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
export async function loginUser(email, password) {
  try {
    const response = await fetch('https://custompc-backend.fly.dev/api/users/login'||'http://localhost:5000/api/users/login' , {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      return { success: false, message: errorData.message || 'userAPI-16-Login failed' };
    }

    const data = await response.json();

    localStorage.setItem('token', data.token);

    // Decode the JWT to get user details
    const decoded = jwt_decode(data.token);

    // Return success with user details, including email
    return {
      success: true,
      token: data.token,
      username: decoded.username,
      userId: decoded.id,
    };    
  } catch (error) {
    console.error('userAPI-29-Error during login:', error);
    return { success: false, message: 'userAPI-36-Something went wrong' };
  }
}

// Utility function to get userId from stored token////////////////////////////////////////////////////////////////////////////////////////////////////////
export function getUserIdFromToken() {
    const token = localStorage.getItem('token');
    if (!token) return null;
    const decoded = jwt_decode(token.split(' ')[1]);
    return decoded.id;
}

// register function///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
export async function registerUser(username, email, password) {
  try {
    const response = await fetch('https://custompc-backend.fly.dev/api/users/register' || 'http://localhost:5000/api/users/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, email, password }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      return { success: false, message: errorData.email || 'userAPI-16-Registration failed' };
    }

    const data = await response.json();

    // Return success with user details
    return { success: true, user: data };
  } catch (error) {
    console.error('userAPI-32-Error during registration:', error);
    return { success: false, message: 'userAPI-33-Something went wrong' };
  }
}
// logout function///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
export const handleLogout = (setIsLoggedIn, setUsername) => {
  localStorage.removeItem('token');
  setIsLoggedIn(false);
  setUsername(''); // Clear the username from state

  // Refresh the page to make sure all parts of the application
  // reflect that the user is logged out.
  window.location.reload();
};
// find user function///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
export async function getUserById(userId, token) {
  try {
    const response = await fetch(`https://custompc-backend.fly.dev/api/users/${userId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      return { success: false, message: errorData.message || 'Failed to fetch user information' };
    }

    const data = await response.json();
    return { success: true, userInfo: { email: data.email } };
  } catch (error) {
    console.error('Error during getUserInfo:', error);
    return { success: false, message: 'Something went wrong while fetching user information' };
  }
}