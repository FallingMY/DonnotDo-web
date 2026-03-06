# Don't Do It Challenge

一个基于 React + Vite + Tailwind CSS 的派对游戏，玩家需要在游戏过程中避免做出指定的动作或说出特定的词语。

## 🎮 游戏规则

- 游戏开始后，屏幕会显示一个"禁止动作"
- 玩家需要在游戏过程中**避免**做出该动作或说出该词语
- 如果成功避免 → 点击 **✓ Success**（不计分）
- 如果失败做了 → 点击 **✗ Fail (+1)**（增加 1 分惩罚）
- **分数越低越好**，0 分为完美通关

## ✨ 特性

### 核心功能
- 🎯 **252 道题库**：涵盖日常、专业、兴趣三大类别
- 🎲 **随机打乱**：每次游戏题目顺序随机
- 📊 **实时计分**：失败计分系统，分数越低越好
- ⏮️ **撤销功能**：支持撤销上一步操作
- 💾 **自动保存**：游戏进度自动保存到 localStorage

### 视觉设计
- 🏭 **工业风格**：包豪斯美学，无圆角、硬边阴影
- 🎨 **单色配色**：黑灰色系 + 黄色强调色
- 📱 **移动优先**：完美适配手机、平板、桌面端
- ⚡ **乱码动画**：题目显示时的赛博朋克风格解锁动画（800ms，10 FPS）

### 题库管理
- ➕ **添加题目**：支持自定义题目
- ✏️ **编辑题目**：可编辑自定义题目
- 🗑️ **删除题目**：可删除自定义题目
- 🔄 **重置题库**：一键恢复默认 252 题
- 🎲 **随机排序**：打乱题目顺序

## 🚀 快速开始

### 安装依赖
```bash
npm install
```

### 启动开发服务器
```bash
npm run dev
```

### 构建生产版本
```bash
npm run build
```

### 预览生产版本
```bash
npm preview
```

## 📁 项目结构

```
DonnotDo-web/
├── src/
│   ├── components/          # React 组件
│   │   ├── ActionControls.jsx    # 游戏控制按钮
│   │   ├── ConfigPanel.jsx       # 配置面板
│   │   ├── CornerBorders.jsx     # 装饰性边框
│   │   ├── EndScreen.jsx         # 结束界面
│   │   ├── IndustrialButton.jsx  # 工业风格按钮
│   │   ├── ModuleCard.jsx        # 模块卡片容器
│   │   ├── ScoreBoard.jsx        # 计分板
│   │   └── TargetMonitor.jsx     # 题目显示器
│   ├── constants/           # 常量配置
│   │   └── defaultQuestions.js   # 默认题库（252 题）
│   ├── hooks/               # 自定义 Hooks
│   │   ├── useGameEngine.js      # 游戏状态管理
│   │   └── useScrambleText.js    # 文字乱码动画
│   ├── App.jsx              # 主应用组件
│   ├── main.jsx             # 应用入口
│   └── index.css            # 全局样式
├── doc/                     # 文档
│   ├── questionBankV1.json  # 题库 JSON 源文件
│   └── Dev-instruction.md   # 开发指南
├── index.html               # HTML 模板
├── tailwind.config.js       # Tailwind 配置
└── package.json             # 项目配置
```

## 🎨 设计规范

### 颜色系统
```javascript
{
  bg: '#0D0D0D',           // 背景色
  surface: '#1A1A1A',      // 表面色
  border: '#333333',       // 边框色
  'text-primary': '#FFFFFF',   // 主文本
  'text-secondary': '#A0A0A0', // 次要文本
  accent: '#F5D300'        // 强调色（黄色）
}
```

### 字体系统
- **等宽字体**：JetBrains Mono, IBM Plex Mono
- **无衬线字体**：Inter, PingFang SC

### 设计原则
- ❌ 禁止使用圆角（`border-radius: 0`）
- ⚡ 禁止平滑过渡（`transition-none`）
- 📐 硬边阴影（`drop-shadow(4px 4px 0px rgba(0,0,0,0.5))`）
- 🎯 高对比度配色

## 📊 题库分类

### 日常类（150 题��
涵盖日常对话、习惯动作、口头禅等

### 专业类（50 题）
编程、开发、技术相关话题

### 兴趣类（52 题）
游戏、AI、设计等兴趣话题

## 🛠️ 技术栈

- **框架**：React 19.2.0
- **构建工具**：Vite 7.3.1
- **样式**：Tailwind CSS 3.4.19
- **状态管理**：React Hooks + localStorage
- **动画**：自定义 JavaScript 动画

## 📱 移动端优化

- ✅ 禁用缩放（`maximum-scale=1.0, user-scalable=no`）
- ✅ 禁用文本选择（全局 `select-none`）
- ✅ 触摸友好按钮（最小 44px 高度）
- ✅ 安全区域适配（iOS 刘海屏/Home Indicator）
- ✅ 响应式字体（2xl → 6xl）

## 🎯 游戏流程

1. **配置阶段**
   - 设置游戏轮数（默认 10 轮）
   - 查看/编辑题库
   - 点击 "START GAME" 开始

2. **游戏阶段**
   - 题目以乱码动画形式显示
   - 玩家尝试避免做出禁止动作
   - 点击 Success（成功避免）或 Fail（失败做了）
   - 自动跳转下一题

3. **结束阶段**
   - 显示最终得分
   - 显示成功率
   - 可选择重新开始

## 💾 数据持久化

游戏状态自动保存到 `localStorage`：
- 键名：`ddi_game_state`
- 包含：游戏状态、当前轮次、分数、题库、历史记录
- 刷新页面后自动恢复

## 🔧 开发指南

### 添加新题目
编辑 `src/constants/defaultQuestions.js`：
```javascript
{
  id: 253,
  content: "你的题目内容",
  category: "日常" // 或 "专业"、"兴趣"
}
```

### 修改游戏配置
编辑 `src/hooks/useGameEngine.js` 中的 `initialState`

### 自定义样式
编辑 `tailwind.config.js` 或 `src/index.css`

## 📄 License

MIT License

## 👥 贡献

欢迎提交 Issue 和 Pull Request！

---

**Enjoy the game! 🎮**

Coded by Claude