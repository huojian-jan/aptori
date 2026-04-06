# HatHat 多语言打字练习平台 — 产品与技术方案

> 目标：将现有维吾尔语打字练习扩展为支持维吾尔语 / 汉语拼音 / 五笔 / 英文的多语言打字平台，接入 Google Ads 实现商业化。

---

## 一、产品定位

| 维度 | 说明 |
|------|------|
| 核心价值 | 免费、无需注册、打开即练的在线打字练习工具 |
| 目标用户 | 学生、办公人员、输入法初学者（覆盖维、汉、英三大语种人群） |
| 商业模式 | Google AdSense 广告收入（非侵入式广告位） |
| 竞品参考 | typing.com、monkeytype.com、金山打字通在线版 |
| 差异化 | 唯一同时支持维吾尔语 + 拼音 + 五笔 + 英文的打字平台 |

---

## 二、信息架构与路由

```
hathat.app (或 aptori.xin)
│
├── /                    首页（模式选择 + SEO 内容）
├── /uyghur              维吾尔语打字练习
├── /pinyin              汉语拼音打字练习
├── /wubi                五笔打字练习
├── /english             英文打字练习
└── /about               关于页面（可选，增加页面深度利于 SEO）
```

每种模式独立路由，对搜索引擎友好，便于用户直接通过搜索进入对应练习页。

---

## 三、国际化方案（i18n）

### 3.1 支持语言

| 语言 | 代码 | 文字方向 | 说明 |
|------|------|---------|------|
| 中文（简体） | zh | LTR | 默认语言，覆盖最大用户群 |
| 维吾尔语 | ug | RTL | 核心特色语言 |
| English | en | LTR | 国际用户 |

### 3.2 实现方式

- 使用 `react-i18next` + `i18next` 轻量国际化方案
- 翻译文件按语言组织：`src/i18n/locales/{zh,ug,en}.json`
- URL 不含语言前缀（避免 `/zh/pinyin` 这种复杂结构），语言通过浏览器偏好自动检测 + 手动切换
- 语言偏好存入 `localStorage`，下次访问自动恢复
- 语言切换器放在页面右上角，使用国旗/语言名下拉菜单

### 3.3 需翻译的文本范围

```
- 导航栏：首页、关于
- 首页：标题、副标题、模式卡片标题与描述、SEO 文案
- 练习页：单词/句子/文章、显示键盘、换一批、Tab 键提示
- 统计：速度、准确率、用时
- 页脚：版权信息
- Meta：title、description（每种语言每种模式独立）
```

---

## 四、UI/UX 设计方案

### 4.1 整体风格

**设计关键词**：清爽、简洁、专注、现代

