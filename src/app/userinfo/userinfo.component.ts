import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { UserService } from "../services/user.service";
import { StorageService } from "../services/storage.service";

@Component({
  selector: 'app-userinfo',
  templateUrl: './userinfo.component.html',
  styleUrls: ['./userinfo.component.css']
})
export class UserinfoComponent implements OnInit {

  public userForm: FormGroup;

  constructor(private userService: UserService, private storageService: StorageService, private formBuilder: FormBuilder) {
    this.userForm = this.formBuilder.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      tel: ['', Validators.required],
      image: [''],
      oldPassword: ['', Validators.required],
      newPassword: ['']
    });
  }

  ngOnInit(): void {
    const user = this.storageService.getUser();
    this.userForm.patchValue({
      username: user.username,
      email: user.email,
      tel: user.tel,
      image: user.image
    });
  }

  public onSubmit(): void {
    if (this.userForm.valid) {
      const userId = this.storageService.getUser().id;
      let userProfile = this.userForm.value;

      // Check if the old password is empty, if so, assign its value to the new password
      if (!userProfile.oldPassword) {
        userProfile.newPassword = userProfile.oldPassword;
      }

      this.userService.modifyUserProfile(userId, userProfile).subscribe({
        next: () => {
          // Handle success
          console.log('Profile updated successfully.');
        },
        error: (error) => {
          // Handle error
          console.error('Error updating profile:', error);
        }
      });
    }
  }

  onFileChange(event: any): void {
    const file = event?.target?.files?.[0];

    if (file) {
      const reader = new FileReader();

      reader.onload = (e) => {
        if (this.userForm) {
          this.userForm.patchValue({
            image: '/assets/' + file.name
          });
        }
      };

      reader.readAsDataURL(file);
    }
  }
}
