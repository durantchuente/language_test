import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'langColor'
})
export class LangColorPipe implements PipeTransform {

  transform(value: number): any {
    console.log('value ', value);
    if (value === 0) {
        return 'modal_close'
    } else {
        return 'modal_opened'
    }
   return null;
 }

}
