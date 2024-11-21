using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Data;
using api.Dtos.Stock;
using api.Mappers;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace api.Controllers
{
    [Route("api/stock")]
    [ApiController]
    public class StockController : ControllerBase
    {
        private readonly ApplicationDBContext _context;

        public StockController(ApplicationDBContext context)
        {
            _context = context;
        }




        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var stocks = await _context.Stocks.ToListAsync();
            
            var stockDto=stocks.Select(s => s.ToStockDto());

            return Ok(stocks);
        }




        [HttpGet("{id}")]
        public async Task<IActionResult> GetById([FromRoute] int id)
        {
            var stock = await _context.Stocks.FirstOrDefaultAsync(x => x.StockId == id);

            if (stock == null)
            {
                return NotFound();
            }

            return Ok(stock.ToStockDto());
        }



        [HttpPost]
        public async Task<IActionResult> Create([FromBody] CreateStockRequestDto stockDto)
        {
            var stockModel = stockDto.ToStockFromCreateDto();
            await _context.Stocks.AddAsync(stockModel);
            await  _context.SaveChangesAsync();
            return CreatedAtAction(nameof(GetById), new{ id =stockModel.StockId}, stockModel.ToStockDto());
        }


        [HttpPut]
        [Route("{id}")]
        public async Task<IActionResult> Update([FromRoute] int id, [FromBody] UpdateStockRequestDto updateDto)
        {
            var stockModel =await  _context.Stocks.FirstOrDefaultAsync(x => x.StockId == id);
             if (stockModel == null)
             {
                return NotFound();
             }

             stockModel.ProductName = updateDto.ProductName;
             stockModel.StockQuantity = updateDto.StockQuantity;
             stockModel.UnitPrice = updateDto.UnitPrice;

            await _context.SaveChangesAsync();

             return Ok(stockModel.ToStockDto());

        }
        [HttpDelete]
        [Route("{id}")]
        public async Task<IActionResult> Delete([FromRoute] int id)
        {
            var stockModel =await  _context.Stocks.FirstOrDefaultAsync(x => x.StockId == id);
            if(stockModel == null)
            {
                return NotFound();
            }
            _context.Stocks.Remove(stockModel);
            await _context.SaveChangesAsync();

            return NoContent();

        }

    }
}
