import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class UsuariosService {
  

  private apiUrl = 'https://qesyeoifdwtcehlbwmfw.supabase.co/rest/v1/usuarios';
  private apiKey = environment.supabaseKey; // Reemplaza con tu API key
  private apiKeyUser = environment.userkey; // Reemplaza con tu API key


  constructor(private http: HttpClient) {}

  getUsers(): Observable<any> {
    const headers = this.getHeaders();
    return this.http.get(this.apiUrl, { headers });
  }

  getEmails(): Observable<any> {
    const headers = this.getHeaders();
    const params = new HttpParams().set('select', 'email');
    return this.http.get(`${this.apiUrl}`, { headers, params });
  }

  getClaves(): Observable<any> {
    const headers = this.getHeaders();
    const params = new HttpParams().set('select', 'clave');
    return this.http.get(`${this.apiUrl}`, { headers, params });
  }

  postUser(data: any): Observable<any> {
    const headers = this.getHeaders();
    return this.http.post(this.apiUrl, data, { headers });
  }

  updateUser(someValue: string, otherValue: string): Observable<any> {
    const headers = this.getHeaders();

    const updateData = {
      clave: otherValue,
    };

    const queryParams = new HttpParams().set('email', `eq.${someValue}`);

    return this.http.patch(this.apiUrl, updateData, { headers, params: queryParams });
  }

  private getHeaders(): HttpHeaders {
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'apikey': this.apiKey,
      'Authorization': 'Bearer ' + this.apiKey,
      'Prefer': 'return=minimal',
    });
  }

  

}
