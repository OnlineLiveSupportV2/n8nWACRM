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
                default: 'http://localhost:8002',
                required: true,
                description: 'The base URL of your WA CRM server (e.g., http://localhost:8002 or https://crm.yourdomain.com).',
            },
        ];
    }
}
exports.WaCrmApi = WaCrmApi;
