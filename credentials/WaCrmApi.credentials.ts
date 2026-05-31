import {
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
