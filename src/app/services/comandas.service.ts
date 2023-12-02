import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
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
  
  private supabase: SupabaseClient;
  private comandaSubject = new Subject<any>();
  private _currentUser: BehaviorSubject<boolean | User | any> = new BehaviorSubject(null)


  constructor(private http: HttpClient) {
    this.supabase = createClient(this.apiUrl, this.apiKey)

    // Manually load user session once on page load
    // Note: This becomes a promise with getUser() in the next version!
    const user = this.supabase.auth.getUser()
    if (user) {
      this._currentUser.next(user)
    } else {
      this._currentUser.next(false)
    }

    this.supabase.auth.onAuthStateChange((event, session) => {
      if (event == 'SIGNED_IN') {
        this._currentUser.next(session!.user)
      } else {
        this._currentUser.next(false)
        /* this.router.navigateByUrl('/', { replaceUrl: true }) */
      }
    })
  }

  getTableChanges() {
    const changes = new Subject();
    this.supabase
      .from('mi_tabla')
      
      .select();

    return changes.asObservable();
  }



  getComanda(): Observable<any> {
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
