# WhatsApp CRM, Marketing, API Gateway & Cart Recovery by OnlineLiveSupport for n8n

<p align="center">
  <img src="nodes/WaCrm/waCrm.png" alt="WhatsApp CRM Logo" width="128" height="128" />
</p>

A premium, robust **n8n Community Node** that integrates the **WhatsApp CRM, Marketing, API Gateway, and Cart Recovery** platform by **OnlineLiveSupport.com** directly into your n8n automation workflows. 

With this node, you can send WhatsApp messages via API, automate customer notifications, recover abandoned Shopify carts, run targeted marketing campaigns, and handle template messages programmatically.

---

## 🚀 Key Features

* **Send Raw WhatsApp Messages**: Dispatch standard custom WhatsApp API payloads (`POST /api/v1/send-message`).
* **Send Marketing Templates**: Trigger predefined WhatsApp templates with support for dynamic parameter variables and media URIs (`POST /api/v1/send_templet`).
* **API Logging Support**: Built-in toggle to record execution logs inside your WA CRM panel.
* **Production Ready**: Connects directly to the global cloud platform: `https://crm.onlinelivesupport.com`.

---

## 📦 Installation

To install this node inside your self-hosted or cloud n8n instance:

1. Log into your **n8n Dashboard**.
2. Navigate to **Settings > Community Nodes**.
3. Click **Install a Node** (or **Install community node**).
4. Enter the package name:
   ```text
   n8n-nodes-whatsapp-crm-marketing
   ```
5. Agree to the terms and click **Install**.

---

## 🔑 Configuration & Connection Guide

Connecting your **OnlineLiveSupport CRM** account to n8n is extremely simple. Follow this step-by-step onboarding guide:

### 1. Connect your WhatsApp Mobile App
1. Log in to your OnlineLiveSupport CRM account: **[Sign In / Sign Up](https://crm.onlinelivesupport.com/user/login)**.
2. From your CRM Dashboard, go to **Add WhatsApp by QR** → **Add Device**.
3. Scan the generated QR code from your WhatsApp mobile app to link your phone.

### 2. Retrieve your API Token & Credentials
Create a **WhatsApp CRM API** credential set in n8n with:
* **CRM Base URL**: Set this to `https://crm.onlinelivesupport.com` (which is pre-filled by default).
* **API Key**: Retrieve your JWT API key directly from your **[REST API settings tab](https://crm.onlinelivesupport.com/user?page=wa-qr-rest-api)**.

### 3. Find your connected WhatsApp Number
* Go to your **[Devices Panel](https://crm.onlinelivesupport.com/user?page=wa-qr-connect)** to view your active WhatsApp "From" Numbers.

---

## 🛠️ Actions & Parameters

### 1. Send Raw Message
* **Message Object (JSON)**: Input standard WhatsApp Business API payload.
  ```json
  {
    "messaging_product": "whatsapp",
    "recipient_type": "individual",
    "to": "RECIPIENT_NUMBER",
    "type": "text",
    "text": {
      "body": "Hello from n8n!"
    }
  }
  ```
* **Enable API Logging**: Boolean toggle.

### 2. Send Template
* **Send To**: Recipient number with country code (e.g. `+1234567890`).
* **Template Name**: Exact template name registered in Meta (e.g. `welcome_message`).
* **Template Parameters**: Dynamic variables mapping to `{{1}}`, `{{2}}`, etc.
* **Media URI**: Optional URL for templates with header images or videos.
* **Enable API Logging**: Boolean toggle.

---

## 📄 License

This integration is licensed under the [MIT License](LICENSE). Distributed by **[OnlineLiveSupport.com](https://onlinelivesupport.com)**.
