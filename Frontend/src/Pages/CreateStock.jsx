import React, { useState } from 'react';
import { 
  Container, 
  TextField, 
  Button, 
  Typography, 
  Box, 
  Paper,
  Snackbar,
  Alert
} from '@mui/material';
import StockViewModel from '../ViewModels/StockViewModel';
import { useNavigate } from 'react-router-dom';

const CreateStockPage = () => {
  const [formData, setFormData] = useState({
    ProductId: '',
    ProductName: '',
    StockQuantity: '',
    UnitPrice: ''
  });
  const [errors, setErrors] = useState({});
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'error' });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: null }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const stockData = {
      ...formData,
      StockQuantity: Number(formData.StockQuantity),
      UnitPrice: Number(formData.UnitPrice)
    };

    try {
      const result = await StockViewModel.createStock(stockData);
      if (result.error) {
        const validationErrors = {};
        result.error.details?.forEach(err => {
          validationErrors[err.path[0]] = err.message;
        });
        setErrors(validationErrors);
        setSnackbar({
          open: true,
          message: 'Please correct the errors in the form.',
          severity: 'error'
        });
      } else {
        setSnackbar({
          open: true,
          message: 'Stock created successfully!',
          severity: 'success'
        });
        setTimeout(() => navigate('/stocks'), 1500);
      }
    } catch (error) {
      console.error('Stock creation failed:', error);
      setSnackbar({
        open: true,
        message: error.message || 'Failed to create stock. Please try again.',
        severity: 'error'
      });
    }
  };

  const handleSnackbarClose = () => {
    setSnackbar(prev => ({ ...prev, open: false }));
  };

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} sx={{ padding: 3, marginTop: 14 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Create New Stock
        </Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <TextField
            label="Product ID"
            name="ProductId"
            value={formData.ProductId}
            onChange={handleChange}
            error={!!errors.ProductId}
            helperText={errors.ProductId}
            fullWidth
            required
          />
          <TextField
            label="Product Name"
            name="ProductName"
            value={formData.ProductName}
            onChange={handleChange}
            error={!!errors.ProductName}
            helperText={errors.ProductName}
            fullWidth
            required
          />
          <TextField
            label="Stock Quantity"
            name="StockQuantity"
            type="number"
            value={formData.StockQuantity}
            onChange={handleChange}
            error={!!errors.StockQuantity}
            helperText={errors.StockQuantity}
            fullWidth
            required
          />
          <TextField
            label="Unit Price"
            name="UnitPrice"
            type="number"
            step="0.01"
            value={formData.UnitPrice}
            onChange={handleChange}
            error={!!errors.UnitPrice}
            helperText={errors.UnitPrice}
            fullWidth
            required
          />
          <Button 
            type="submit" 
            variant="contained" 
            color="primary" 
            fullWidth
            size="large"
          >
            Create Stock
          </Button>
        </Box>
      </Paper>
      <Snackbar 
        open={snackbar.open} 
        autoHideDuration={6000} 
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert onClose={handleSnackbarClose} severity={snackbar.severity}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default CreateStockPage;