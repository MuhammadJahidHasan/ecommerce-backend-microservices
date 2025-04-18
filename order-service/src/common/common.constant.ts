export interface IAuthUser {
    id: number;
    email: string;
    name: string;
    mobileNumber: string;
}

export enum HTTP_METHOD {
    POST = 'POST',
    GET = 'GET',
    PUT = 'PUT',
    DELETE = 'DELETE',
}

export enum APP_ENV {
    PRODUCTION = 'production',
    DEVELOPMENT = 'development',
    TEST = 'test',
    LOCAL = 'local',
}
