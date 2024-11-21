import StockDto from "../dto/stockDto";

export default class StockMapper {
    static ToStockDto(stock) {  // Fixed typo from 'ToSockDto' to 'ToStockDto'
        let stockDto = new StockDto();  // Fixed variable name from 'auctionDto' to 'stockDto'
        stockDto.StockId = stock.StockId;
        stockDto.ProductId = stock.ProductId;
        stockDto.ProductName = stock.ProductName;
        stockDto.StockQuantity = stock.StockQuantity;
        stockDto.UnitPrice = stock.UnitPrice;

        return stockDto;
    }

    static ToStockDtos(stocks) {
        return stocks.map(stock => this.ToStockDto(stock));  // Fixed method name reference
    }

    static FromStockDto(stockDto) {
        return {
            StockId: stockDto.StockId,
            ProductId: stockDto.ProductId,
            ProductName: stockDto.ProductName,
            StockQuantity: stockDto.StockQuantity,
            UnitPrice: stockDto.UnitPrice
        };
    }
}