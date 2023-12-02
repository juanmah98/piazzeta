import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class ComandasService {

  private apiUrl = 'https://qesyeoifdwtcehlbwmfw.supabase.co/rest/v1/comandas';
  private apiKey = environment.supabaseKey; // Reemplaza con tu API key
  private apiKeyUser = environment.userkey; // Reemplaza con tu API key


  constructor(private http: HttpClient) {}

  getComandas(): Observable<any> {
    const headers = this.getHeaders();
    return this.http.get(this.apiUrl, { headers });
  }

  postComanda(data: any): Observable<any> {
    const headers = this.getHeaders();
    return this.http.post(this.apiUrl, data, { headers });
  }

  updateComanda(someValue: string, otherValue: boolean): Observable<any> {
    const headers = this.getHeaders();

    const updateData = {
      estado: otherValue,
    };

    const queryParams = new HttpParams().set('id_comanda', `eq.${someValue}`);

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
