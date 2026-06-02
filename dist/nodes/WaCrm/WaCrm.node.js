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
            subtitle: '={{$parameter["resource"] + ": " + $parameter["action"]}}',
            description: 'Send WhatsApp messages, templates, and notifications. Automate WhatsApp marketing, Shopify cart recovery, and API Gateway workflows using OnlineLiveSupport.',
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
                    displayName: 'Connection Type',
                    name: 'connectionType',
                    type: 'options',
                    options: [
                        {
                            name: 'WhatsApp QR Plugin (Scan QR)',
                            value: 'qrPlugin',
                            description: 'Send messages using your QR-connected WhatsApp account',
                        },
                        {
                            name: 'WhatsApp Meta Cloud API (Official)',
                            value: 'metaApi',
                            description: 'Send messages and templates using your official Meta Business WhatsApp API',
                        },
                    ],
                    default: 'qrPlugin',
                    noDataExpression: true,
                    required: true,
                },
                {
                    displayName: 'Resource',
                    name: 'resource',
                    type: 'options',
                    displayOptions: {
                        show: {
                            connectionType: ['metaApi'],
                        },
                    },
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
                {
                    displayName: 'Resource',
                    name: 'resource',
                    type: 'options',
                    displayOptions: {
                        show: {
                            connectionType: ['qrPlugin'],
                        },
                    },
                    options: [
                        {
                            name: 'Message',
                            value: 'message',
                        },
                    ],
                    default: 'message',
                    noDataExpression: true,
                    required: true,
                },
                {
                    displayName: 'Action',
                    name: 'action',
                    type: 'options',
                    displayOptions: {
                        show: {
                            connectionType: ['metaApi'],
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
                {
                    displayName: 'Action',
                    name: 'action',
                    type: 'options',
                    displayOptions: {
                        show: {
                            connectionType: ['metaApi'],
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
                {
                    displayName: 'Action',
                    name: 'action',
                    type: 'options',
                    displayOptions: {
                        show: {
                            connectionType: ['qrPlugin'],
                            resource: ['message'],
                        },
                    },
                    options: [
                        {
                            name: 'Send Message',
                            value: 'sendMessage',
                            description: 'Send a WhatsApp message (text, image, video, document, location, etc.)',
                            action: 'Send a message',
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
                            connectionType: ['qrPlugin'],
                            action: ['sendMessage'],
                        },
                    },
                    default: '',
                    placeholder: '+1234567890',
                    required: true,
                    description: 'Your connected WhatsApp number with country code (e.g. from the Devices Panel at https://crm.onlinelivesupport.com/user?page=wa-qr-connect).',
                },
                {
                    displayName: 'Send To',
                    name: 'to',
                    type: 'string',
                    displayOptions: {
                        show: {
                            connectionType: ['qrPlugin'],
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
                            connectionType: ['qrPlugin'],
                            action: ['sendMessage'],
                        },
                    },
                    options: [
                        { name: 'Text', value: 'text' },
                        { name: 'Image', value: 'image' },
                        { name: 'Video', value: 'video' },
                        { name: 'Audio', value: 'audio' },
                        { name: 'Document', value: 'document' },
                        { name: 'Location', value: 'location' },
                    ],
                    default: 'text',
                    required: true,
                    description: 'Type of WhatsApp message to send.',
                },
                {
                    displayName: 'Message Text',
                    name: 'text',
                    type: 'string',
                    displayOptions: {
                        show: {
                            connectionType: ['qrPlugin'],
                            action: ['sendMessage'],
                            messageType: ['text'],
                        },
                    },
                    default: '',
                    required: true,
                    description: 'The body text of the message.',
                },
                {
                    displayName: 'Image URL',
                    name: 'imageUrl',
                    type: 'string',
                    displayOptions: {
                        show: {
                            connectionType: ['qrPlugin'],
                            action: ['sendMessage'],
                            messageType: ['image'],
                        },
                    },
                    default: '',
                    required: true,
                    placeholder: 'https://example.com/image.jpg',
                    description: 'Direct link to the image to send.',
                },
                {
                    displayName: 'Video URL',
                    name: 'videoUrl',
                    type: 'string',
                    displayOptions: {
                        show: {
                            connectionType: ['qrPlugin'],
                            action: ['sendMessage'],
                            messageType: ['video'],
                        },
                    },
                    default: '',
                    required: true,
                    placeholder: 'https://example.com/video.mp4',
                    description: 'Direct link to the video to send.',
                },
                {
                    displayName: 'Audio URL (AAC)',
                    name: 'aacUrl',
                    type: 'string',
                    displayOptions: {
                        show: {
                            connectionType: ['qrPlugin'],
                            action: ['sendMessage'],
                            messageType: ['audio'],
                        },
                    },
                    default: '',
                    required: true,
                    placeholder: 'https://example.com/audio.aac',
                    description: 'Direct link to the AAC audio file to send.',
                },
                {
                    displayName: 'Document URL',
                    name: 'docUrl',
                    type: 'string',
                    displayOptions: {
                        show: {
                            connectionType: ['qrPlugin'],
                            action: ['sendMessage'],
                            messageType: ['document'],
                        },
                    },
                    default: '',
                    required: true,
                    placeholder: 'https://example.com/document.pdf',
                    description: 'Direct link to the document to send.',
                },
                {
                    displayName: 'Caption',
                    name: 'caption',
                    type: 'string',
                    displayOptions: {
                        show: {
                            connectionType: ['qrPlugin'],
                            action: ['sendMessage'],
                            messageType: ['image', 'video', 'document'],
                        },
                    },
                    default: '',
                    description: 'Optional caption to include with the media file.',
                },
                {
                    displayName: 'Latitude',
                    name: 'lat',
                    type: 'string',
                    displayOptions: {
                        show: {
                            connectionType: ['qrPlugin'],
                            action: ['sendMessage'],
                            messageType: ['location'],
                        },
                    },
                    default: '',
                    required: true,
                    placeholder: '37.7749',
                    description: 'Latitude coordinates of the location.',
                },
                {
                    displayName: 'Longitude',
                    name: 'long',
                    type: 'string',
                    displayOptions: {
                        show: {
                            connectionType: ['qrPlugin'],
                            action: ['sendMessage'],
                            messageType: ['location'],
                        },
                    },
                    default: '',
                    required: true,
                    placeholder: '-122.4194',
                    description: 'Longitude coordinates of the location.',
                },
                {
                    displayName: 'Location Title',
                    name: 'title',
                    type: 'string',
                    displayOptions: {
                        show: {
                            connectionType: ['qrPlugin'],
                            action: ['sendMessage'],
                            messageType: ['location'],
                        },
                    },
                    default: 'Shared Location',
                    description: 'Optional name/title of the location.',
                },
                {
                    displayName: 'Message Object (JSON)',
                    name: 'messageObject',
                    type: 'json',
                    displayOptions: {
                        show: {
                            connectionType: ['metaApi'],
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
                            connectionType: ['metaApi'],
                            resource: ['message'],
                            action: ['sendMessage'],
                        },
                    },
                    default: true,
                    description: 'Whether to save logs of this message execution inside WA CRM.',
                },
                {
                    displayName: 'Send To',
                    name: 'sendTo',
                    type: 'string',
                    displayOptions: {
                        show: {
                            connectionType: ['metaApi'],
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
                    type: 'options',
                    typeOptions: {
                        loadOptionsMethod: 'getTemplates',
                    },
                    displayOptions: {
                        show: {
                            connectionType: ['metaApi'],
                            resource: ['template'],
                            action: ['sendTemplate'],
                        },
                    },
                    default: '',
                    required: true,
                    description: 'The WhatsApp template to send (dynamically loaded from your account).',
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
                            connectionType: ['metaApi'],
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
                            connectionType: ['metaApi'],
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
                            connectionType: ['metaApi'],
                            resource: ['template'],
                            action: ['sendTemplate'],
                        },
                    },
                    default: true,
                    description: 'Whether to save logs of this template execution inside WA CRM.',
                },
            ],
        };
        this.methods = {
            loadOptions: {
                async getTemplates() {
                    try {
                        const credentials = await this.getCredentials('waCrmApi');
                        const apiKey = credentials.apiKey;
                        const baseUrl = (credentials.baseUrl || 'https://crm.onlinelivesupport.com').replace(/\/$/, '');
                        const response = await this.helpers.request({
                            method: 'GET',
                            url: `${baseUrl}/api/user/get_my_meta_templets`,
                            headers: {
                                Authorization: `Bearer ${apiKey}`,
                            },
                            json: true,
                        });
                        const templates = response.data || [];
                        return templates.map((t) => ({
                            name: `${t.name} (${t.language})`,
                            value: t.name,
                        }));
                    }
                    catch (error) {
                        return [
                            {
                                name: 'Failed to load templates (check API Key / Meta Connection)',
                                value: '',
                            },
                        ];
                    }
                },
            },
        };
    }
    async execute() {
        const items = this.getInputData();
        const returnData = [];
        const connectionType = this.getNodeParameter('connectionType', 0);
        const resource = this.getNodeParameter('resource', 0);
        const action = this.getNodeParameter('action', 0);
        const credentials = await this.getCredentials('waCrmApi');
        const apiKey = credentials.apiKey;
        const baseUrl = (credentials.baseUrl || 'https://crm.onlinelivesupport.com').replace(/\/$/, '');
        for (let i = 0; i < items.length; i++) {
            try {
                if (connectionType === 'qrPlugin') {
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
                else if (connectionType === 'metaApi') {
                    if (resource === 'message' && action === 'sendMessage') {
                        const messageObjectInput = this.getNodeParameter('messageObject', i);
                        const enableLog = this.getNodeParameter('enableLog', i);
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
                    }
                    else if (resource === 'template' && action === 'sendTemplate') {
                        const sendTo = this.getNodeParameter('sendTo', i);
                        const templetName = this.getNodeParameter('templetName', i);
                        const exampleArr = this.getNodeParameter('exampleArr', i);
                        const mediaUri = this.getNodeParameter('mediaUri', i);
                        const enableLog = this.getNodeParameter('enableLog', i);
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
