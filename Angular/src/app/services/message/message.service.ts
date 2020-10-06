import { Injectable, OnInit } from '@angular/core';
import { Message } from 'src/app/models/message/message.model';
import { MessageDTO, CreateDTOFromMessage, CreateDTOFromMessages, CreateMessageFromDTO, CreateMessagesFromDTO } from '../../dto/message-dto/message.dto';
import { environment } from 'src/environments/environment';
import { StaffService } from '../staff/staff.service';
import { UserService } from '../user/user.service';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry, map } from 'rxjs/operators';
import { StaffDTO } from 'src/app/dto/staff-dto/staff.dto';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  private readonly apiEndpoint: string = `${environment.apiBaseUrl}/messages`;

  constructor(
    private http: HttpClient,
    private _staffService: StaffService) {
  }

  public getMessage(id: number): Observable<Message> {

    if(!id) {
      return new Observable<Message>((subscriber) => {
        subscriber.next(null)
      });
    }


    return this.http.get<MessageDTO>(`${this.apiEndpoint}/${id}`)
    .pipe(
      map((dto) => {
        return CreateMessageFromDTO(dto);
      })
    );
  }

  public getMessages(): Observable<Message[]> {


    let output: Message[] = [];

    return new Observable<Message[]>(subscriber => {

      this.http.get<MessageDTO[]>(this.apiEndpoint).subscribe(dtos => {

        dtos.forEach((value, index, arr) => {

          let tmp: Message = new Message();
          tmp.id = value.messageId;
          tmp.markedAsRead = value.readState;
          tmp.message = value.message;
          
          this._staffService.getStaffMember(value.recepientId).subscribe(recipientData => {
            tmp.recipient = recipientData;
          });

          this._staffService.getStaffMember(value.senderId).subscribe(senderData => {
            tmp.sender = senderData;
          });

          // Finally push this new Message unto the output array.
          output.push(tmp);

          // If this is the last element in the array then resolve the subscriber.
          if(index === arr.length - 1) {
            subscriber.next(output);
          }


        });

      });

    });


    // return this.http.get<MessageDTO[]>(this.apiEndpoint)
    // .pipe(
    //   map((dto) => {
    //     return CreateMessagesFromDTO(dto);
    //   })
    // );
  }

  public deleteMessage(id: number): Observable<Object> {
    return this.http.get(`${this.apiEndpoint}/${id}`);
  }

  public createMessage(data: Message): Observable<Message> {

    let postObj: MessageDTO = CreateDTOFromMessage(data);

    return this.http.post<Message>(this.apiEndpoint, postObj);
  }

}
