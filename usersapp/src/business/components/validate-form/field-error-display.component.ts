/*  <bioxor version="1.0.0">
      <casos de uso>
        <cu codigo="US01"> Pre-registro de usuario</cu>
      </casos de uso>
    </bioxor>
*/
import { Component, OnInit, Input } from '@angular/core';

@Component({
    selector: 'app-field-error-display',
    templateUrl: './field-error-display.component.html'
})
export class FieldErrorDisplayComponent {

    @Input() errorMsg: Array<string> = [];
    @Input() displayError: boolean;

}
