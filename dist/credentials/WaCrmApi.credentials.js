"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WaCrmApi = void 0;
class WaCrmApi {
    constructor() {
        this.name = 'waCrmApi';
        this.displayName = 'WhatsApp CRM API';
        this.properties = [
            {
                displayName: 'API Key',
                name: 'apiKey',
                type: 'string',
                typeOptions: { password: true },
                default: '',
                required: true,
                description: 'The API key (JWT token) generated in your WA CRM profile settings.',
            },
            {
                displayName: 'CRM Base URL',
                name: 'baseUrl',
                type: 'string',
                default: 'https://crm.onlinelivesupport.com',
                required: true,
                description: 'The base URL of your WhatsApp CRM server (defaults to https://crm.onlinelivesupport.com).',
            },
        ];
    }
}
exports.WaCrmApi = WaCrmApi;
