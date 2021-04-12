import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { baseURL } from "../../app/apiURL/baseURL";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AnalizarService {

  constructor(private http: HttpClient) { }

  ejecutar(codigo: any): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };
    return this.http.post<any>(baseURL + 'analizar', codigo, httpOptions);
  }

}
