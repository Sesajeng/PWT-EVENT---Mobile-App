import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EventSubmitUserPageRoutingModule } from './event-submit-user-routing.module';

import { EventSubmitUserPage } from './event-submit-user.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EventSubmitUserPageRoutingModule
  ],
  declarations: [EventSubmitUserPage]
})
export class EventSubmitUserPageModule {}
