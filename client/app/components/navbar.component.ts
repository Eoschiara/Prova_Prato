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
import { TokenEmitter } from '../security/token-emitter';
import { User } from '../domain/prova_prato_db/user';
import { AuthenticationService } from '../security/authentication.service';
import { Component } from '@angular/core';

/**
 * Top navbar component
 */
@Component({
    selector: "navbar",
    templateUrl: "./navbar.component.html",
})
export class NavbarComponent{
    user: User;

    constructor(
        private authenticationService: AuthenticationService, private tokenEmitter: TokenEmitter) {
            
            // Get user
            this.refreshUser();

            // Update user on login/logout
            tokenEmitter.emitter.on("refreshToken", () => {this.refreshUser()});
        }

    /**
     * Refresh user in component navbar
     */
    refreshUser(){

        // Get user from Authentication Serice
        this.authenticationService.getUser().subscribe((user:User) => {
            this.user = user;
        });
    }

    /**
     * Logout action
     */
    logout(e:Event) {
        e.preventDefault();
        this.authenticationService.logout();
    }
}