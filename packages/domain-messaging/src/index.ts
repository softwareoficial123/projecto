export interface IMessagingService {
  send(to: string, content: string): Promise<void>;
  validate(to: string): boolean;
}
