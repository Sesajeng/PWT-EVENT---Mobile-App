import { Component, OnInit } from '@angular/core';
import { AppService } from '../../services/auth.service';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-user',
  templateUrl: './user.page.html',
  styleUrls: ['./user.page.scss'],
})
export class UserPage implements OnInit {
  categories: any[] = [];
  searchTerm: string = '';  // Menyimpan kata kunci pencarian
  filteredEvents: any[] = [];
  allEvents: any[] = [];  // Menyimpan semua event untuk pencarian
  selectedCategoryId: string | null = null;  // Menyimpan ID kategori yang dipilih

  constructor(private appService: AppService, private navCtrl: NavController) {}

  ngOnInit() {
    this.loadCategories();
    this.loadEvents();
  }

  // Memuat kategori event
  loadCategories() {
    this.appService.getCategories().subscribe((data) => {
      this.categories = data.map((c) => {
        const category = c.payload.doc.data() as any;
        return { id: c.payload.doc.id, ...category };
      });
    });
  }

  // Memuat semua event untuk pencarian
  loadEvents() {
    this.appService.getEvents().subscribe((data) => {
      this.allEvents = data.map((e) => {
        const event = e.payload.doc.data() as any;
        return { id: e.payload.doc.id, ...event };
      });
      this.filteredEvents = this.allEvents;  // Menampilkan semua event awalnya
    });
  }

  // Fungsi untuk filter event berdasarkan kategori dan pencarian
  filterEvents() {
    let filtered = this.allEvents;

    // Filter berdasarkan kategori yang dipilih
    if (this.selectedCategoryId) {
      filtered = filtered.filter(event => event.categoryId === this.selectedCategoryId);
    }

    // Filter berdasarkan kata kunci pencarian
    if (this.searchTerm && this.searchTerm.trim() !== '') {
      filtered = filtered.filter(event =>
        event.name.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    }

    this.filteredEvents = filtered;
  }

  // Navigasi ke halaman Event dengan Filter berdasarkan Kategori
  viewEventsByCategory(categoryId: string, categoryName: string) {
    this.selectedCategoryId = categoryId;  // Menyimpan kategori yang dipilih
    this.filterEvents();  // Memfilter event berdasarkan kategori yang dipilih
    this.navCtrl.navigateForward(['/event-list-user'], {
      queryParams: { categoryId, categoryName }
    });
  }
}
