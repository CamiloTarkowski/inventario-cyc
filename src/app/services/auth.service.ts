import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private auth: AngularFireAuth,
    private router: Router) {
  }

  login(email: string, password: string) {
    this.auth
      .signInWithEmailAndPassword(email, password)
      .then((userCredential) => {

        const user = userCredential.user;
        console.log('Usuario autenticado:', user);
      })
      .catch((error) => {

        console.error('Error de inicio de sesión:', error);
      });
  }

  logout(){
    this.auth.signOut().then(() => {
      this.router.navigate(['/login']);
    });
  }

  isLogged(): Observable<boolean> {
    this.auth.onAuthStateChanged((user) => {
      if (user) {
        console.log("entré al if")
        return of(true);
      } else {
        console.log("entre al else")
        return of(false);
      }
    })
    console.log("no entré a ni una weá")
    return of(false);
  }


  getAuthToken(): Observable<boolean>{
    return of(true);
  }
}
