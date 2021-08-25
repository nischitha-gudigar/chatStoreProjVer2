import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { chatActionState, MyAppState } from '../app.state';
import { ChatData } from '../chat-data';
import { ChatList } from '../chat-list.service';
import { addChat } from '../chat.action';

@Component({
  selector: 'app-chat-list',
  templateUrl: './chat-list.component.html',
  styleUrls: ['./chat-list.component.css']
})
export class ChatListComponent implements OnInit {
  chatListDataForDisplay: ChatData[];

  /* For taking messages from store */
  messageDataForDisplay$: Observable<chatActionState[]>;

  constructor(
    private chatService: ChatList,
    private store: Store<MyAppState>
  ) {}

  ngOnInit() {
    this.chatService.getChatList().subscribe(resultData => {
      this.chatListDataForDisplay = resultData;

      let messageData: chatActionState[];
      resultData.forEach(res => {
        messageData = Object.assign([], messageData);
        messageData.push({
          chatId: res.id,
          message: [res.content]
        });
        this.store.dispatch(addChat({ messageData }));
      });
    });

    this.messageDataForDisplay$ = this.store.select('messages');
  }
}
