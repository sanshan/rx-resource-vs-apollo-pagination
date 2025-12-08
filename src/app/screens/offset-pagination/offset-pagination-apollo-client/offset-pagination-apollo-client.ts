import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  inject,
  OnInit,
  signal,
} from '@angular/core';
import { OffsetPaginationScreen } from '../../../components/items-table-with-pagination/items-table-with-pagination';
import type { ObservableQuery } from '@apollo/client';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import {
  GetOffsetPaginationDataGQL,
  GetOffsetPaginationDataQuery,
} from './services/get-offset-pagination-data.generated';

type Page = ObservableQuery.Result<
  GetOffsetPaginationDataQuery,
  'complete'
>['data']['FindAllItems'];

@Component({
  selector: 'app-offset-pagination-apollo-client',
  templateUrl: './offset-pagination-apollo-client.html',
  styleUrl: './offset-pagination-apollo-client.css',
  imports: [OffsetPaginationScreen],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OffsetPaginationApolloClient implements OnInit {
  private destroyRef = inject(DestroyRef);

  protected readonly loading = signal<boolean>(false);
  protected readonly page = signal<Page | null>(null);

  protected readonly limit = signal<number>(10);
  protected readonly offset = signal<number>(0);

  protected readonly query = inject(GetOffsetPaginationDataGQL).watch({
    variables: { limit: this.limit(), offset: this.offset() },
  });

  ngOnInit() {
    this.query.valueChanges.pipe(takeUntilDestroyed(this.destroyRef)).subscribe((result) => {
      const { loading, data } = result;

      this.loading.set(loading);

      if (data) {
        this.page.set(data.FindAllItems as Page);
      }
    });
  }
}
