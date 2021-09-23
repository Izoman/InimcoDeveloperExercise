import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent {

  // constructor values
  http: HttpClient;
  baseUrl: string;

  public currentYear: number;

  public socialSkill: string;
  public socialSkills: Array<string>;

  // Social accounts
  public sa_type: string;
  public sa_address: string;
  public socialAccounts: SocialAccount[];

  // Basic validators
  form = new FormGroup({
    firstName: new FormControl('', Validators.minLength(2)),
    lastName: new FormControl('', Validators.minLength(2)),
  });

  get firstName(): any {
    return this.form.get('firstName');
  }

  get lastName(): any {
    return this.form.get('lastName');
  }

  countVowels(s) {
    var matches = s.match(/[aeiou]/g);
    if (matches == null) return 0;
    return matches.length;
  }

  countConsonants(s) {
    var vowelCount = this.countVowels(s);
    return s.length - vowelCount;
  }

  // If everything is valid,
  // print in (browser) console the result together with JSON representation
  onSubmit(): void {
    if (this.form.valid) {
      var names = this.firstName.value + this.lastName.value;
      console.log("The number of VOWELS: " + this.countVowels(names));
      console.log("The number of CONSONANTS: " + this.countConsonants(names));
      names = this.firstName.value + " " + this.lastName.value;
      console.log("The firstname + lastname entered: " + names);
      var reversedNames = Array.from(this.firstName.value + " " + this.lastName.value).reverse();
      var reversedNamesString = "";
      for (var i = 0; i < reversedNames.length; i++) {
        reversedNamesString += reversedNames[i];
      }
      
      console.log("The reverse version of the firstname and lastname: " + reversedNamesString);
      console.log("The JSON format of the entire object: ");

      var fullObject = new FullObject();
      fullObject.FirstName = this.firstName.value;
      fullObject.LastName = this.lastName.value;
      fullObject.SocialSkills = this.socialSkills;
      fullObject.SocialAccounts = this.socialAccounts;

      var result = JSON.stringify(fullObject);
      console.log(result);

      // Post/Save in JSON file using REST API
      const headers = new HttpHeaders().set('Content-Type', 'application/json');
      this.http.post(this.baseUrl + 'fullobject', result, { headers: headers }).subscribe(data => {
        console.log(data);
      });

      // Uncomment bellow to allow page redirect to JSON object

      //const thefile = new Blob([result], { type: "application/json" });
      //let url = window.URL.createObjectURL(thefile);
      //window.location.href = url;
    }
  }

  // Default constructor inits
  constructor(http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
    this.http = http;
    this.baseUrl = baseUrl;

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
    if (this.socialSkill.length > 0 && !(this.socialSkills.includes(this.socialSkill))) {
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

class FullObject {
  FirstName: string;
  LastName: string;
  SocialSkills: Array<string>;
  SocialAccounts: SocialAccount[];
}
