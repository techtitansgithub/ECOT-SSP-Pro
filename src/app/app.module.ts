import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { MessageService } from './Shared/message.service';
import { UserService } from './Shared/user.service';
import { AuthInterceptor } from './auth/auth.interceptor';
import { SignInPage } from './sign-in/sign-in.page';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { ChangePasswordPage } from './change-password/change-password.page';
import { MaterialModule } from './material.module';

@NgModule({
  declarations: [AppComponent,SignInPage,ChangePasswordPage],
  imports: [
    BrowserModule, 
    IonicModule.forRoot(), 
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    MaterialModule
],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
   UserService,MessageService, {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }, provideAnimationsAsync()
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
