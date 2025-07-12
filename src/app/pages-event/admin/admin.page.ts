import { Component, OnInit } from '@angular/core';
import { AppService } from '../../services/auth.service'; // Import your service

@Component({
  selector: 'app-admin',
  templateUrl: './admin.page.html',
  styleUrls: ['./admin.page.scss'],
})
export class AdminPage implements OnInit {
  events: any[] = [];
  categories: any[] = [];
  newEvent = {
    id: '', // Add ID for edit mode
    categoryId: '',
    name: '',
    date: '',
    location: '',
    ticketPrice: 0,
    ticketStock: 0,
  };
  isEditMode = false; // Flag to distinguish between add/edit modes

  constructor(private appService: AppService) {}

  ngOnInit() {
    this.loadEvents();
    this.loadCategories();
  }

  // Load all events from Firestore
  loadEvents() {
    this.appService.getEvents().subscribe((data) => {
      this.events = data.map((e) => {
        const event = e.payload.doc.data() as any;
        return { id: e.payload.doc.id, ...event }; // Ensure ID is included
      });
    });
  }

  // Load all categories from Firestore
  loadCategories() {
    this.appService.getCategories().subscribe((data) => {
      this.categories = data.map((c) => {
        const category = c.payload.doc.data() as any;
        return { id: c.payload.doc.id, ...category };
      });
    });
  }

  createEvent() {
    if (this.isEditMode) {
      if (this.newEvent.id) {
        this.appService.updateEvent(this.newEvent.id, this.newEvent)
          .then(() => {
            this.resetForm();
            this.loadEvents();
          })
          .catch((error) => console.error("Error updating event:", error));
      } else {
        console.error("Event ID missing in edit mode!");
      }
    } else {
      this.appService.createEvent(this.newEvent)
        .then(() => {
          this.resetForm();
          this.loadEvents();
        })
        .catch((error) => console.error("Error adding event:", error));
    }
  }

  // Edit an existing event
  editEvent(event: any) {
    this.newEvent = { ...event }; // Populate the form with event data for editing
    this.isEditMode = true;
  }

  // Delete an event
  deleteEvent(eventId: string) {
    if (!eventId) {
      console.error("Event ID is empty or invalid!");
      return;
    }

    console.log("Deleting event with ID:", eventId);
  
    // Call the deleteEvent method from the service, and after successful deletion
    this.appService.deleteEvent(eventId).then(() => {
      // Remove the event from the local array after it's been deleted
      this.events = this.events.filter(event => event.id !== eventId);
    }).catch((error) => {
      console.error("Error deleting event:", error);
    });
  }

  // Reset the event form after add or edit
  resetForm() {
    this.newEvent = {
      id: '',
      categoryId: '',
      name: '',
      date: '',
      location: '',
      ticketPrice: 0,
      ticketStock: 0,
    };
    this.isEditMode = false; // Reset edit mode flag
  }
}
