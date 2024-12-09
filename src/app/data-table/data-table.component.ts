import { Component, OnInit } from '@angular/core';
import axios from 'axios';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
interface DataItem {
  id: number;
  title_of_expenses: string;
  budget: number;
  use_id: number;
  total_cost : number;
}
@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.css'],
})
export class DataTableComponent implements OnInit {
  data: DataItem[] = [];
  searchTerm: string = '';
  selectedItem: DataItem | null = null;
  successMessage: string = '';
  errorMessage: string = '';
  expensestitle: string = '';
  budget: number | null = null;
  userName: string | null = ''; // Variable to store the user's name
  userId: string | null = null; // Corrected the type to match localStorage return type
  showAddModal: boolean = false;
  showEditModal: boolean = false;
  currentPage: number = 1;
  itemsPerPage: number = 10;
  totalPages: number = 1;
  paginatedData: DataItem[] = [];
  pageNumbers: number[] = [];



  
  constructor(private http: HttpClient, private router: Router) {}
  ngOnInit(): void {
    this.userName = localStorage.getItem('userName');
    this.userId = localStorage.getItem('userId');
    if (!this.userName || !this.userId) {
      this.router.navigate(['/login']); // Redirect to login if not logged in
    } else {
      this.fetchData();
    }
  }
  
  navigateToDetails(id: number, title_of_expenses: string): void {
    this.router.navigate(['/expenses', id], { queryParams: { title: title_of_expenses } });
  }
  fetchData(page: number = 1): void {
    const url = this.searchTerm
      ? `http://localhost:3000/title_expenses?search=${this.searchTerm}&page=${page}&limit=${this.itemsPerPage}`
      : `http://localhost:3000/title_expenses?page=${page}&limit=${this.itemsPerPage}`;
  
    axios
      .get(url, { withCredentials: true })
      .then((response) => {
        this.data = response.data.titleExpenses;
        this.totalPages = Math.ceil(response.data.totalItems / this.itemsPerPage);
        this.updatePagination();
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
        this.errorMessage = error.response?.data?.message || 'Unable to fetch data. Please try again later.';
      });
  }
  

  updatePagination(): void {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.paginatedData = this.data.slice(startIndex, endIndex);

    // Calculate page numbers
    this.pageNumbers = Array.from({ length: this.totalPages }, (_, index) => index + 1);
  }

  onSearchChange(): void {
    this.fetchData();
  }

  save(): void {
    const bodyData = {
      expensestitle: this.expensestitle,
      budget: this.budget,
      userId: this.userId,
    };
    this.http.post('http://localhost:3000/api/inserts', bodyData).subscribe({
      next: () => {
        this.successMessage = 'Item added successfully.';
        this.clearForm();
        this.fetchData();
        this.closeAddModal();
      },
      error: (err) => {
        console.error('Error saving item:', err);
        this.errorMessage = 'An error occurred. Please try again.';
      },
    });
  }

  clearForm(): void {
    this.expensestitle = '';
    this.budget = null;
  }

  updateItem(): void {
    if (this.selectedItem) {
      axios
        .put(
          `http://localhost:3000/api/update_title_expense/${this.selectedItem.id}`,
          {
            expensestitle: this.selectedItem.title_of_expenses,
            budget: this.selectedItem.budget,
          }
        )
        .then(() => {
          this.successMessage = 'Item updated successfully.';
          this.fetchData();
          this.closeEditModal();
        })
        .catch((error) => {
          console.error('Error updating item:', error);
          this.errorMessage = 'An error occurred while updating the item.';
        });
    } else {
      this.errorMessage = 'No item selected to update.';
    }
  }

  logout(): void {
    // Clear user data from localStorage
    localStorage.removeItem('userName');
    localStorage.removeItem('userId');

    // Call backend to destroy session
    axios
      .post('http://localhost:3000/logout', {}, { withCredentials: true })
      .then(() => {
        // Redirect to login page after successful logout
        this.router.navigate(['/login']);
      })
      .catch((error) => {
        console.error('Error logging out:', error);
      });
  }

  deleteItem(id: number): void {
    axios
      .delete(`http://localhost:3000/api/delete_from_title_expense/${id}`)
      .then(() => {
        this.successMessage = 'Item deleted successfully.';
        this.fetchData(); // Refresh the table data after deletion
      })
      .catch((error) => {
        console.error('Error deleting item:', error);
        this.errorMessage = error.response?.data?.message || 'An error occurred while deleting.';
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

  // Pagination Controls
  goToPage(page: number): void {
    this.currentPage = page;
    this.updatePagination();
  }

  changePage(direction: string): void {
    if (direction === 'prev' && this.currentPage > 1) {
      this.currentPage--;
    } else if (direction === 'next' && this.currentPage < this.totalPages) {
      this.currentPage++;
    }
    this.updatePagination();
  }
}
