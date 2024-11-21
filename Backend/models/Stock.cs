using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace api.models
{
    public class Stock
        {
            [Key]
            public int StockId { get; set; } // Unique identifier for the stock item

            public int ProductId {get; set;}

            [Required(ErrorMessage = "Product Name is required.")]
            [StringLength(100)]
            public string ProductName { get; set; }

            public int StockQuantity { get; set; }

            public decimal UnitPrice { get; set; }

        }
}