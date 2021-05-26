import { BrowserModule } from '@angular/platform-browser';
import { NgModule, DoBootstrap, Injector } from '@angular/core';
import { createCustomElement } from '@angular/elements';
import { FormularioComponent } from './formulario/formulario.component';
import { ImportacaoComponent } from './importacao/importacao.component';
import { rootRouterConfig } from './app.routes';
import { RouterModule } from '@angular/router';
import { APP_BASE_HREF } from '@angular/common';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    [
      RouterModule.forRoot(rootRouterConfig, {
        useHash: false,
      }),
    ],
  ],
  entryComponents: [AppComponent],
  providers: [{ provide: APP_BASE_HREF, useValue: '/' }],
})
export class AppModule implements DoBootstrap {
  constructor(private injector: Injector) {}
  ngDoBootstrap() {
    customElements.define(
      'angular-component',
      createCustomElement(AppComponent, { injector: this.injector })
    );
  }
}
