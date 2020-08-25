import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class InventarioService {
 public urlMachine: string = "/machine";

  constructor(public angularFire: AngularFirestore) { }

  public getInventory() {
      return this.angularFire.collection(this.urlMachine).snapshotChanges();
  }
}
