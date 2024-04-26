import { Component, OnInit } from '@angular/core';
import {Location} from '@angular/common';
import { PracticeTestService } from '../../../services/practice-test/practice-test.service';
import { ActivatedRoute } from '@angular/router';
// import _ from 'lodash'
@Component({
  selector: 'app-user-test',
  templateUrl: './user-test.component.html',
  styleUrl: './user-test.component.scss'
})
export class UserTestComponent implements OnInit{
  examResults: any;
  itemId: any;
  constructor(
    private location: Location,
    private practiceTestService: PracticeTestService,
    private route: ActivatedRoute
  ){

  }

  ngOnInit(): void {
    this.itemId = this.route.snapshot.paramMap.get('id');

    const res: any = this.practiceTestService.getPracticeTestByTestId(this.itemId)
    this.examResults = res.items
    console.log(res);

  }

  goBack() {
    this.location.back();
  }

  sortPoint(){

  }
}
