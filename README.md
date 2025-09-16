<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# Run and deploy your AI Studio app

This contains everything you need to run your app locally.

View your app in AI Studio: https://ai.studio/apps/drive/1FowsyRjJX0TdCMH8dmk8wgvbgL0gdl04

## 🆕 新功能：用户自定义 API Key

现在用户可以在应用中直接输入自己的 Gemini API Key，无需依赖环境变量配置！

### 特性
- 🔑 **安全存储**：API Key 安全存储在浏览器本地
- 🎨 **友好界面**：折叠式设计，支持显示/隐藏切换
- 🌐 **多语言**：完整的中英文支持
- ✅ **格式验证**：自动验证 API Key 格式
- 🔗 **快速获取**：直接链接到 Google AI Studio

### 使用方法
1. 访问 [Google AI Studio](https://aistudio.google.com/app/apikey) 获取免费 API Key
2. 在应用首页点击 "API Key 设置" 区域
3. 输入您的 API Key 并保存
4. 开始使用 AI 图像编辑功能

## Run Locally

**Prerequisites:**  Node.js

### 方式一：使用用户自定义 API Key（推荐）
1. Install dependencies:
   `npm install`
2. Run the app:
   `npm run dev`
3. 在应用中设置您的 Gemini API Key

### 方式二：使用环境变量（传统方式）
1. Install dependencies:
   `npm install`
2. Set the `GEMINI_API_KEY` in [.env.local](.env.local) to your Gemini API key
3. Run the app:
   `npm run dev`
