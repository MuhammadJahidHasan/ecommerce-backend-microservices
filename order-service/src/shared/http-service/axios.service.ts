import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { HTTP_METHOD } from 'src/common/common.constant';

export abstract class IHttpRequestService {
    abstract sendRequest({ url, method, data, headers, timeout }: { url: string; method: HTTP_METHOD; data?: any; headers?: any; timeout?: number }): Promise<any>;
}

@Injectable()
export class AxiosService implements IHttpRequestService {
    constructor(private readonly httpService: HttpService) {}

    async sendRequest({ url, method, data, headers, timeout = 60 * 1000 }: { url: string; method: HTTP_METHOD; data?: any; headers?: any; timeout?: number }) {
        return await this.httpService.axiosRef({
            url,
            method,
            data,
            headers,
            timeout,
        });
    }
}
