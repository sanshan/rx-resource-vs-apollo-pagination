import { ChangeDetectionStrategy, Component, input, model } from '@angular/core';
import { ItemsTable } from '../items-table/items-table';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatToolbar } from '@angular/material/toolbar';
import { MatProgressBar } from '@angular/material/progress-bar';

@Component({
  selector: 'app-items-table-with-pagination',
  templateUrl: './items-table-with-pagination.html',
  styleUrl: './items-table-with-pagination.css',
  imports: [ItemsTable, MatPaginator, MatToolbar, MatProgressBar, ItemsTable],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OffsetPaginationScreen<T> {
  readonly title = input.required<string>();

  readonly isLoading = input<boolean>(false);

  readonly paginator = model<{ page: number; limit: number }>({
    page: 1,
    limit: 10,
  });

  readonly items = input.required<T[]>();
  readonly columns = input.required<(keyof T)[]>();
  readonly total = input.required<number>();

  protected onPage({ pageIndex, pageSize }: PageEvent) {
    this.paginator.set({ page: pageIndex + 1, limit: pageSize });
  }
}
