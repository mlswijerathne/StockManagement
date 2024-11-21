using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace api.Dtos.Stock
{
    public class StockDto
    {       
            public int StockId { get; set; }
            public int ProductId {get; set;}

            public string ProductName { get; set; }

            public int StockQuantity { get; set; }

            public decimal UnitPrice { get; set; }
        
        
    }
}