import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';

//pages
import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { LoginPage } from '../pages/login/login';
import { GamesPage } from '../pages/games/games';
//native stuff
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { FCM } from '@ionic-native/fcm';

//providers
import { UserProvider } from '../providers/user/user';
import { FcmProvider } from '../providers/fcm/fcm';
//firestore
import { AngularFirestore, AngularFirestoreCollection,  } from 'angularfire2/firestore';
import { AngularFireModule, } from "angularfire2";
import { AngularFireAuthModule } from "angularfire2/auth";
import { AngularFirestoreModule } from "angularfire2/firestore";
import { AngularFireDatabaseModule, AngularFireDatabase } from 'angularfire2/database';
import * as firebase from 'firebase/app';
import { Firebase } from '@ionic-native/firebase';



var firebaseConfig = {
  
  apiKey: "AIzaSyCjF3yDcLtJ9ZkAtWHqgK168eznh0DDNTc",
    authDomain: "game-6c93f.firebaseapp.com",
    databaseURL: "https://game-6c93f.firebaseio.com",
    projectId: "game-6c93f",
    storageBucket: "",
    messagingSenderId: "947395284555"
};
firebase.initializeApp(firebaseConfig)


@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    LoginPage,
    GamesPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseConfig),  // Add this
    AngularFireDatabaseModule,
    AngularFirestoreModule.enablePersistence() ,
    AngularFireAuthModule,
    HttpClientModule,

    
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    LoginPage,
    GamesPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    UserProvider,
    FCM,
    FcmProvider,
    HttpClientModule,
    Firebase
  ]
})
export class AppModule {}
