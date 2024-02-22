// Import the getAllUserBuilds function from your buildsAPI.js file
import {useState, useEffect} from 'react';
import { getAllUserBuilds } from '../API/buildsAPI';
import { useAuth } from '../common/AuthenticationProvider';
import Build from './Build'; // Import the Build component if not already imported
import '../SASS/UserBuilds.scss'; // Import the SASS file
import { Container, Typography, Button } from '@mui/material';


function UserBuilds() {
  const { userId } = useAuth(); // Include userId from the authentication context
  const [builds, setBuilds] = useState([]);
  const storedToken = localStorage.getItem('token'); // Retrieve token from local storage

  useEffect(() => {
    // Fetch user builds when userId and token are available
    if (userId && storedToken) {
      getAllUserBuilds(userId, storedToken)
        .then((result) => {
          if (result.success) {
            setBuilds(result.builds);
          } else {
            console.error(result.message);
          }
        })
        .catch((error) => {
          console.error('Error during getAllUserBuilds:', error);
        });
    }
  }, [userId, storedToken]); // Include storedToken in dependencies

  return (
    <Container maxWidth="md" className="builds-container">
      
    <Typography variant="h4" className="builds-header">
        Your Computer Builds
      </Typography>
      
      {builds.map((build) => (
        <Build 
          key={build._id} 
          build={build}
        />
      ))}
    </Container>
  );
}

export default UserBuilds;