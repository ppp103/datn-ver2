import { Directive, EventEmitter, HostListener, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
@Directive({
  selector: '[appDebounce]'
})
export class DebounceDirective implements OnInit, OnDestroy{
  @Input('appDebounce') debounceTime = 300; // Thời gian debounce mặc định
  @Output() debounceClick = new EventEmitter();
  private clicks = new Subject();
  private subscription!: Subscription;

  constructor() { }

  ngOnInit() {
    this.subscription = this.clicks.pipe(
      debounceTime(this.debounceTime)
    ).subscribe(event => this.debounceClick.emit(event));
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  @HostListener('click', ['$event'])
  clickEvent(event: any) {
    event.preventDefault(); // Tránh chuyển hướng trang nếu nút là một trong số các nút trong một form
    this.clicks.next(event);
  }
}
