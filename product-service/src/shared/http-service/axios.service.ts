import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { HTTP_METHOD } from '../../common/constant/common.constant';

interface AxiosResponseType {
    response: any;
    totalExecutionTime: number;
}

@Injectable()
export class AxiosService {
    constructor(private readonly httpService: HttpService) {}

    async sendRequest({
        url,
        method,
        data,
        headers,
        timeout = 60 * 1000,
    }: {
        url: string;
        method: HTTP_METHOD;
        data?: any;
        headers?: any;
        timeout?: number;
    }): Promise<AxiosResponseType> {
        const startTime = new Date().getTime();

        const response = await this.httpService.axiosRef({
            url,
            method,
            data,
            headers,
            timeout,
        });

        const endTime = new Date().getTime();

        const totalExecutionTime = (endTime - startTime) / 1000;

        return {
            response,
            totalExecutionTime,
        };
    }
}