- **色彩**：以白色为主背景，蓝色 (#3b82f6) 为品牌主色，搭配浅灰 (#f8fafc) 区分层级
- **字体**：英文/拼音用 Inter，中文用系统默认，维吾尔语用 Noto Sans Arabic
- **圆角**：大圆角 (12-20px) 营造柔和感
- **阴影**：极浅阴影，避免厚重感
- **间距**：充裕的留白，内容不拥挤
- **动效**：仅用于页面过渡和交互反馈，不做多余动画

### 4.2 首页布局

```
┌─────────────────────────────────────────────────┐
│  Logo(HatHat)          [语言切换 🌐]            │  ← 顶部导航栏（简洁，只有 logo + 语言切换）
├─────────────────────────────────────────────────┤
│                                                 │
│         在线打字练习，提升你的输入速度             │  ← 主标题 (h1)
│         免费 · 无需注册 · 打开即练               │  ← 副标题
│                                                 │
│  ┌───────────┐  ┌───────────┐                   │
│  │ 🔤        │  │ 🔤        │                   │
│  │ 维吾尔语   │  │ 拼音打字   │                   │  ← 模式选择卡片
│  │ 打字练习   │  │           │                   │     2x2 网格
│  │           │  │           │                   │     hover 有轻微上浮 + 阴影
│  └───────────┘  └───────────┘                   │     每张卡片包含：
│  ┌───────────┐  ┌───────────┐                   │       - 图标
│  │ 🔤        │  │ 🔤        │                   │       - 标题
│  │ 五笔打字   │  │ 英文打字   │                   │       - 一句话描述
│  │           │  │           │                   │       - 整张卡片可点击
│  └───────────┘  └───────────┘                   │
│                                                 │
│  ─────── 广告位 (728x90 横幅) ───────            │  ← 首页底部广告位
│                                                 │
│  ┌─ SEO 文案区 ────────────────────┐            │
│  │ 为什么选择 HatHat？              │            │  ← 对搜索引擎有价值的内容
│  │ · 支持多种语言打字练习            │            │     h2 标题 + 描述段落
│  │ · 实时显示打字速度和准确率         │            │     包含目标关键词
│  │ · 虚拟键盘辅助学习               │            │
│  │ · 完全免费，无需注册              │            │
│  └──────────────────────────────────┘            │
│                                                 │
│  ── 页脚：版权 · 联系 · 隐私政策 ──              │  ← 简洁页脚
└─────────────────────────────────────────────────┘
```

### 4.3 练习页布局

```
┌─────────────────────────────────────────────────┐
│  ← 返回   HatHat · 拼音打字练习   [语言 🌐]     │  ← 顶部栏：返回按钮 + 模式名称 + 语言切换
├─────────────────────────────────────────────────┤
│  [单词] [句子] [文章]    显示键盘 ○   🔄 换一批   │  ← 功能栏：分类切换 + 键盘开关 + 刷新
├─────────────────────────────────────────────────┤
│                                                 │
│  ┌─ 虚拟键盘 ─────────────────────────────┐     │  ← 键盘区（可折叠）
│  │  Q  W  E  R  T  Y  U  I  O  P        │     │     高亮下一个应按的键
│  │   A  S  D  F  G  H  J  K  L          │     │     维吾尔语：显示双字符
│  │    Z  X  C  V  B  N  M               │     │     五笔：显示字根
│  └────────────────────────────────────────┘     │     英文/拼音：标准 QWERTY
│                                                 │
│  ┌─ 目标文本 ─────────────────────────────┐     │  ← 目标文本区
│  │  the quick brown fox jumps over        │     │     绿色=正确 红色=错误
│  │  the lazy dog                          │     │     蓝色下划线=当前位置
│  └────────────────────────────────────────┘     │     灰色=待输入
│                                                 │
│  ┌─ 输入区 ──────────────────────────────┐      │  ← 输入区
│  │  the quick brown fox_                  │      │     自动聚焦
│  └────────────────────────────────────────┘      │     输入完成后 0.8s 自动下一题
│                                                 │
│  ─── 广告位 (728x90) ───                        │  ← 练习页底部广告位
│                                                 │
│  速度: 45 WPM  准确率: 96%  [Tab 换一题]         │  ← 状态栏（实时统计）
└─────────────────────────────────────────────────┘
```

### 4.4 交互设计要点

| 交互 | 设计 |
|------|------|
| 打开即练 | 进入练习页自动聚焦输入框，无需点击即可开始 |
| Tab 换题 | 随时按 Tab 跳过当前内容，切换新题目 |
| 自动下一题 | 完成后 0.8s 自动加载下一题，不打断节奏 |
| 键盘提示 | 虚拟键盘高亮下一个应按的键，降低学习门槛 |
| 键盘折叠 | 熟练用户可隐藏键盘，获得更大练习空间 |
| 模式切换 | 顶部分类标签（单词/句子/文章）一键切换，无需跳转 |
| 语言切换 | 右上角下拉菜单，切换即时生效，不刷新页面 |
| 返回首页 | 左上角返回箭头，随时回到模式选择页 |
| 移动端适配 | 键盘自动隐藏，布局自适应，触控友好 |

### 4.5 响应式断点

| 断点 | 布局调整 |
|------|---------|
| >= 1024px（桌面） | 标准布局，键盘 + 练习区上下排列 |
| 768-1023px（平板） | 首页卡片改为 2x2，键盘略收窄 |
| < 768px（手机） | 首页卡片改为单列，默认隐藏虚拟键盘，字体缩小 |

---

## 五、SEO 优化策略

### 5.1 技术 SEO

| 项目 | 实现方式 |
|------|---------|
| 语义化 HTML | 首页用 `<main>`, `<section>`, `<h1>`-`<h3>` 结构化 |
| 页面标题 | 每个路由独立 title，格式: `{模式名}打字练习 - HatHat在线打字` |
| Meta Description | 每个路由独立描述，含核心关键词 |
| Canonical URL | 每个页面设置 canonical，避免重复内容 |
| Open Graph | 支持社交媒体分享预览（og:title, og:description, og:image） |
| Sitemap | 自动生成 sitemap.xml，包含所有路由 |
| robots.txt | 允许所有页面被抓取 |
| 结构化数据 | JSON-LD 标记 WebApplication schema |

### 5.2 目标关键词

```
高价值关键词（中文）:
- 在线打字练习
- 拼音打字练习
- 五笔打字练习
- 英文打字练习
- 打字速度测试
- 维吾尔语打字

高价值关键词（英文）:
- typing practice online
- english typing test
- typing speed test

高价值关键词（维吾尔语）:
- ئويغۇرچە يېزىش مەشىقى
```

### 5.3 内容 SEO

- 首页 h1: "在线打字练习 - 提升你的输入速度"
- 每种模式页有独立的 SEO 文案段落（在页面底部或折叠区域）
- 首页底部设置"常见问题"FAQ 区块（利于搜索引擎摘要）

### 5.4 页面标题规划

| 路由 | 中文标题 | English Title |
|------|---------|---------------|
| `/` | HatHat - 免费在线打字练习 | HatHat - Free Online Typing Practice |
| `/uyghur` | 维吾尔语打字练习 - HatHat | Uyghur Typing Practice - HatHat |
| `/pinyin` | 拼音打字练习 - HatHat | Pinyin Typing Practice - HatHat |
| `/wubi` | 五笔打字练习 - HatHat | Wubi Typing Practice - HatHat |
| `/english` | 英文打字练习 - HatHat | English Typing Practice - HatHat |

---

## 六、Google Ads 广告位规划

### 6.1 广告位策略

原则：**不影响打字体验**，广告位放在用户视线不聚焦的区域。

| 位置 | 尺寸 | 类型 | 说明 |
|------|------|------|------|
| 首页卡片下方 | 728x90 | 横幅广告 | 首页流量大，展示率高 |
| 练习页底部 | 728x90 | 横幅广告 | 输入区下方，不干扰打字 |
| 练习页右侧栏 | 300x250 | 矩形广告 | 仅桌面端，宽屏时显示 |
| 移动端练习页底部 | 320x50 | 移动横幅 | 固定底部，不遮挡内容 |

### 6.2 实现方式

- 预留 `<div className="ad-slot ad-slot-{position}">` 占位
- 广告加载脚本通过 `useEffect` 异步插入，不阻塞首屏渲染
- 开发阶段用灰色占位块标注"AD"，上线后替换为 AdSense 代码

---

## 七、技术实现方案

### 7.1 技术栈

| 技术 | 用途 | 选型理由 |
|------|------|---------|
| React 18 | UI 框架 | 现有选型，不变 |
| TypeScript | 类型安全 | 现有选型，不变 |
| Vite | 构建工具 | 现有选型，不变 |
| React Router 6 | 路由 | 现有选型，扩展多路由 |
| Ant Design 5 | UI 组件库 | 现有选型，不变 |
| react-i18next | 国际化 | 轻量、生态完善、支持懒加载 |

### 7.2 核心架构

```
TypingModeConfig（模式配置）
├── id: InputMethod
├── label / description（i18n key）
├── route: string
├── direction: 'rtl' | 'ltr'
├── placeholder: string (i18n key)
├── fontFamily: string
├── getData(category) → string[]
└── keyboardLayout: KeyDefinition[][]

KeyboardHintAlgorithm（键盘提示接口）
├── UyghurKeyboardHint
├── EnglishKeyboardHint（= PinyinKeyboardHint）
└── WubiKeyboardHint
```

### 7.3 目录结构（最终）

```
frontend/src/
├── components/
│   ├── HomePage.tsx              # 重写：模式选择首页
│   ├── TypingPage.tsx            # 新建：练习页包装器
│   ├── TypingPractice.tsx        # 重构：接受 mode 配置
│   ├── LanguageSwitcher.tsx      # 新建：语言切换下拉
│   ├── AdSlot.tsx                # 新建：广告位组件
│   ├── SEOHead.tsx               # 新建：动态 title/meta
│   └── keyboards/
│       ├── VirtualKeyboard.tsx   # 新建：通用键盘组件
│       └── layouts/
│           ├── uyghurLayout.ts   # 抽取自 UyghurKeyboard
│           ├── qwertyLayout.ts   # 英文 & 拼音共用
│           └── wubiLayout.ts     # QWERTY + 字根标注
├── config/
│   └── modes.ts                  # 新建：模式注册中心
├── i18n/
│   ├── index.ts                  # i18next 初始化
│   └── locales/
│       ├── zh.json               # 中文翻译
│       ├── en.json               # 英文翻译
│       └── ug.json               # 维吾尔语翻译
├── data/
│   ├── words.ts                  # 现有维吾尔语
│   ├── sentences.ts
│   ├── articles.ts
│   ├── typingData.ts
│   ├── english/
│   │   ├── words.ts
│   │   ├── sentences.ts
│   │   ├── articles.ts
│   │   └── typingData.ts
│   ├── pinyin/
│   │   ├── words.ts
│   │   ├── sentences.ts
│   │   ├── articles.ts
│   │   └── typingData.ts
│   └── wubi/
│       ├── words.ts
│       ├── sentences.ts
│       ├── articles.ts
│       ├── typingData.ts
│       └── wubiDict.ts
├── services/
│   ├── keyboardHint.ts           # 重构：多算法注册表
│   └── activeChar.ts             # 不变
├── types.ts                      # 扩展：新增模式相关类型
├── utils.ts                      # 重构：getRandomText 接受模式
├── App.tsx                       # 重构：多路由
├── main.tsx                      # 微调：引入 i18n
└── index.css                     # 扩展：LTR + 首页 + 响应式
```

### 7.4 实施阶段

#### Phase 1：基础设施（i18n + 类型 + 配置）
1. 安装 `react-i18next` 和 `i18next`
2. 创建 `src/i18n/` 目录，初始化 i18n 配置
3. 编写三语翻译文件 (`zh.json`, `en.json`, `ug.json`)
4. 扩展 `src/types.ts`（InputMethod, TextDirection, TypingModeConfig）
5. 创建 `src/config/modes.ts` 模式注册

#### Phase 2：键盘抽象
6. 抽取维吾尔语布局到 `keyboards/layouts/uyghurLayout.ts`
7. 创建 QWERTY 布局 `keyboards/layouts/qwertyLayout.ts`
8. 创建五笔布局 `keyboards/layouts/wubiLayout.ts`
9. 构建通用 `keyboards/VirtualKeyboard.tsx`
10. 重构 `services/keyboardHint.ts` 为多算法注册表

#### Phase 3：练习数据
11. 创建英文数据 (`data/english/`)
12. 创建拼音数据 (`data/pinyin/`)
13. 创建五笔数据 (`data/wubi/`) + 字典
14. 重构 `utils.ts` 中的 `getRandomText`

#### Phase 4：UI 整合
15. 创建 `LanguageSwitcher.tsx`
16. 创建 `SEOHead.tsx`（动态 title/meta）
17. 创建 `AdSlot.tsx` 广告位组件
18. 重构 `TypingPractice.tsx` — 接受 mode 配置，LTR/RTL 适配
19. 创建 `TypingPage.tsx` — 练习页包装器
20. 重写 `HomePage.tsx` — 模式选择首页
21. 更新 `App.tsx` — 多路由
22. 更新 `index.css` — LTR 样式 + 首页 + 响应式

#### Phase 5：SEO 与收尾
23. 配置每个路由的 title 和 meta
24. 生成 sitemap.xml
25. 添加 robots.txt
26. 添加 JSON-LD 结构化数据
27. 广告位占位
28. 全面测试

### 7.5 五笔模式特殊说明

采用**编码练习模式**（金山打字通风格）：

- 目标文本显示：汉字 + 对应五笔编码
- 用户输入：五笔编码（拉丁字母）
- 比较逻辑：与英文模式相同，逐字符匹配编码
- 键盘显示：QWERTY 布局 + 每个键上标注五笔字根

这避免了实现完整输入法引擎的复杂度，同时是被验证有效的五笔练习方式。

---

## 八、验证清单

- [ ] 首页显示 4 种模式卡片，点击跳转正确
- [ ] 每种模式的打字功能正常（输入、比较、统计、自动切换）
- [ ] 维吾尔语 RTL 模式未受影响
- [ ] 英文/拼音 LTR 模式工作正常
- [ ] 五笔编码输入和字根键盘显示正常
- [ ] 虚拟键盘高亮提示在所有模式下准确
- [ ] 三种语言（中/维/英）切换流畅，所有文本正确翻译
- [ ] 语言偏好持久化到 localStorage
- [ ] 每个路由的 document.title 和 meta description 正确
- [ ] 广告位占位显示正常，不影响打字体验
- [ ] 响应式布局在桌面/平板/手机三种尺寸下正常
- [ ] `npm run build` 无 TypeScript 错误
- [ ] Lighthouse SEO 评分 >= 90
