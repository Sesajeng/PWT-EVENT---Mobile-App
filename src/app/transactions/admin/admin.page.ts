import { Component, OnInit } from '@angular/core';
import { AppService } from '../../services/auth.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.page.html',
  styleUrls: ['./admin.page.scss'],
})
export class AdminPage implements OnInit {
  users: any[] = [];
  events: any[] = [];
  filteredEvents: any[] = [];
  transactions: any[] = [];
  categories: any[] = [];
  selectedCategory: string = '';
  message: string | null = null;

  transaction = {
    user_id: '',
    event_id: '',
    ticket_quantity: 1,
    total_price: 0,
    created_at: '',
    updated_at: '',
  };

  selectedEvent: any = null;

  constructor(private appService: AppService) {}

  ngOnInit() {
    this.loadUsers();
    this.loadCategories();
    this.loadEvents();
    this.loadTransactions();
  }
  validateTransaction(): boolean {
    const user = this.users.find((u) => u.id === this.transaction.user_id);
    const event = this.events.find((e) => e.id === this.transaction.event_id);
  
    if (!user) {
      this.message = 'Invalid user selected.';
      return false;
    }
  
    if (!event) {
      this.message = 'Invalid event selected.';
      return false;
    }
  
    return (
      this.transaction.ticket_quantity > 0 &&
      this.transaction.total_price > 0
    );
  }

  loadUserTransactions() {
    const userId = this.appService.getCurrentUsers()?.uid;
    if (userId) {
      this.appService.getTransactions().subscribe({
        next: (data) => {
          this.transactions = data.filter(transaction => transaction.userId === userId);
        },
        error: (err) => {
          console.error('Error loading transactions:', err);
        },
      });
    } else {
      console.error('User not authenticated!');
    }
  }
  
  // Load users
  loadUsers() {
    this.appService.getUsers().subscribe({
      next: (data) => {
        this.users = data.map((e) => ({
          id: e.payload.doc.id,
          ...(e.payload.doc.data() as any),
        }));
      },
      error: (err) => {
        console.error('Error loading users:', err);
        this.message = 'Failed to load users.';
      },
    });
  }

  // Load categories
  loadCategories() {
    this.appService.getCategories().subscribe({
      next: (data) => {
        this.categories = data.map((e) => ({
          id: e.payload.doc.id,
          ...(e.payload.doc.data() as any),
        }));
      },
      error: (err) => {
        console.error('Error loading categories:', err);
        this.message = 'Failed to load categories.';
      },
    });
  }

  // Load events
  loadEvents() {
    this.appService.getEvents().subscribe({
      next: (data) => {
        this.events = data.map((e) => ({
          id: e.payload.doc.id,
          ...(e.payload.doc.data() as any),
        }));
        this.filterEventsByCategory();
      },
      error: (err) => {
        console.error('Error loading events:', err);
        this.message = 'Failed to load events.';
      },
    });
  }

  // Filter events by category
  filterEventsByCategory() {
    if (this.selectedCategory) {
      this.filteredEvents = this.events.filter(
        (event) => event.categoryId === this.selectedCategory
      );
    } else {
      this.filteredEvents = [];
    }
  }

  // On category change
  onCategoryChange() {
    this.filterEventsByCategory();
    this.transaction.event_id = '';
    this.selectedEvent = null;
    this.calculateTotalPrice();
  }

  // On event change
  onEventChange() {
    this.selectedEvent = this.filteredEvents.find(
      (e) => e.id === this.transaction.event_id
    );
    this.calculateTotalPrice();
  }

  // Calculate total price
  calculateTotalPrice() {
    if (this.selectedEvent) {
      const ticketPrice = this.selectedEvent.ticketPrice || 0;
      const ticketQuantity = this.transaction.ticket_quantity || 1;
      this.transaction.total_price = ticketPrice * ticketQuantity;
    }
  }

  loadTransactions() {
    this.appService.getTransactions().subscribe({
      next: (data) => {
        this.transactions = data.map((t) => {
          const transactionData = t.payload.doc.data();
          
          // Temukan email pengguna dan nama acara berdasarkan ID
          const user = this.users.find((u) => u.id === transactionData.user_id);
          const event = this.events.find((e) => e.id === transactionData.event_id);
  
          return {
            ...transactionData,
            id: t.payload.doc.id,
            user_email: user?.email || 'Unknown User',
            event_name: event?.name || 'Unknown Event',
          };
        });
      },
      error: (err) => {
        console.error('Error loading transactions:', err);
        this.message = 'Failed to load transactions.';
      },
    });
  }
  

  createTransaction() {
    if (this.validateTransaction()) {
      const timestamp = new Date().toISOString();
      this.transaction.created_at = timestamp;
      this.transaction.updated_at = timestamp;
  
      // Simpan transaksi ke database
      this.appService.createTransaction(this.transaction).then(() => {
        this.message = 'Transaction created successfully!';
  
        // Tambahkan data transaksi langsung ke array tanpa perlu memuat ulang
        const user = this.users.find((u) => u.id === this.transaction.user_id);
        const event = this.events.find((e) => e.id === this.transaction.event_id);
  
        this.transactions.push({
          ...this.transaction,
          user_email: user?.email || 'Unknown User',
          event_name: event?.name || 'Unknown Event',
        });
  
        this.resetForm(); // Reset form setelah transaksi berhasil dibuat
      })
      .catch((err) => {
        console.error('Error creating transaction:', err);
        this.message = 'Failed to create transaction.';
      });
    } else {
      this.message = 'Please fill out all fields correctly.';
    }
  }

  updateTransaction(id: string) {
    if (this.validateTransaction()) {
      this.transaction.updated_at = new Date().toISOString();
  
      this.appService.updateTransaction(id, this.transaction).then(() => {
        this.message = 'Transaction updated successfully!';
        this.loadTransactions(); // Memuat ulang transaksi setelah pembaruan
        this.resetForm();
      }).catch((err) => {
        console.error('Error updating transaction:', err);
        this.message = 'Failed to update transaction.';
      });
    } else {
      this.message = 'Please fill out all fields correctly.';
    }
  }
  
  // Delete transaction
  deleteTransaction(id: string) {
    this.appService.deleteTransaction(id).then(() => {
      this.message = 'Transaction deleted successfully!';
      this.loadTransactions();
    }).catch((err) => {
      console.error('Error deleting transaction:', err);
      this.message = 'Failed to delete transaction.';
    });
  }

  // Reset form
  resetForm() {
    this.transaction = {
      user_id: '',
      event_id: '',
      ticket_quantity: 1,
      total_price: 0,
      created_at: '',
      updated_at: '',
    };
    this.selectedEvent = null;
  }

  // Get user email by ID
  getUserEmail(userId: string): string {
    const user = this.users.find((u) => u.id === userId);
    return user ? user.email : 'Unknown User';
  }

  // Get event name by ID
  getEventName(eventId: string): string {
    const event = this.events.find((e) => e.id === eventId);
    return event ? event.name : 'Unknown Event';
  }
  
}
