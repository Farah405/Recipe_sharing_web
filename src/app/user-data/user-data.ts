import { Component, Input, OnInit } from '@angular/core';
import { UserServices } from '../../services/user-services';
import { IUser } from '../../models/iuser';

@Component({
  selector: 'app-user-data',
  standalone: false,
  styleUrl: './user-data.css',
  templateUrl: './user-data.html',
})
export class UserData implements OnInit {
  constructor( private userservice: UserServices) {}
  user !:IUser
  @Input() userid !:string
  @Input()postcreate !:string
  ngOnInit(){

    this.userservice.getuserbyid(this.userid).subscribe({
      next:(user)=>{
        this.user=user
      },
      error:(err)=>{
        console.log(err)

      }
    })
  }
}
