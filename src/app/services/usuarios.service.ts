import { Injectable } from '@angular/core';
import { Firestore, addDoc, collectionData, doc, deleteDoc, updateDoc, docSnapshots, onSnapshot } from '@angular/fire/firestore';
import { collection } from '@firebase/firestore';
import { Observable, retry } from 'rxjs';
import { Clave } from '../interfaces/claves';
import { Save } from '../interfaces/save';


@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  constructor(private firestore: Firestore) { }

  addId(clave: Clave){
    const claveRef = collection(this.firestore, `user/${clave.email}/clave`);
    return addDoc(claveRef, clave);
  }

  getId(email:String): Observable<Clave[]>{
    const claveRef = collection(this.firestore, `user/${email}/clave`);
    return collectionData(claveRef, {idField: 'id'})  as Observable<Clave[]>;
  }

  deleteId(clave: Clave){
    const claveDocRef = doc(this.firestore,`${clave.email}/clave/${clave.id}`);
    return deleteDoc(claveDocRef);
  }

  editId(pedido: Clave) {
    console.log("id Service: "+pedido.id)
    const pokemonDocumentReference = doc(
      this.firestore,
      `user/${pedido.email}/clave/${pedido.id}`      
    );
    return updateDoc(pokemonDocumentReference, { ...pedido });
    
  }

  /* getUsers(){
   return this.db.collection("user").valueChanges();
  } */

  getUsers(): Observable<any>{
    const claveRef = collection(this.firestore, `user`);
    return collectionData(claveRef, {idField:'user'})  as Observable<any>;
  }

}
