import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { Store } from '@ngxs/store';
import { DetailLanguageComponent } from '../detail-language/detail-language.component';
import { Language } from '../interfaces/language.model';
import { DeleteLanguage, GetLanguages, SelectedLanguage } from '../store/actions/language.action';

@Component({
  selector: 'lang-single',
  templateUrl: './single-language.component.html',
  styleUrls: ['./single-language.component.css']
})
export class SingleLanguageComponent implements OnInit {
  @Input() languageItem: any;
  private modalRef!: NgbModalRef
  @Output() stateModalEvent = new EventEmitter();
  constructor(private modalService: NgbModal, private store: Store) { }

  ngOnInit(): void {
    
  }
  openModal(item:Language): Promise<boolean> {
    return new Promise<boolean>(resolve => {
      this.stateModalEvent.emit(1);
      this.modalRef = this.modalService.open(DetailLanguageComponent)
      this.modalRef.componentInstance.languageDetail = item;
      this.modalRef.componentInstance.stateModalEvent = this.stateModalEvent;
      this.modalRef.result.then(() => {}, () => { this.stateModalEvent.emit(0)})
    })
  }
  editLanguage(id: string){
    this.store.dispatch(new SelectedLanguage(id));
  }
  openModalDelete(content: any){
    const modalRef = this.modalService.open(content)
    
  }
  deleteLanguage(item: Language){
    if (item?.id) {
      this.store.dispatch(new DeleteLanguage(item?.id));
      this.store.dispatch(new GetLanguages());
      this.modalService.dismissAll()
    }
  }
}
