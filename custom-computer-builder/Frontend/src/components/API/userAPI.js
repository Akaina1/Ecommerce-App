import jwt_decode from 'jwt-decode';

// login function
export async function loginUser(email, password) {
  try {
    const response = await fetch('https://custompc-backend.fly.dev/api/users/login'||'http://localhost:5000/api/users/login' , {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }), // Updated 'username' to 'email'
    });

    if (!response.ok) {
      const errorData = await response.json();
      return { success: false, message: errorData.message || 'userAPI-16-Login failed' };
    }

    const data = await response.json();

    localStorage.setItem('token', data.token);

    // Decode the JWT to get user details
    const decoded = jwt_decode(data.token);

    // Return success with user details
    return { success: true, token: data.token, username: decoded.username, userId: decoded.id };    
  } catch (error) {
    console.error('userAPI-29-Error during login:', error);
    return { success: false, message: 'userAPI-30-Something went wrong' };
  }
}

// Utility function to get userId from stored token
export function getUserIdFromToken() {
    const token = localStorage.getItem('token');
    if (!token) return null;
    const decoded = jwt_decode(token.split(' ')[1]);
    return decoded.id;
}

// register function

// logout function
export const handleLogout = (setIsLoggedIn, setUsername) => {
  localStorage.removeItem('token');
  setIsLoggedIn(false);
  setUsername(''); // Clear the username from state

  // Refresh the page to make sure all parts of the application
  // reflect that the user is logged out.
  window.location.reload();
};