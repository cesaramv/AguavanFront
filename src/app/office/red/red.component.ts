import { Component, OnInit } from '@angular/core';
import {TreeNode} from 'primeng/api';

@Component({
  selector: 'app-red',
  templateUrl: './red.component.html',
  styleUrls: ['./red.component.css']
})
export class RedComponent implements OnInit {

  files: TreeNode[];
  selectedFile: TreeNode;

  constructor() { }

  ngOnInit(): void {
  }

}
