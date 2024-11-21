import StockMapper from "../mappers/StockMapper";
import StockService from '../services/stockService';
import { validateCreateStockDto } from "../dto/createStockDto";
import { validateUpdateStockDto } from "../dto/updateStockDto";

export default class StockViewModel {
    static async createStock(createStockDto) {
        const validationError = validateCreateStockDto(createStockDto);
        if (validationError) {
            return { error: validationError };
        }

        return await StockService.createStock(createStockDto);
    }

    static async getStocks() {
        try {
            const stocks = await StockService.getStocks();
            console.log('Raw stocks from service:', stocks);
            
            return stocks;
        } catch (error) {
            console.error('Error in getStocks ViewModel:', error);
            throw error;
        }
    }

    static async getStock(stockId) {
        const stock = await StockService.getStock(stockId);
        return StockMapper.ToStockDto(stock);
    }
    
    static async updateStock(stockId, updateStockDto) {
        // Validate the DTO before sending
        const validationError = validateUpdateStockDto(updateStockDto);
        if (validationError) {
            return { error: validationError };
        }
    
        try {
            return await StockService.updateStock(stockId, updateStockDto);
        } catch (error) {
            // Parse the error message which is now a JSON string
            try {
                const parsedError = JSON.parse(error.message);
                return { error: parsedError };
            } catch {
                // If parsing fails, return the original error
                return { error: { message: error.message } };
            }
        }
    }
    static async deleteStock(stockId) {
        return await StockService.deleteStock(stockId);
    }
}