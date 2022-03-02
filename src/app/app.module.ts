import { APP_BASE_HREF, CommonModule, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { NgModuleCompiler } from '@angular/compiler';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';


import {FrequencyPipeModule} from '@ng-web-apis/midi';
import { AdsrPipe } from './adsr.pipe';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PianoComponent } from './pages/piano/piano.component';

@NgModule({
  declarations: [

    AppComponent,PianoComponent,AdsrPipe
  ],
  imports: [
    CommonModule,
    FormsModule,
    BrowserModule,
    AppRoutingModule,

    FrequencyPipeModule,


  ],

  providers: [
    {
        provide: LocationStrategy,
        useClass: PathLocationStrategy,
    },
    {
        provide: APP_BASE_HREF,
        useValue: '',
    },
],
  bootstrap: [AppComponent]
})
export class AppModule { }
