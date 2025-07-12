import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin-tabs',
  templateUrl: './admin.page.html',  // Make sure the HTML file is correct for this component
  styleUrls: ['./admin.page.scss'],  // Ensure the styles are correct
})
export class AdminTabsPage implements OnInit {

  constructor() { 
    // Constructor logic (if any)
  }

  ngOnInit() {
    // This lifecycle hook is invoked after Angular has initialized the component

    // Example: Fetching data or setting initial state
    this.initializeTabs();
  }

  private initializeTabs() {
    // Example of logic you might want to execute on component initialization
    console.log('Admin Tabs initialized');
  }
}
