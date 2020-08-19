### Creating a new Child Module with Components ####

Angular 9 mit dem Ivy Compiler von Amplify wird nicht unterstützt: Deshalb downgrade to Angular 8:
npm i @angular/cli@8.2.2
npm install
npm audit fix
optional:


npm i @angular-devkit/build-angular@0.803.24

	
######################
ng g module locations --routing
ng g component locations
ng g component location-details
ng g component add-location
ng g component edit-location
