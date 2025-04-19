import { Connection, Channel, connect, ConsumeMessage, Message, ChannelModel } from "amqplib";
import { IMQService } from "./mq";

export class RabbitMQ implements IMQService {
    private mqConnection: ChannelModel;
    private mqChannel: Channel;
    
    constructor(mqConnection: ChannelModel, mqChannel: Channel) {
        this.mqConnection = mqConnection;
        this.mqChannel = mqChannel;
    }

    async consumeFromQueue(queue: string, sendMsg: (msg: string) => void): Promise<void> {
        
        const exchange = "notifications";
        await this.mqChannel.assertExchange(exchange, "direct", { durable: true });
        const q = await this.mqChannel.assertQueue(queue, { durable: true });
        await this.mqChannel.bindQueue(queue, exchange, queue);
        
        this.mqChannel.consume(queue, (msg: ConsumeMessage | null) => {
            if (msg) {
                console.log("Received message:", msg.content.toString());
                const message = msg.content.toString();
                sendMsg(message);
            }
        }, { noAck: true });
    }
}

export const initializeRabbitMQ = async(url: string) => {
    try {
        const connection = await connect(url);
        const channel = await connection.createChannel();
        console.log("connected to RabbitMQ server");
        return new RabbitMQ(connection, channel);
    } catch (err) {
        console.log("failed to connect the RabbitMQ server");
        console.log(err);
        process.exit(1);
    }
}