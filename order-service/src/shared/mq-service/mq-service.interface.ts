// Use abstract class instead of an interface so that inject from service Without @Inject() syntax
export abstract class IMQService {
    abstract publishToQueue(queue: string, message: string): Promise<void>;
}
