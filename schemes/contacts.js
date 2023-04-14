import Joi from "joi";

const addScheme = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  phone: Joi.string()
    .pattern(/^\(\d{3}\) \d{3}-\d{4}$/)
    .required()
    .messages({
      "string.pattern.base":
        "Номер телефона должен иметь формат (XXX) XXX-XXXX",
    }),
});

export default addScheme;
