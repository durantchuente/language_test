import { HttpClient, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { NgxsModule } from '@ngxs/store';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { DetailLanguageComponent } from './detail-language/detail-language.component';
import { FormLanguageComponent } from './form-language/form-language.component';
import { LangComponent } from './lang.component';
import { LanguageComponent } from './language/language.component';
import { ModalMessageComponent } from './modal-message/modal-message.component';
import { LangColorPipe } from './pipes/lang-color.pipe';
import { DataService } from './services/data.service';
import { SingleLanguageComponent } from './single-language/single-language.component';
import { LanguageState } from './store/state/language.state';



@NgModule({
  declarations: [
    LangComponent,
    LanguageComponent,
    SingleLanguageComponent,
    FormLanguageComponent,
    DetailLanguageComponent,
    LangColorPipe,
    ModalMessageComponent
  ],
  imports: [
    NgxsModule.forRoot([
      LanguageState
  ]),
  NgbModule,
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: httpTranslateLoader,
        deps: [HttpClient]
      }
    }),
    BrowserAnimationsModule,
    ReactiveFormsModule,
    HttpClientInMemoryWebApiModule.forRoot(DataService, { dataEncapsulation: false, passThruUnknownUrl: true}),
  ],
  providers: [DataService],
  exports: [
    LangComponent
  ]
})
export class LangModule { }
export function httpTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http);
}