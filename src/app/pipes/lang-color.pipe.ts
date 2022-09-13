import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'langColor'
})
export class LangColorPipe implements PipeTransform {

  transform(value: number): any {
    if (value === 0) {
        return 'btn-secondary'
    } else {
        return 'btn-success'
    }
   return null;
 }

}
