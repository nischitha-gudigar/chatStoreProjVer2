import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { chatActionState, MyAppState } from '../app.state';
import { ChatData } from '../chat-data';
import { ChatList } from '../chat-list.service';
import { addChatOnLoad } from '../store/chat-load.action';

@Component({
  selector: 'app-chat-list',
  templateUrl: './chat-list.component.html',
  styleUrls: ['./chat-list.component.css']
})
export class ChatListComponent implements OnInit {
  public contactsForDisplay$: Observable<ChatData[]>;
  public messageDisplay$: Observable<chatActionState[]>;

  constructor(
    private chatService: ChatList,
    private store: Store<MyAppState>
  ) {}

  ngOnInit() {
    this.chatService.getChatList().subscribe(contacts => {
      this.store.dispatch(addChatOnLoad({ contacts }));
    });

    /* Get contacts and messages from store */
    this.contactsForDisplay$ = this.store.select('contacts');
    this.messageDisplay$ = this.store.select('messages');
  }
}
