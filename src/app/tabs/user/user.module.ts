import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { UserTabsRoutingModule } from './user-routing.module';  // Correct routing module
import { UserTabsPage } from './user.page';  // Correct component for admin tabs

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UserTabsRoutingModule,  // Ensure routing is correctly integrated
  ],
  declarations: [UserTabsPage],  // Declare the correct page component
})
export class UserTabsModule {}
