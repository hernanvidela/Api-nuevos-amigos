import { Injectable } from "@angular/core";
import { Http } from "@angular/http";
import "rxjs/add/operator/toPromise";
import { RestBaseService } from "../tools/rest.tools";

@Injectable()
export class AmigoService extends RestBaseService {
  private url = "/amigo";

  constructor(private http: Http) {
    super();
  }

  buscarAmigos(): Promise<Amigo[]> {
    return this.http
      .get(AmigoService.serverUrl + this.url, this.getRestHeader())
      .toPromise()
      .then(response => {
        return response.json() as Amigo[];
      })
      .catch(this.handleError);
  }

  buscarNoAmigos(): Promise<Amigo[]> {
    return this.http
      .get(AmigoService.serverUrl + "/nuevoAmigo", this.getRestHeader())
      .toPromise()
      .then(response => {
        return response.json() as Amigo[];
      })
      .catch(this.handleError);
  }

   buscarAmigo(id: number): Promise<Amigo> {
    return this.http
      .get(AmigoService.serverUrl + this.url + "/" + id, this.getRestHeader())
      .toPromise()
      .then(response => {
        return response.json() as Amigo;
      })
      .catch(this.handleError);
  }

  guardarAmigo(value: Amigo): Promise<Amigo> {
    if (value._id) {
      return this.http
        .put(
          AmigoService.serverUrl + this.url + "/" + value._id,
          JSON.stringify(value),
          this.getRestHeader()
        )
        .toPromise()
        .then(response => {
          return response.json() as Amigo;
        })
        .catch(this.handleError);
    } else {
      return this.http
        .post(
          AmigoService.serverUrl + this.url,
          JSON.stringify(value),
          this.getRestHeader()
        )
        .toPromise()
        .then(response => {
          return response.json() as Amigo;
        })
        .catch(this.handleError);
    }
  }
}

export interface Amigo {
  _id: string;
  user1: string;
  user1name: string;
  user2: string;
  user2name: string;
  enabled: boolean;
}
