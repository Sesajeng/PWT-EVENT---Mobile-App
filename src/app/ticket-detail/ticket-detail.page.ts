import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { AppService } from '../services/auth.service';

interface Event {
  id: string;
  categoryId: string;
  date: string;
  location: string;
  name: string;
  ticketPrice: number;
  ticketStock: number;
}

interface Bank {
  name: string;
  accountNumber: string;
}

@Component({
  selector: 'app-ticket-detail',
  templateUrl: './ticket-detail.page.html',
  styleUrls: ['./ticket-detail.page.scss'],
})
export class TicketDetailPage implements OnInit {
  event: Event | null = null;
  ticketQuantity: number = 1;
  totalPrice: number = 0;
  selectedCategoryName: string = '';

  // Daftar Bank
  bankList: Bank[] = [
    { name: 'Bank BCA', accountNumber: '123 456 7890' },
    { name: 'Bank Mandiri', accountNumber: '098 765 4321' },
    { name: 'Bank BNI', accountNumber: '567 890 1234' },
  ];

  constructor(
    private route: ActivatedRoute,
    private appService: AppService,
    private router: Router,
    private alertController: AlertController
  ) {}

  ngOnInit() {
    this.route.queryParamMap.subscribe((params) => {
      const eventId = params.get('eventId');
      this.selectedCategoryName = params.get('categoryName') ?? 'Kategori Tidak Tersedia';

      if (eventId) {
        this.loadEventDetails(eventId);
      } else {
        console.error('Missing eventId parameter!');
      }
    });
  }

  loadEventDetails(eventId: string) {
    this.appService.getEventById(eventId).subscribe((event: any) => {
      if (event) {
        this.event = {
          id: event.id,
          categoryId: event.categoryId,
          date: event.date,
          location: event.location,
          name: event.name,
          ticketPrice: event.ticketPrice,
          ticketStock: event.ticketStock,
        };
        this.calculateTotalPrice();
      } else {
        console.error('Event not found!');
      }
    }, (error) => {
      console.error('Error fetching event details:', error);
    });
  }

  calculateTotalPrice() {
    if (this.event) {
      this.totalPrice = this.event.ticketPrice * this.ticketQuantity;
    }
  }

  async openBankPopup(bank: Bank) {
    const alert = await this.alertController.create({
      header: `Rekening ${bank.name}`,
      message: `Nomor Rekening: <strong>${bank.accountNumber}</strong>`,
      buttons: [
        {
          text: 'Salin Nomor Rekening',
          handler: () => {
            navigator.clipboard.writeText(bank.accountNumber);
            alert.dismiss();
          },
        },
        {
          text: 'Tutup',
          role: 'cancel',
        },
      ],
    });

    await alert.present();
  }

  submitOrder() {
    if (this.ticketQuantity > (this.event?.ticketStock || 0)) {
      alert('Jumlah tiket melebihi stok tersedia!');
      return;
    }
  
    const userId = this.appService.getCurrentUsers()?.id;
    const transaction = {
      eventId: this.event?.id,
      userId: userId,
      ticketQuantity: this.ticketQuantity,
      totalPrice: this.totalPrice,
      createdAt: new Date().toISOString(),
    };
  
    this.appService.createTransaction(transaction).then(() => {
      const updatedStock = (this.event?.ticketStock || 0) - this.ticketQuantity;
  
      this.appService.updateEventStock(this.event?.id || '', updatedStock).then(() => {
        alert('Pemesanan berhasil!');
        this.router.navigate(['/user-tabs/transactions']); // Ensure user is navigated to transaction page
      });
    }).catch((error) => {
      console.error('Gagal membuat transaksi:', error);
    });
  }
  
}
