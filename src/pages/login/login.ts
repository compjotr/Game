

import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import { AngularFireAuth } from "angularfire2/auth";
import { UserProvider } from '../../providers/user/user';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import { GamesPage } from '../games/games';




interface User{
  uid: string
  email: string
  username: string
  loggedIn: boolean


}

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
 
  private show: boolean = false;
  private userList = []
 
  constructor(private userprovider: UserProvider, private userAuthentication: AngularFireAuth, public navCtrl: NavController) {
    console.log(this.userList)
  }
  NgOnInit(){
    this.getUsers()
  }


  loginUser(e) {
    e.preventDefault();
    let password2:string
    let username:string
    let phoneNr:string
    
    let email = e.target.elements[0].value;
    let password = e.target.elements[1].value;
    if(this.show){
      password2 = e.target.elements[2].value; //har ikke adda logikk for å sjekke om passordet stemmer
      username = e.target.elements[3].value;
      phoneNr = e.target.elements[4].value;
      this.userprovider.createUser(email, password,username, true)
      let currUser = this.userAuthentication.auth.currentUser.uid //aldri brukt til noe, kanskje i gamle versjonen?

      
     
      this.navCtrl.setRoot(GamesPage)
    }   
    
    if(!this.show){
      this.userprovider.singInUser(email, password)
      this.navCtrl.setRoot(GamesPage)
          
    }
  }

  getUsers(){
    this.userprovider.getUsers().subscribe(data => this.usersToList(data))
  }
  
  usersToList(data){
    for(let variable in data){
      if (data.hasOwnProperty(variable)) {
        this.userList.push(data[variable])
      }
    }
    console.log(this.userList)
    return this.userList
  }


}
