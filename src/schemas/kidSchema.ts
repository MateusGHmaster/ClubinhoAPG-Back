import Joi, { boolean, string } from 'joi';

export const kidSchema = Joi.object({
    
    name: Joi.string().required(),
    birthDate: Joi.string().required(),
    guardianId: Joi.number().required()

});

export const guardianSchema = Joi.object({

    guardianName: Joi.string().required(),
    guardianPhone: Joi.number().required()

});

export const presenceSchema = Joi.object({

    kidId: Joi.number().required(),
    date: Joi.string().required(),
    isPresent: Joi.boolean().required()

});