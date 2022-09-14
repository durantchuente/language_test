import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { Store } from '@ngxs/store';
import { DetailLanguageComponent } from '../detail-language/detail-language.component';
import { Language } from '../interfaces/language.model';
import { DeleteLanguage, GetLanguages } from '../store/actions/language.action';

@Component({
  selector: 'lang-single',
  templateUrl: './single-language.component.html',
  styleUrls: ['./single-language.component.css']
})
export class SingleLanguageComponent implements OnInit {
  @Input() languageItem: any;
  private modalRef!: NgbModalRef
  @Output() childEvent = new EventEmitter();
  @Output() editLanguageEmitter = new EventEmitter < Language > (); 
  constructor(private modalService: NgbModal, private store: Store) { }

  ngOnInit(): void {
    
  }
  openModal(item:Language): Promise<boolean> {
    return new Promise<boolean>(resolve => {
      this.childEvent.emit(1);
      this.modalRef = this.modalService.open(DetailLanguageComponent)
      this.modalRef.componentInstance.languageDetail = item;
      this.modalRef.componentInstance.childEvent = this.childEvent;
      this.modalRef.result.then(resolve, resolve)
    })
  }
  editLanguage(item: Language){
    this.editLanguageEmitter.emit(item); 
  }
  openModalDelete(content: any){
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'})
  }
  deleteLanguage(item: Language){
    if (item?.id) {
      this.store.dispatch(new DeleteLanguage(item?.id));
      this.store.dispatch(new GetLanguages());
      this.modalService.dismissAll()
    }
  }
}
