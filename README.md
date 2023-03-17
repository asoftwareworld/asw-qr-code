<h1 align="center">ASW QR Code - customizable design and logos.</h1>

<p align="center">
  <img src="https://user-images.githubusercontent.com/69723522/225834944-8ea6f27d-d02a-4903-91c3-bc97f9209251.svg" alt="asw-logo" width="310px" height="100px"/>
  <br>
  <i>ASW QR Code library is a customizable QR Code generator with options to add personalized design and logos, designed specifically for
    <br> Angular projects.</i>
  <br>
</p>

<p align="center">
  <a href="https://asoftwareworld.com/#/product/qr-code"><strong>ASW QR code demo</strong></a>
  <br>
</p>

<p align="center">
  <a href="CONTRIBUTING.md">Contributing Guidelines</a>
  ·
  <a href="https://github.com/asoftwareworld/asw-qr-code/issues">Submit an Issue</a>
  ·
  <a href="https://asoftwareworld.com/#/product/qr-code">Blog</a>
  <br>
  <br>
</p>

<p align="center">
  <a href="https://www.npmjs.com/package/@asoftwareworld/qrcode">
    <img src="https://badge.fury.io/js/%40asoftwareworld%2Fqrcode.svg" alt="CI status" />
  </a>&nbsp;
  <a href="https://circleci.com/gh/asoftwareworld/ASW-Form-Builder">
    <img src="https://circleci.com/gh/asoftwareworld/asw-qr-code.svg?style=svg" alt="Asw QR Code on npm" />
  </a>&nbsp;
  <a href="https://github.com/asoftwareworld/asw-qr-code/blob/main/LICENSE">
    <img src="https://img.shields.io/badge/license-MIT-blue.svg" alt="Discord conversation" />
  </a>
</p>

<hr>
<p align="center">
<a href="https://youtu.be/2F-Q32hsl6A" target="_blank">
 <img src="https://user-images.githubusercontent.com/69723522/225821757-788969af-922f-442b-ba02-8eb4c8366b24.jpg" alt="Watch the video" width="560" height="315" border="10" />
</a>
</p>

### Install ASW QR Code
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
<div class="card">
    <div class="header">
        <h2>QR code</h2>
    </div>
    <div class="body">
        <div class="row">
            <div class="col-md-12 text-center">
                <div class="qrcodeImage">
                    <asw-qr-code #parent [qrData]="qrdata" [width]="option.width" [height]="option.height"
                        [outerMargin]="option.outerMargin" [type]="option.type" [allowEmptyString]="true"
                        [logo]="option.logo"
                        [density]="option.density" [backgroundColor]="option.backgroundColor"
                        [logoStyle]="option.logoStyle" [middleShape]="option.middleShape"
                        [cornerInnerShape]="option.cornerInnerShape" [cornerOuterShape]="option.cornerOuterShape">
                    </asw-qr-code>
                </div>
                <div class="downloadButton">
                    <button mat-icon-button [matMenuTriggerFor]="menu" matTooltip="Download QR Code">
                        <mat-icon>download</mat-icon>
                    </button>
                    <mat-menu #menu="matMenu">
                        <button mat-menu-item (click)="parent.download({extension: 'svg', name: 'asw'})">
                            <span>SVG</span>
                        </button>
                        <button mat-menu-item (click)="parent.download({extension: 'png', name: 'asw'})">
                            <span>PNG</span>
                        </button>
                        <button mat-menu-item (click)="parent.download({extension: 'jpeg', name: 'asw'})">
                            <span>JPEG</span>
                        </button>
                        <button mat-menu-item (click)="parent.download({extension: 'webp', name: 'asw'})">
                            <span>WEBP</span>
                        </button>
                    </mat-menu>
                </div>
            </div>
        </div>
    </div>
</div>
```

Define in your component to get published event :

```
export class AppComponent implements OnInit {
    title = 'ASW QR Code Demo';
    option: any;
    drawTpes = [
        { label: 'SVG', value: 'svg' },
        { label: 'Canvas', value: 'canvas' },
    ];
    density: Density = {
        errorCorrectionLevel: 'Q',
        mode: 'Byte',
        typeNumber: 0
    };

    logoStyle: LogoStyle = {
        hideBackgroundCircle: true,
        logoSize: 0.3,
        logoMargin: 0
    };

    backgroundColor = '#ffffff';

    middleShape: MiddleShape = {
        color: '#000',
        type: 'circle'
    };

    cornerInnerShape: CornerInnerShape = {
        color: '#000',
        type: 'circle'
    };

