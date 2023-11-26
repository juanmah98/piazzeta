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
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'apikey': this.apiKey,
      'Authorization': 'Bearer ' + this.apiKey,
    });

    return this.http.get(this.apiUrl, { headers });
  }

  // Método para obtener usuarios con columnas específicas
  getEmails(): Observable<any> {
    const headers = new HttpHeaders({
      'apikey': this.apiKey,
      'Authorization': 'Bearer ' + this.apiKey,
    });

    // Construir parámetros de consulta con HttpParams
    const params = new HttpParams().set('select', 'email');

    return this.http.get(`${this.apiUrl}`, { headers, params });
  }

   // Método para realizar la solicitud POST
   postUser(data: any): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'apikey': this.apiKey,
      'Authorization': 'Bearer ' + this.apiKey,
      'Prefer': 'return=minimal',
    });

    return this.http.post(this.apiUrl, data, { headers });
  }

}
