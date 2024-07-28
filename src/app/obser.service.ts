import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export interface User {
  id: number;
  name: string;
  email: string;
}

@Injectable({
  providedIn: 'root'
})
export class ObserService {

   // Déclaration d'un BehaviorSubject pour stocker les utilisateurs
   private users: BehaviorSubject<User[]> = new BehaviorSubject<User[]>([
    // Utilisateurs initiaux pour l'exemple
    { id: 1, name: 'Saidou', email: 'saidou@example.com' },
    { id: 2, name: 'Baldee', email: 'baldee@example.com' }
  ]);

  constructor() { }

  getUsers(): Observable<User[]> {
    return this.users.asObservable();
  }

  addUser(user: User): void {
    const currentUsers = this.users.value;
    this.users.next([...currentUsers, user]);
  }

  removeUser(id: number): void {
    const currentUsers = this.users.value;
    this.users.next(currentUsers.filter(user => user.id !== id));
  }

  // Méthode pour mettre à jour un utilisateur existant
  updateUser(updatedUser: User): void {
    const currentUsers = this.users.value;
    const index = currentUsers.findIndex(user => user.id === updatedUser.id);
    if (index !== -1) {
      currentUsers[index] = updatedUser;
      this.users.next([...currentUsers]);
    } else {
      // Gestion de l'erreur si l'utilisateur n'est pas trouvé
      console.error('erreur');
    }
  }


}
