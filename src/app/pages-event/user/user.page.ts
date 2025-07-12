import { Component, OnInit } from '@angular/core';
import { AppService } from '../../services/auth.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.page.html',
  styleUrls: ['./user.page.scss'],
})
export class UserPage implements OnInit {
  events: any[] = [];
  categories: any[] = [];

  constructor(private appService: AppService) {}

  ngOnInit() {
    this.loadCategories();
    this.loadEvents();
  }

  loadCategories() {
    this.appService.getCategories().subscribe((data) => {
      this.categories = data.map((c) => {
        const category = c.payload.doc.data() as any;
        return { id: c.payload.doc.id, ...category };
      });
    });
  }

  loadEvents() {
    this.appService.getEvents().subscribe((data) => {
      this.events = data.map((event) => {
        return {
          ...event,
          categoryName: this.getCategoryName(event.categoryId),
        };
      });
    });
  }
  

  getCategoryName(categoryId: string): string {
    const category = this.categories.find((cat) => cat.id === categoryId);
    return category ? category.name : 'Unknown Category';
  }
}
