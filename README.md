# ASW QR Code

[![npm version](https://badge.fury.io/js/%40asoftwareworld%2Fform-builder.svg)](https://www.npmjs.com/package/@asoftwareworld/qrcode)
[![Build status](https://circleci.com/gh/asoftwareworld/asw-qr-code.svg?style=svg)](https://circleci.com/gh/asoftwareworld/asw-qr-code)
[![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/asoftwareworld/asw-qr-code/blob/master/LICENSE)

`ASW QR Code` library for generating QR Code for Angular projects.

## [Live Demo](https://asoftwareworld.github.io/ASW-Form-Builder/#/)

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

## List of values
| Values        | Description                                                                                                     |
| --------------- | --------------------------------------------------------------------------------------------------------------- |
| value (required)          | The value to encode in the QR code i.e. a URL, Text, etc.       |
| size (optional)   | Automatic size based on the value provided in pixels    |
| errorCorrectionLevel (optional)         | Error correction capability allows to successfully scan a QR Code even if the symbol is dirty or damaged. Four levels are available to choose according to the operating environment. **Default value:** `MEDIUM` and Valid values: `LOW`, `MEDIUM`, `QUARTILE`, `HIGH` [See more](https://www.npmjs.com/package/qrcode) details|
| centerImageSrc (optional)       | A center image src property to load and render  image in the center of the QR code.          |
| centerImageSize (optional)     | Automatic size in pixels to render the center image. |       
| colorDark (optional)    | use for dark color |
| colorLight (optional)    | use for light color |


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
