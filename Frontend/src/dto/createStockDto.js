import joi from 'joi';

class CreateStockDto {
    ProductId ="";
    ProductName ="";
    StockQuantity ="";
    UnitPrice ="";
}

export function validateCreateStockDto(createStockDto){
  const schema = joi.object({
    ProductId: joi.string().required().messages({
      'string.empty': 'Product Id cannot be empty',
      'any.required': 'Product Id is required'
    }),
    ProductName: joi.string().required().messages({
      'string.empty': 'Product Name cannot be empty',
      'any.required': 'Product Name is required'
    }),
    StockQuantity: joi.number().required().messages({
      'number.empty': 'Stock Quantity cannot be empty',
      'any.required': 'Stock Quantity is required'
    }),
    UnitPrice: joi.number().required().messages({
      'number.empty': 'Unit Price cannot be empty',
      'any.required': 'Unit Price is required'
    })
  });

  const validationResults = schema.validate(createStockDto, {abortEarly: false});
  return validationResults.error;
}
export default CreateStockDto;