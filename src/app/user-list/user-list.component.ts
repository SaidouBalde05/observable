import { Component, NgModule, OnInit } from '@angular/core';
import { ObserService, User } from '../obser.service';
import { FormsModule, } from '@angular/forms';
import { CommonModule, NgFor } from '@angular/common';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [ FormsModule, NgFor,CommonModule ],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.scss'
})
export class UserListComponent implements OnInit {

  users: User[] = [];
  selectedUser: User | null = null;

  constructor(private ObserService: ObserService) { }

  ngOnInit(): void {
    this.ObserService.getUsers().subscribe(users => this.users = users);
  }

  addUser(): void {
    const newUser: User = { id: Date.now(), name: 'New User', email: 'new@user.com' };
    this.ObserService.addUser(newUser);
  }

  removeUser(id: number): void {
    this.ObserService.removeUser(id);
  }

  // Sélectionne un utilisateur pour l'éditer
  editUser(user: User): void {
    this.selectedUser = { ...user };
  }

  // Soumet les modifications d'un utilisateur
  saveUser(): void {
    if (this.selectedUser) {
      this.ObserService.updateUser(this.selectedUser);
      this.selectedUser = null; // Réinitialise la sélection
    }
  }
  
}
