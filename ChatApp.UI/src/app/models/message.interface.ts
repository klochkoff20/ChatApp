export interface MessageModel {
    senderId: string;
    nickName: string;
    fromOwner: boolean;
    content: string;
    date: Date;
}