"use strict";

import * as mongoose from "mongoose";

export interface IAmigo extends mongoose.Document {
  name: string;
  user1: mongoose.Schema.Types.ObjectId;
  user1name: string;
  user2: mongoose.Schema.Types.ObjectId;
  user2name: string;
  updated: Number;
  created: Number;
  enabled: Boolean;
}

/**
 * Esquema de Amigos
 */
export let AmigoSchema = new mongoose.Schema({
  name: {
    type: String,
    default: "",
    trim: true,
    required: "Nombre es requerido"
  },
  user1: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User1",
    required: "Usuario es requerido"
  },
  user1name: {
    type: String,
    default: "",
    trim: true,
    required: "Nombre es requerido"
  },
  user2: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User2",
    required: "Usuario es requerido"
  },
  user2name: {
    type: String,
    default: "",
    trim: true,
    required: "Nombre es requerido"
  },
  updated: {
    type: Date,
    default: Date.now()
  },
  created: {
    type: Date,
    default: Date.now()
  },
  enabled: {
    type: Boolean,
    default: true
  }
}, { collection: "amigos" });

/**
 * Antes de guardar
 */
AmigoSchema.pre("save", function (this: IAmigo, next) {
  this.updated = Date.now();

  next();
});

export let Amigo = mongoose.model<IAmigo>("Amigo", AmigoSchema);
