import { ERROR_CODES } from '../exception/error-code';

export interface ErrorResponse {
    code: ERROR_CODES;
    message: string;
    traceId: string;
    errors: string[];
}

export interface IHeadersObject {
    'user-agent'?: string;
    user?: string;
    'st-access'?: string;
    'client-id'?: string;
    accept?: string;
    host?: string;
    'accept-encoding'?: string;
    connection?: string;
    'x-forwarded-for'?: string;
    'x-original-forwarded-for'?: string;
    'ip-address'?: string;
    'device-type': DEVICE_TYPE;
}

export enum DEVICE_TYPE {
    WEB = 'Web',
    ANDROID = 'Android',
    IOS = 'iOS',
}

export interface IAuthUserProfile {
    title: string;
    firstName: string | null;
    lastName: string | null;
    mobileNumber: string;
    avatar: string | null;
    gender: number;
    dob: Date | string | null;
    passportNumber: string | null;
    passportExpireDate: Date | string | null;
    postCode: string | null;
    passport: string | null;
    nationality: string | null;
    passportCopy: string | null;
    visaCopy: string | null;
    userId: number;
}

export interface IAuthUser {
    id: number;
    username: string;
    email: string;
    password: string;
    mobileNumber: string;
    uuid: string;
    profile: IAuthUserProfile;
}
export interface IUserProfile {
    title: string;
    firstName: string | null;
    lastName: string | null;
    mobileNumber: string;
    userId: number;
}
export interface IUser {
    id: number;
    username: string;
    email: string;
    mobileNumber: string;
    uuid: string;
    profile: IUserProfile;
}
