// DOM元素
const chatMessages = document.getElementById('chatMessages');
const messageInput = document.getElementById('messageInput');
const sendButton = document.getElementById('sendButton');

// 初始化聊天
document.addEventListener('DOMContentLoaded', () => {
    // 显示欢迎消息
    addBotMessage('您好！我是UPS智能客服助手，很高兴为您服务。请问有什么可以帮助您的？');
    
    // 设置事件监听器
    sendButton.addEventListener('click', sendMessage);
    messageInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            sendMessage();
        }
    });
    
    // 自动调整文本区域高度
    messageInput.addEventListener('input', () => {
        messageInput.style.height = 'auto';
        messageInput.style.height = (messageInput.scrollHeight) + 'px';
    });
});

// 发送消息函数
function sendMessage() {
    const message = messageInput.value.trim();
    if (message) {
        // 添加用户消息到聊天
        addUserMessage(message);
        
        // 清空输入框并重置高度
        messageInput.value = '';
        messageInput.style.height = 'auto';
        
        // 模拟机器人回复（在实际应用中，这里会调用API）
        setTimeout(() => {
            // 这里只是一个简单的演示回复
            const botResponses = [
                '感谢您的咨询，我们的快递服务覆盖全球200多个国家和地区。',
                '您的包裹正在运送途中，预计将在2-3个工作日内送达。',
                '关于国际快递的费用，建议您访问我们的官方网站获取最新价格。',
                '如需查询包裹状态，请提供您的追踪号码。',
                '我们的工作时间是周一至周五，上午9点至下午6点。'
            ];
            
            // 随机选择一个回复
            const randomResponse = botResponses[Math.floor(Math.random() * botResponses.length)];
            addBotMessage(randomResponse);
        }, 1000);
    }
}

// 添加用户消息到聊天
function addUserMessage(message) {
    const messageElement = createMessageElement(message, 'user-message');
    chatMessages.appendChild(messageElement);
    scrollToBottom();
}

// 添加机器人消息到聊天
function addBotMessage(message) {
    const messageElement = createMessageElement(message, 'bot-message');
    chatMessages.appendChild(messageElement);
    scrollToBottom();
}

// 创建消息元素
function createMessageElement(message, className) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${className}`;
    
    const contentDiv = document.createElement('div');
    contentDiv.className = 'message-content';
    contentDiv.textContent = message;
    
    const timeDiv = document.createElement('div');
    timeDiv.className = 'message-time';
    timeDiv.textContent = getCurrentTime();
    
    messageDiv.appendChild(contentDiv);
    messageDiv.appendChild(timeDiv);
    
    return messageDiv;
}

// 获取当前时间
function getCurrentTime() {
    const now = new Date();
    return `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;
}

// 滚动到底部
function scrollToBottom() {
    chatMessages.scrollTop = chatMessages.scrollHeight;
}