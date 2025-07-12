import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireAuth } from '@angular/fire/compat/auth'; // Import AngularFireAuth for authentication
import * as bcrypt from 'bcryptjs';
import { Router } from '@angular/router';
import { lastValueFrom } from 'rxjs';
import { Observable } from 'rxjs';

interface User {
  id?: string;
  email: string;
  password?: string;
  role: string;
}

@Injectable({
  providedIn: 'root',
})
export class AppService {
  private usersCollection = 'users'; // Collection for users
  private categoriesCollection = 'categories'; // Collection for categories
  private eventsCollection = 'events'; // Collection for events
  private transactionsCollection = 'transactions'; // Collection for transactions

  constructor(
    private firestore: AngularFirestore,
    private router: Router,
    private afAuth: AngularFireAuth // Inject AngularFireAuth for authentication
  ) {}

  // **Login Method**
  async login(email: string, password: string): Promise<void> {
    try {
      const userQuerySnapshot = await lastValueFrom(
        this.firestore
          .collection(this.usersCollection, (ref) => ref.where('email', '==', email))
          .get()
      );

      if (userQuerySnapshot.empty) {
        console.error('User not found.');
        throw new Error('User not found.');
      }

      const userDoc = userQuerySnapshot.docs[0];
      const userData: User = userDoc.data() as User;

      const passwordMatch = bcrypt.compareSync(password, userData.password || '');
      if (!passwordMatch) {
        console.error('Incorrect password.');
        throw new Error('Incorrect password.');
      }

      localStorage.setItem(
        'currentUser',
        JSON.stringify({ id: userDoc.id, email: userData.email, role: userData.role })
      );

      if (userData.role === 'admin') {
        this.router.navigateByUrl('/admin-tabs');
      } else {
        this.router.navigateByUrl('/user-tabs');
      }
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  }

  // **Logout Method**
  logout(): void {
    localStorage.removeItem('currentUser'); 
    localStorage.removeItem('userId');// Clear session data
    this.router.navigateByUrl('/login'); // Redirect to login page
  }

  // **Get Current User**
  getCurrentUser(): User | null {
    const user = localStorage.getItem('currentUser');
    return user ? (JSON.parse(user) as User) : null;
  }

  // **Get Current Authenticated User (using AngularFireAuth)**
 

  // **Category CRUD Operations**
  createCategory(category: { name: string }) {
    return this.firestore.collection(this.categoriesCollection).add(category);
  }

  updateCategory(id: string, data: { name: string }) {
    return this.firestore.collection(this.categoriesCollection).doc(id).update(data);
  }

  deleteCategory(id: string) {
    return this.firestore.collection(this.categoriesCollection).doc(id).delete();
  }

  // **Event CRUD Operations**

  // **User Management**
  getUsers() {
    return this.firestore.collection(this.usersCollection).snapshotChanges();
  }

  // **Create Transaction**
  createTransaction(transaction: any) {
    return this.firestore.collection(this.transactionsCollection).add(transaction);
  }

  // **Read Transactions**
  getTransactions(): Observable<any[]> {
    return this.firestore.collection(this.transactionsCollection).snapshotChanges();
  }

  // **Update Transaction**
  updateTransaction(id: string, transaction: any) {
    return this.firestore.collection(this.transactionsCollection).doc(id).update(transaction);
  }

  // **Delete Transaction**
  deleteTransaction(id: string) {
    return this.firestore.collection(this.transactionsCollection).doc(id).delete();
  }

  // **Get Categories**
  getCategories(): Observable<any[]> {
    return this.firestore.collection('categories').snapshotChanges();
  }

  // **Get Events**
  getEvents(): Observable<any[]> {
    return this.firestore.collection('events').snapshotChanges();
  }

  // **Get Event by ID**
  getEventById(eventId: string) {
    return this.firestore.collection('events').doc(eventId).valueChanges();
  }

  // **Create Event**
 

  // **Get Transaction by ID**
  getTransactionById(transactionId: string) {
    return this.firestore.collection(this.transactionsCollection).doc(transactionId).snapshotChanges();
  }

  updateEventStock(eventId: string, newStock: number): Promise<void> {
    return this.firestore
      .collection('events')
      .doc(eventId)
      .update({ ticketStock: newStock });
  }
  createEvent(event: any): Promise<void> {
    return new Promise((resolve, reject) => {
      this.firestore.collection('events').add(event).then((docRef) => {
        console.log("Event added with ID: ", docRef.id);
        resolve(); // Resolve when the event is successfully added
      }).catch((error: any) => { // Explicitly typing the error
        console.error("Error adding event: ", error);
        reject(error); // Reject with the error if any
      });
    });
  }
  
  updateEvent(eventId: string, event: any): Promise<void> {
    const eventRef = this.firestore.collection('events').doc(eventId);
    return eventRef.update({
      name: event.name,
      categoryId: event.categoryId,
      ticketPrice: event.ticketPrice,
      availableTickets: event.ticketStock,
      date: event.date,
      location: event.location,
    }).then(() => {
      console.log('Event updated successfully');
    }).catch((error: any) => { // Explicitly typing the error
      console.error("Error updating event: ", error);
      throw error; // Rethrow error for the caller to handle
    });
  }
  deleteEvent(eventId: string): Promise<void> {
    if (!eventId) {
      console.error("Event ID is empty or invalid!");
      return Promise.reject("Invalid event ID");
    }
    console.log("Deleting event with ID:", eventId);
    // Firestore delete method
    return this.firestore.collection('events').doc(eventId).delete();
  }

  getCurrentUsers() {
    const currentUser = localStorage.getItem('currentUser');
    if (currentUser) {
      return JSON.parse(currentUser);
    } else {
      return null;  // Return null if no user is logged in
    }
  }
  
}  
