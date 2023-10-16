import React from 'react';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { handleAddToCart } from '../API/cartAPI';
import { getUserIdFromToken } from '../API/userAPI';

function ProductModal({ open, onClose, product }) {
  // Function that adds the product to the cart
  const onAddToCart = async () => {
    const userId = getUserIdFromToken();
    if (!userId) {
      console.error("User is not logged in");
      return;
    }
    const productId = product._id;
    const response = await handleAddToCart(userId, productId, 1); // Assuming quantity as 1 for now
    window.location.reload(); // Refresh the page

    if (response) {
      console.log("Product added to cart:", response);
    }
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box className="product-modal-content">
        <IconButton onClick={onClose} style={{ float: 'right' }}>
          <CloseIcon />
        </IconButton>

        <Typography variant="h5">{product.name}</Typography>
        <img src={product.imageUrl || 'default-image-path.jpg'} alt={product.name} />
        <Typography variant="body2">Category: {product.category}</Typography>
        <Typography variant="body2">Tags: {product.productTags?.join(", ")}</Typography>
        <Typography variant="body2">Price: ${product.price.toFixed(2)}</Typography>
        <Typography variant="body2">Stock Quantity: {product.stockQuantity}</Typography>
        {product.onSale && <Typography variant="body2" color="primary">On Sale</Typography>}
        <button onClick={onAddToCart}>Add to Cart</button> 
      </Box>
    </Modal>
  );
}

export default ProductModal;