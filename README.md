# ASW QR Code

[![npm version](https://badge.fury.io/js/%40asoftwareworld%2Fform-builder.svg)](https://www.npmjs.com/package/@asoftwareworld/form-builder)
[![Build status](https://circleci.com/gh/asoftwareworld/ASW-Form-Builder.svg?style=svg)](https://circleci.com/gh/asoftwareworld/ASW-Form-Builder)
[![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/asoftwareworld/ASW-Form-Builder/blob/master/LICENSE)

`ASW QR Code` library for generating QR Code for Angular projects.

`Form Builder` is compatible with the latest version of Angular and Angular Material. Only a few clicks can create an attractive web form and provide a JSON Schema to render all controls.

## [Live Demo](https://asoftwareworld.github.io/ASW-Form-Builder/#/)

## Installation

### Install ASW Form Builder
Install `QR Code` to set up in the project by running the following command:
```html
npm install @asoftwareworld/qrcode
```

### Import the component modules
Import the NgModule for each component you want to use:

```
import { AswQrCodeModule } from '@asoftwareworld/qrcode';
// ...

@NgModule({
  imports: [
    // shown passing global defaults (optional)
    AswQrCodeModule
    ...
  ]
  // ...
})
export class AppModule {}
```

## Add a selector to HTML
In your template, use the component selector:
```
<asw-qr-code [value]="value" 
    [size]="size"
    [errorCorrectionLevel]="errorCorrectionLevel"
    [centerImageSrc]="centerImageSrc"
    [centerImageSize]="centerImageSize">
</asw-qr-code>
```

Define in your component to get published event :

```
export class AppComponent {
    title = 'qr-code-demo';
    value = 'https://asoftwareworld.com/';
    size = 180;
    errorCorrectionLevel = AswQrcodeErrorCorrectionLevel.LOW;
    centerImageSrc = 'https://angular.io/assets/images/logos/angular/angular.png';
    centerImageSize = 180;
}
```

## List of Controls available
| controls        | description                                                                                                     |
| --------------- | --------------------------------------------------------------------------------------------------------------- |
| value          | Headings are defined with the `<h1> to <h6>` tags. Used as a title of the post, template and resume, etc.       |
| size    | The autocomplete is a normal text input enhanced by a panel of suggested relevant options as the user types.    |
| errorCorrectionLevel         | Enable native inputs to be used within a form field. The styles such as the underline, floating label.          |
| centerImageSrc       | Enable native inputs to be used within a form field. The styles such as the underline, floating label.          |
| centerImageSize      | The datepicker allows users to enter a date either through text input, or by choosing a date from the calendar. |                                                                             |


## Browser Support

| ![Chrome](https://raw.github.com/alrra/browser-logos/master/src/chrome/chrome_48x48.png) | ![Firefox](https://raw.github.com/alrra/browser-logos/master/src/firefox/firefox_48x48.png) | ![Safari](https://raw.github.com/alrra/browser-logos/master/src/safari/safari_48x48.png) | ![Opera](https://raw.github.com/alrra/browser-logos/master/src/opera/opera_48x48.png) | ![Edge](https://raw.github.com/alrra/browser-logos/master/src/edge/edge_48x48.png) | 
| ---------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------- | 
| Latest ✔                                                                                 | Latest ✔                                                                                    | Latest ✔                                                                                 | Latest ✔                                                                              | Latest ✔                                                                                                                                                                                                    |
## [Report a bug](https://github.com/asoftwareworld/ASW-QR-Code/issues)
We use GitHub Issues as the official bug tracker for the ASW QR Code. Here are some advices for our users that want to report an issue:

1. Make sure that you are using the latest version of the ASW QR Code.
2. Providing us reproducible steps for the issue will shorten the time it takes for it to be fixed.
3. Some issues may be browser specific, so specifying in what browser you encountered the issue might help.

## Technical Support or Questions
If you have questions or need help please email `asoftwareworld@gmail.com`

## License
[MIT](https://github.com/asoftwareworld/ASW-QR-Code/blob/master/LICENSE)

## Social Media

Twitter: <https://twitter.com/asoftwareworld>

LinkedIn: <https://in.linkedin.com/company/asoftwareworld>

Facebook: <https://www.facebook.com/asoftwaresworld>

## Donate
<a href="https://paypal.me/asoftwaresworld?locale.x=en_GB"><img src="blue.svg" height="40"></a>  
If you found value in `ASW QR Code` or a contributor helped you out of a jam, consider becoming a contributor yourself.
