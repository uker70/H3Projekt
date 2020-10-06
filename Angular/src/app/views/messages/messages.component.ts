import { Component, OnInit } from '@angular/core';
import { faEye, faInbox, faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import { Message } from 'src/app/models/message/message.model';
import { MessageService } from 'src/app/services/message/message.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.scss']
})
export class MessagesComponent implements OnInit {

  allMessages: Message[] = null;

  newMessageMenu: RenderMenu = RenderMenu.NewMessage;
  inboxMenu: RenderMenu = RenderMenu.Inbox;
  sentMenu: RenderMenu = RenderMenu.Sent;

  activeMenu: RenderMenu = RenderMenu.NewMessage;

  faEye = faEye;
  faInbox = faInbox;
  faPaperPlane = faPaperPlane;

  constructor(private _messageService: MessageService) { }

  ngOnInit(): void {

    this._messageService.getMessages().subscribe((messages) => {
      this.allMessages = messages;

    });

  }

  getMessagesToMe(): Message[] {
    // TODO: Replace with actual authenticated user.
    return this.allMessages.filter(m => m.recipient.id === environment.fakeAuthenticatedUserId);
  }

  getSentMessages(): Message[] {
    // TODO: Replace with actual authenticated user.
    return this.allMessages.filter(m => m.sender.id === environment.fakeAuthenticatedUserId);
  }

  logTest() {
    console.log('yea clicked?');
  }

  switchMenu(menu: RenderMenu) {
    this.activeMenu = menu;
  }

}

export enum RenderMenu {
  NewMessage,
  Inbox,
  Sent
}
