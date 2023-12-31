import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(public auth: AngularFireAuth,
    private router: Router) {
  }

  login(email: string, password: string) {
    this.auth
      .signInWithEmailAndPassword(email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log('Usuario autenticado:', user);
        this.router.navigate(['']);
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

  async isLogged(): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
      this.auth.onAuthStateChanged((user) => {
        if (user) {
          console.log("Usuario autenticado: ",user);
          resolve(true);
        } else {
          resolve(false);
        }
      });
    });
  }

}
