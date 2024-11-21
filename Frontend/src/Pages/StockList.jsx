import React, { useState, useEffect } from 'react';
import { 
  Container, 
  Paper, 
  Typography, 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow,
  Button,
  IconButton,
  Box
} from '@mui/material';
import { Delete as DeleteIcon, Edit as EditIcon } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import StockViewModel from '../ViewModels/StockViewModel';

const StockListPage = () => {
  const [stocks, setStocks] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchStocks();
  }, []);

  const fetchStocks = async () => {
    try {
      const stocksData = await StockViewModel.getStocks();
      console.log('Stocks fetched:', stocksData);
      setStocks(stocksData);
    } catch (error) {
      console.error('Detailed fetch stocks error:', error);
      setError(error.message || 'Failed to load stocks. Please try again later.');
    }
  };

  const handleDelete = async (stockId) => {
    if (window.confirm('Are you sure you want to delete this stock?')) {
      try {
        await StockViewModel.deleteStock(stockId);
        fetchStocks(); // Refresh the list
      } catch (error) {
        console.error('Delete stock error:', error);
        setError('Failed to delete stock. Please try again.');
      }
    }
  };

  const handleEdit = (stockId) => {
    navigate(`/stocks/update/${stockId}`); // Fixed URL construction
  };

  const handleCreateNew = () => {
    navigate('/stocks/create');
  };

  return (
    <Container maxWidth="lg">
      <Paper elevation={3} sx={{ padding: 3, marginTop: 4 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 3 }}>
          <Typography variant="h4" component="h1">
            Stock List
          </Typography>
          <Button 
            variant="contained" 
            color="primary" 
            onClick={handleCreateNew}
          >
            Create New Stock
          </Button>
        </Box>

        {error && (
          <Typography color="error" sx={{ marginBottom: 2 }}>
            {error}
          </Typography>
        )}

        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Product ID</TableCell>
                <TableCell>Product Name</TableCell>
                <TableCell align="right">Stock Quantity</TableCell>
                <TableCell align="right">Unit Price</TableCell>
                <TableCell align="center">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {stocks.length > 0 ? (
                stocks.map((stock, index) => (
                  <TableRow key={`${stock.stockId || stock.StockId || index}`}>
                    <TableCell>{stock.productId || stock.ProductId}</TableCell>
                    <TableCell>{stock.productName || stock.ProductName}</TableCell>
                    <TableCell align="right">{stock.stockQuantity || stock.StockQuantity}</TableCell>
                    <TableCell align="right">
                      ${Number(stock.unitPrice || stock.UnitPrice).toFixed(2)}
                    </TableCell>
                    <TableCell align="center">
                      <IconButton 
                        color="primary" 
                        onClick={() => handleEdit(stock.stockId || stock.StockId)}
                        size="small"
                      >
                        <EditIcon />
                      </IconButton>
                      <IconButton 
                        color="error" 
                        onClick={() => handleDelete(stock.stockId || stock.StockId)}
                        size="small"
                      >
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={5} align="center">
                    No stocks found
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Container>
  );
};

export default StockListPage;