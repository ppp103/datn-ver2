import { Component, OnInit } from '@angular/core';
import { TestService } from '../../../services/test/test.service';
import { TopicService } from '../../../services/topics/topic.service';
import { TestCategoryService } from '../../../services/test-category/test-category.service';

@Component({
  selector: 'app-test-list',
  templateUrl: './test-list.component.html',
  styleUrl: './test-list.component.css'
})
export class TestListComponent implements OnInit{
  examList: any;
  pagging: any;
  testCategories: any;
  currentDate = new Date();
  selectedTestCategory: any;
  searchString: any;

  constructor(
    private testService: TestService,
    private testCategoryService: TestCategoryService
  ){
  }

  async loadData(skip: number = 0, take: number = 8) {
    let state: any = { skip, take, action: { requestType: 'searching' } };
    this.testService.getPaggingData(state, {Keyword: this.searchString});

    this.testService.subscribe((res: any) => {
      this.pagging = res;
      if (res.result) {
        this.examList = res.result;
      }
    });
  }

  ngOnInit() {
    this.loadData();
    this.loadTestCategory();
  }

  async loadTestCategory() {
    this.testCategories = await this.testCategoryService.getTestCategory();
  }

  onChangePage(args: any) {
    this.loadData(args.skip, args.take);
  }

  activatetestCategory(selectedTestCategory: any){
    this.selectedTestCategory = selectedTestCategory;
    this.testCategories.forEach((testCategory: any) => {
      testCategory.isActive = (testCategory === selectedTestCategory);
    });
  }
  
}
