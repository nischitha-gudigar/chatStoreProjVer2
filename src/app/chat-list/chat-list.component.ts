import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { defaultIfEmpty, find, map } from 'rxjs/operators';
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
  /* For taking response from url */
  chatListDataForDisplay: ChatData[];

  /* For taking messages from store */
  messageDataForDisplay$: Observable<chatActionState[]>;

  constructor(private chatService: ChatList, private store: Store<MyAppState>) {
    this.messageDataForDisplay$ = this.store.select('messages');
  }

  ngOnInit() {
    this.chatService.getChatList().subscribe(resultData => {
      /* assigning data from url to local */
      this.chatListDataForDisplay = resultData;

      /* Code block is to add content received from url to store for all contacts*/
      let messageData: chatActionState[];
      this.chatListDataForDisplay.forEach(res => {
        /* Checking if store is length or not */
        // let a = this.messageDataForDisplay$.pipe(
        //   find(count => count.length > 0),
        //   defaultIfEmpty(false)
        // );
        // console.log(a);
        /* if not empty */
        let previousMsg;
        Object.keys(this.messageDataForDisplay$).map(key => {
          if (this.messageDataForDisplay$[key].chatId == res.id) {
            previousMsg = [...this.messageDataForDisplay$[key].message];
          }
        });

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
