import {User} from '../models/User.model';
import {Subject} from 'rxjs';

export class UserService {
  private users: User[] = [{
    firstName: 'James',
    lastName: 'Nishi',
    email: 'james@nishi.com',
    drinkPreference: 'Fanta',
    hobbies: [
      'Basket-Ball',
      'coder'
    ]
  }];
  userSubjet = new Subject<User[]>();

  emitUsers() {
    this.userSubjet.next(this.users.slice());
  }
  addUser(user: User) {
    this.users.push(user);
    this.emitUsers();
  }
}
