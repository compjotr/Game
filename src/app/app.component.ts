import { Component, ViewChild } from '@angular/core';
import { Platform, NavController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { FCM } from '@ionic-native/fcm';
import { TabsPage } from '../pages/tabs/tabs';
import { GamesPage } from '../pages/games/games';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = TabsPage;
  @ViewChild('myNav') navCtrl: NavController;

  constructor(public fcm: FCM, platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen) {
    platform.ready().then(() => {
      fcm.onNotification().subscribe(data => {
        if (data.wasTapped) {
          //Notification was received on device tray and tapped by the user.
          console.log(JSON.stringify(data));
          this.navCtrl.setRoot(GamesPage);
        } else {
          //Notification was received in foreground. Maybe the user needs to be notified.
          console.log(JSON.stringify(data));
          this.navCtrl.push(GamesPage);
        }
      });
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
      this.fcm.getToken().then(token => {
        // Your best bet is to here store the token on the user's profile on the
        // Firebase database, so that when you want to send notifications to this 
        // specific user you can do it from Cloud Functions.
      });
    });
  }
}
