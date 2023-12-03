import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { BehaviorSubject, Observable, Subject, interval, switchMap } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { createClient, SupabaseClient, Subscription, User } from '@supabase/supabase-js';
import { Router } from '@angular/router'


@Injectable({
  providedIn: 'root'
})
export class ComandasService {

  private apiUrl = 'https://qesyeoifdwtcehlbwmfw.supabase.co/rest/v1/comandas';
  private apiKey = environment.supabaseKey; // Reemplaza con tu API key
  private apiKeyUser = environment.userkey; // Reemplaza con tu API key
  
  private comandaSubject = new Subject<any>();
  private _currentUser: BehaviorSubject<boolean | User | any> = new BehaviorSubject(null)


  constructor(private http: HttpClient) {
    
  }

  getComanda(): Observable<any> {
    const headers = this.getHeaders();

    // Intervalo de tiempo para la solicitud periódica (por ejemplo, cada 5 segundos)
    const pollingInterval = 500; // en milisegundos

    return interval(pollingInterval).pipe(
      switchMap(() => this.http.get(this.apiUrl, { headers }))
    );
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
