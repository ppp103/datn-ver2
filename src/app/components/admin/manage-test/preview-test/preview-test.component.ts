import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TestService } from '../../../../services/test/test.service';
import { PracticeTestService } from '../../../../services/practice-test/practice-test.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-preview-test',
  templateUrl: './preview-test.component.html',
  styleUrl: './preview-test.component.scss'
})
export class PreviewTestComponent implements OnInit{
  test: any;
  testId: any;
  constructor(
    private location: Location,
    private route: ActivatedRoute,
    private testService: TestService,
    private practiceTestService: PracticeTestService,
    
  ){
    
  }
  ngOnInit() {
    this.testId = this.route.snapshot.paramMap.get('id');
    this.testService.getTestById(this.testId).subscribe((res) => {
      this.test = res;
    })
  }

  goBack() {
    this.location.back();
  }
}
