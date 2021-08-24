import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { ChatListComponent } from './chat-list/chat-list.component';
import { ChatDisplayComponent } from './chat-display/chat-display.component';
import { RouterModule, Routes } from '@angular/router';
import { StoreModule } from '@ngrx/store';
import { chatReducer } from './chat.reducer';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

const routes: Routes = [
  { path: 'contacts', component: ChatListComponent },
  { path: 'chat/:id', component: ChatDisplayComponent },
  { path: '', redirectTo: 'contacts', pathMatch: 'full' }
];

@NgModule({
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forRoot(routes),
    StoreModule.forRoot({ messages: chatReducer }),
    StoreDevtoolsModule.instrument({
      maxAge: 25
    })
  ],
  declarations: [AppComponent, ChatListComponent, ChatDisplayComponent],
  bootstrap: [AppComponent]
})
export class AppModule {}
