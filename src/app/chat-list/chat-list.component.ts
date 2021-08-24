import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { chatActionState, MyAppState } from '../app.state';
import { ChatData } from '../chat-data';
import { ChatList } from '../chat-list.service';
import { addChat } from '../chat.action';
import { selectMsg } from '../chat.selector';

@Component({
  selector: 'app-chat-list',
  templateUrl: './chat-list.component.html',
  styleUrls: ['./chat-list.component.css']
})
export class ChatListComponent implements OnInit {
  chatListDataForDisplay: ChatData[];
  messageData = [];
  messageDataForDisplay$: Observable<chatActionState[]>;
  /* for taking previous msg */
  chatMsgArray: string[];

  constructor(private chatService: ChatList, private store: Store<MyAppState>) {
    this.messageDataForDisplay$ = this.store.select(selectMsg);
  }

  ngOnInit() {
    this.chatService.getChatList().subscribe(resultData => {
      this.chatListDataForDisplay = resultData.map(res => {
        this.chatMsgArray = Object.assign([], []);

        this.store
          .pipe(
            select('messages'),
            map(state => {
              for (let key in state) {
                if (state[key].chatId == res.id) {
                  this.chatMsgArray = [...state[key].chatParticular];
                  break;
                }
              }
            })
          )
          .subscribe();
        if (this.chatMsgArray.length == 0) {
          this.chatMsgArray.push(res.content);
        }

        let mData = {
          chatId: res.id,
          chatParticular: this.chatMsgArray
        };

        res.message = this.chatMsgArray;
        this.messageData = Object.assign([], this.messageData);
        this.messageData.push(mData);
        this.store.dispatch(addChat({ messageData: this.messageData }));
        return res;
      });
    });
  }
}
