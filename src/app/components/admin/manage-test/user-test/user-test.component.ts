import { Component, OnInit } from '@angular/core';
import {Location} from '@angular/common';
import { PracticeTestService } from '../../../../services/practice-test/practice-test.service';
import { ActivatedRoute, Router } from '@angular/router';
import { TestService } from '../../../../services/test/test.service';
import { Constant } from '../../../../constants/constants';
// import _ from 'lodash'
@Component({
  selector: 'app-user-test',
  templateUrl: './user-test.component.html',
  styleUrl: './user-test.component.scss'
})
export class UserTestComponent implements OnInit{
  examResults: any;
  test: any;
  testId: any;
  constructor(
    private location: Location,
    private practiceTestService: PracticeTestService,
    private route: ActivatedRoute,
    private testService: TestService,
    private router: Router
  ){

  }

  async ngOnInit() {
    this.testId = this.route.snapshot.paramMap.get('id');
    this.testService.getTestById(this.testId).subscribe((res) => {
      this.test = res;
    })
    const res: any = await this.practiceTestService.getPracticeTestByTypeId({id: this.testId, type: Constant.PracticeTestType.TestId}) 
    this.examResults = res
  }

  goBack() {
    this.location.back();
  }

  goUserExamDetail(id: number){
    this.router.navigate([`admin/tests/${this.testId}/users/${id}`])
  }

  sortPoint(){

  }
}
