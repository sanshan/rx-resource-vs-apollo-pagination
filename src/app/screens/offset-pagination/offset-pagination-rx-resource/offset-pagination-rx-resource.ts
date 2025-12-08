import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { OffsetPaginationScreen } from '../../../components/items-table-with-pagination/items-table-with-pagination';
import { GetOffsetPaginationData } from './services/get-offset-pagination-data';

@Component({
  selector: 'app-offset-pagination-rx-resource',
  templateUrl: './offset-pagination-rx-resource.html',
  styleUrl: './offset-pagination-rx-resource.css',
  providers: [GetOffsetPaginationData],
  imports: [OffsetPaginationScreen],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OffsetPaginationRxResource {
  protected readonly data = inject(GetOffsetPaginationData);

  protected readonly page = this.data.page;
  protected readonly loading = this.data.isLoading;
}
