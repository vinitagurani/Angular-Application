
import { RouterOutlet } from '@angular/router';
import { DataTableComponent } from './MyComponents/data-table/data-table.component'; // Ensure correct path
import { Component } from '@angular/core';
// import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  standalone: true,
  imports: [RouterOutlet, DataTableComponent ] 
})
export class AppComponent {}
