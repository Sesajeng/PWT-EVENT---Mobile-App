import { Component, OnInit } from '@angular/core';
import { AppService } from '../../services/auth.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.page.html',
  styleUrls: ['./user.page.scss'],
})
export class UserPage implements OnInit {
  users: any[] = [];
  events: any[] = [];
  transactions: any[] = [];
  message: string | null = null;

  currentUserId: string | null = null; // To store the current logged-in user's ID

  constructor(private appService: AppService) {}

  ngOnInit() {
    this.getCurrentUser(); // Check for logged-in user
    this.loadEvents();
  }

  // Get the current logged-in user
  getCurrentUser() {
    const user = this.appService.getCurrentUsers();
    if (user) {
      this.currentUserId = user.id;
      this.loadTransactions(); // Load transactions for the logged-in user
    } else {
      this.message = 'User not logged in';
    }
  }

  // Load events from the database
  loadEvents() {
    if (this.appService) {
      this.appService.getEvents().subscribe({
        next: (data) => {
          this.events = data.map((e) => ({
            id: e.payload.doc.id,
            ...(e.payload.doc.data() as any),
          }));
        },
        error: (error) => {
          console.error('Error loading events:', error);
          this.message = 'Failed to load events.';
        },
      });
      
    }
  }

  loadTransactions() {
    if (this.currentUserId && this.appService) {
      this.appService.getTransactions().subscribe({
        next: (data) => {
          this.transactions = data
            .map((e) => {
              const transactionData = e.payload.doc.data() as any;
  
              return {
                id: e.payload.doc.id,
                event_id: transactionData.event_id,
                ticket_quantity: transactionData.ticket_quantity,
                total_price: transactionData.total_price,
                created_at: transactionData.created_at,
                updated_at: transactionData.updated_at,
                user_id: transactionData.user_id,
              };
            })
            .filter((transaction) => transaction.user_id === this.currentUserId);
  
          if (this.transactions.length === 0) {
            this.message = 'No transactions found for this user.';
          } else {
            this.message = null; // Reset message if transactions found
          }
        },
        error: (error) => {
          console.error('Error loading transactions:', error);
          this.message = 'Failed to load transactions for this user.';
        },
      });
    } else {
      this.message = 'User not logged in.';
    }
  }
  
  // Get event name by event ID
  getEventName(eventId: string): string {
    const event = this.events.find((e) => e.id === eventId);
    return event ? event.name : 'Unknown Event';
  }
}
