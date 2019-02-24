import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class CurrencyService {

  constructor( private _http: HttpClient) { }

  getValues() {
    return this._http.get('http://localhost:3010/')
  }
}
