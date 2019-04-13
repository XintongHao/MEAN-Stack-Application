import { Component } from '@angular/core';

@Component({
  // the component's CSS element selector
  selector: 'app-root',
  // the location of the component's template file.
  templateUrl: './app.component.html',
  // the location of the component's private CSS styles.
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'Marvel Hero';
}
