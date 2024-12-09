import { Component } from '@angular/core';
import { DataService } from '../data.service'; // Correct service import

@Component({
  selector: 'app-front-page',
  templateUrl: './front-page.component.html',
  styleUrls: ['./front-page.component.css'],
})
export class FrontPageComponent {
  isDarkMode = false;

  // Variables to hold receipt data
  items = [
    { ORDER_NO: '001', QTY: 2, TOTAL: 100 },
    { ORDER_NO: '002', QTY: 1, TOTAL: 50 },
  ];
  subtotal = 150;
  branchname = 'Main Branch';
  username = 'John Doe';

  constructor(private dataService: DataService) {}  // Correct service injection

  toggleTheme() {
    this.isDarkMode = !this.isDarkMode;
  }


  receiptData = {
    items: [
      { name: 'Product 1', price: 10.99 },
      { name: 'Product 2', price: 5.49 },
      { name: 'Product 3', price: 3.99 },
    ],
    total: 20.47,
  };

  printReceipt() {
    this.dataService.printReceipt(this.receiptData).subscribe(
      (response) => {
        console.log(response);
      },
      (error) => {
        console.error('Error printing receipt', error);
      }
    );
  }
  
  
}
