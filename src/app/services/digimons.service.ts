import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DigimonsService {
  constructor(private http: HttpClient) { }

  /*** Get para obtener los Digimons ***/
  getDigimon(params: any) {
    return this.http.get(environment.baseUrl + environment.characterSize + params)
  }

  /*** Get para obtener la informacion de un Digimon por su id ***/
  getCharacterById(id: string) {
    return this.http.get(environment.baseUrl + environment.characterId + id)
  }
}
