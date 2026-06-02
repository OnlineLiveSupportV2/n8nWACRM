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
                description: 'Your OnlineLiveSupport REST API Token. Copy it from your CRM panel at Add WhatsApp by QR → Rest API (https://crm.onlinelivesupport.com/user?page=wa-qr-rest-api). Contact support if you face issues (https://onlinelivesupport.com/contact).',
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
