import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { NavigationComponent } from './navigation/navigation.component';
import { HeroComponent } from './components/hero/hero.component';
import { LoginComponent } from './components/login/login.component';
import { FooterComponent } from './components/footer/footer.component';
import { HistoryComponent } from './components/history/history.component';
import { StartComponent } from './pages/start/start.component';


import { GameComponent } from './pages/game/game.component';
// Game components has the next 4 components included

import { CardPickerComponent } from './components/card-picker/card-picker.component';

import { CardActionComponent } from './components/game-data/game-data.component';
import { RoundResultsComponent } from './components/round-results/round-results.component';
import { HorizontalLineComponent } from './components/horizontal-line/horizontal-line.component';

import { HistoryPageComponent } from './pages/history-page/history-page.component';
import { RoundModalComponent } from './components/round-modal/round-modal.component';
import { GameEndComponent } from './components/game-end/game-end.component';

import { FormsModule } from '@angular/forms';


const appRoutes: Routes = [
  {path: '' , component: StartComponent},
  {path: 'login' , component: LoginComponent},
  {path: 'game' , component: GameComponent},
  {path: 'historie' , component: HistoryPageComponent}

]
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,

    StartComponent,
    NavigationComponent,
    GameComponent,
    HistoryPageComponent,
    HeaderComponent,
    HeroComponent,
   
    FooterComponent,
    CardPickerComponent,
    CardActionComponent,
    RoundResultsComponent,
    HistoryComponent,
    HorizontalLineComponent,
    RoundModalComponent,
    GameEndComponent
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule, // Add HttpClientModule to imports
    FormsModule,
    RouterModule.forRoot(appRoutes, {enableTracing: true}),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
