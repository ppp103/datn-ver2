import { Component } from '@angular/core';
// import { SkeletonComponent } from '../../shared/skeleton/skeleton.component';
import { TestCardComponent } from '../test-card/test-card.component';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [TestCardComponent, CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  listComing: any;
  skeletonLoading: any;
  listComplete: any;
}
