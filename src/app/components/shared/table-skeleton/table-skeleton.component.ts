import {Component, Input, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-table-skeleton',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './table-skeleton.component.html',
  styleUrls: ['./table-skeleton.component.scss']
})
export class TableSkeletonComponent implements OnInit {

  @Input() type: any;
  constructor() { }

  ngOnInit(): void {
  }

}
