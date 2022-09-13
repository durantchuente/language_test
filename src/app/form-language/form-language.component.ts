import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Store } from '@ngxs/store';
import { Language } from '../interfaces/language.model';
import { AddLanguage, GetLanguages } from '../store/actions/language.action';


@Component({
  selector: 'lang-form',
  templateUrl: './form-language.component.html',
  styleUrls: ['./form-language.component.css']
})
export class FormLanguageComponent implements OnInit {
  submitted = false
  formLanguage = this.formBuilder.group({
    language: ['', Validators.required ],
    spoken_level: ['', Validators.required ],
    written_level: ['', Validators.required ],
    comprehension_level: ['', Validators.required ]
 });
  constructor(
    private formBuilder: FormBuilder, private store: Store
  ) {
    
  }
  get f() { return this.formLanguage.controls; }
  ngOnInit(): void {
  }
  
  onSubmit(){
    this.submitted = true
    if (this.formLanguage.valid) {
      console.log('value ', this.formLanguage.getRawValue());
      const newLang: Language = {
        "language": this.formLanguage.value.language || '',
        'spoken_level': this.formLanguage.value.spoken_level  || '',
        'written_level': this.formLanguage.value.written_level  || '',
        'comprehension_level': this.formLanguage.value.comprehension_level  || ''
      }
      this.addLanguage(newLang)
      this.formLanguage.reset()
      this.submitted = false
    } else {
      
    }
  }
  addLanguage(payload: Language) {
    this.store.dispatch(new AddLanguage(payload));
    this.store.dispatch(new GetLanguages());
  }
}
