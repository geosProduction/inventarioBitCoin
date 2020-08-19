import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { HomeRoutingModule } from './home-routing.module';
////////////////Components//////////////////////

import { HomeComponent } from './home.component';

///////Angular Material////////
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { AuthService } from 'src/app/services/auth.service';


@NgModule({
  declarations: [HomeComponent],
  imports: [
    CommonModule,
    HomeRoutingModule,
    ReactiveFormsModule,
    ////Angular Material//////
    MatCardModule,
    MatInputModule,
    MatButtonModule,
    MatToolbarModule,
  ],
  providers: [AuthService]
})
export class HomeModule { }
