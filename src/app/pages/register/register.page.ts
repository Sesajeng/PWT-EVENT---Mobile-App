import { Component } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage {
  email: string = '';
  password: string = '';
  role: string = '';

  constructor(private firestore: AngularFirestore, private router: Router) {}

  async register() {
    try {
      if (!this.email || !this.password || !this.role) {
        alert('Semua field wajib diisi!');
        return;
      }

      const userId = this.firestore.createId(); // Generate ID unik
      const userData = {
        id: userId,
        email: this.email,
        password: this.password, // Password tanpa hashing
        role: this.role,
        created_at: new Date().toISOString(),
      };

      // Simpan data ke Firestore
      await this.firestore.collection('users').doc(userId).set(userData);

      alert('Registrasi berhasil!');
      this.router.navigate(['/login']); // Redirect ke login
    } catch (error) {
      console.error('Error saat registrasi:', error);
      alert('Gagal registrasi.');
    }
  }
}
