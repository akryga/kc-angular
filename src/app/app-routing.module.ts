import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProcessComponent } from './process/process.component';
import { TaskComponent } from './task/task.component';
import { EventComponent } from './event/event.component';
import { ModelComponent } from './model/model.component';

const routes: Routes = [
  {path: 'process', component: ProcessComponent},
  {path: 'task', component: TaskComponent},
  {path: 'event', component: EventComponent},
  {path: 'model', component: ModelComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
