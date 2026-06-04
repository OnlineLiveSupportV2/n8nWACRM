"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WaCrm = void 0;
class WaCrm {
    constructor() {
        this.description = {
            displayName: 'WhatsApp CRM, Marketing, API Gateway & Cart Recovery by OnlineLiveSupport',
            name: 'waCrm',
            icon: 'file:waCrm.png',
            group: ['transform'],
            version: 1,
            subtitle: '={{$parameter["action"]}}',
            description: 'Send WhatsApp messages via your QR-connected WhatsApp account using OnlineLiveSupport CRM. Supports text, image, video, audio, document, and location messages.',
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
    }
    async execute() {
        const items = this.getInputData();
        const returnData = [];
        const credentials = await this.getCredentials('waCrmApi');
        const apiKey = credentials.apiKey;
        const baseUrl = (credentials.baseUrl || 'https://crm.onlinelivesupport.com').replace(/\/$/, '');
        for (let i = 0; i < items.length; i++) {
            try {
                const action = this.getNodeParameter('action', i);
                if (action === 'sendMessage') {
                    const from = this.getNodeParameter('from', i);
                    const to = this.getNodeParameter('to', i);
                    const messageType = this.getNodeParameter('messageType', i);
                    const body = {
                        token: apiKey,
                        requestType: 'POST',
                        messageType,
                        from: from.replace('+', '').trim(),
                        to: to.replace('+', '').trim(),
                    };
                    if (messageType === 'text') {
                        body.text = this.getNodeParameter('text', i);
                    }
                    else if (messageType === 'image') {
                        body.imageUrl = this.getNodeParameter('imageUrl', i);
                        body.caption = this.getNodeParameter('caption', i);
                    }
                    else if (messageType === 'video') {
                        body.videoUrl = this.getNodeParameter('videoUrl', i);
                        body.caption = this.getNodeParameter('caption', i);
                    }
                    else if (messageType === 'audio') {
                        body.aacUrl = this.getNodeParameter('aacUrl', i);
                    }
                    else if (messageType === 'document') {
                        body.docUrl = this.getNodeParameter('docUrl', i);
                        body.caption = this.getNodeParameter('caption', i);
                    }
                    else if (messageType === 'location') {
                        body.lat = this.getNodeParameter('lat', i);
                        body.long = this.getNodeParameter('long', i);
                        body.title = this.getNodeParameter('title', i);
                    }
                    const response = await this.helpers.request({
                        method: 'POST',
                        url: `${baseUrl}/api/qr/rest/send_message`,
                        body,
                        json: true,
                    });
                    returnData.push({ json: response });
                }
            }
            catch (error) {
                if (this.continueOnFail()) {
                    returnData.push({ json: { error: error.message } });
                    continue;
                }
                throw error;
            }
        }
        return [returnData];
    }
}
exports.WaCrm = WaCrm;
