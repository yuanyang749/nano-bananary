<div align="center">
<img width="1200" height="475" alt="Nano Bananary AI Image Editor" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />

# 🍌 Nano Bananary | AI 图像编辑器

<p align="center">
  <strong>基于 Google Gemini AI 的智能图像变换平台</strong>
</p>

<p align="center">
  <a href="https://nano.520ai.xin/" target="_blank">🌐 在线体验</a> •
  <a href="#快速开始">🚀 快速开始</a> •
  <a href="#功能特性">✨ 功能特性</a> •
  <a href="#技术架构">🏗️ 技术架构</a>
</p>

</div>

---

## 📖 项目简介

**Nano Bananary** 是一款现代化的 AI 驱动图像编辑器，集成了 Google Gemini 的强大视觉理解能力，为用户提供直观、高效的图像变换体验。通过简单的操作界面，用户可以实现复杂的图像编辑效果，从艺术风格转换到创意内容生成，一切尽在掌控。

### 🎯 核心价值主张

- **🤖 AI 驱动**：基于 Google Gemini 先进的多模态 AI 技术
- **🎨 创意无限**：20+ 种预设变换效果，支持自定义创意提示
- **🔧 即开即用**：无需复杂配置，支持用户自定义 API Key
- **🌍 全球化**：完整的中英文双语支持
- **📱 响应式**：完美适配桌面端和移动端设备
- **🔒 隐私安全**：本地存储，数据安全可控

## 🌐 在线访问

**官方地址**：[https://nano.520ai.xin/](https://nano.520ai.xin/)

立即访问，开始您的 AI 图像创作之旅！

## ✨ 功能特性

### 🎨 智能图像变换
- **多样化效果**：艺术风格、3D 模型、创意滤镜等 20+ 种变换
- **自定义提示**：支持自然语言描述，实现个性化编辑
- **批量处理**：支持多图像输入和批量变换
- **实时预览**：即时查看变换效果，快速迭代优化

### 🔧 用户体验优化
- **API Key 管理**：用户可自定义 Gemini API Key，享受专属配额
- **历史记录**：完整的生成历史追踪，支持复用和下载
- **响应式设计**：移动端优化布局，触控友好
- **多语言支持**：中英文界面无缝切换

### 🛡️ 安全与隐私
- **本地存储**：API Key 和用户数据仅存储在浏览器本地
- **隐私保护**：不上传用户数据到第三方服务器
- **安全传输**：所有 API 通信采用 HTTPS 加密

## 🏗️ 技术架构

### 前端技术栈
```
React 19.1.1          # 最新版本 React 框架
TypeScript 5.8.2      # 类型安全的 JavaScript
Vite 6.2.0            # 现代化构建工具
Tailwind CSS          # 原子化 CSS 框架
```

### AI 集成
```
@google/genai 1.17.0  # Google Gemini AI SDK
多模态处理             # 图像理解与生成
实时 API 调用          # 高效的 AI 服务集成
```

### 项目结构
```
nano-bananary/
├── components/          # UI 组件库 (13个组件)
│   ├── ApiKeySettings.tsx      # API Key 管理
│   ├── ImageUploader.tsx       # 图像上传
│   ├── TransformationSelector.tsx  # 变换选择器
│   └── ...
├── services/           # 业务服务层
│   └── geminiService.ts        # Gemini AI 集成
├── utils/              # 工具函数库
├── i18n/               # 国际化配置
├── docs/               # 项目文档
└── types.ts           # TypeScript 类型定义
```

## 🚀 快速开始

### 环境要求
- **Node.js** >= 16.0.0
- **npm** >= 8.0.0

### 安装步骤

1. **克隆项目**
   ```bash
   git clone https://github.com/yuanyang749/nano-bananary.git
   cd nano-bananary
   ```

2. **安装依赖**
   ```bash
   npm install
   ```

3. **启动开发服务器**
   ```bash
   npm run dev
   ```

4. **访问应用**
   ```
   http://localhost:5173
   ```

### 🔑 API Key 配置

#### 方式一：用户界面配置（推荐）
1. 访问 [Google AI Studio](https://aistudio.google.com/app/apikey) 获取免费 API Key
2. 在应用首页点击 "API Key 设置" 区域
3. 输入您的 API Key 并保存
4. 开始使用 AI 图像编辑功能

#### 方式二：环境变量配置
1. 复制 `.env.local.example` 为 `.env.local`
2. 设置 `GEMINI_API_KEY` 为您的 Gemini API Key
3. 重启开发服务器

## 🔧 API Key 自定义功能

### 功能特点
- **🔐 安全存储**：API Key 仅存储在浏览器本地，不会上传到服务器
- **🎨 友好界面**：折叠式设计，支持显示/隐藏切换
- **🌐 多语言支持**：完整的中英文界面
- **✅ 智能验证**：自动验证 API Key 有效性
- **🔗 快速获取**：直接链接到 Google AI Studio

### 使用优势
- **更高配额**：使用个人 API 配额，避免共享限制
- **更稳定服务**：独立的 API 调用，不受其他用户影响
- **完全控制**：随时更换或清除 API Key
- **成本透明**：直接管理自己的 API 使用成本

## 🛠️ 开发指南

### 构建生产版本
```bash
npm run build
```

### 预览生产版本
```bash
npm run preview
```

### 代码规范
- 使用 TypeScript 进行类型检查
- 遵循 React 最佳实践
- 组件化开发，职责单一
- 响应式设计优先

## 📁 项目结构详解

```
nano-bananary/
├── 📁 components/              # React 组件
│   ├── 🔑 ApiKeySettings.tsx   # API Key 管理组件
│   ├── 🖼️ ImageUploader.tsx    # 图像上传组件
│   ├── 🎨 TransformationSelector.tsx  # 变换选择器
│   ├── 📱 LanguageSwitcher.tsx # 语言切换器
│   └── ...                     # 其他 UI 组件
├── 📁 services/               # 业务逻辑层
│   └── 🤖 geminiService.ts    # Gemini AI 服务集成
├── 📁 utils/                  # 工具函数
│   └── 📄 fileUtils.ts        # 文件处理工具
├── 📁 i18n/                   # 国际化
│   ├── 🌐 index.tsx           # i18n 配置
│   └── 📁 locales/            # 语言包
├── 📁 docs/                   # 项目文档
├── 🎯 constants.ts            # 常量定义
├── 📝 types.ts                # TypeScript 类型
└── 🚀 App.tsx                 # 主应用组件
```

## 🤝 贡献指南

我们欢迎所有形式的贡献！无论是 Bug 报告、功能建议还是代码贡献。

### 如何贡献
1. Fork 本项目
2. 创建您的特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交您的更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 打开一个 Pull Request

### 开发规范
- 遵循现有的代码风格
- 添加适当的注释和文档
- 确保所有测试通过
- 更新相关文档

## 📄 许可证

本项目采用 MIT 许可证 - 查看 [LICENSE](LICENSE) 文件了解详情。

## 📞 联系我们

- **项目地址**：[https://nano.520ai.xin/](https://nano.520ai.xin/)
- **问题反馈**：通过 GitHub Issues 提交
- **功能建议**：欢迎通过 Issues 或 Discussions 提出

---

<div align="center">
  <p>🍌 <strong>Nano Bananary</strong> - 让 AI 图像编辑变得简单而有趣</p>
  <p>Made with ❤️ by the Nano Bananary Team</p>
</div>
