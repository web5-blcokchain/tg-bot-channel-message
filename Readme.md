To facilitate colleagues in understanding how to write bot requirement documents, this tutorial covers the complete process from bot creation, development, deployment, and testing.  

### **1. Bot Function Overview**  
**BrightHub Bot** has the following features:  
1. **Auto Welcome Message**: When a user follows the bot or enters the `/start` command, an automatic welcome message is sent containing an image, text, and buttons.  
2. **Channel Announcement Push**: Admins can use the `/announce` command to send announcements to a specified channel, including buttons that redirect users to the bot.  
3. **Custom Menu**: The bot's menu includes shortcut commands that allow users to quickly open a mini-program or access other features.  
4. **Channel Message Interaction**: The bot can integrate with Telegram channels to automatically post messages and support pinned announcements.  
5. **Permission Management**: The announcement push feature is limited to admins to prevent abuse.  

---

### **2. Steps to Develop BrightHub Bot**  

#### **Step 1: Create a Telegram Channel and Bot**  
1. **Create a Channel**  
   - Open Telegram, click the top-left menu → **New Channel**.  
   - Set the channel name, description, and choose **Public Channel**, then set the channel link.  
   - After creation, record the **channel ID**, which can be obtained via @userinfobot.  

2. **Create a Bot**  
   - Search for **@BotFather** on Telegram and start a conversation.  
   - Send `/newbot` and follow the prompts to enter the bot name and username (e.g., `BrightHub_bot`).  
   - BotFather will return a **Bot Token**—copy and save it for later use in the code.  

3. **Add the Bot to the Channel**  
   - Go to your channel, click the top-right menu → **Manage Channel** → **Administrators** → **Add Administrator**.  
   - Search for your bot’s name and grant **Post Messages & Pin Messages** permissions.  

---

#### **Step 2: Set Up Development Environment**  
1. **Initialize the Project**  
   ```bash
   mkdir brighthub-bot
   cd brighthub-bot
   npm init -y
   npm install grammy dotenv
   ```

2. **Create a `.env` File**  
   ```env
   BOT_TOKEN=your_BOT_TOKEN
   ADMIN_ID=your_Telegram_ID
   ```

3. **Project Structure**  
   ```
   brighthub-bot/
   ├── assets/
   │   └── images/
   │       └── tg-banner.png
   ├── .env
   └── index.js
   ```

---

#### **Step 3: Write the Bot Code**  
1. **Import dependencies and initialize the bot**  
2. **Configure auto welcome messages, channel announcement push, custom menus, etc.**  
3. **Use admin privilege verification to ensure security**  

---

#### **Step 4: Deploy the Bot**  
1. **Run Locally**  
   ```bash
   node index.js
   ```  
   If you see `🤖 Bot is running...`, it indicates a successful run.  

2. **Use PM2 for Persistent Running (Optional)**  
   ```bash
   npm install -g pm2
   pm2 start index.js --name brighthub-bot
   pm2 save
   ```

3. **Deploy to Cloud Server (Optional)**  
   - Choose a server (e.g., AWS, VPS), upload your code, and follow the steps above to run it.  

---

#### **Step 5: Test Bot Functions**  
1. Search for your bot on Telegram and click **Start**.  
2. Join the channel where the bot is added and test the announcement push.  
3. Try clicking the menu options to ensure the mini-program links work correctly.  

---

### **Important Notes**  
To obtain the `CHANNEL_ID`, after adding the bot to the channel and granting it permissions to post and pin messages, visit the following link in your browser:  
```
https://api.telegram.org/bot7925088010:xxxxxxxxx-yTfYPFnqDoI/getUpdates
```
The output will be as follows:

```
{
    "ok": true,
    "result": [
        {
            "update_id": 408204521,
            "my_chat_member": {
                "chat": {
                    "id": -10202412348803,
                    "title": "Bright Hub Finance",
                    "username": "brighthubfinance",
                    "type": "channel"
                },
                "from": {
                    "id": 629679552,
                    "is_bot": false,
                    "first_name": "Willies.io",
                    "username": "williesm",
                    "language_code": "en"
                },
                "date": 1738606319,
                "old_chat_member": {
                    "user": {
                        "id": 7925088010,
                        "is_bot": true,
                        "first_name": "BrightHub",
                        "username": "BrightHub_bot"
                    },
                    "status": "left"
                },
                 
            }
        }
    ]
}
```
Here, `10202412348803` is the `chat ID`.  

#### **Alternative Methods to Retrieve Chat ID**  
```
One of the easiest ways to get a Telegram Chat ID is by using a bot specifically designed for this purpose. Follow these steps:

1. **Create a Telegram Bot**  
   - Search for `@BotFather` in Telegram.  
   - Send the `/newbot` command and follow the prompts to create a new bot.  
   - After creation, you will receive a Bot Token (e.g., `123456789:ABCdefGhIJKlmNoPQRstuVWXyz`).  

2. **Use the Bot to Retrieve Chat ID**  
   - Add the bot to the group or channel where you need the Chat ID.  
   - Send any message in the group or channel.  
   - Visit the following URL in your browser (replace `YOUR_BOT_TOKEN` with your bot's token):  
     ```
     https://api.telegram.org/botYOUR_BOT_TOKEN/getUpdates
     ```
   - Look for the `"chat":{"id":xxxxxx}` part in the JSON response—this is your Chat ID.  

3. **Use @userinfobot Directly**  
   - If you only need to get a personal chat or group Chat ID, use an existing bot like `@userinfobot`.  
   - Search for `@userinfobot` on Telegram and start a conversation.  
   - Forward the chat message to `@userinfobot`, and it will return the Chat ID.
```

---

### **3. Key Takeaways**  
- **Permission Management**: Ensure the bot has the required channel permissions, especially for posting and pinning messages.  
- **Stability**: Use tools like PM2 to ensure the bot runs reliably.  
- **Scalability**: More commands or buttons can be added to meet different business needs.  
