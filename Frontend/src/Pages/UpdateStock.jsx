import React, { useState, useEffect } from 'react'; 
import { useParams, useNavigate } from 'react-router-dom'; 
import { 
  Container, 
  TextField, 
  Button, 
  Typography, 
  Box, 
  Paper,
  Snackbar,
  Alert,
  CircularProgress
} from '@mui/material';
import StockViewModel from '../ViewModels/StockViewModel';

const UpdateStockPage = () => {
  const { stockId } = useParams();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    ProductName: '',
    StockQuantity: '',
    UnitPrice: ''
  });
  
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [snackbar, setSnackbar] = useState({ 
    open: false, 
    message: '', 
    severity: 'error' 
  });

  useEffect(() => {
    const fetchStockData = async () => {
      if (!stockId) {
        setSnackbar({
          open: true,
          message: 'No stock ID provided',
          severity: 'error'
        });
        return;
      }

      try {
        setIsLoading(true);
        const stockData = await StockViewModel.getStock(stockId);
        
        setFormData({
          ProductName: stockData.ProductName || '',
          StockQuantity: stockData.StockQuantity?.toString() || '',
          UnitPrice: stockData.UnitPrice?.toString() || ''
        });
      } catch (error) {
        console.error('Failed to fetch stock data:', error);
        setSnackbar({
          open: true,
          message: error.response?.data?.message || 'Failed to load stock details',
          severity: 'error'
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchStockData();
  }, [stockId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear specific field error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: null }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.ProductName.trim()) {
      newErrors.ProductName = 'Product Name is required';
    }

    const stockQuantity = Number(formData.StockQuantity);
    if (isNaN(stockQuantity)) {
      newErrors.StockQuantity = 'Stock Quantity must be a number';
    } else if (stockQuantity < 0) {
      newErrors.StockQuantity = 'Stock Quantity cannot be negative';
    }

    const unitPrice = Number(formData.UnitPrice);
    if (isNaN(unitPrice)) {
      newErrors.UnitPrice = 'Unit Price must be a number';
    } else if (unitPrice < 0) {
      newErrors.UnitPrice = 'Unit Price cannot be negative';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!stockId) {
      setSnackbar({
        open: true,
        message: 'Stock ID is missing',
        severity: 'error'
      });
      return;
    }

    if (!validateForm()) {
      setSnackbar({
        open: true,
        message: 'Please correct the errors in the form.',
        severity: 'error'
      });
      return;
    }

    const stockData = {
      ProductName: formData.ProductName.trim(),
      StockQuantity: Number(formData.StockQuantity),
      UnitPrice: Number(formData.UnitPrice)
    };

    try {
      setIsLoading(true);
      const result = await StockViewModel.updateStock(stockId, stockData);
      
      if (result.error) {
        const validationErrors = {};
        
        if (result.error.details) {
          result.error.details.forEach(err => {
            validationErrors[err.path[0]] = err.message;
          });
          setErrors(validationErrors);
        }
        
        setSnackbar({
          open: true,
          message: result.error.message || 'Please correct the errors in the form.',
          severity: 'error'
        });
      } else {
        setSnackbar({
          open: true,
          message: 'Stock updated successfully!',
          severity: 'success'
        });
        
        setTimeout(() => navigate('/stocks'), 1500);
      }
    } catch (error) {
      console.error('Update submission error:', error);
      setSnackbar({
        open: true,
        message: error.message || 'Failed to update stock. Please try again.',
        severity: 'error'
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSnackbarClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackbar({ ...snackbar, open: false });
  };

  if (isLoading) {
    return (
      <Container sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh' }}>
        <CircularProgress />
      </Container>
    );
  }

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} sx={{ padding: 3, marginTop: 14 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Update Stock
        </Typography>
        <Box 
          component="form" 
          onSubmit={handleSubmit} 
          sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}
        >
          <TextField
            label="Product Name"
            name="ProductName"
            value={formData.ProductName}
            onChange={handleChange}
            error={!!errors.ProductName}
            helperText={errors.ProductName}
            fullWidth
            required
            disabled={isLoading}
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
            disabled={isLoading}
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
            disabled={isLoading}
          />
          <Button 
            type="submit" 
            variant="contained" 
            color="primary" 
            fullWidth
            size="large"
            disabled={isLoading}
          >
            {isLoading ? 'Updating...' : 'Update Stock'}
          </Button>
          <Button 
            variant="contained" 
            color="#1234"
            fullWidth
            size="large"
            onClick={() => navigate('/stocks')}
            disabled={isLoading}
          >
            Cancel
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

export default UpdateStockPage;