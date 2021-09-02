import {Injectable} from '@angular/core';
// import 'rxjs/add/operator/toPromise';
import {AngularFirestore} from '@angular/fire/firestore';
import {AngularFireAuth} from '@angular/fire/auth';

@Injectable()
export class StorageService {

  constructor(
    public afs: AngularFirestore,
    public afAuth: AngularFireAuth
  ) {
  }

  setCookie(cname, cvalue) {
      localStorage.setItem(cname,cvalue);
    // var d = new Date();
    // const days = 7
    // d.setTime(d.getTime() + (days * 24 * 60 * 60 * 1000));
    // var expires = "expires=" + d.toUTCString();
    // document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
  }
  getCookie(name) {
          return localStorage.getItem(name);
    // var nameEQ = name + "=";
    // var ca = document.cookie.split(';');
    // for (var i = 0; i < ca.length; i++) {
    //   var c = ca[i];
    //   while (c.charAt(0) === ' ') c = c.substring(1, c.length);
    //   if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
    // }
    // return null;
  }
  clearCookie() {
    const cookies = document.cookie.split(";");
    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i];
      const eqPos = cookie.indexOf("=");
      const name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
      document.cookie = name + "=";
    }
  }

}
