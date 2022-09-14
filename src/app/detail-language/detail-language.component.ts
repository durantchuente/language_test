import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Language } from '../interfaces/language.model';

@Component({
  selector: 'lang-detail',
  templateUrl: './detail-language.component.html',
  styleUrls: ['./detail-language.component.css']
})
export class DetailLanguageComponent implements OnInit {
  @Input() languageDetail!: Language;
  @Input() childEvent: any;
  constructor(private modalService: NgbModal) { }

  ngOnInit(): void {
  }

  async closeModal(): Promise<void> {
    this.childEvent.emit(0);
    this.modalService.dismissAll()
  }
}
