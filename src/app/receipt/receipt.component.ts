import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-receipt',
  templateUrl: './receipt.component.html',
  styleUrls: ['./receipt.component.css'],
})
export class ReceiptComponent {
  items = [
    { name: 'Item 1', price: 10 },
    { name: 'Item 2', price: 15 },
    { name: 'Item 3', price: 20 },
  ];

  total = this.items.reduce((sum, item) => sum + item.price, 0);

  constructor(private http: HttpClient) {}

  printReceipt() {
    const receiptData = {
      items: this.items,
      total: this.total
    };

    this.http.post('http://localhost:3000/print-receipt', receiptData)
      .subscribe(
        response => {
          console.log('Receipt printed successfully');
        },
        error => {
          console.error('Error printing receipt', error);
        }
      );
  }
}
