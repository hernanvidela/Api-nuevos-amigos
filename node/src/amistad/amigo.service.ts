"use strict";

import * as escape from "escape-html";
import * as express from "express";
import { NextFunction } from "express-serve-static-core";
import { IUserSessionRequest } from "../security/security.service";
import * as errorHandler from "../utils/error.handler";
import { IAmigo, Amigo } from "./amigo.schema";
import { IUser, User, UserSchema } from "../security/user.schema";
import { notEqual } from "assert";
import * as mongoose from "mongoose";


export interface IReadRequest extends IUserSessionRequest {
  amigo: IAmigo;
}
export function read(req: IReadRequest, res: express.Response) {
  res.json(req.amigo);
}

export interface IUserRequest extends express.Request {
  users: IUser[];
  name: string;
  _id: mongoose.Schema.Types.ObjectId;
}

export interface IUpdateRequest extends IUserSessionRequest {
  amigo: IAmigo;
}
/*
export function validateUpdate(req: IUpdateRequest, res: express.Response, next: NextFunction) {
  if (req.body.name) {
    req.check("name", "Hasta 256 caracteres solamente.").isLength({ max: 256 });
    req.sanitize("name").escape();
  }
  req.getValidationResult().then(function (result) {
    if (!result.isEmpty()) {
      return errorHandler.handleExpressValidationError(res, result);
    }
    next();
  });
}*/
export function crearAmigo(req: IUpdateRequest, res: express.Response) {
 /* let user2 = req.user;
  let amigo = req.amigo;
  if (!amigo) {
    amigo = new Amigo();
    amigo.name = amigo.name;
    amigo.user1 = req.user._id;
    amigo.user1name = "hola";
    amigo.user2 = user2._id;
    amigo.user2name = user2.name;
    amigo.enabled = true;

  }
  amigo.save(function (err: any) {
    if (err) return errorHandler.handleError(res, err);
    res.json(amigo);
  });
  */
}

export interface IRemoveRequest extends IUserSessionRequest {
  amigo: IAmigo;
}
export function remove(req: IRemoveRequest, res: express.Response) {
  const amigo = <IAmigo>req.amigo;

  amigo.enabled = false;
  amigo.save(function (err: any) {
    if (err) return errorHandler.handleError(res, err);

    res.send();
  });
}

export function findByCurrentUser(req: IUserRequest, res: express.Response, next: NextFunction) {
  Amigo.find({
    $or: [
      { $and: [{ user1: req.user._id }] },
      { $and: [{ user2: req.user._id }] },
    ]
  }).exec(function (err, amigos) {
    if (err) return next();
    const amigos2: IAmigo[] = [];
    amigos.forEach(a => {
      const nuevoAmigo = new Amigo;
      if (a.user1 != req.user._id) {
        nuevoAmigo.name = a.user1name;
        amigos2.push(nuevoAmigo);
      } else {
        nuevoAmigo.name = a.user2name;
        amigos2.push(nuevoAmigo);
      }
    });
    res.json(amigos2);
  });
}

export function findUsers(req: IUserRequest, res: express.Response, next: NextFunction) {
  User.find({
  }).exec(function (err, users) {
    if (err) return next();
    const users2: IUser[] = [];
    users.forEach(a => {
      const nuevoUser = new User;
      if (a._id == req.user._id) {
        users2.push();
      } else {
        nuevoUser.name = a.name;
        users2.push(nuevoUser);
      }
    });
    res.json(users2);
  });
}

export interface IFindByIdRequest extends express.Request {
  amigo: IAmigo;
}
export function findByID(req: IFindByIdRequest, res: express.Response, next: NextFunction) {
  const user2name = req.params.user2name;
  // const id = req.params.user2;

  User.findOne({
    name: user2name,
    // _id: escape(id),
    enabled: true
  },
    function (err, user) {
      if (err) return errorHandler.handleError(res, err);

      if (!user) {
        return errorHandler.sendError(res, errorHandler.ERROR_NOT_FOUND, "No se pudo cargar el usuario " + " + id");
      }

      req.user = user;
      next();
    });
}


export interface IValidateOwnerRequest extends IUserSessionRequest {
  amigo: IAmigo;
}
export function validateOwner(req: IValidateOwnerRequest, res: express.Response, next: NextFunction) {
  if (!((req.amigo.user1 as any).equals(req.user._id))) {
    return errorHandler.sendError(res, errorHandler.ERROR_UNAUTHORIZED_METHOD, "User is not authorized");
  }
  next();
}

