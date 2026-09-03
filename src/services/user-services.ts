import { Service, inject } from '@angular/core';
import { IUser } from '../models/iuser';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Service()
export class UserServices {

  http = inject(HttpClient)
    private apiurl = "http://localhost:3000"
    register(user:IUser){
      return this.http.post<any>(`${this.apiurl}/auth/registration`, user);
    }
    login(email:string,password:string){
      return this.http.post<any>(`${this.apiurl}/auth/login`,{email,password})
    }
    settoken(token:string){
      localStorage.setItem("token",token)
    }
  logout():void{
    localStorage.removeItem('token')
  }
  getuserbyid(id:string):Observable<IUser>{
      return this.http.get<IUser>(`${this.apiurl}/${id}`)
    }

}
