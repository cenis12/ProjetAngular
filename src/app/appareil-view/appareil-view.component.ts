import { Component, OnInit } from '@angular/core';
import {AppareilService} from '../services/appareil.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-appareil-view',
  templateUrl: './appareil-view.component.html',
  styleUrls: ['./appareil-view.component.scss']
})
export class AppareilViewComponent implements OnInit {

  isAuth = false;

  //lastUpdate = new Date();

  lastUpdate = new Promise((resolve, reject) => {
    const date = new Date();
    setTimeout(() => {
      resolve(date);
    }, 15000);
  });

  appareils: any[];
  appareilSubscription: Subscription;

  //appareil1 = 'Machine à laver';
  //appareil2 = 'Télévision';
  //appareil3 = 'Pc portable';
  constructor(private appareilService: AppareilService) {
    setTimeout(() => {
      this.isAuth = true;
    },10000 );
  }
  ngOnInit(){
    this.appareilSubscription = this.appareilService.appareilSubject.subscribe(
      (appareils: any[]) => {
        this.appareils = appareils;
      }
    );
    this.appareilService.emitAppareilSubjet();
  }
  onAllumer(){
    this.appareilService.switchOnAll();
  }
  onEteindre(){
    this.appareilService.switchOffAll();
  }
  onSave(){
    this.appareilService.saveAppareilToServer();
  }
  onFetch(){
    this.appareilService.getAppareilFromServer();
  }

}