    cornerOuterShape: CornerOuterShape = {
        color: '#000',
        type: 'rounded'
    };
    public qrdata = 'https://asoftwareworld.com';
    image = '';
    ngOnInit(): void {
        this.option = {
            width: 200,
            height: 200,
            type: 'canvas',
            logo: this.image,
            outerMargin: 0,
            density: this.density,
            backgroundColor: this.backgroundColor,
            logoStyle: this.logoStyle,
            cornerInnerShape: this.cornerInnerShape,
            cornerOuterShape: this.cornerOuterShape,
            middleShape: this.middleShape
        };
    }
}
```

## List of Input parameters
| Input parameters| Default value         |  Description                                                                                                     |
| --------------- | ----------------------|----------------------------------------------------------------------------------------- |
| width: number (optional) | 200         | width refers to the horizontal measurement of the generated QR code, typically measured in pixels.       |
| height: number (optional) | 200   | height refers to the vertical measurement of the generated QR code, typically measured in pixels.   |
| type: string ('canvas' | 'svg') (optional) | canvas        | The type of element that will be rendered for QR code generation can be either a Canvas or SVG element.|
| allowEmptyString: boolean (optional) | false       | Allow qrdata to be an empty string.         |
| qrData: string (optional)|     | The data will be encoded to the QR code |       
| outerMargin: number (optional)| 0    | Outer margin around a Canvas or SVG element. |
| backgroundColor: string (optional)| `#fff`    | The background color of a QR code refers to the color of the empty space surrounding the QR code modules. By default, the background color is white, but it can be customized to any other color. |
| density: Density (optional) | { typeNumber: 0, mode: 'Byte', errorCorrectionLevel: 'Q' }| <ol> <li>**typeNumber**: The numeric value that represents the type of QR code being generated. A higher value results in a denser QR code with more data capacity. A value of 0 means that the type number will be determined automatically based on the data to be encoded.</li><li> **mode**: The data encoding mode used to convert the input data into a sequence of bits that can be represented in the QR code. In this case, the **Byte** mode is being used, which allows encoding of all 256 possible characters using 8 bits per character. </li><li> **errorCorrectionLevel**: The level of error correction used in the QR code. QR codes have the ability to recover data if part of the code is damaged or unreadable due to smudging or other issues. This is achieved by adding redundant data to the code that allows the QR code reader to correct errors. There are four levels of error correction available, with **Q** being the third-highest level of error correction. </li></ol>      |
| logoStyle: LogoStyle (optional) | { hideBackgroundCircle: true, logoSize: 0.4, logoMargin: 20, crossOrigin: 'anonymous', } | <ol> <li>**hideBackgroundCircle**: A boolean value that indicates whether the background circle of the QR code should be hidden or not. If set to **true**, the background circle will be hidden, otherwise it will be visible.</li><li> **logoSize**: A numeric value that represents the size of the logo image to be overlaid on the QR code. The value is a percentage of the size of the QR code image, with 1.0 representing 100% of the QR code size. In this case, the logo will be 40% of the size of the QR code.</li><li> **logoMargin**: A numeric value that represents the margin between the logo and the QR code image. The value is in pixels and can be used to adjust the positioning of the logo on the QR code.</li><li> **crossOrigin**: A string value that specifies whether to use CORS (Cross-Origin Resource Sharing) for the logo image. The value can be set to **anonymous** to indicate that the logo image should be loaded without any credentials, or **use-credentials** to indicate that the logo image should be loaded with credentials.</li><ol> |
| middleShape: MiddleShape (optional) | { color: `#000`, type: `smooth` } | <ol> <li>**color**: A string value that represents the color of the center dots of the QR code. In this case, the color is set to black `#000`.</li><li> **type**: A string value that represents the type of center dots to be used in the QR code. In this case, the type is set to **smooth**, which means that the center dots will be slightly rounded and have a smoother appearance.</li><ol>|
| cornerInnerShape: CornerInnerShape (optional) | { color: `#000` }| **color**: A string value that represents the color of the inner corner shapes of the QR code. The inner corner shapes are the small squares or dots located at the corners of the QR code. In this case, the color is set to black `#000`.|
| cornerOuterShape: CornerOuterShape (optional)| { color: `#000` }    | **color**: A string value that represents the color of the outer corner shapes of the QR code. The outer corner shapes are the large squares or dots located at the corners of the QR code. In this case, the color is set to black `#000`.|

## Density property
| Input parameters| type | Default value   |  Description                                                                                                     |
| --------------- | -----|-----------------|----------------------------------------------------------------------------------------- |
|typeNumber|number (0 - 40)|0|<ol> <li>The **typeNumber** property determines the size of the QR code to be generated.</li><li>The value of **typeNumber** should be an integer between 0 and 40.</li><li>The higher the **typeNumber**, the larger the QR code generated.</li><ol>|
|mode|string (`Numeric` `Alphanumeric` `Byte` `Kanji`)|'Byte'|<ol> <li>**Numeric** mode only allows numeric characters (0-9).</li><li>**Alphanumeric** mode allows a wider range of characters including uppercase letters, numeric characters, and some symbols.</li><li>**Byte** mode allows for any 8-bit character to be encoded, including non-Latin characters.</li><li>**Kanji** mode is specifically designed for Japanese characters.</li><ol>|
|errorCorrectionLevel|string (`L` `M` `Q` `H`)|`Q`|<ol> <li>**L** stands for Low error correction level and can recover up to 7% of data loss.</li><li>**M** stands for Medium error correction level and can recover up to 15% of data loss.</li><li>**Q** stands for Quartile error correction level and can recover up to 25% of data loss.</li><li>**H** stands for High error correction level and can recover up to 30% of data loss.</li><ol>|

## Middle Shape property
| Input parameters| type | Default value   |
| --------------- | -----|-----------------|
|color|string|`#000`|
|type|string (`circle` `rounded` `smooth` `smooth-rounded` `square` `thin-rounded`)|`smooth`|

## Corner Inner Shape property
| Input parameters| type | Default value   |
| --------------- | -----|-----------------|
|color|string|`#000`|
|type|string (`circle` `square`)||

## Corner Outer Shape property
| Input parameters| type | Default value   |
| --------------- | -----|-----------------|
|color|string|`#000`|
|type|string (`circle` `square` `rounded`)||

## Download QR code
| Input parameters| type | Default value   |Description|
| --------------- | -----|-----------------|-----------|
|name|string|string|`asw-qr`|Name of the downloaded file|
|extension|string (`png` `jpeg` `svg` `webp`)|`png`|File extension|


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

Youtube: <https://www.youtube.com/@asoftwareworld>

Facebook: <https://www.facebook.com/asoftwaresworld>

## Donate
<a href="https://paypal.me/asoftwaresworld?locale.x=en_GB"><img src="blue.svg" height="40"></a>  
If you found value in `ASW QR Code` or a contributor helped you out of a jam, consider becoming a contributor yourself.
