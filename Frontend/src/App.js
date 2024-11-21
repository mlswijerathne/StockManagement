import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CreateStockPage from './Pages/CreateStock';
import StockListPage from './Pages/StockList';
import UpdateStockPage from './Pages/UpdateStock';
import { ThemeProvider, createTheme } from '@mui/material/styles';

const theme = createTheme();

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Routes>
        
          <Route path="/stocks" element={<StockListPage />} />
          <Route path="/stocks/create" element={<CreateStockPage />} />
          <Route path="/stocks/update/:stockId" element={<UpdateStockPage />} />

          <Route path="/" element={<StockListPage />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;