using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Dtos.Stock;
using api.models;

namespace api.Mappers
{
    public static class StockMappers
    {
        public static StockDto ToStockDto(this Stock stockModel)
        {
            return new StockDto
            {
                StockId = stockModel.StockId,
                ProductId = stockModel.ProductId,
                ProductName = stockModel.ProductName,
                StockQuantity = stockModel.StockQuantity,
                UnitPrice = stockModel.UnitPrice,
                

            };
        }

        public static Stock ToStockFromCreateDto(this CreateStockRequestDto stockDto)
        {
            return new Stock
            {
                ProductId = stockDto.ProductId,
                ProductName = stockDto.ProductName,
                StockQuantity = stockDto.StockQuantity,
                UnitPrice = stockDto.UnitPrice
                
            };
        }

        
    }
}