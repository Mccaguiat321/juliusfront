import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StudentComponent } from './student/student.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { LoginComponentComponent } from './login-component/login-component.component';
import { PinagsamaComponent } from './pinagsama/pinagsama.component';
import { RegisterComponent } from './register/register.component';
import { ExpensesComponent } from './expenses/expenses.component';
import { UsersComponent } from './users/users.component';
import { LoadingSpinnerComponent } from './loading-spinner/loading-spinner.component';
import { FrontPageComponent } from './front-page/front-page.component';
import { PathguardComponent } from './pathguard/pathguard.component';
import { ReceiptComponent } from './receipt/receipt.component';
import { DataTableComponent } from './data-table/data-table.component';

@NgModule({
  declarations: [
    AppComponent,
    StudentComponent,
    DataTableComponent,
    LoginComponentComponent,
    PinagsamaComponent,
    RegisterComponent,
    ExpensesComponent,
    UsersComponent,
    LoadingSpinnerComponent,
    FrontPageComponent,
    PathguardComponent,
    ReceiptComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,  // Reactive forms module is correctly added
    HttpClientModule      // HttpClientModule is correctly added here
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
