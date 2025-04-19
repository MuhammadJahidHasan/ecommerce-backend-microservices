export interface IMQService {
    consumeFromQueue(queue: string, sendMsg: (msg: string) => void): Promise<void>;
}
