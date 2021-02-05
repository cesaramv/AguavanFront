import { Component, OnInit } from '@angular/core';
import { TokenService } from '../serices/token.service';

@Component({
  selector: 'app-token',
  templateUrl: './token.component.html',
  styleUrls: ['./token.component.css']
})
export class TokenComponent implements OnInit {

  constructor(private readonly tokenService: TokenService) { }

  ngOnInit(): void {
    this.tokenService.getToken().subscribe(resp => {
      debugger
    });
  }

}
