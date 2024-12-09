import { Component } from '@angular/core';
import { Router, NavigationStart, NavigationEnd, NavigationCancel } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  isLoading = false; // State to control spinner visibility

  constructor(private router: Router) {
    // Subscribe to router events
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationStart) {
        // Show spinner at the start of navigation
        this.isLoading = true;
      } else if (event instanceof NavigationEnd || event instanceof NavigationCancel) {
        // Hide spinner after a delay when navigation ends or is canceled
        setTimeout(() => {
          this.isLoading = false;
        }, 500); // Delay in milliseconds
      }
    });
  }
}
