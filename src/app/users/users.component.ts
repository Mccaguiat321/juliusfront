import { Component, OnInit } from '@angular/core';
import axios from 'axios';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

interface DataItem {
  id: number;
  name: string;
  age: number;
  password: string;
}
@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrl: './users.component.css'
})
export class UsersComponent {
  data: DataItem[] = [];
  searchTerm: string = '';
  selectedItem: DataItem | null = null;
  successMessage: string = '';
  errorMessage: string = '';
  name: string = '';
  age: number | null = null;
  password: string = '';
  private user: any = null;
  showAddModal: boolean = false;
  showEditModal: boolean = false;

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit(): void {
    this.fetchData();
  }


  setUser(user: any) {
    this.user = user;
    // Optionally, store in localStorage/sessionStorage
    localStorage.setItem('user', JSON.stringify(user));
  }
  fetchData(): void {
    const url = this.searchTerm
      ? `http://localhost:3000/items?search=${this.searchTerm}`
      : 'http://localhost:3000/items';

    axios
      .get(url)
      .then(response => {
        this.data = response.data;
        this.successMessage = '';
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        this.errorMessage = 'Unable to fetch data. Please try again later.';
      });
  }

  navigateToDetails(id: number): void {
    this.router.navigate(['/expenses', id]);
  }

  onSearchChange(): void {
    this.fetchData();
  }

  save(): void {
    const bodyData = {
      name: this.name,
      age: this.age,
      password: this.password
    };

    this.http.post('http://localhost:3000/api/insert', bodyData).subscribe({
      next: () => {
        this.successMessage = 'Item added successfully.';
        this.clearForm();
        this.fetchData();
        this.closeAddModal();
      },
      error: (err) => {
        console.error('Error saving item:', err);
        this.errorMessage = 'An error occurred. Please try again.';
      }
    });
  }

  clearForm(): void {
    this.name = '';
    this.age = null;
    this.password = '';
  }

  updateItem(): void {
    if (this.selectedItem) {
      axios
        .put(`http://localhost:3000/api/update/${this.selectedItem.id}`, this.selectedItem)
        .then(() => {
          this.successMessage = 'Item updated successfully.';
          this.fetchData();
          this.closeEditModal();
        })
        .catch(error => {
          console.error('Error updating item:', error);
          this.errorMessage = 'An error occurred while updating.';
        });
    }
  }

  deleteItem(id: number): void {
    axios
      .delete(`http://localhost:3000/api/delete/${id}`)
      .then(() => {
        this.successMessage = 'Item deleted successfully.';
        this.fetchData();
      })
      .catch(error => {
        console.error('Error deleting item:', error);
        this.errorMessage = 'An error occurred while deleting.';
      });
  }

  selectItem(item: DataItem): void {
    this.selectedItem = { ...item };
    this.openEditModal();
  }

  openAddModal(): void {
    this.showAddModal = true;
  }

  closeAddModal(): void {
    this.showAddModal = false;
  }

  openEditModal(): void {
    this.showEditModal = true;
  }

  closeEditModal(): void {
    this.showEditModal = false;
  }
}
