import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css']
})
export class StudentComponent {


  name: string = "";
  age: string = "";
  password: string = "";
  successMessage: string = ""; // Variable to hold the success message

  constructor(private http: HttpClient) {} // Inject HttpClient

  save() {
    const bodyData = {
      "name": this.name,
      "age": this.age,
      "password": this.password
    };

    this.http.post("http://localhost:3000/api/insert", bodyData).subscribe({
      next: (resultData: any) => {
        this.successMessage = "Registered successfully"; // Set success message

        // Clear the input fields after successful insertion
        this.name = "";
        this.age = "";
        this.password = "";

        window.location.reload(); 
      },
      error: (err) => {
        console.error("Error occurred during save operation:", err);
        alert("An error occurred during registration. Please try again.");
      }
    });
  }
}
