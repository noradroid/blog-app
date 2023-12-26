import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { FooterComponent } from './layout/footer/footer.component';
import { TopbarComponent } from './layout/topbar/topbar/topbar.component';
import { provideNgIconsConfig } from '@ng-icons/core';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    TopbarComponent,
    FooterComponent,
    HttpClientModule,
  ],
  providers: [
    provideNgIconsConfig({
      size: '1.25rem',
    }),
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
