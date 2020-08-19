import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { User } from 'firebase';

@Injectable()
export class AuthService {
  public user: User;

  constructor(public angularFireAuth: AngularFireAuth) { }

  login(email: string, password: string) {
    const result = this.angularFireAuth.signInWithEmailAndPassword(email, password);
    return result;
  }

  register(email: string, password: string) {
    const result = this.angularFireAuth.createUserWithEmailAndPassword(email, password);
    return result;
  }

  logout() {
    this.angularFireAuth.signOut();
  }

  resetPassword(email:string):Promise<void> {
    const result = this.angularFireAuth.sendPasswordResetEmail(email);
    return result;
  }
}
