import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent {
  public currentYear: number;
  public socialSkill: string;
  public socialSkills: Array<string>;

  // Social accounts
  public sa_type: string;
  public sa_address: string;
  public socialAccounts: SocialAccount[];


  // Default constructor inits
  constructor() {
    this.currentYear = new Date().getFullYear();
    this.socialSkill = "";
    this.socialSkills = new Array();
    this.sa_type = "";
    this.sa_address = "";
    this.socialAccounts = new Array();
  }

  // Adds social skill only if it's not empty
  // Resets input after adding
  addSocialSkill() {
    if (this.socialSkill.length > 0) {
      this.socialSkills.push(this.socialSkill);
      console.log("Social skill " + this.socialSkill + " has been added");
      this.socialSkill = "";
    }
  }

  // Checks if both type & address is filled in
  // Resets both inputs after adding
  addSocialAccount() {
    if (this.sa_type.length > 0 && this.sa_address.length > 0) {
      var s = new SocialAccount();
      s.type = this.sa_type;
      s.address = this.sa_address;
      this.socialAccounts.push(s);
      this.sa_type = "";
      this.sa_address = "";
    }
  }
}
class SocialAccount {
  type: string;
  address: string;
}
