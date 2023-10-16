import jwt_decode from 'jwt-decode';

// login function
export async function loginUser(email, password) {
  try {
    const response = await fetch('http://localhost:5000/api/users/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }), // Updated 'username' to 'email'
    });

    const data = await response.json();

    if (data.success) {
      localStorage.setItem('token', data.token);
      window.location.reload(); // Refresh the page
      return { success: true, token: data.token };
    } else {
      return { success: false, message: 'Login failed' };
    }
  } catch (error) {
    console.error('Error during login:', error);
    return { success: false, message: 'Something went wrong' };
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