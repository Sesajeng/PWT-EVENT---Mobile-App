import { Component } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {
  email: string = '';
  password: string = '';

  constructor(private firestore: AngularFirestore, private router: Router) {}

  async login() {
    try {
      if (!this.email || !this.password) {
        alert('Email dan password wajib diisi!');
        return;
      }

      // Ambil pengguna berdasarkan email
      const userQuerySnapshot = await this.firestore
        .collection('users', (ref) => ref.where('email', '==', this.email))
        .get()
        .toPromise();

      if (userQuerySnapshot && !userQuerySnapshot.empty) {
        const userDoc = userQuerySnapshot.docs[0];
        const userData: any = userDoc.data();

        // Periksa apakah password cocok
        if (this.password === userData.password) {
          // Simpan informasi pengguna di localStorage
          localStorage.setItem('userId', userDoc.id);  // Simpan hanya userId
          localStorage.setItem('currentUser', JSON.stringify({
            id: userDoc.id,
            email: userData.email,
            role: userData.role,
          }));

          // Redirect berdasarkan role pengguna
          if (userData.role === 'admin') {
            this.router.navigate(['/admin-tabs']);
          } else {
            this.router.navigate(['/user-tabs']);
          }
        } else {
          alert('Password salah!');
        }
      } else {
        alert('Pengguna tidak ditemukan!');
      }
    } catch (error) {
      console.error('Error saat login:', error);
      alert('Gagal login. Silakan coba lagi.');
    }
  }
}
