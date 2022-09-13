import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Store } from '@ngxs/store';
import { Language } from '../interfaces/language.model';
import { DeleteLanguage, GetLanguages } from '../store/actions/language.action';

@Component({
  selector: '[lang-single]',
  templateUrl: './single-language.component.html',
  styleUrls: ['./single-language.component.css']
})
export class SingleLanguageComponent implements OnInit {
  @Input() languageItem: any;
  languageChoose = ''
  levelSpoken = ''
  writtenLevel = ''
  comprehensionLevel = ''
  @Output() childEvent = new EventEmitter();
  constructor(private modalService: NgbModal, private store: Store) { }
  onChange(value: any) {
    this.childEvent.emit(value);
  }
  openModal(content:any, item:Language) {
    console.log('item ', item);
    this.languageChoose = item.language
      this.levelSpoken = item.spoken_level
      this.writtenLevel = item.written_level
      this.comprehensionLevel = item.comprehension_level
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.childEvent.emit(1);
    });
  }
  closeModal(content:any) {
    this.modalService.dismissAll()
    this.childEvent.emit(0);
  }
  ngOnInit(): void {
    
  }
  deleteLanguage(item: Language){
    if (item?.id) {
      this.store.dispatch(new DeleteLanguage(item?.id || ''));
      this.store.dispatch(new GetLanguages());
    }
  }
}
