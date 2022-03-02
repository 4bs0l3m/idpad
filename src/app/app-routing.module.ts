import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PianoComponent } from './pages/piano/piano.component';
import { AdsrPipe } from './adsr.pipe';

const routes: Routes = [
  {
    path:'piano',
    component:PianoComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
   declarations: [
  ]
})
export class AppRoutingModule { }
