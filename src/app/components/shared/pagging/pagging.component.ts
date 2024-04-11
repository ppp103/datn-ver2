import { Component, OnInit, Input, OnChanges, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-pagging',
  templateUrl: './pagging.component.html',
  styleUrl: './pagging.component.scss'
})
export class PaggingComponent {
  
  // Input, output
  @Input() listItems: any;

  // tslint:disable-next-line: no-output-on-prefix
  @Output() onChangePage = new EventEmitter<string>();

  // Pagging data
  public pagging: any;
  public pageRange: number[] = [];

  constructor() { }

  ngOnInit() {
  }

  /**
   * On click change page
   * @param pageNumber Page number
   */
  changePage(pageNumber: number) {
    this.pagging.pageNumber = pageNumber;
    this.pagging.take = this.pagging.pageSize;
    this.pagging.skip = this.pagging.pageSize * (this.pagging.pageNumber - 1);
    this.onChangePage.next(this.pagging);
  }

  /**
   * Async page change
   */
  ngOnChanges() {
    if (this.listItems && this.listItems.pagging) {
      this.pageRange = [];
      this.pagging = this.listItems.pagging;
      for (let i = 0; i <  this.pagging.totalPages; i++) {
        this.pageRange.push(i);
      }
    }
  }

}
