import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { AdminTabsRoutingModule } from './admin-routing.module';  // Correct routing module
import { AdminTabsPage } from './admin.page';  // Correct component for admin tabs

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AdminTabsRoutingModule,  // Ensure routing is correctly integrated
  ],
  declarations: [AdminTabsPage],  // Declare the correct page component
})
export class AdminTabsModule {}
