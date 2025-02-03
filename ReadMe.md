为了便于同事熟悉机器人的需求书写的教程，包含了从 Bot 创建、开发到部署和测试的完整流程。
### **1. 机器人功能概述**  
**BrightHub Bot** 具备以下功能：  
1. **自动欢迎消息**：用户关注 Bot 或输入 `/start` 命令时，自动推送带有图片、文字和按钮的欢迎消息。  
2. **频道公告推送**：管理员使用 `/announce` 命令向指定频道发送公告，公告中包含按钮，点击可跳转到 Bot。  
3. **自定义菜单**：Bot 菜单中包含快捷命令，用户可快速打开小程序或查看其他功能。  
4. **频道消息联动**：Bot 能与 Telegram 频道联动，自动发布消息并支持公告置顶。  
5. **权限管理**：公告推送功能仅限管理员使用，防止滥用。  

---

### **2. 开发 BrightHub Bot 的步骤**  

#### **步骤 1：创建 Telegram 频道和 Bot**  
1. **创建频道**  
   - 打开 Telegram，点击左上角菜单 → **新建频道**。  
   - 设置频道名称、描述，选择**公开频道**并设置频道链接。  
   - 创建完成后，记录下频道的 **ID**，可通过 @userinfobot 获取。  

2. **创建 Bot**  
   - 在 Telegram 搜索 **@BotFather**，点击开始对话。  
   - 发送 `/newbot`，按提示输入 Bot 名称和用户名（如 `BrightHub_bot`）。  
   - BotFather 会返回 **Bot Token**，复制保存，稍后在代码中使用。  

3. **将 Bot 添加到频道**  
   - 进入你的频道，点击右上角菜单 → **管理频道** → **管理员** → **添加管理员**。  
   - 搜索你的 Bot 名称，授予 **发布消息、置顶消息** 权限。  

---

#### **步骤 2：开发环境配置**  
1. **初始化项目**  
   ```bash
   mkdir brighthub-bot
   cd brighthub-bot
   npm init -y
   npm install grammy dotenv
   ```

2. **创建 `.env` 文件**  
   ```env
   BOT_TOKEN=你的_BOT_TOKEN
   ADMIN_ID=你的_Telegram_ID
   ```

3. **项目结构**  
   ```
   brighthub-bot/
   ├── assets/
   │   └── images/
   │       └── tg-banner.png
   ├── .env
   └── index.js
   ```

---

#### **步骤 3：编写 Bot 代码**  
1. **导入依赖，初始化 Bot**  
2. **配置自动欢迎消息、频道公告推送、自定义菜单等功能**  
3. **使用管理员权限验证，确保安全性**  

---

#### **步骤 4：部署 Bot**  
1. **本地运行**  
   ```bash
   node index.js
   ```  
   看到 `🤖 Bot 运行中...` 表示运行成功。  

2. **使用 PM2 持久化运行（可选）**  
   ```bash
   npm install -g pm2
   pm2 start index.js --name brighthub-bot
   pm2 save
   ```

3. **部署到云服务器（可选）**  
   - 选择服务器（如 AWS、VPS 等），上传代码并按照上述步骤运行。  

---

#### **步骤 5：测试 Bot 功能**  
1. 在 Telegram 搜索你的 Bot，点击 **开始**。  
2. 加入 Bot 所在频道，测试公告推送。  
3. 尝试点击菜单，确保小程序链接正常。  

---


### 注意事项
关于CHANNEL_ID的获取，机器人拉入channel并被授予发布内容和置顶消息权限后。浏览器访问如下链接
https://api.telegram.org/bot7925088010:xxxxxxxxx-yTfYPFnqDoI/getUpdates。输出如下

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
其中`10202412348803` 就是chat ID 

### **3. 关键点总结**  
- **权限管理**：确保 Bot 具备所需的频道权限，尤其是发送和置顶消息的权限。  
- **稳定性**：使用 PM2 等工具保证 Bot 稳定运行。  
- **可扩展性**：可以添加更多命令或按钮，满足不同的业务需求。  
