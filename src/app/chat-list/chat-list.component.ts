import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { chatActionState } from '../app.state';
import { ChatData } from '../chat-data';
import { ChatList } from '../chat-list.service';
import { addChat } from '../chat.action';

@Component({
  selector: 'app-chat-list',
  templateUrl: './chat-list.component.html',
  styleUrls: ['./chat-list.component.css']
})
export class ChatListComponent implements OnInit {
  /* For taking response from url */
  chatListDataForDisplay: ChatData[];

  /* For taking messages from store */
  messageDataForDisplay$: Observable<chatActionState[]>;

  constructor(
    private chatService: ChatList,
    private store: Store<chatActionState[]>
  ) {
    // this.messageDataForDisplay$ = this.store.select('loadMessage');
  }

  ngOnInit() {
    this.chatService.getChatList().subscribe(resultData => {
      /* assigning data from url to local */
      this.chatListDataForDisplay = resultData;
      let messageData: chatActionState[];
      this.chatListDataForDisplay.forEach(res => {
        messageData = Object.assign([], messageData);
        messageData.push({
          chatId: res.id,
          message: [res.content]
        });
        this.store.dispatch(addChat({ messageData }));
      });
    });
    this.messageDataForDisplay$ = this.store.select('loadMessage');
  }
}
