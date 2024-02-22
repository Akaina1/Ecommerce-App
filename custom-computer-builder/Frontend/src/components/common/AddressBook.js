function AddressBook() {
    const [addresses, setAddresses] = useState([]);

  useEffect(() => {
    async function fetchAddresses() {
      try {
        const response = await axios.get('/api/addresses');
        setAddresses(response.data);
      } catch (err) {
        console.error(err);
      }
    }

    fetchAddresses();
  }, []);

  return (
    <div>
      <h2>Address Book</h2>

      {addresses.map(address => (
        <Address
          key={address._id}
          address={address}
        />
      ))}

    </div>
  );
}

export default AddressBook;