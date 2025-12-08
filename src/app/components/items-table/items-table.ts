import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { MatTableModule } from '@angular/material/table';

@Component({
  selector: 'app-items-table',
  templateUrl: 'items-table.html',
  styleUrl: 'items-table.css',
  imports: [MatTableModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ItemsTable<T> {
  readonly displayedColumns = input.required<(keyof T)[]>();
  readonly items = input.required<T[]>();
}
