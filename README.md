# AwsAngularIntegrateDemo

This project is the front-end application that demonstrates using AWS Rekognition to extract text from image.
The backend AWS infrastructure is setup using terraform and you can find the [full source here](https://github.com/andrewlau4/aws-serverless-backend-terraform).

The following pictures show what this application does:

#### Extract the words 'Happy Birthday' from image
<img src="readme/text_extract_happy_birthday.gif" alt="Extract Text Happy Birthday" width="240" />

#### Extract the words 'Hello And Welcome' from image
<img src="readme/text_extract_hello.gif" alt="Extract Text Hello And Welcome" width="240" />

#### Extract the word 'Stop' from Stop Sign image
<img src="readme/text_extract_stop_sign.gif" alt="Extract Text Stop" width="240" />

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
