import { Component } from '@angular/core'
import { IonicPage, NavController } from 'ionic-angular';
import { UserProvider } from '../../providers/user/user';
import { AngularFireAuth } from "angularfire2/auth";
import { LoginPage } from '../../pages/login/login';


@IonicPage()
@Component({
  selector: 'page-games',
  templateUrl: 'games.html',
})
export class GamesPage {
  
  userList = [];
  open = false;
  buttonpressed = false
  description = "Your friend needs to apporach somebody within 30 seconds"
  gameName = "30 sec challenge"
  public count:number = 30
  
  constructor(private userAuthentication: AngularFireAuth, private userInfo: UserProvider, private  navCtrl: NavController) {
    this.getUsers()
  }
  
  async getUsers(){
  console.log("getUsers ran....")
  await this.userInfo.getUsers().subscribe(data => this.getUsernameDB(data))
  
  }
  
  getUsernameDB(data){
    console.log("getUsernameDB ran...")
    for(let variable in data){
      if (data.hasOwnProperty(variable)) {
        this.userList.push(data[variable])
      }
    }
  }
  
  public challenge(user){
    this.buttonpressed = !this.buttonpressed
    this.open = !this.open
    user.gameOn = true
    this.startCountdown(user) 
    
  }

  private startCountdown(user) {
    user.countDownTimer = 30
    let counter: any
    counter = setInterval(()=>{
      if(user.countDownTimer<1){
        console.log("TIMER = 0 lol, du faila")
        clearInterval(counter)
      } else {
        user.countDownTimer--
      }
    },1000)
  }

  openFunction(){
    this.open= !this.open;
  }

  signOutUser(){
    this.userAuthentication.auth.signOut()
    this.navCtrl.setRoot(LoginPage)
  }

}


