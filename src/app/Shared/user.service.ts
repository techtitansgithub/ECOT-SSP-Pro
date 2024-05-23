import { Injectable } from '@angular/core';
import { UntypedFormBuilder, Validators} from '@angular/forms';
import { HttpClient} from "@angular/common/http";
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  readonly BaseURI = environment.apiBaseUrl;
  UserID:any
  UserFullName : any
  UserN : any
  constructor(private fb: UntypedFormBuilder, private http: HttpClient) { }
  

  login(formData:any) {
    return this.http.post(this.BaseURI + '/account/Login', formData)
  }

  
  getAll() {
    return this.http.get(this.BaseURI + '/account');
  }

  

}
