import { DataSource } from '@angular/cdk/collections';
import { HttpClient, HttpParams } from '@angular/common/http';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { KeycloakService } from 'keycloak-angular';
// import { map } from 'rxjs/operators';
import { Observable, of as observableOf, merge, map, Subject } from 'rxjs';
import { ActTableComponent } from './act-table.component';

// TODO: Replace this with your own data model type
// export interface ActTableItem {
//   name: string;
//   id: number;
// }

// TODO: replace this with real data from your application
const EXAMPLE_DATA: any[] = [
  {id: 1, name: 'Hydrogen'},
  {id: 2, name: 'Helium'},
  {id: 3, name: 'Lithium'},
  {id: 4, name: 'Beryllium'},
  {id: 5, name: 'Boron'},
  {id: 6, name: 'Carbon'},
  {id: 7, name: 'Nitrogen'},
  {id: 8, name: 'Oxygen'},
  {id: 9, name: 'Fluorine'},
  {id: 10, name: 'Neon'},
  {id: 11, name: 'Sodium'},
  {id: 12, name: 'Magnesium'},
  {id: 13, name: 'Aluminum'},
  {id: 14, name: 'Silicon'},
  {id: 15, name: 'Phosphorus'},
  {id: 16, name: 'Sulfur'},
  {id: 17, name: 'Chlorine'},
  {id: 18, name: 'Argon'},
  {id: 19, name: 'Potassium'},
  {id: 20, name: 'Calcium'},
];

/**
 * Data source for the ActTable view. This class should
 * encapsulate all logic for fetching and manipulating the displayed data
 * (including sorting, pagination, and filtering).
 */

export class ActTableDataSource extends DataSource<any> {
  dataObs: Observable<any[]> = observableOf();
  data: any[] = [];
  paginator: MatPaginator | undefined;
  sort: MatSort | undefined;
  msgService: MessageService = new MessageService();
  totalItems: number = 0;

  constructor(
        private connector: string,
        private http: HttpClient,
        private readonly keycloak: KeycloakService) {
    super();
  }

  /**
   * Connect this data source to the table. The table will only update when
   * the returned stream emits new items.
   * @returns A stream of the items to be rendered.
   */
  connect(): Observable<any[]> {
    if (this.paginator && this.sort) {
      // Combine everything that affects the rendered data into one update
      // stream for the data-table to consume.

      return merge(
          this.getDatasource(), 
          this.msgService.messages$,
          this.paginator.page, 
          this.sort.sortChange
        )
        .pipe(map((p) => {
          if(('pageSize' in p && 'pageIndex' in p) || ('active' in p && 'direction' in p)){
            if( this.paginator && this.data.length<=this.paginator.pageSize )
              this.getDatasource().subscribe( p => {
                this.msgService.add(p);
                // console.log('subscribe sortEvent', p, this.connector);
              });
            // console.log('pageEvent', p, this.connector);
          }
          // else if('active' in p && 'direction' in p) {
          //   this.getDatasource().subscribe( p => {
          //       this.msgService.add(p);
          //       // console.log('subscribe sortEvent', p, this.connector);
          //   });
          //   // console.log('sortEvent', p, this.connector);
          // }
          else {
            this.data = p.list.entries.map((r: any[] ) => { return (<any>r).entry; });
            this.paginator!.length = this.totalItems = p.list.pagination.totalItems;
            // console.log('event', p, this.connector);
          }
          
          return (this.paginator&&this.data.length>this.paginator.pageSize)? this.getPagedData(this.getSortedData([...this.data])):this.data; 
        }));
    } else {
      throw Error('Please set the paginator and sort on the data source before connecting.');
    }
  }

  /**
   *  Called when the table is being destroyed. Use this function, to clean up
   * any open connections or free any held resources that were set up during connect.
   */
  disconnect(): void {}

  getDatasource(): Observable<any> {
    let queryParams: HttpParams = new HttpParams();
    if(this.paginator){
      queryParams = queryParams.set("page", '' + this.paginator.pageIndex)
      .set("size", '' + this.paginator.pageSize);
    }
    if(this.sort && this.sort.active)
      queryParams = queryParams.set("sort", this.sort.active + "," + this.sort.direction);
    console.log('getDatasource->params:', queryParams.toString());
    return this.http.get(this.connector, { params: queryParams });
      //.pipe(map ((data: any) => { console.log('http.get->', data); return data.list.entries.map((r: any[] ) => { return (<any>r).entry; }) }));
  }

    /**
   * Paginate the data (client-side). If you're using server-side pagination,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getPagedData(data: any[]): any[] {
    if (this.paginator) {
      const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
      return data.splice(startIndex, this.paginator.pageSize);
    } else {
      return data;
    }
  }

  /**
   * Sort the data (client-side). If you're using server-side sorting,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getSortedData(data: any[]): any[] {
    if (!this.sort || !this.sort.active || this.sort.direction === '') {
      return data;
    }

    return data.sort((a, b) => {
      const isAsc = this.sort?.direction === 'asc';
      switch (this.sort?.active) {
        case 'name': return compare(a.name, b.name, isAsc);
        case 'id': return compare(+a.id, +b.id, isAsc);
        default: return 0;
      }
    });
  }
}

/** Simple sort comparator for example ID/Name columns (for client-side sorting). */
function compare(a: string | number, b: string | number, isAsc: boolean): number {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}

export class MessageService {
  // Tip: never expose the Subject itself.
  private messageSubject = new Subject<any[]>();

  /** Observable of all messages */
  messages$ = this.messageSubject.asObservable();

  /** Add an error message to the Subject */
  add(data: any[]) {
    this.messageSubject.next(data);
  }
}