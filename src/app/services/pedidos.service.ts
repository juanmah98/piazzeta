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

  addPedido(pedido: Pedidos){
    const pedidoRef = collection(this.firestore, 'pedidos');
    return addDoc(pedidoRef, pedido);
  }

  getPedidos(): Observable<Pedidos[]>{
    const pedidoRef = collection(this.firestore, 'pedidos');
    return collectionData(pedidoRef, {idField: 'id'})  as Observable<Pedidos[]>;
  }

  deletePedido(pedido: Pedidos){
    const pedidoDocRef = doc(this.firestore,`pedidos/${pedido.id}`);
    return deleteDoc(pedidoDocRef);
  }

  addPedidoListo(pedido: Pedidos){
    const pedidoRef = collection(this.firestore, 'pedidosListos');
    return addDoc(pedidoRef, pedido);
  }

  getPedidosListo(): Observable<Pedidos[]>{
    const pedidoRef = collection(this.firestore, 'pedidosListos');
    return collectionData(pedidoRef, {idField: 'id'})  as Observable<Pedidos[]>;
  }

  deletePedidoListo(pedido: Pedidos){
    const pedidoDocRef = doc(this.firestore,`pedidosListos/${pedido.id}`);
    return deleteDoc(pedidoDocRef);
  }

  editPedido(pedido: Pedidos) {
    console.log("id Service: "+pedido.id)
    const pokemonDocumentReference = doc(
      this.firestore,
      `pedidos/${pedido.id}`      
    );
    return updateDoc(pokemonDocumentReference, { ...pedido });
  }

  editPedidoListo(pedido: Pedidos) {
    console.log("id Service: "+pedido.id)
    const pokemonDocumentReference = doc(
      this.firestore,
      `pedidosListos/${pedido.id}`      
    );
    return updateDoc(pokemonDocumentReference, { ...pedido });
  }

  addTotalDia(pedido: Save){
    const pedidoRef = collection(this.firestore,`${pedido.day.replace(/\//g, "")}`);
    return addDoc(pedidoRef, pedido);
  }

  getTotalDia(pedido: String): Observable<Save[]>{
    
    const pedidoRef = collection(this.firestore, `${pedido}`);
    return collectionData(pedidoRef, {idField: 'id'})  as Observable<Save[]>;
  }
}
