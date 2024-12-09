import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import axios from 'axios';
import { HttpClient } from '@angular/common/http';

interface DataItem {
  id: number;
  the_expenses: string;
  cost: number;
}

@Component({
  selector: 'app-expenses',
  templateUrl: './expenses.component.html',
  styleUrls: ['./expenses.component.css']
})
export class ExpensesComponent implements OnInit {
  itemId: number | null = null;
  data: DataItem[] = [];
  searchTerm: string = '';
  selectedItem: DataItem | null = null;
  successMessage: string = '';
  errorMessage: string = '';
  name: string = '';
  cost: number | null = null;
  userName: string | null = ''; // Variable to store the user's name
  password: string = '';
  userId: string | null = null; // Corrected the type to match localStorage return type

  showAddModal: boolean = false;
  showEditModal: boolean = false;
  title_of_expenses: string | null = null;

  // Pagination variables
  currentPage: number = 1;
  itemsPerPage: number = 10;
  totalPages: number = 1;
  paginatedData: DataItem[] = [];
  pageNumbers: number[] = [];

  constructor(private route: ActivatedRoute, private http: HttpClient, private router: Router) {}

  ngOnInit(): void {
    this.itemId = Number(this.route.snapshot.paramMap.get('id'));
    this.route.queryParamMap.subscribe(queryParams => {
      this.title_of_expenses = queryParams.get('title');
    });

    this.userName = localStorage.getItem('userName');
    this.userId = localStorage.getItem('userId');
    if (!this.userName || !this.userId) {
      this.router.navigate(['/login']);
    } else {
      this.fetchData();
    }
  }

  fetchData(): void {
    const url = this.searchTerm
      ? `http://localhost:3000/expenses?search=${this.searchTerm}&itemId=${this.itemId}`
      : `http://localhost:3000/expenses?itemId=${this.itemId}`;

    axios
      .get(url, { withCredentials: true })
      .then((response) => {
        this.data = response.data;
        this.totalPages = Math.ceil(this.data.length / this.itemsPerPage);
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
    if (!this.name || !this.cost || !this.itemId) {
      this.errorMessage = 'Name, Cost, and Item ID are required fields.';
      return;
    }
  
    const bodyData = {
      name: this.name,
      cost: this.cost,
      itemId: this.itemId,
    };
  
    console.log('Sending data to backend:', bodyData);
  
    this.http.post('http://localhost:3000/api/expenses_insert', bodyData).subscribe({
      next: (response: any) => {
        this.successMessage = 'Item added successfully.';
        this.clearForm();
        const newExpense = response[response.length - 1];
        this.data.push(newExpense); // Add the new item to data array
  
        // Update paginatedData to include the new item
        if (this.data.length <= this.itemsPerPage) {
          this.paginatedData.push(newExpense); // If it's on the first page, add directly
        } else {
          this.updatePagination(); // Otherwise, recalculate pagination
        }
  
        this.closeAddModal();
      },
      error: (err) => {
        console.error('Error saving item:', err);
        this.errorMessage = 'An error occurred. Please try again.';
      },
    });
  }
  
  clearForm(): void {
    this.name = '';
    this.cost = null;
   
  }

  updateItem(): void {
    if (this.selectedItem) {
      const updatedItem = {
        name: this.selectedItem.the_expenses,  // Corrected to use the_expenses for the name
        cost: this.selectedItem.cost  // Corrected to use cost
      };
  
      axios
        .put(`http://localhost:3000/update_expenses/${this.selectedItem.id}`, updatedItem)
        .then(() => {
          this.successMessage = 'Item updated successfully.';
      
          this.closeEditModal();

          this.fetchData();
        })
        .catch((error) => {
          console.error('Error updating item:', error);
          this.errorMessage = 'An error occurred while updating.';
        });
    }
  }
  
  deleteItem(id: number): void {
    axios
      .delete(`http://localhost:3000/delete_expenses/${id}`)
      .then((response) => {
        // Check if the response was successful
        if (response.data.message === 'Item deleted successfully') {
          this.successMessage = 'Item deleted successfully.';
          this.fetchData(); // Refresh the data after deletion
        }
      })
      .catch((error) => {
        // Handle the error from the backend
        console.error('Error deleting item:', error);
        if (error.response && error.response.data) {
          this.errorMessage = error.response.data.message || 'An error occurred while deleting.';
        } else {
          this.errorMessage = 'An unknown error occurred.';
        }
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
