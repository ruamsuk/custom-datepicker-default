import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { DatepickerDemoComponent } from './components/datepicker-demo.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, DatepickerDemoComponent],
  template: `
    <app-datepicker-demo/>

    <router-outlet/>
  `,
  styles: [],
})
export class AppComponent {
}
