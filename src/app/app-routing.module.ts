import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PinagsamaComponent } from './pinagsama/pinagsama.component';
import { LoginComponentComponent } from './login-component/login-component.component';
import { RegisterComponent } from './register/register.component';
import { ExpensesComponent } from './expenses/expenses.component';
import { UsersComponent } from './users/users.component';
import { FrontPageComponent } from './front-page/front-page.component';
import { ReceiptComponent } from './receipt/receipt.component';

  
const routes: Routes = [
  { path: 'login', component: LoginComponentComponent },
  { path: 'pinagsama', component: PinagsamaComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'receipt', component: ReceiptComponent },
  { path: 'expenses/:id', component: ExpensesComponent },
  { path: 'user', component: UsersComponent },
  { path: 'landing_page', component: FrontPageComponent },
  { path: '', redirectTo: 'landing_page', pathMatch: 'full' }, // Redirect to login by default
  { path: '**', redirectTo: 'landing_page' } // Wildcard route for any undefined paths
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
