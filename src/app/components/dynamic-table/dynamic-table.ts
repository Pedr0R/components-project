import {
  Component,
  EventEmitter,
  Input,
  Output,
  SimpleChanges,
} from '@angular/core';
import { ColumnDef } from './dynamic-table.model';

@Component({
  selector: 'app-dynamic-table',
  templateUrl: './dynamic-table.html',
  styleUrl: './dynamic-table.css',
})
export class DynamicTable {
  @Input() columns: ColumnDef[] = [];
  @Input({ required: true }) data: any[] = [];
  @Input() checkboxEnabled: boolean = false;
  @Input() framed: boolean = false;

  @Output() selectionChange = new EventEmitter<any[]>();

  public displayedData: any[] = [];
  public sortDirection: 'asc' | 'desc' = 'asc';
  public sortKey: string | null = null;
  public selectedRows = new Set<any>();

  ngOnInit() {
    if (this.columns.length === 0) {
      for (const key in this.data[0]) {
        this.columns.push({ key: key, label: key, sortable: true });
      }
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['data']) {
      this.displayedData = [...this.data]; // Cria uma cópia para não alterar o array original
    }
  }

  simpleSortTable(key: string): void {
    const column = this.columns.find((c) => c.key === key);
    if (!column || !column.sortable) {
      return; // Não faz nada se a coluna não for ordenável
    }

    if (this.sortKey === key) {
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortKey = key;
      this.sortDirection = 'asc';
    }

    this.displayedData.sort((a, b) => {
      const valA = a[key];
      const valB = b[key];

      if (valA < valB) return this.sortDirection === 'asc' ? -1 : 1;
      if (valA > valB) return this.sortDirection === 'asc' ? 1 : -1;

      return 0;
    });
  }

  toggleSelectRow(row: any): void {
    if (this.selectedRows.has(row)) {
      this.selectedRows.delete(row);
    } else {
      this.selectedRows.add(row);
    }
    this.emitSelection();
  }

  toggleSelectAll(event: Event): void {
    const isChecked = (event.target as HTMLInputElement).checked;
    if (isChecked) {
      this.displayedData.forEach((row) => this.selectedRows.add(row));
    } else {
      this.selectedRows.clear();
    }
    this.emitSelection();
  }

  isAllSelected(): boolean {
    if (this.displayedData.length === 0) return false;
    return this.displayedData.every((row) => this.selectedRows.has(row));
  }

  private emitSelection(): void {
    this.selectionChange.emit(Array.from(this.selectedRows));
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;

    if (!filterValue) {
      this.displayedData = [...this.data];
      return;
    }

    this.displayedData = this.displayedData.filter((row) => {
      return this.columns.some((column) => {
        const cellValue = row[column.key];
        return cellValue?.toString().toLowerCase().includes(filterValue);
      });
    });

    this.sortKey = null;
  }
}
