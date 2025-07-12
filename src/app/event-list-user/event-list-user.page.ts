import { Component, OnInit } from '@angular/core';
import { ActivatedRoute,Router } from '@angular/router';
import { AppService } from '../services/auth.service';

@Component({
  selector: 'app-event-list',
  templateUrl: './event-list-user.page.html',
  styleUrls: ['./event-list-user.page.scss'],
})
export class EventListUserPage implements OnInit {
  events: any[] = [];
  filteredEvents: any[] = [];
  selectedCategoryId: string | undefined;
  selectedCategoryName: string | undefined;

  constructor(
    private route: ActivatedRoute,
    private appService: AppService,
    private router: Router
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      this.selectedCategoryId = params['categoryId'];
      this.selectedCategoryName = params['categoryName'];

      if (this.selectedCategoryId && this.selectedCategoryName) {
        this.loadEvents();
      } else {
        console.error('Invalid category parameters');
      }
    });
  }

  loadEvents() {
    this.appService.getEvents().subscribe((data) => {
      this.events = data.map((e) => ({
        id: e.payload.doc.id,
        ...e.payload.doc.data(),
      }));
      this.filteredEvents = this.events.filter(
        (event) => event.categoryId === this.selectedCategoryId
      );
      console.log('Filtered Events:', this.filteredEvents); // Debugging log
    });
  }
  goToTicketDetail(event: any) {
    console.log('Navigating to ticket detail for event:', event);  // Debugging log
    if (event.id) {
      this.router.navigate(['/ticket-detail'], {
        queryParams: {
          eventId: event.id,         // Pastikan event.id ada
          categoryId: event.categoryId,
          categoryName: event.name
        }
      });
    } else {
      console.error('event.id is missing or invalid!');
    }
  }
  
  
}
