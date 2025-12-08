import { inject, Injectable, Injector, linkedSignal, ResourceStatus, signal } from '@angular/core';
import { Item } from '@mocks/lib/types';
import { HttpClient } from '@angular/common/http';
import { rxResource } from '@angular/core/rxjs-interop';

export interface Page {
  total: number;
  items: Item[];
}

interface QueryParams {
  limit: number;
  offset: number;
}

@Injectable()
export class GetOffsetPaginationData {
  private injector = inject(Injector);
  private http = inject(HttpClient);
  private readonly queryParams = signal<QueryParams>({
    limit: 10,
    offset: 0,
  });
  private readonly pageResource = rxResource<Page, QueryParams>({
    params: () => this.queryParams(),
    stream: ({ params: { offset, limit } }) =>
      this.http.get<Page>('/api/items', { params: { limit, offset } }),
    defaultValue: { total: 0, items: [] },
    injector: this.injector,
  });
  private readonly _page = linkedSignal<{ status: ResourceStatus; value: Page }, Page>({
    source: () => ({
      status: this.pageResource.status(),
      value: this.pageResource.value(),
    }),
    computation: (source, previous) => {
      if (source.status === 'resolved') {
        return source.value;
      }

      return previous?.value ?? source.value;
    },
  });

  readonly page = this._page.asReadonly();
  readonly isLoading = this.pageResource.isLoading;

  refetch(limit = 10, offset = 0) {
    this.queryParams.set({ limit, offset });
  }
}
