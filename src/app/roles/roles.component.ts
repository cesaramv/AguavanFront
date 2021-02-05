import { Component, OnInit } from '@angular/core';
import { RolService } from '../services/rol.service';

@Component({
  selector: 'app-roles',
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.css']
})
export class RolesComponent implements OnInit {

  constructor(private readonly rolesService: RolService) { }

  ngOnInit(): void {
    this.rolesService.listar({}).subscribe(resp => {
      console.log(resp);
    });
  }

}
