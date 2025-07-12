import { Component, OnInit } from '@angular/core';
import { AppService } from '../../services/auth.service'; // Pastikan path benar

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.page.html',
  styleUrls: ['./user-list.page.scss'],
})
export class UserListPage implements OnInit {
  users: any[] = [];

  constructor(private appService: AppService) {}

  ngOnInit() {
    this.loadUsers();
  }

  loadUsers() {
    this.appService.getUsers().subscribe(
      (res) => {
        this.users = res.map((user) => ({
          id: user.payload.doc.id,
          ...(user.payload.doc.data() as any),
        }));
      },
      (error) => {
        console.error('Error fetching users:', error);
      }
    );
  }
}
