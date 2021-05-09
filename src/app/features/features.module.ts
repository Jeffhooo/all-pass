import { NgModule } from '@angular/core';
import { PortalComponent } from './portal/portal.component';
import { ExamComponent } from './exam/exam.component';
import { FeaturesRoutingModule } from './features-routing.module';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReviewComponent } from './review/review.component';

@NgModule({
  imports: [FeaturesRoutingModule, CommonModule, FormsModule],
  declarations: [PortalComponent, ExamComponent, ReviewComponent]
})
export class FeaturesModule {}
