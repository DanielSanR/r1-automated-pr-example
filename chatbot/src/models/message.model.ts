
export class Message {
  constructor(
    public id: string,
    public text: string,
    public isBot: boolean,
    public timestamp: Date
  ) {}
}
      