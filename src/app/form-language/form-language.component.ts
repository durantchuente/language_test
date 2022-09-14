import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { Store } from '@ngxs/store';
import { Language } from '../interfaces/language.model';
import { ModalMessageComponent } from '../modal-message/modal-message.component';
import { AddLanguage, GetLanguages } from '../store/actions/language.action';


@Component({
  selector: 'lang-form',
  templateUrl: './form-language.component.html',
  styleUrls: ['./form-language.component.css']
})
export class FormLanguageComponent implements OnInit {
  //@Input() languageElementEdit!: Language;
  submitted = false
  formLanguage = this.formBuilder.group({
    language: ['', Validators.required ],
    spoken_level: ['', Validators.required ],
    written_level: ['', Validators.required ],
    comprehension_level: ['', Validators.required ]
 });
 private modalRef!: NgbModalRef
  constructor(
    private formBuilder: FormBuilder, private store: Store, private modalService: NgbModal
  ) {
    
  }
  get f() { return this.formLanguage.controls; }
  ngOnInit(): void {
  }
  
  onSubmit(){
    this.submitted = true
    if (this.formLanguage.valid) {
      const newLang: Language = {
        "language": this.formLanguage.value.language || '',
        'spoken_level': this.formLanguage.value.spoken_level  || '',
        'written_level': this.formLanguage.value.written_level  || '',
        'comprehension_level': this.formLanguage.value.comprehension_level  || ''
      }
      this.addLanguage(newLang)
      this.formLanguage.reset()
      this.submitted = false
    }
  }
  addLanguage(payload: Language) {
    this.store.dispatch(new AddLanguage(payload)).subscribe(res => {
      if (res?.languages?.message) {
        this.modalRef = this.modalService.open(ModalMessageComponent)
        this.modalRef.componentInstance.message = res?.languages?.message;
      } else {
        this.store.dispatch(new GetLanguages());
      }
    })
  }
}
