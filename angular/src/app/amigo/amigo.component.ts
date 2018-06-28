import { Component, OnInit } from "@angular/core";
import { Amigo, AmigoService } from "./amigo.service";

@Component({
  selector: "app-amigo",
  templateUrl: "./amigo.component.html"
})

export class AmigoComponent implements OnInit {
  errorMessage: string;
  public amigos: Amigo[];

  constructor(private amigosService: AmigoService) { }

  ngOnInit() {
    this.amigosService
      .buscarAmigos()
      .then(amigos => (this.amigos = amigos))
      .catch(error => (this.errorMessage = <any>error));
  }
}




