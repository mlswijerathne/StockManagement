using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;

namespace api.Dtos.Stock
{
    public class UpdateStockRequestDto
    {
            public string ProductName { get; set; }

            public int StockQuantity { get; set; }

            [Range(0.01, double.MaxValue, ErrorMessage = "Unit Price must be greater than zero.")]
            public decimal UnitPrice { get; set; }
    }
}