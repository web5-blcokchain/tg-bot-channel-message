import { Bot, InlineKeyboard, InputFile } from "grammy";
import "dotenv/config";
import fs from "fs";

// 初始化 Bot
const bot = new Bot(process.env.BOT_TOKEN);
console.log('bot token : ', process.env.BOT_TOKEN);

// 配置常量
const CHANNEL_ID = "-1002284967380";
const BOT_USERNAME = "BrightHub_bot";
const ADMIN_ID = parseInt(process.env.ADMIN_ID);
const ALLOWED_GROUP_IDS = [-1001234567890, -1009876543210];
const MINI_PROGRAM_URL = "https://example.com/miniapp"; // 替换为实际小程序链接
const BANNER_PATH = "/Users/zhangandy/Documents/work/code/test/telegram-test-bot/assets/images/tg-message-banner.png"
// 发送公告函数
async function sendAnnouncement() {
    const messageText = `
    Welcome to BrightHub Finance!\n 
🎉 BrightHub Finance is the first hybrid stablecoin infrastructure platform on the XONE Chain.\n 
🚀 Our Advantages:\n 
Global Expansion: Plans to launch in 50 countries by 2025, driving local DeFi ecosystems.\n 
Strategic Partnerships: Collaborating with global leaders like Huione Pay, Love World, Huione Foundation, etc.\n 
💬 Join BrightHub and seize the opportunities of the Web3 era, exploring the future of DeFi!\n 
#BHC #ISO #4TISO #BSC #XOC #XONE \n 
[Channel](https://t.me/brighthubfinance) | [Chat](https://t.me/BrightHub_Finance) | [X](https://x.com/brighthub_fi?s=21) | [Medium](https://medium.com/@brighthub888/)
    `;
    const keyboard = new InlineKeyboard()
        .url("🎁 JOIN NOW!!! 🎁", `https://t.me/BrightHub_bot`);

    try {
        // 发送图片
        const photo = new InputFile(BANNER_PATH); // 替换为你的图片路径
        await bot.api.sendPhoto(CHANNEL_ID, photo, {
            caption: messageText,
            parse_mode: "Markdown",
            reply_markup: keyboard,
        });

        console.log("✅ 公告已发送");
    } catch (error) {
        console.error("❌ 发送失败:", error.response?.description || error.message);
    }
}


// 自动推送消息函数
async function sendWelcomeMessage(chatId) {
    const photo = new InputFile(BANNER_PATH); // 确保路径正确
    const messageText = `
🤖 **Welcome to BrightHub!** 🤖

Click the button below to explore more features and stay updated!
    `;

    const keyboard = new InlineKeyboard()
        .url("🌟 Open Mini App", MINI_PROGRAM_URL);
    // .url("📢 Visit Channel", `https://t.me/${BOT_USERNAME}`);

    try {
        await bot.api.sendPhoto(chatId, photo, {
            caption: messageText,
            parse_mode: "Markdown",
            reply_markup: keyboard,
        });
        console.log("✅ Welcome message sent");
    } catch (error) {
        console.error("❌ Failed to send message:", error);
    }
}


// 监听命令（仅管理员）
bot.command("announce", async (ctx) => {
    const chatId = ctx.chat?.id;
    const isPrivate = ctx.chat?.type === "private";
    const isAllowedGroup = ALLOWED_GROUP_IDS.includes(chatId);

    if (!isPrivate && !isAllowedGroup) {
        return ctx.reply("⚠️ 此命令仅限私聊或特定群组使用。");
    }

    if (ctx.from?.id !== ADMIN_ID) {
        return ctx.reply("⚠️ 无权操作");
    }

    await sendAnnouncement();
    await ctx.reply("📢 公告已发送！");
});


// /start 命令处理
bot.command("start", async (ctx) => {
    await sendWelcomeMessage(ctx.chat.id);
});

// 用户关注时自动推送消息
bot.on("message:new_chat_members", async (ctx) => {
    await sendWelcomeMessage(ctx.chat.id);
});


// 设置自定义菜单
bot.api.setMyCommands([
    { command: "start", description: "Start the bot" },
    { command: "miniapp", description: "Open Mini App" },
]);

// 小程序链接命令
bot.command("miniapp", async (ctx) => {
    await ctx.reply("🌟 Click the link below to open the Mini App:", {
        reply_markup: new InlineKeyboard().url("🚀 Open Mini App", MINI_PROGRAM_URL),
    });
});

// 启动 Bot
bot.start();
console.log("🤖 Bot 运行中...");