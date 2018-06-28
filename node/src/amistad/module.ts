"use strict";

import { Express } from "express";
import * as passport from "passport";
import * as amigo from "./amigo.service";

export function init(app: Express) {
  // Rutas de acceso a amigos
  app
    .route("/amigo")
    .get(passport.authenticate("jwt", { session: false }), amigo.findByCurrentUser)
    .post(passport.authenticate("jwt", { session: false }), amigo.findByID, amigo.crearAmigo);

  app
    .route("/nuevoAmigo")
    .get(passport.authenticate("jwt", { session: false }), amigo.findUsers)
    .post(passport.authenticate("jwt", { session: false }), amigo.findByID, amigo.crearAmigo);

}
