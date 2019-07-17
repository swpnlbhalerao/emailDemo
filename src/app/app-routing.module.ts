import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthComponent } from './auth/auth-component';
import { EmailComponent } from './email/email.component';

/* const routes: Routes = [
  { path:"" ,redirectTo:"/recipe",pathMatch:"full" },
  { path:"recipe" ,canActivate:[AuthGaurd],component:RecipesComponent,children :[
    { path:'',component:RecipeStartComponent  },
    { path:'new',component:EditRecipeComponent  },
    { path:':id',component:RecipesDetailComponent ,resolve:[RecipeResolverService] },
    { path:':id/edit',component:EditRecipeComponent ,resolve:[RecipeResolverService] }
    
  ] },
  { path:"shopping-list" ,component:ShoppingListComponent},
  {  path :"auth" ,component :AuthComponent}, 
  {  path :"**" ,component :AuthComponent} 
]; */

const routes: Routes = [
  {
    path:'login',component:AuthComponent
  },
  {
    path :'emailContent',component:EmailComponent
  }

  ,{
    path :'',redirectTo:'/login',pathMatch:'full'
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
