import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { EventListUserPageRoutingModule } from './event-list-user-routing.module';
import { EventListUserPage } from './event-list-user.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EventListUserPageRoutingModule
  ],
  declarations: [EventListUserPage] // Deklarasi komponen harus benar
})
export class EventListUserPageModule {}
