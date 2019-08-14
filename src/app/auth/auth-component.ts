import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService, AuthResponse } from './auth-service';
import { logging } from 'protractor';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
@Component({
    selector: 'auth-login',
    templateUrl: './auth-component.html',
    styleUrls : ['./auth-component.css']
})

export class AuthComponent {

    constructor(private authService: AuthService, private router: Router) { }
    isLoginMode = true;
    isLoading = false;
    error: string = '';


    switchMode() {
        this.isLoginMode = !this.isLoginMode;
    }
    onSubmit(loginForm:NgForm){
        //check login
        if(!loginForm.valid){
            return;
        }
        if(loginForm.value.username && loginForm.value.username ==='user@quantiphi.com' 
        && loginForm.value.password && loginForm.value.password === 'quant1ph1'){
            this.router.navigate(['emailContent'])
        }else{
            this.error='please enter valid credentials'
        }


        // this.authService.checkLogin(loginForm.value);
     
       }


   /*  onSubmit(authForm: NgForm) {
        this.error = '';
        if (!authForm.valid) {
            return;
        }
        let authObs: Observable<AuthResponse>;
        const email = authForm.value.email;
        const password = authForm.value.password;
        this.isLoading = true;
        if (this.isLoginMode) {
            authObs = this.authService.login(email, password);
        } else {
            authObs = this.authService.signUp(email, password);
            
        }

        authObs.subscribe(
            (responseData) => {
                this.isLoading = false;
                this.router.navigate(['/recipe']);

                    console.log(responseData);
            }, errorMessage => {
                this.isLoading = false;
                console.log(errorMessage);
                this.error = errorMessage;
            })
        authForm.reset();

    } */

    onHandleError(){
        this.error=null;
    }

}