import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { DynamicTable } from './components/dynamic-table/dynamic-table';
import { TestDataService } from './services/test-data-service';
import { ColumnDef } from './components/dynamic-table/dynamic-table.model';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, DynamicTable],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  userColumns: ColumnDef[] = [];
  usersData: any[] = [];

  constructor(private dataService: TestDataService) {}

  ngOnInit() {
    this.userColumns = this.dataService.userColumns;
    this.usersData = this.dataService.usersData;
  }

  protected readonly title = signal('components-project');
}
