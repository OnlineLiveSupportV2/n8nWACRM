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
			default: 'http://localhost:8002',
			required: true,
			description: 'The base URL of your WA CRM server (e.g., http://localhost:8002 or https://crm.yourdomain.com).',
		},
	];
}
