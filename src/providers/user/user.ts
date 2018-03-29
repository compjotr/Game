
import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection,  } from 'angularfire2/firestore';
import { AngularFireAuth } from "angularfire2/auth";
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';



interface User{
  uid: string
  email: string
  username: string
  loggedIn: boolean


}
@Injectable()
export class UserProvider {

  userCol: AngularFirestoreCollection<any>;
  users: Observable<User[]>
  
  constructor( private userAuthentication: AngularFireAuth, private db: AngularFirestore) {
    this.dbCollection()
    this.valueChange()
  }

  getUsers(){
    return this.users.map(res => res)
    ._do(res => console.log(typeof(res)))
    ._do(res => console.log(res))
  }

  dbCollection(){
    this.userCol = this.db.collection('users');
  }
  
  valueChange(){
    this.users = this.userCol.valueChanges();
  }
  addUsers(userId, name, logged){
    this.db.collection('users').doc(userId).set({
      uid: userId,
      username: name,
      loggedIn: logged

    })
    .then(function(){
      console.log("user created: ", userId)
    })
    .catch(function(error){
      console.log("failed to create document: ", error)
    })
  }
  async createUser(email,pass,name, boo){
   
    await this.userAuthentication.auth.createUserWithEmailAndPassword(email, pass)
    .catch(e => console.log(e.message))
    this.userAuthentication.auth.signInWithEmailAndPassword(email,pass)

    this.userAuthentication.auth.onAuthStateChanged(firebaseUser => {
      if(firebaseUser){
        this.addUsers(firebaseUser.uid, name, boo)
      }
      else{
        
      }
    })   
  }

  async singInUser(email, pass){
    await this.userAuthentication.auth.signInWithEmailAndPassword(email, pass)
    .catch(e => console.log(e.message)) 
  }  
 
}


