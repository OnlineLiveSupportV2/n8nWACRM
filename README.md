# WhatsApp CRM, Marketing, API Gateway & Cart Recovery by OnlineLiveSupport for n8n

<p align="center">
  <img src="https://www.onlinelivesupport.com/assets/images/logo.png" alt="OnlineLiveSupport WhatsApp CRM Logo" width="200" />
</p>

A premium, robust **n8n Community Node** that integrates the **WhatsApp CRM, Marketing, API Gateway, and Cart Recovery** platform by **[OnlineLiveSupport.com](https://onlinelivesupport.com)** directly into your n8n automation workflows.

With this node, you can send WhatsApp messages via your QR-connected WhatsApp number, automate customer notifications, recover abandoned Shopify carts, run targeted marketing campaigns, and dispatch rich media messages — all programmatically from inside n8n.

---

## 🚀 Key Features

- **Send Text Messages**: Send plain text WhatsApp messages to any recipient instantly.
- **Send Images**: Share images with optional captions via direct URL.
- **Send Videos**: Send video files with optional captions via direct URL.
- **Send Audio**: Deliver audio messages (AAC format) to recipients.
- **Send Documents**: Share PDFs and other documents with optional captions.
- **Share Locations**: Send GPS coordinates with a custom title.
- **QR Code Connection**: Uses your personal WhatsApp account — no Meta Business approval required.
- **Production Ready**: Connects directly to the global cloud platform at `https://crm.onlinelivesupport.com`.

---

## 📦 Installation

To install this node inside your self-hosted or cloud n8n instance:

1. Log into your **n8n Dashboard**.
2. Navigate to **Settings → Community Nodes**.
3. Click **Install a Node** (or **Install community node**).
4. Enter the package name:
   ```
   n8n-nodes-whatsapp-crm-marketing
   ```
5. Agree to the terms and click **Install**.

---

## 🔑 Configuration & Connection Guide

Connecting your **OnlineLiveSupport CRM** account to n8n is extremely simple. Follow this step-by-step onboarding guide:

### Step 1 — Connect your WhatsApp via QR Code

1. Log in to your OnlineLiveSupport CRM account: **[Sign In / Sign Up](https://crm.onlinelivesupport.com/user/login)**
2. From your CRM Dashboard, go to **Add WhatsApp by QR → Add Device**
3. Scan the generated QR code from your **WhatsApp mobile app** to link your phone

### Step 2 — Retrieve your API Token

1. After connecting your WhatsApp, go to the **[REST API tab](https://crm.onlinelivesupport.com/user?page=wa-qr-rest-api)**
2. Copy your **API Token** from that page

### Step 3 — Create Credentials in n8n

In n8n, create a new **WhatsApp CRM API** credential with:

| Field | Value |
|---|---|
| **API Key** | Paste your API Token copied from the REST API tab |
| **CRM Base URL** | `https://crm.onlinelivesupport.com` *(pre-filled by default)* |

### Step 4 — Find your WhatsApp "From" Number

- Go to your **[Devices Panel](https://crm.onlinelivesupport.com/user?page=wa-qr-connect)** to see your active connected WhatsApp numbers
- Use the number (with country code, e.g. `+1234567890`) as the **From Number** field in the node

---

## 🛠️ Actions & Parameters

### Send Message

Sends a WhatsApp message from your connected QR WhatsApp number.

| Parameter | Required | Description |
|---|---|---|
| **From Number** | ✅ | Your connected WhatsApp number with country code (e.g. `+1234567890`) |
| **Send To** | ✅ | Recipient's phone number with country code (e.g. `+9876543210`) |
| **Message Type** | ✅ | Type of message: Text, Image, Video, Audio, Document, or Location |

**Message Type — Content Fields:**

| Type | Fields |
|---|---|
| **Text** | Message Text |
| **Image** | Image URL, Caption *(optional)* |
| **Video** | Video URL, Caption *(optional)* |
| **Audio** | Audio URL *(AAC format)* |
| **Document** | Document URL, Caption *(optional)* |
| **Location** | Latitude, Longitude, Title *(optional)* |

---

## 📖 Usage Examples

### Send a Text Message

```
From Number: +1234567890
Send To:     +9876543210
Type:        Text
Text:        Hello! Your order has been shipped 🚚
```

### Send an Order Image

```
From Number: +1234567890
Send To:     +9876543210
Type:        Image
Image URL:   https://yourstore.com/order-receipt.jpg
Caption:     Here is your order receipt. Thank you! 🎉
```

### Share a Store Location

```
From Number: +1234567890
Send To:     +9876543210
Type:        Location
Latitude:    37.7749
Longitude:   -122.4194
Title:       Our Store — San Francisco
```

---

## 🔗 Resources

- 🌐 **Platform**: [crm.onlinelivesupport.com](https://crm.onlinelivesupport.com)
- 📋 **REST API Settings**: [wa-qr-rest-api](https://crm.onlinelivesupport.com/user?page=wa-qr-rest-api)
- 📱 **Devices Panel**: [wa-qr-connect](https://crm.onlinelivesupport.com/user?page=wa-qr-connect)
- 📦 **npm Package**: [n8n-nodes-whatsapp-crm-marketing](https://www.npmjs.com/package/n8n-nodes-whatsapp-crm-marketing)

---

## 🆘 Support & Contact

Need help getting set up or have questions? Our team is here to help!

- 📬 **Contact Us**: [onlinelivesupport.com/contact](https://www.onlinelivesupport.com/contact/)
- 🌐 **Website**: [onlinelivesupport.com](https://onlinelivesupport.com)
- 💬 **CRM Support**: Available directly inside your CRM dashboard

---

## 📄 License

This integration is licensed under the [MIT License](LICENSE). Distributed by **[OnlineLiveSupport.com](https://onlinelivesupport.com)**.
