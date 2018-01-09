import * as _ from 'lodash';
import * as express from 'express';
import * as Joi from 'joi';
import * as path from 'path';

const UserSchema = Joi.object({
  login: Joi.string().min(5).max(25).alphanum(),
  password: Joi.string().min(6).max(30).regex(/^(?=.*[a-zA-Z])(?=.*\W)(?=.*[0-9]).+$/),
  email: Joi.string().email(),
  firstName: Joi.string().min(2).max(30).regex(/^[A-Za-z ]+$/),
  lastName: Joi.string().min(2).max(30).regex(/^[A-Za-z ]+$/),
  profilePicture: Joi.string()
});

const userFormValidate = async (req: express.Request, res: express.Response, next: express.next) => {
  const { login, password, email, firstName, lastName } = req.body;
  let { path: pp = 'upload/default.jpg' }:any = req.file || {};
  const params: any = {};


  pp = _.split(pp, '/');
  pp = _.drop(pp, pp.length - 2 );

  params.login = login;
  params.password = password;
  params.email = email;
  params.firstName = firstName;
  params.lastName = lastName;
  params.profilePicture = `${pp[0]}/${pp[1]}`;
  try {
    const data: any = await Joi.validate(params, UserSchema);
    req.app.locals = { user: { ...data } };
    next();
  } catch (err) {
    next({ type: 'JoiSchema', err });
  };
};

export {
  userFormValidate,
}
