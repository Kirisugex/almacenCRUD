import React, { useState } from 'react';
import { Modal, Box, TextField, Button, Alert } from '@mui/material';
import api from '../services/api';

const EditProductModal = ({ open, handleClose, product, refreshProducts }) => {
  const [name, setName] = useState(product.name);
  const [description, setDescription] = useState(product.description);
  const [price, setPrice] = useState(product.price);
  const [stock, setStock] = useState(product.stock);
  const [error, setError] = useState('');

  const handleSave = () => {
    api.put(`/products/${product.id}`, { name, description, price, stock })
      .then(response => {
        refreshProducts();
        handleClose();
      })
      .catch(error => {
        console.error('Error updating product:', error);
        setError('Failed to update product. Please try again.');
      });
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <Box sx={{ display: 'flex', flexDirection: 'column', p: 3, bgcolor: 'background.paper', margin: 'auto', maxWidth: 400 }}>
        <h2>Edit Product</h2>
        {error && <Alert severity="error">{error}</Alert>}
        <TextField
          value={name}
          onChange={(e) => setName(e.target.value)}
          label="Name"
          fullWidth
          margin="normal"
        />
        <TextField
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          label="Description"
          fullWidth
          margin="normal"
        />
        <TextField
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          label="Price"
          type="number"
          fullWidth
          margin="normal"
        />
        <TextField
          value={stock}
          onChange={(e) => setStock(e.target.value)}
          label="Stock"
          type="number"
          fullWidth
          margin="normal"
        />
        <Box mt={2} display="flex" justifyContent="space-between">
          <Button variant="contained" color="primary" onClick={handleSave}>
            Save
          </Button>
          <Button variant="contained" color="secondary" onClick={handleClose}>
            Cancel
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default EditProductModal;
