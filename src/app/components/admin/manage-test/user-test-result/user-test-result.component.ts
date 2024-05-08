import { Component, OnInit } from '@angular/core';
import {Location} from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { PracticeTestService } from '../../../../services/practice-test/practice-test.service';
import { TestService } from '../../../../services/test/test.service';
import { Constant } from '../../../../constants/constants';

@Component({
  selector: 'app-user-test-result',
  templateUrl: './user-test-result.component.html',
  styleUrl: './user-test-result.component.scss'
})
export class UserTestResultComponent implements OnInit{
  test: any;
  examResults: any;
  testId: any;

  constructor(
    private location: Location,
    private route: ActivatedRoute,
    private testService: TestService,
    private practiceTestService: PracticeTestService,
    
  ){

  }

  async ngOnInit(){
    this.testId = this.route.snapshot.paramMap.get('id');
    this.testService.getTestById(this.testId).subscribe((res) => {
      this.test = res;
    })
    console.log(this.test);
    // const res: any = await this.practiceTestService.getPracticeTestByTypeId({id: this.testId, type: Constant.PracticeTestType.TestId}) 
    // this.examResults = res
    // console.log(this.examResults, "ress");
  }

  goBack() {
    this.location.back();
  }

}
