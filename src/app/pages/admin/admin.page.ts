import { Component } from '@angular/core';
import { AppService } from '../../services/auth.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.page.html',
  styleUrls: ['./admin.page.scss'],
})
export class AdminPage {
  newCategoryName = '';
  categories: any[] = [];

  constructor(private appService: AppService) {
    this.loadCategories();
  }

  // Load categories
  loadCategories() {
    this.appService.getCategories().subscribe((res) => {
      this.categories = res.map((c) => ({
        id: c.payload.doc.id,
        ...(c.payload.doc.data() as any),
      }));
    });
  }

  // Add category
  addCategory() {
    if (this.newCategoryName.trim() !== '') {
      this.appService.createCategory({ name: this.newCategoryName }).then(() => {
        this.newCategoryName = '';
      });
    }
  }

  // Edit category
  editCategory(category: any) {
    const newName = prompt('Enter new name:', category.name);
    if (newName && newName.trim() !== '') {
      this.appService.updateCategory(category.id, { name: newName });
    }
  }

  // Delete category
  deleteCategory(id: string) {
    if (confirm('Are you sure you want to delete this category?')) {
      this.appService.deleteCategory(id);
    }
  }
}
