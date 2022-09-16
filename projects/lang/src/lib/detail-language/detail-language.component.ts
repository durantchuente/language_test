import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Language } from '../interfaces/language.model';

@Component({
  selector: 'lang-detail',
  templateUrl: './detail-language.component.html',
  styleUrls: ['./detail-language.component.css']
})
export class DetailLanguageComponent implements OnInit {
  @Input() languageDetail!: Language;
  @Input() stateModalEvent: any;
  constructor(public modalService: NgbActiveModal) { }

  ngOnInit(): void {
  }
}
