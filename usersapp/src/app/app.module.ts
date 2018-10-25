import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { FormsModule } from '@angular/forms';

// Http
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http'; 

// App
import { MyApp } from './app.component';

// Pages
import { HomePage } from '../pages/home/home';
import { HomePageModule } from '../pages/home/home.module';
import { FieldsPage } from '../pages/user/fields';
import { FieldsPageModule } from '../pages/user/fields.module';
import { LoginPageModule } from '../pages/login/login.module';

// Services
import { ApiClientService } from "../business/_services/swagger/index";
import { AuthService } from '../providers/auth-service';
import { ValidatorService } from '../providers/validator-service';

// Storage
import { IonicStorageModule } from '@ionic/storage';

@NgModule({
  declarations: [
    MyApp,
  ],
  imports: [
    FormsModule,
    BrowserModule,
    LoginPageModule,
    FieldsPageModule,
    HomePageModule,
    HttpModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot(),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    FieldsPage,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    ApiClientService,
    AuthService,
    ValidatorService,
  ]
})
export class AppModule {}
