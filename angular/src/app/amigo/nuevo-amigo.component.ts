import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import * as esLocale from "date-fns/locale/es";
import * as errorHandler from "../tools/error-handler";
import { Amigo, AmigoService } from "./amigo.service";
import { IErrorController } from "../tools/error-handler";
import * as errorHanlder from "../tools/error-handler";
import { Usuario } from "../usuario/usuario.service";


@Component({
  selector: "app-nuevo-amigo",
  styles: ["/deep/ .ngx-datepicker-input {margin: -6px; margin-left: -10px;} "],
  templateUrl: "./nuevo-amigo.component.html"
})
@Component({
    selector: "app-nuevo-amigo",
    templateUrl: "./nuevo-amigo.component.html"
  })

  export class NuevoAmigoComponent implements OnInit, IErrorController {
    errorMessage: string;
    errors: string[] = [];
    public amigos: Amigo[];
    amigo: Amigo;

    constructor(private amigosService: AmigoService, private route: ActivatedRoute,
      private router: Router) {

    this.amigo = {
      _id: undefined,
      user1: "",
      user1name: "",
      user2: "",
      user2name: "",
      enabled: true,
    };
  }

    ngOnInit() {
      this.amigosService
        .buscarNoAmigos()
        .then(amigos => (this.amigos = amigos))
        .catch(error => (this.errorMessage = <any>error));
    }

  submitForm() {
    errorHanlder.cleanRestValidations(this);
      this.amigosService
        .guardarAmigo(this.amigo)
        .then(usuario => this.router.navigate(["/amigos"]))
        .catch(error => errorHanlder.procesarValidacionesRest(this, error));
    }
  }
