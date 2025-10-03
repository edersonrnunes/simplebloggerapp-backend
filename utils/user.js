import { User } from "../models/user.js";

export function getUserByEmail(request) {
  return User.findOne({
    email: { $eq: request.body.email },
  });
}

export function getUserByActivationToken(request) {
  return User.findOne({
    activationToken: { $eq: request.params.activationToken },
  });
}

export function getUserByRandomString(request) {
  return User.findOne({
    randomString: { $eq: request.params.randomString },
  });
}
