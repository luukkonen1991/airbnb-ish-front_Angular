import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-contact-form',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css'],
  encapsulation: ViewEncapsulation.ShadowDom
})
export class ContactComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}