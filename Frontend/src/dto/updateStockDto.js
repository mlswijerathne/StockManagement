import joi from 'joi';

class UpdateStockDto {
    ProductId = "";
    ProductName = "";
    StockQuantity = "";
    UnitPrice = "";
}

export function validateUpdateStockDto(updateStockDto){
  const schema = joi.object({

    ProductName: joi.string().optional().messages({
      'string.empty': 'Product Name cannot be empty'
    }),
    StockQuantity: joi.number().optional().messages({
      'number.empty': 'Stock Quantity cannot be empty'
    }),
    UnitPrice: joi.number().optional().messages({
      'number.empty': 'Unit Price cannot be empty'
    })
  });

  const validationResults = schema.validate(updateStockDto, {abortEarly: false});
  return validationResults.error;
}

export default UpdateStockDto;