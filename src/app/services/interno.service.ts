import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { User } from '../interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class InternoService {

  constructor() { }

  private control = new BehaviorSubject<string>('0');
  private user = new BehaviorSubject<User>(
    {
      "id_usuario": "7c69ece0-aa71-4317-8166-ae818938d69f",
        "email": "halo-hola@hotmail.com",
        "clave": "rapanui"        
    }
  );

  miControl$ = this.control.asObservable();
  miUser$ = this.user.asObservable();

  getControl(): string {
    return this.control.value;
  }

  setControl(valor: string): void {
    this.control.next(valor);
  }

  getUser(): User {
    return this.user.value;
  }

  setUser(valor: User): void {
    this.user.next(valor);
  }
}
