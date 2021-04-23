import { NgModule } from '@angular/core';
import { PortalComponent } from './portal/portal.component';
import { ExamComponent } from './exam/exam.component';
import { FeaturesRoutingModule } from './features-routing.module';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [FeaturesRoutingModule, CommonModule, FormsModule],
  declarations: [PortalComponent, ExamComponent]
})
export class FeaturesModule {}
