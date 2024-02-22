function Orders() {
    const [orders, setOrders] = useState([]);

  useEffect(() => {
    async function fetchOrders() {
      try {
        const response = await axios.get('/api/orders');
        setOrders(response.data);
      } catch (err) {
        console.error(err);
      }
    }

    fetchOrders();
  }, []);

  return (
    <div>
      <h2>My Orders</h2>

      {orders.map(order => (
        <Order
          key={order._id}
          order={order}
        />
      ))}

    </div>
  );
}

export default Orders;