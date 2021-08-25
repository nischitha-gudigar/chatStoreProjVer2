import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { chatActionState, MyAppState } from '../app.state';
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

  /* taken from store */
  messageDataDisplay$: Observable<chatActionState[]>;

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

    this.messageDataDisplay$ = this.store.pipe(
      select('messages'),
      map(state =>
        // Object.keys(state).map(key => {
        //   if (state[key].chatId == this.id) {
        //     return state[key];
        //   }
        // })
        state.map(res => {
          console.log('asdasf');
          if (res.chatId == this.id) return res;
        })
      )
    );
  }

  saveMessage() {
    let messageData: chatActionState[];
    messageData = Object.assign([], []);
    messageData.push({
      chatId: this.id,
      message: [this.messageForm.value.message]
    });
    this.store.dispatch(addChat({ messageData }));
    this.messageForm.reset();
  }

  goBack() {
    this.route.navigate(['/contacts']);
  }
}
