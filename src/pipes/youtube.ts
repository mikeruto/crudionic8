import { Injectable, Pipe  } from '@angular/core';
import {DomSanitizer} from '@angular/platform-browser';

@Pipe({
  name: 'youtube'
})
@Injectable()
export class Youtube  {
    //videoUrl: SafeResourceUrl;
    constructor(private dom: DomSanitizer){
        
    }
  
  transform(value, args) {
      return this.dom.bypassSecurityTrustResourceUrl(value);
  }
}
