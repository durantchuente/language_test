import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { Language } from '../interfaces/language.model';
import { GetLanguages } from '../store/actions/language.action';
import { LanguageState } from '../store/state/language.state';
@Component({
  selector: 'app-language',
  templateUrl: './language.component.html',
  styleUrls: ['./language.component.css']
})
export class LanguageComponent implements OnInit {
  @Select(LanguageState.getLanguageList) languages$!: Observable<Language[]>;
  @Select(LanguageState.getLoader) loader$!: Observable<Language[]>;

  public modalObservalble: number = 0;
  constructor(
    public translate: TranslateService, private store: Store
  ) {
    translate.addLangs(['fr', 'en', 'nl']);
    translate.setDefaultLang('fr');
  }
  ngOnInit(): void {
    this.store.dispatch(new GetLanguages());
  }
  switchLang(lang: string) {
    this.translate.use(lang);
  }
}
