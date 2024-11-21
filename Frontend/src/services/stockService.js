import API from './api';

export default class StockService {
    static async createStock(createStockDto) {
        try {
            const response = await API.post('/stock', createStockDto);
            return response.data;
        } catch (error) {
            console.error('API Error:', error);
            throw error;
        }
    }

    static async getStocks() {
        try {
            const response = await API.get('/stock');
            console.log('API Response:', response);
            return response.data;
        } catch (error) {
            console.error('API Error:', error);
            throw error;
        }
    }

    static async getStock(stockId) {
        try {
            const response = await API.get(`/stock/${stockId}`);
            return response.data;
        } catch (error) {
            console.error('API Error:', error);
            throw error;
        }
    }

    static async updateStock(stockId, updateStockDto) {
        try {
            console.log('Sending update request:', {
                stockId: stockId,
                data: updateStockDto
            });

            const response = await API.put(`/stock/${stockId}`, updateStockDto);
            return response.data;
        } catch (error) {
            // More detailed error logging and handling
            console.error('Detailed Update Stock API Error:', {
                fullError: error.response?.data || error,
                status: error.response?.status,
                responseData: error.response?.data,
                requestData: updateStockDto,
                message: error.message,
                config: error.config
            });

            // Extract and format error details
            if (error.response && error.response.data) {
                const errorData = error.response.data;
                
                // Handle specific validation error format
                if (errorData.errors) {
                    const formattedErrors = Object.entries(errorData.errors).map(([key, errorArray]) => ({
                        path: [key],
                        message: errorArray[0] // Take first error message
                    }));

                    throw new Error(JSON.stringify({
                        message: errorData.title || 'Validation Error',
                        details: formattedErrors
                    }));
                }

                // Fallback to generic error
                throw new Error(errorData.message || 'Failed to update stock');
            }

            // Generic error if no specific response
            throw new Error(error.message || 'Failed to update stock');
        }
    }

    static async deleteStock(stockId) {
        const response = await API.delete(`/stock/${stockId}`);
        return response.data;
    }
}