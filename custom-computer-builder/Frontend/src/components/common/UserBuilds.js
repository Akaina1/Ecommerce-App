function UserBuilds() {
    const [builds, setBuilds] = useState([]);

  useEffect(() => {
    async function fetchBuilds() {
      try {
        const response = await axios.get('/api/builds');
        setBuilds(response.data);
      } catch (err) {
        console.error(err);
      }
    }

    fetchBuilds();
  }, []);

  return (
    <div>
      <h2>My Computer Builds</h2>

      {builds.map(build => (
        <Build
          key={build._id}
          build={build}
        />
      ))}

    </div>
  );
}

export default UserBuilds;