import Joi from 'joi';

export const signUpSchema = Joi.object({
    
    name: Joi.string().required(),
    username: Joi.string().required(),
    password: Joi.string().min(3).required(),
    passwordConfirmation: Joi.valid(Joi.ref('password')).required()

});

export const loginSchema = Joi.object({

    username: Joi.string().required(),
    password: Joi.string().required()

});