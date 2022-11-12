import { Injectable } from '@angular/core';
import { Firestore, addDoc, collectionData, doc, deleteDoc, updateDoc, docSnapshots, onSnapshot } from '@angular/fire/firestore';
import { collection } from '@firebase/firestore';
import { Observable, retry } from 'rxjs';
import { Clave } from '../interfaces/claves';
import { EmailStorage } from '../interfaces/email';
import { Save } from '../interfaces/save';


@Injectable({
  providedIn: 'root'
})
export class UsuariosService {
  

  constructor(private firestore: Firestore) { }


  addUser(clave: EmailStorage){    
    const claveRef = collection(this.firestore, `user`);
    return addDoc(claveRef, clave);
  }

  getUser(): Observable<EmailStorage[]>{
    const claveRef = collection(this.firestore, `user`);
    return collectionData(claveRef, {idField: 'id'})  as Observable<EmailStorage[]>;
  }

  addId(clave: Clave, email:EmailStorage){
    const claveRef = collection(this.firestore, `user/${email.id}/clave`);
    return addDoc(claveRef, clave);
  }

  getId(id:string): Observable<Clave[]>{
    const claveRef = collection(this.firestore, `user/${id}/clave`);
    return collectionData(claveRef, {idField: 'id'})  as Observable<Clave[]>;
  }

  deleteId(clave: Clave, email:EmailStorage){
    const claveDocRef = doc(this.firestore,`user/${email.id}/clave/${clave.id}`);
    return deleteDoc(claveDocRef);
  }

  editId(pedido: Clave, email:EmailStorage) {
    console.log("id Service: "+pedido.id)
    const pokemonDocumentReference = doc(
      this.firestore,
      `user/${email.id}/clave/${pedido.id}`      
    );
    return updateDoc(pokemonDocumentReference, { ...pedido });
    
  }

}
