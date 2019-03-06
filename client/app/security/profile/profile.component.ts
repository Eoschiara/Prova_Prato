/* 
* Generated by
* 
*      _____ _          __  __      _     _
*     / ____| |        / _|/ _|    | |   | |
*    | (___ | | ____ _| |_| |_ ___ | | __| | ___ _ __
*     \___ \| |/ / _` |  _|  _/ _ \| |/ _` |/ _ \ '__|
*     ____) |   < (_| | | | || (_) | | (_| |  __/ |
*    |_____/|_|\_\__,_|_| |_| \___/|_|\__,_|\___|_|
*
* The code generator that works in many programming languages
*
*			https://www.skaffolder.com
*
*
* You can generate the code from the command-line
*       https://npmjs.com/package/skaffolder-cli
*
*       npm install -g skaffodler-cli
*
*   *   *   *   *   *   *   *   *   *   *   *   *   *   *   *
*
* To remove this comment please upgrade your plan here: 
*      https://app.skaffolder.com/#!/upgrade
*
* Or get up to 70% discount sharing your unique link:
*       https://app.skaffolder.com/#!/register?friend=5c7f879a568681581952d157
*
* You will get 10% discount for each one of your friends
* 
*/
// Import Libraries
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { MatDialog } from "@angular/material";

// Security
import { SecurityService } from '../services/security.service';
import { AuthenticationService } from '../authentication.service';
import { ModalChangePasswordComponent } from '../../components/modal-change-password.component';

// Services
import { UserService } from '../../services/user.service';
import { User } from '../../domain/prova_prato_db/user';

/**
 * Edit my profile
 */
@Component({
    selector: 'profile',
    templateUrl : './profile.component.html',
})
export class ProfileComponent implements OnInit {

    user: User;

    constructor(
        private userService: UserService, 
        private authenticationService:AuthenticationService,
        private router:Router,
        private route:ActivatedRoute,
        public dialog: MatDialog
    ) {
    }

    ngOnInit(): void {
        this.route.params.subscribe( params => {
            // Get logged user
            this.authenticationService.getUser().subscribe((user:User) => {
               this.user = user;
            });
        })
    }
    
    /**
     * Save User
     */
    save(valid:boolean): void{
        if (valid)
            this.userService.update(this.user).subscribe(data => this.router.navigateByUrl('/home'));
    }

    /**
     * Open change password modal
     */
    openModal(id: string): void {
        let dialogRef = this.dialog.open(ModalChangePasswordComponent, {
            data: {}
        });
    }

}