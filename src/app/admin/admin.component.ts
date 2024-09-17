import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  users: any[] = [];
  showModifyForm: boolean = false;
  modifiedUser: any = {};

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    this.userService.getAllUsers().subscribe(
      (data) => {
        this.users = data;
      },
      (error) => {
        console.error('Error loading users:', error);
      }
    );
  }

  deleteUser(userId: number): void {
    this.userService.deleteUser(userId).subscribe(
      () => {
        console.log('User deleted successfully!');
        // Reload the users after deletion
        this.loadUsers();
      },
      (error) => {
        console.error('Error deleting user:', error);
      }
    );
  }

  toggleModify(user: any): void {
    this.showModifyForm = !this.showModifyForm;
    this.modifiedUser = { ...user };
  }

  submitModifiedUser(): void {
    this.userService.modifyUser(this.modifiedUser.id, this.modifiedUser).subscribe(
      () => {
        console.log('User modified successfully!');
        // Reload the users after modification
        this.loadUsers();
        // Hide the modify form after submission
        this.showModifyForm = false;
      },
      (error) => {
        console.error('Error modifying user:', error);
      }
    );
  }

  cancelModification(): void {
    // Reset modifiedUser object
    this.modifiedUser = {};
    // Hide the modify form
    this.showModifyForm = false;
  }

  onFileChange(event: any): void {
    const file = event?.target?.files?.[0];

    if (file) {
      const reader = new FileReader();

      reader.onload = (e) => {
        if (this.modifiedUser) {
          this.modifiedUser.image = '/assets/' + file.name;
        }
      };

      reader.readAsDataURL(file);
    }
  }
}
