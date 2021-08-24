import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { map } from 'rxjs/operators';
import { MyAppState } from '../app.state';
import { ChatData } from '../chat-data';
import { ChatList } from '../chat-list.service';
import { addChat } from '../chat.action';

@Component({
  selector: 'app-chat-display',
  templateUrl: './chat-display.component.html',
  styleUrls: ['./chat-display.component.css']
})
export class ChatDisplayComponent implements OnInit {
  messageForm: FormGroup;
  selectedChatData: ChatData;
  id: number;
  /* contains id and chats in array */
  messageData = [];

  /* taken from store */
  messageDataForDisplay$;

  /* for taking previous msg */
  chatArray: string[];

  constructor(
    private fb: FormBuilder,
    private chatService: ChatList,
    private routeActivated: ActivatedRoute,
    private route: Router,
    private store: Store<MyAppState>
  ) {}

  ngOnInit() {
    this.id = this.routeActivated.snapshot.params['id'];

    this.chatService.getParticularChatDetails(this.id).subscribe(res => {
      this.selectedChatData = res.find(item => item.id === this.id);
    });

    this.messageForm = this.fb.group({
      message: ['']
    });
    this.chatArray = Object.assign([], []);
    this.messageDataForDisplay$ = this.store.pipe(
      select('messages'),
      map(state => {
        for (let key in state) {
          if (state[key].chatId == this.id) {
            this.chatArray = [...state[key].chatParticular];
            return state[key].chatParticular;
          }
        }
      })
    );
  }

  saveMessage() {
    this.messageData = Object.assign([]);
    this.chatArray.push(this.messageForm.value.message);

    this.messageData.push({
      chatId: this.id,
      chatParticular: this.chatArray
    });
    this.store.dispatch(addChat({ messageData: this.messageData }));
    this.messageForm.reset();
  }

  goBack() {
    this.route.navigate(['/contacts']);
  }
}
