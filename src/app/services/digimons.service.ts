import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DigimonsService {
  constructor(private http: HttpClient) { }

  getDigimon(params: any) {
    return this.http.get(environment.baseUrl + environment.characterSize + params)
  }

  getInfoDigimon(params: any) {
    return this.http.get(environment.baseUrl + environment.characterSize, { params })
  }

  getCharacterById(id: string) {
    console.log(id)
    return this.http.get(environment.baseUrl + environment.characterId + id)
  }
}
