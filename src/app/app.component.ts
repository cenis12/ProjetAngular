import {Component, OnDestroy, OnInit} from '@angular/core';
import {interval, Observable, Subscription} from 'rxjs';
import 'rxjs';
import {AppareilService} from './services/appareil.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {

  secondes: number;
  counterSubscription: Subscription;
  constructor() {
  }


  ngOnInit() {
    const counter = interval(1000);
    this.counterSubscription = counter.subscribe((value: number) => {
      this.secondes = value;
    });
    /*counter.subscribe(
      (value) => {
        this.secondes = value;
      },
      (error) => {
        console.log('Uh-oh, an error occurred! : ' + error);
      },
      () => {
        console.log('Observable complete!');
      }
    );*/
  }
  ngOnDestroy(): void {
    this.counterSubscription.unsubscribe();
  }

}
