import { Component, OnInit } from '@angular/core';
import { TestService } from '../../../services/test/test.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-test-detail',
  templateUrl: './test-detail.component.html',
  styleUrl: './test-detail.component.scss'
})
export class TestDetailComponent implements OnInit{
  exam: any;
  id: any;
  constructor(
    private testService: TestService,
    private route: ActivatedRoute
  ){}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.id = params['id'];
    });
    this.testService.getTestById(this.id).subscribe({
      next: res => {
        console.log(res);
        this.exam = res;
      }
    });
  }

  
}
