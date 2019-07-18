import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthComponent } from './auth/auth-component';
import { EmailComponent } from './email/email.component';

const routes: Routes = [
  {
    path: 'login', component: AuthComponent
  },
  {
    path: 'emailContent', component: EmailComponent
  }

  , {
    path: '', redirectTo: '/login', pathMatch: 'full'
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
