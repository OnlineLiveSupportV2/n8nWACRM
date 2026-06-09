import {
	IExecuteFunctions,
	INodeExecutionData,
	INodeType,
	INodeTypeDescription,
	JsonObject,
	NodeApiError,
} from 'n8n-workflow';

export class WaCrm implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'WhatsApp via QR (OnlineLiveSupport)',
		name: 'waCrm',
		icon: 'file:waCrm.png',
		group: ['transform'],
		version: 1,
		subtitle: '={{$parameter["action"]}}',
		description: 'Send WhatsApp messages using a QR-connected WhatsApp account via OnlineLiveSupport CRM. Unlike the official WhatsApp Business API, this node works with any regular WhatsApp number — no Meta Business Account, no template approval, and no phone number verification required. Simply scan a QR code in your OnlineLiveSupport dashboard to connect your WhatsApp number and start sending messages instantly.',
		defaults: {
			name: 'WhatsApp CRM',
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
			// Action selector
			{
				displayName: 'Action',
				name: 'action',
				type: 'options',
				options: [
					{
						name: 'Send Message',
						value: 'sendMessage',
						description: 'Send a WhatsApp message (text, image, video, audio, document, or location)',
						action: 'Send a WhatsApp message',
					},
				],
				default: 'sendMessage',
				noDataExpression: true,
				required: true,
			},
			// From (sender's WhatsApp number)
			{
				displayName: 'From Number (WhatsApp)',
				name: 'from',
				type: 'string',
				displayOptions: {
					show: {
						action: ['sendMessage'],
					},
				},
				default: '',
				placeholder: '+1234567890',
				required: true,
				description: 'Your connected WhatsApp number with country code. Find it in the Devices Panel at https://crm.onlinelivesupport.com/user?page=wa-qr-connect.',
			},
			// To (recipient's WhatsApp number)
			{
				displayName: 'Send To',
				name: 'to',
				type: 'string',
				displayOptions: {
					show: {
						action: ['sendMessage'],
					},
				},
				default: '',
				placeholder: '+9876543210',
				required: true,
				description: 'Recipient phone number with country code.',
			},
			// Message type selector
			{
				displayName: 'Message Type',
				name: 'messageType',
				type: 'options',
				displayOptions: {
					show: {
						action: ['sendMessage'],
					},
				},
				options: [
					{ name: 'Text', value: 'text', description: 'Send a plain text message' },
					{ name: 'Image', value: 'image', description: 'Send an image with optional caption' },
					{ name: 'Video', value: 'video', description: 'Send a video with optional caption' },
					{ name: 'Audio', value: 'audio', description: 'Send an audio file (AAC format)' },
					{ name: 'Document', value: 'document', description: 'Send a document/file with optional caption' },
					{ name: 'Location', value: 'location', description: 'Share a GPS location' },
				],
				default: 'text',
				required: true,
				description: 'Type of WhatsApp message to send.',
			},
			// --- Text ---
			{
				displayName: 'Message Text',
				name: 'text',
				type: 'string',
				typeOptions: {
					rows: 3,
				},
				displayOptions: {
					show: {
						action: ['sendMessage'],
						messageType: ['text'],
					},
				},
				default: '',
				required: true,
				description: 'The text content of the message.',
			},
			// --- Image ---
			{
				displayName: 'Image URL',
				name: 'imageUrl',
				type: 'string',
				displayOptions: {
					show: {
						action: ['sendMessage'],
						messageType: ['image'],
					},
				},
				default: '',
				required: true,
				placeholder: 'https://example.com/image.jpg',
				description: 'Direct URL to the image to send.',
			},
			// --- Video ---
			{
				displayName: 'Video URL',
				name: 'videoUrl',
				type: 'string',
				displayOptions: {
					show: {
						action: ['sendMessage'],
						messageType: ['video'],
					},
				},
				default: '',
				required: true,
				placeholder: 'https://example.com/video.mp4',
				description: 'Direct URL to the video to send.',
			},
			// --- Audio ---
			{
				displayName: 'Audio URL (AAC)',
				name: 'aacUrl',
				type: 'string',
				displayOptions: {
					show: {
						action: ['sendMessage'],
						messageType: ['audio'],
					},
				},
				default: '',
				required: true,
				placeholder: 'https://example.com/audio.aac',
				description: 'Direct URL to the AAC audio file to send.',
			},
			// --- Document ---
			{
				displayName: 'Document URL',
				name: 'docUrl',
				type: 'string',
				displayOptions: {
					show: {
						action: ['sendMessage'],
						messageType: ['document'],
					},
				},
				default: '',
				required: true,
				placeholder: 'https://example.com/file.pdf',
				description: 'Direct URL to the document to send.',
			},
			// --- Caption (image / video / document) ---
			{
				displayName: 'Caption',
				name: 'caption',
				type: 'string',
				displayOptions: {
					show: {
						action: ['sendMessage'],
						messageType: ['image', 'video', 'document'],
					},
				},
				default: '',
				description: 'Optional caption to include with the media.',
			},
			// --- Location ---
			{
				displayName: 'Latitude',
				name: 'lat',
				type: 'string',
				displayOptions: {
					show: {
						action: ['sendMessage'],
						messageType: ['location'],
					},
				},
				default: '',
				required: true,
				placeholder: '37.7749',
				description: 'Latitude coordinate of the location.',
			},
			{
				displayName: 'Longitude',
				name: 'long',
				type: 'string',
				displayOptions: {
					show: {
						action: ['sendMessage'],
						messageType: ['location'],
					},
				},
				default: '',
				required: true,
				placeholder: '-122.4194',
				description: 'Longitude coordinate of the location.',
			},
			{
				displayName: 'Location Title',
				name: 'title',
				type: 'string',
				displayOptions: {
					show: {
						action: ['sendMessage'],
						messageType: ['location'],
					},
				},
				default: 'Shared Location',
				description: 'Optional name/title of the location.',
			},
		],
	};

	async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
		const items = this.getInputData();
		const returnData: INodeExecutionData[] = [];

		const credentials = await this.getCredentials('waCrmApi');
		const baseUrl = (credentials.baseUrl as string || 'https://crm.onlinelivesupport.com').replace(/\/$/, '');

		for (let i = 0; i < items.length; i++) {
			try {
				const action = this.getNodeParameter('action', i) as string;

				if (action === 'sendMessage') {
					const from = this.getNodeParameter('from', i) as string;
					const to = this.getNodeParameter('to', i) as string;
					const messageType = this.getNodeParameter('messageType', i) as string;

					const body: Record<string, unknown> = {
						requestType: 'POST',
						messageType,
						from: from.replace('+', '').trim(),
						to: to.replace('+', '').trim(),
					};

					if (messageType === 'text') {
						body.text = this.getNodeParameter('text', i) as string;
					} else if (messageType === 'image') {
						body.imageUrl = this.getNodeParameter('imageUrl', i) as string;
						body.caption = this.getNodeParameter('caption', i) as string;
					} else if (messageType === 'video') {
						body.videoUrl = this.getNodeParameter('videoUrl', i) as string;
						body.caption = this.getNodeParameter('caption', i) as string;
					} else if (messageType === 'audio') {
						body.aacUrl = this.getNodeParameter('aacUrl', i) as string;
					} else if (messageType === 'document') {
						body.docUrl = this.getNodeParameter('docUrl', i) as string;
						body.caption = this.getNodeParameter('caption', i) as string;
					} else if (messageType === 'location') {
						body.lat = this.getNodeParameter('lat', i) as string;
						body.long = this.getNodeParameter('long', i) as string;
						body.title = this.getNodeParameter('title', i) as string;
					}

					const response = await this.helpers.httpRequestWithAuthentication.call(this, 'waCrmApi', {
						method: 'POST',
						url: `${baseUrl}/api/qr/rest/send_message`,
						body,
						json: true,
					});

					returnData.push({ json: response });
				}
			} catch (error) {
				if (this.continueOnFail()) {
					returnData.push({ json: { error: (error as Error).message } });
					continue;
				}
				throw new NodeApiError(this.getNode(), error as JsonObject);
			}
		}

		return [returnData];
	}
}
