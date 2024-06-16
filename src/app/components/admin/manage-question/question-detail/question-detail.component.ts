import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { QuestionService } from '../../../../services/question/question.service';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-question-detail',
  templateUrl: './question-detail.component.html',
  styleUrl: './question-detail.component.scss',
})
export class QuestionDetailComponent implements OnInit {
  createForm!: FormGroup;
  itemId: any;
  question: any;
  multipleChoice: any = [];
  constructor(
    private questionService: QuestionService,
    private fb: FormBuilder,
    private dialog: MatDialog,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.createForm = this.fb.group({});
  }

  async ngOnInit() {
    this.itemId = this.route.snapshot.paramMap.get('id');
    this.question = await firstValueFrom(
      this.questionService.getQuestionById(this.itemId)
    );
    for (let i = 1; i <= 4; i++) {
      const optionKey = `option${i}`;
      if (this.question[optionKey] !== null) {
        this.multipleChoice.push({
          choiceText: this.question[optionKey],
          isCorrected:
            this.question[optionKey] === this.question.correctOption ? 1 : 0,
        });
      }
    }
  }

  onSaveAndClose() {}

  onToggle(e: any) {}

  return() {
    this.router.navigate([`/admin/questions`]);
  }
}
