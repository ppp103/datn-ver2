import { Component, OnInit } from '@angular/core';
import {Location} from '@angular/common';
import { PracticeTestService } from '../../../../services/practice-test/practice-test.service';
import { ActivatedRoute, Router } from '@angular/router';
import { TestService } from '../../../../services/test/test.service';
import { Constant } from '../../../../constants/constants';
import _ from 'lodash'
@Component({
  selector: 'app-user-test',
  templateUrl: './user-test.component.html',
  styleUrl: './user-test.component.scss'
})
export class UserTestComponent implements OnInit{
  examResults: any;
  test: any;
  testId: any;
  pagging: any;
  totalLastestTests: any;
  lastestTests: any;
  sortBy = false;

  constructor(
    private location: Location,
    private practiceTestService: PracticeTestService,
    private route: ActivatedRoute,
    private testService: TestService,
    private router: Router,
    private praticeTestService: PracticeTestService,

  ){

  }

  async ngOnInit() {
    this.testId = this.route.snapshot.paramMap.get('id');
    this.testService.getTestById(this.testId).subscribe((res) => {
      this.test = res;
    })
    this.loadData();
    // const res: any = await this.practiceTestService.getPracticeTestByTypeId({id: this.testId, type: Constant.PracticeTestType.TestId}) 
    // this.examResults = res
    // console.log(this.examResults);
  }

  goBack() {
    this.location.back();
  }

  goUserExamDetail(id: number){
    this.router.navigate([`admin/tests/${this.testId}/users/${id}`])
  }
  
  onChangePage(args: any) {
    this.loadData(args.skip, args.take);
  }

  async loadData(skip: number = 0, take: number = 10) {
    let state: any = { skip, take, action: { requestType: 'searching' } };

    this.praticeTestService.getPracticeTestByTypeId(state, {PageNumber:1, TypeId: this.testId, Type: Constant.PracticeTestType.TestId});

    this.praticeTestService.subscribe((res: any) => {
      this.pagging = res;
      if (res.result) {
        this.examResults = res.result;
      }
    });
  }

  sortPoint() {
    this.sortBy = !this.sortBy;
    if (this.sortBy) {
      this.examResults = _.orderBy(this.examResults, 'result', 'desc');
    } else {
      this.examResults = _.orderBy(this.examResults, 'result', 'asc');
    }
  }
}
