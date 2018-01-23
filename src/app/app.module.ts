import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule, Routes, Router } from '@angular/router';

import { AppComponent } from './app.component';
import { CarouselComponent } from './carousel/carousel.component';
import { AnimatedTerminalComponent } from './animated-terminal/animated-terminal.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { HomeComponent } from './home/home.component';
import { Game2dModule } from './game-2d/game-2d.module';

const appRoutes: Routes = [
  { path: 'welcome', component: WelcomeComponent },
  { path: '', redirectTo: 'welcome', pathMatch: 'full' },
  { path: 'home',
    children: [
      { path: '', component: HomeComponent}
  //     {
  //       path: ':placeId/requests',
  //       children: [
  //         { path: '', component: RequestListComponent},
  //         {
  //           path: 'templates',
  //           children: [
  //             { path: '', component: RequestTemplatesComponent},
  //             { path: ':templateId', component: RequestCreationComponent }
  //           ]
  //         },
  //         { path: ':requestId', component: RequestDetailsComponent }
  //       ]
  //     }
    ]
  }
];

@NgModule({
  declarations: [
    AppComponent,
    WelcomeComponent,
    CarouselComponent,
    AnimatedTerminalComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    Game2dModule,
    NgbModule.forRoot(),
    RouterModule.forRoot(appRoutes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
