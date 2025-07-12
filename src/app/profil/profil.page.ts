import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.page.html',
  styleUrls: ['./profil.page.scss'],
})
export class ProfilPage implements OnInit {
  user: any;  // Menyimpan data pengguna
  userId: string = ''; // Menyimpan ID pengguna sementara

  constructor(private router: Router, private firestore: AngularFirestore) {}

  ngOnInit() {
    // Ambil userId dari localStorage
    this.userId = localStorage.getItem('userId') || '';  
    console.log('User ID dari LocalStorage:', this.userId);  // Debugging: Pastikan userId benar

    if (this.userId) {
      this.loadUser(this.userId);  // Memanggil fungsi untuk mengambil data pengguna
    } else {
      console.warn('User belum login!');
      this.router.navigate(['/login']);  // Jika tidak ada userId, arahkan ke halaman login
    }
  }

  // Fungsi untuk mengambil data pengguna berdasarkan userId
  async loadUser(userId: string) {
    console.log('Mengambil data untuk ID user:', userId);  // Debugging: Pastikan userId yang benar

    try {
      // Mengambil dokumen pengguna dari Firestore menggunakan userId
      const userDoc = await this.firestore.collection('users').doc(userId).get().toPromise();
      console.log('Dokumen Firestore:', userDoc); // Debugging: Cek apakah dokumen ditemukan

      // Pastikan userDoc tidak undefined
      if (userDoc && userDoc.exists) {
        // Ambil data pengguna dari dokumen Firestore
        this.user = userDoc.data();  // Ini harus menggunakan `data()`
        console.log('Data pengguna berhasil diambil:', this.user);  // Debugging: Pastikan data yang diambil benar

        // Jika created_at adalah timestamp, kita bisa mengubahnya menjadi objek Date jika perlu
        if (this.user && this.user.created_at) {
          this.user.created_at = this.user.created_at.toDate();  // Konversi timestamp ke Date
        }
      } else {
        console.warn('User tidak ditemukan di Firestore!');
        this.router.navigate(['/login']);  // Jika tidak ada data pengguna, arahkan ke login
      }
    } catch (error) {
      console.error('Gagal mengambil data user:', error);  // Debugging: Cek jika ada error
      this.router.navigate(['/login']);  // Jika terjadi kesalahan, arahkan ke login
    }
  }

  // Fungsi logout
  logout() {
    console.log('Melakukan logout...');
    localStorage.removeItem('userId');  // Menghapus userId dari localStorage
    this.router.navigate(['/login']);  // Arahkan kembali ke halaman login
  }
}
