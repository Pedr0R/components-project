import { Component, Input, SimpleChanges } from '@angular/core';
import { ColumnDef } from './dynamic-table.model';

@Component({
  selector: 'app-dynamic-table',
  templateUrl: './dynamic-table.html',
  styleUrl: './dynamic-table.css',
})
export class DynamicTable {
  @Input() columns: ColumnDef[] = [];
  @Input({ required: true }) data: any[] = [];

  public displayedData: any[] = [];
  public sortDirection: 'asc' | 'desc' = 'asc';
  public sortKey: string | null = null;

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

  sortTable(key: string): void {
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
}
