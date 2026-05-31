import {
	IExecuteFunctions,
	INodeExecutionData,
	INodeType,
	INodeTypeDescription,
} from 'n8n-workflow';

export class WaCrm implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'WhatsApp CRM, Marketing, Cart Recovery by OnlineLiveSupport.com',
		name: 'waCrm',
		icon: 'file:waCrm.png',
		group: ['transform'],
		version: 1,
		subtitle: '={{$parameter["resource"] + ": " + $parameter["action"]}}',
		description: 'Automate WhatsApp marketing, Shopify cart recovery, and notifications. Send messages and templates using WA CRM by OnlineLiveSupport.',
		defaults: {
			name: 'WA CRM',
		},
		inputs: ['main'],
		outputs: ['main'],
		credentials: [
			{
				name: 'waCrmApi',
				required: true,
			},
		],
		properties: [
			{
				displayName: 'Resource',
				name: 'resource',
				type: 'options',
				options: [
					{
						name: 'Message',
						value: 'message',
					},
					{
						name: 'Template',
						value: 'template',
					},
				],
				default: 'message',
				noDataExpression: true,
				required: true,
			},
			// Actions for Message
			{
				displayName: 'Action',
				name: 'action',
				type: 'options',
				displayOptions: {
					show: {
						resource: ['message'],
					},
				},
				options: [
					{
						name: 'Send Raw Message',
						value: 'sendMessage',
						description: 'Send a raw WhatsApp message payload',
						action: 'Send a raw message',
					},
				],
				default: 'sendMessage',
				noDataExpression: true,
				required: true,
			},
			// Actions for Template
			{
				displayName: 'Action',
				name: 'action',
				type: 'options',
				displayOptions: {
					show: {
						resource: ['template'],
					},
				},
				options: [
					{
						name: 'Send Template',
						value: 'sendTemplate',
						description: 'Send a WhatsApp template message',
						action: 'Send a template',
					},
				],
				default: 'sendTemplate',
				noDataExpression: true,
				required: true,
			},
			// Properties for Message -> Send Raw Message
			{
				displayName: 'Message Object (JSON)',
				name: 'messageObject',
				type: 'json',
				displayOptions: {
					show: {
						resource: ['message'],
						action: ['sendMessage'],
					},
				},
				default: '{\n  "messaging_product": "whatsapp",\n  "recipient_type": "individual",\n  "to": "RECIPIENT_MOBILE_NUMBER",\n  "type": "text",\n  "text": {\n    "body": "Hello from n8n!"\n  }\n}',
				required: true,
				description: 'The standard WhatsApp API message payload object.',
			},
			{
				displayName: 'Enable API Logging',
				name: 'enableLog',
				type: 'boolean',
				displayOptions: {
					show: {
						resource: ['message'],
						action: ['sendMessage'],
					},
				},
				default: true,
				description: 'Whether to save logs of this message execution inside WA CRM.',
			},
			// Properties for Template -> Send Template
			{
				displayName: 'Send To',
				name: 'sendTo',
				type: 'string',
				displayOptions: {
					show: {
						resource: ['template'],
						action: ['sendTemplate'],
					},
				},
				default: '',
				required: true,
				placeholder: '+1234567890',
				description: 'Recipient phone number (with country code).',
			},
			{
				displayName: 'Template Name',
				name: 'templetName',
				type: 'string',
				displayOptions: {
					show: {
						resource: ['template'],
						action: ['sendTemplate'],
					},
				},
				default: '',
				required: true,
				placeholder: 'welcome_message',
				description: 'The exact name of the WhatsApp template created in Meta/CRM.',
			},
			{
				displayName: 'Template Parameters',
				name: 'exampleArr',
				type: 'string',
				typeOptions: {
					multipleValues: true,
				},
				displayOptions: {
					show: {
						resource: ['template'],
						action: ['sendTemplate'],
					},
				},
				default: [],
				description: 'Values to populate template placeholders (e.g. first replaces {{1}}, second {{2}}, etc.).',
			},
			{
				displayName: 'Media URI',
				name: 'mediaUri',
				type: 'string',
				displayOptions: {
					show: {
						resource: ['template'],
						action: ['sendTemplate'],
					},
				},
				default: '',
				placeholder: 'https://example.com/image.jpg',
				description: 'Optional image or video URL to include with the template.',
			},
			{
				displayName: 'Enable API Logging',
				name: 'enableLog',
				type: 'boolean',
				displayOptions: {
					show: {
						resource: ['template'],
						action: ['sendTemplate'],
					},
				},
				default: true,
				description: 'Whether to save logs of this template execution inside WA CRM.',
			},
		],
	};

	async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
		const items = this.getInputData();
		const returnData: INodeExecutionData[] = [];
		const resource = this.getNodeParameter('resource', 0) as string;
		const action = this.getNodeParameter('action', 0) as string;

		const credentials = await this.getCredentials('waCrmApi');
		const apiKey = credentials.apiKey as string;
		const baseUrl = (credentials.baseUrl as string || 'http://localhost:8002').replace(/\/$/, '');

		for (let i = 0; i < items.length; i++) {
			try {
				if (resource === 'message' && action === 'sendMessage') {
					const messageObjectInput = this.getNodeParameter('messageObject', i);
					const enableLog = this.getNodeParameter('enableLog', i) as boolean;

					let messageObject = messageObjectInput;
					if (typeof messageObjectInput === 'string') {
						messageObject = JSON.parse(messageObjectInput);
					}

					const response = await this.helpers.request({
						method: 'POST',
						url: `${baseUrl}/api/v1/send-message`,
						qs: { token: apiKey },
						body: {
							messageObject,
							enableLog,
						},
						json: true,
					});

					returnData.push({ json: response });
				} else if (resource === 'template' && action === 'sendTemplate') {
					const sendTo = this.getNodeParameter('sendTo', i) as string;
					const templetName = this.getNodeParameter('templetName', i) as string;
					const exampleArr = this.getNodeParameter('exampleArr', i) as string[];
					const mediaUri = this.getNodeParameter('mediaUri', i) as string;
					const enableLog = this.getNodeParameter('enableLog', i) as boolean;

					const response = await this.helpers.request({
						method: 'POST',
						url: `${baseUrl}/api/v1/send_templet`,
						body: {
							token: apiKey,
							sendTo,
							templetName,
							exampleArr,
							mediaUri: mediaUri || null,
							enableLog,
						},
						json: true,
					});

					returnData.push({ json: response });
				}
			} catch (error) {
				if (this.continueOnFail()) {
					returnData.push({ json: { error: (error as Error).message } });
					continue;
				}
				throw error;
			}
		}

		return [returnData];
	}
}
