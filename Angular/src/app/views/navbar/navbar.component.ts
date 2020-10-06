import { Component, OnInit } from '@angular/core';
// import { NgbCollapseModule } from '@ng-boostrap/ng-boostrap';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  isCollapsed: boolean = true;

  constructor() {}

  ngOnInit(): void {}
}
