import { Component } from '@angular/core';

@Component({
    selector: 'asw-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {
    title = 'qr-code-demo';
    value = 'https://asoftwareworld.com/';
    size = 180;
}
