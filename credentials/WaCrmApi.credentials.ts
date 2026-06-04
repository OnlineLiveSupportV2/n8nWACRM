import {
	IAuthenticateGeneric,
	ICredentialTestRequest,
	ICredentialType,
	INodeProperties,
} from 'n8n-workflow';

export class WaCrmApi implements ICredentialType {
	name = 'waCrmApi';
	displayName = 'WhatsApp CRM API';
	properties: INodeProperties[] = [
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

	authenticate: IAuthenticateGeneric = {
		type: 'generic',
		properties: {
			body: {
				token: '={{$credentials.apiKey}}',
			},
		},
	};

	test: ICredentialTestRequest = {
		request: {
			baseURL: '={{$credentials.baseUrl}}',
			url: '/api/qr/rest/devices',
			method: 'POST',
			body: {
				token: '={{$credentials.apiKey}}',
				requestType: 'GET',
			},
			json: true,
		},
	};
}
