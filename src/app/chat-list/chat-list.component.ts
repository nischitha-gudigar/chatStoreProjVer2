import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { chatActionState, MyAppState } from '../app.state';
import { ChatData } from '../chat-data';
import { ChatList } from '../chat-list.service';
import { addChatOnLoad } from '../store/chatLoad.action';

@Component({
  selector: 'app-chat-list',
  templateUrl: './chat-list.component.html',
  styleUrls: ['./chat-list.component.css']
})
export class ChatListComponent implements OnInit {
  /* For taking response from url */
  // chatListDataForDisplay: ChatData[];

  /* For taking messages from store */
  contactsForDisplay$: Observable<ChatData[]>;

  constructor(
    private chatService: ChatList,
    private store: Store<MyAppState>
  ) {}

  ngOnInit() {
    this.chatService.getChatList().subscribe(messageData => {
      /* assigning data from url to local */
      // this.chatListDataForDisplay = messageData;
      this.store.dispatch(addChatOnLoad({ messageData }));
    });

    this.contactsForDisplay$ = this.store.select('contacts');
  }
}
