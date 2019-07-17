import { Component, EventEmitter, Output, OnInit, OnDestroy } from '@angular/core';
import {Subscription } from 'rxjs';


import { AuthService } from '../auth/auth-service';
import { Router } from '@angular/router';
@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls :['./header.component.scss']
 
})

export class HeaderComponent implements OnInit, OnDestroy {
    isAuthenticated = false;
    userAuthSubscription: Subscription;
    //  firstObservable:Subscription;

    constructor(private authService: AuthService,private router:Router) {

    }

    ngOnInit(): void {
        this.userAuthSubscription = this.authService.user.subscribe(
            user => {
                this.isAuthenticated = !!user;
            }
        )


    }


   
    logout(){
        this.authService.logout();
        this.router.navigateByUrl('/login')
    }


    ngOnDestroy() {
        this.userAuthSubscription.unsubscribe();
    }




}
