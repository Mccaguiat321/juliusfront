import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root' // This ensures the service is available throughout the app
})
export class DataService {

  private printUrl = 'http://localhost:3000/print'; // Adjust with your backend URL

  constructor(private http: HttpClient) {}

  printReceipt(receiptData: any): Observable<any> {
    return this.http.post(this.printUrl, receiptData);
  }
}
