import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PortalComponent } from './portal/portal.component';
import { ExamComponent } from './exam/exam.component';

const routes: Routes = [
  {
    path: '',
    component: PortalComponent
  },
  {
    path: 'portal',
    component: PortalComponent
  },
  {
    path: 'exam',
    component: ExamComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FeaturesRoutingModule {}
