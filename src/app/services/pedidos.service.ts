import { Injectable } from '@angular/core';
import { Firestore, addDoc, collectionData, doc, deleteDoc, updateDoc } from '@angular/fire/firestore';
import { collection } from '@firebase/firestore';
import { Observable } from 'rxjs';
import { Pedidos } from '../interfaces/pedido';
import { Save } from '../interfaces/save';

@Injectable({
  providedIn: 'root'
})
export class PedidosService {

  constructor(private firestore: Firestore) { }

  addPedido(pedido: Pedidos, email: string){
    const pedidoRef = collection(this.firestore, `user/${email}/pedidos`);
    return addDoc(pedidoRef, pedido);
  }

  getPedidos(email: string): Observable<Pedidos[]>{
    const pedidoRef = collection(this.firestore, `user/${email}/pedidos`);
    return collectionData(pedidoRef, {idField: 'id'})  as Observable<Pedidos[]>;
  }

  deletePedido(pedido: Pedidos, email: string){
    const pedidoDocRef = doc(this.firestore,`user/${email}/pedidos/${pedido.id}`);
    return deleteDoc(pedidoDocRef);
  }

  addPedidoListo(pedido: Pedidos, email:string){
    const pedidoRef = collection(this.firestore, `user/${email}/pedidosListos`);
    return addDoc(pedidoRef, pedido);
  }

  getPedidosListo(email:string): Observable<Pedidos[]>{
    const pedidoRef = collection(this.firestore, `user/${email}/pedidosListos`);
    return collectionData(pedidoRef, {idField: 'id'})  as Observable<Pedidos[]>;
  }

  deletePedidoListo(pedido: Pedidos, email:string){
    const pedidoDocRef = doc(this.firestore,`user/${email}/pedidosListos/${pedido.id}`);
    return deleteDoc(pedidoDocRef);
  }

  editPedido(pedido: Pedidos, email:string) {
    console.log("id Service: "+pedido.id)
    const pokemonDocumentReference = doc(
      this.firestore,
      `user/${email}/pedidos/${pedido.id}`      
    );
    return updateDoc(pokemonDocumentReference, { ...pedido });
  }

  editPedidoListo(pedido: Pedidos, email:string) {
    console.log("id Service: "+pedido.id)
    const pokemonDocumentReference = doc(
      this.firestore,
      `user/${email}/pedidosListos/${pedido.id}`      
    );
    return updateDoc(pokemonDocumentReference, { ...pedido });
  }

  addTotalDia(pedido: Save, email:string){
    const pedidoRef = collection(this.firestore,`user/${email}/${pedido.day.replace(/\//g, "")}`);
    return addDoc(pedidoRef, pedido);
  }

  getTotalDia(pedido: String, email:string): Observable<Save[]>{
    
    const pedidoRef = collection(this.firestore, `user/${email}/${pedido}`);
    return collectionData(pedidoRef, {idField: 'id'})  as Observable<Save[]>;
  }
}
