import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormControl } from '@angular/forms';

@Component({
  selector: 'app-data-table',
  standalone: true,
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.css'],
  imports: [CommonModule, ReactiveFormsModule]
})
export class DataTableComponent implements OnInit {
  data: any[] = [];
  searchText = new FormControl('');
  sortedColumn: string = '';
  sortDirection: 'asc' | 'desc' = 'asc';
  currentPage: number = 1;
  pageSize: number = 5;
  totalPages: number = 0;

  constructor() { }

  ngOnInit(): void {
    this.fetchData();
  }

  fetchData(): void {
    fetch('https://randomuser.me/api/?results=20')
      .then(response => response.json())
      .then(data => {
        this.data = data.results;
        this.totalPages = Math.ceil(this.data.length / this.pageSize);
      })
      .catch(error => console.error('Error fetching data:', error));
  }

  filteredData(): any[] {
    const search = this.searchText.value?.toLowerCase() || '';
    return this.data.filter(user => 
      user.name.first.toLowerCase().includes(search) ||
      user.name.last.toLowerCase().includes(search) ||
      user.email.toLowerCase().includes(search) ||
      user.phone.toLowerCase().includes(search)
    );
  }

  // sortData(column: string): void {
  //   if (this.sortedColumn === column) {
  //     this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
  //   } else {
  //     this.sortedColumn = column;
  //     this.sortDirection = 'asc';
  //   }

  //   this.data.sort((a, b) => {
  //     let comparison = 0;
  //     if (a[column] > b[column]) {
  //       comparison = 1;
  //     } else if (a[column] < b[column]) {
  //       comparison = -1;
  //     }
  //     return this.sortDirection === 'asc' ? comparison : -comparison;
  //   });
  // }

  sortData(column: string): void {
    if (this.sortedColumn === column) {
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortedColumn = column;
      this.sortDirection = 'asc';
    }
  
    this.data.sort((a, b) => {
      let comparison = 0;
      
      // Sorting logic based on the column type
      if (column === 'name') {
        // Sort by first name primarily, and by last name if first names are equal
        const nameA = `${a.name.first} ${a.name.last}`.toLowerCase();
        const nameB = `${b.name.first} ${b.name.last}`.toLowerCase();
        comparison = nameA > nameB ? 1 : nameA < nameB ? -1 : 0;
      } else {
        // Sort for other columns like email and phone
        const valueA = a[column]?.toLowerCase() || '';
        const valueB = b[column]?.toLowerCase() || '';
        comparison = valueA > valueB ? 1 : valueA < valueB ? -1 : 0;
      }
  
      return this.sortDirection === 'asc' ? comparison : -comparison;
    });
  }

  paginatedData(): any[] {
    const filtered = this.filteredData();
    const startIndex = (this.currentPage - 1) * this.pageSize;
    return filtered.slice(startIndex, startIndex + this.pageSize);
  }

  previousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
    }
  }
}
