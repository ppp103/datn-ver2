import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { interval, Subscription, timer } from 'rxjs';

@Component({
  selector: 'app-test-question',
  templateUrl: './test-question.component.html',
  styleUrl: './test-question.component.scss',
})
export class TestQuestionComponent {
  // counter!: number;
  counter = 10;
  countDown!: Subscription;
  tick = 1000;
  toggleModal: any;
  private subscription: any;

  constructor(private router: Router) {}

  ngOnInit(): void {
    // this.startTimer();
    // this.subscription = interval(10000).subscribe((x) => {
    //   this.saveToServer(false);
    // });
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }

    if (this.countDown) {
      this.countDown.unsubscribe();
    }
  }

  startTimer() {
    // this.subscription = interval(1000).subscribe(() => {
    //   if (this.counter > 0) {
    //     this.counter--; // Decrement the timer value every second
    //   } else {
    //     this.countDown.unsubscribe(); // Stop the timer when it reaches 0
    //   }
    // });
    this.countDown = timer(0, this.tick).subscribe(() => {
      if (this.counter > 0) {
        --this.counter;
      } else {
        this.counter = 0;
        this.submit();
      }
    });
  }

  showModal() {
    this.toggleModal = true;
  }

  closeModal() {
    this.toggleModal = false;
  }

  submit() {
    console.log('click');
    this.router.navigate(['user/test/detail/result']);
  }
}
