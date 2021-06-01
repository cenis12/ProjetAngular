import {Subject} from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()

export class AppareilService {

  appareilSubject = new Subject<any[]>();
  private appareils = [
    {
      id: 1,
      name: 'Machine à laver',
      status: 'éteint'
    },
    {
      id: 2,
      name: 'Télevision',
      status: 'allumé'
    },
    {
      id: 3,
      name: 'Machine à laver',
      status: 'allumé'
    }

  ];
  constructor(private httpClient: HttpClient){}

  emitAppareilSubjet() {
    this.appareilSubject.next(this.appareils.slice());
  }

  getById(id: number) {
    const appareil = this.appareils.find((appareilObject) => {
      return appareilObject.id === id;
    });
    return appareil;
  }

  switchOnAll() {
    for (let appareil of this.appareils){
      appareil.status = 'allumé';
    }
    this.emitAppareilSubjet();
  }
  switchOffAll() {
    for (let appareil of this.appareils){
      appareil.status = 'éteint';
    }
    this.emitAppareilSubjet();
  }
  switchOnOne(i: number) {
    this.appareils[i].status = 'allumé';
    this.emitAppareilSubjet();
  }
  switchOffOne(i: number) {
    this.appareils[i].status = 'éteint';
    this.emitAppareilSubjet();
  }
  addAppareil(name: string, status: string) {
    const appareilObject = {
      id: 0,
      name: '',
      status: ''
    };
    appareilObject.name = name;
    appareilObject.status = status;
    appareilObject.id = this.appareils[(this.appareils.length - 1)].id + 1;
    this.appareils.push(appareilObject);
    this.emitAppareilSubjet();
  }
  saveAppareilToServer(){
    this.httpClient
    .post('https://projetangular-311608-default-rtdb.europe-west1.firebasedatabase.app/appareils.json', this.appareils)
    .subscribe(()=>{
      console.log('Enregistrement réussi');
    },
    (error)=>{
      console.log('Erreur de sauvegarde'+ error);
    })
  }
  getAppareilFromServer() {
    this.httpClient
    .get<any[]>('https://projetangular-311608-default-rtdb.europe-west1.firebasedatabase.app/appareils.json')
    .subscribe((response)=>{
      this.appareils = response;
      this.emitAppareilSubjet();
    },
    (error)=>{
      console.log('Erreur de chargement'+ error);
    });
  }
}
