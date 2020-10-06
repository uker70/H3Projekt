import { Staff } from 'src/app/models/staff/staff.model';
import { Message } from '../../models/message/message.model';

export class MessageDTO {
    messageId: number;
    message: string;
    readState: boolean;
    senderId: number;
    recepientId: number; // Stavefejl her, men gider ikke rette API.
}

function createDTOFromMessage(input: Message): MessageDTO {

    let out: MessageDTO = new MessageDTO();

    out.messageId = input.id;
    out.message = input.message;
    out.readState = input.markedAsRead;
    out.recepientId = input.recipient.id;
    out.senderId = input.sender.id;

    return out;
}

function createDTOFromMessages(input: Message[]): MessageDTO[] {
    let output: MessageDTO[] = [];

    input.forEach((value) => {
        output.push(createDTOFromMessage(value));
    });

    return output;
}

function createMessageFromDTO(input: MessageDTO): Message {
    let out: Message = new Message();

    out.id = input.messageId;
    out.message = input.message;
    out.markedAsRead = input.readState;
    out.recipient = new Staff();
    out.recipient.id = input.recepientId;
    out.sender = new Staff();
    out.sender.id = input.senderId;

    return out;
}

function createMessagesFromDTO(input: MessageDTO[]): Message[] {
    let output: Message[] = [];

    input.forEach((value) => {
        output.push(createMessageFromDTO(value));
    });

    return output;
}

export {
    createDTOFromMessage as CreateDTOFromMessage,
    createDTOFromMessages as CreateDTOFromMessages,
    createMessageFromDTO as CreateMessageFromDTO,
    createMessagesFromDTO as CreateMessagesFromDTO 
};