# HatHat — 免费在线多语言打字练习

> 支持维吾尔语、汉语拼音、五笔、英文的在线打字练习平台

线上地址：[aptori.xin](https://aptori.xin)

---

## 功能特性

- 四种打字模式：维吾尔语 / 拼音 / 五笔 / 英文
- 实时统计 WPM 速度和准确率
- 虚拟键盘高亮提示下一个应按的键
- 三种内容难度：单词 / 句子 / 文章
- 三语界面切换：中文 / English / ئۇيغۇرچە
- 独立路由，SEO 友好（每种模式有独立页面）
- 响应式设计，支持桌面和移动端

---

## 快速开始

**环境要求：** Node.js 18+，npm 9+

```bash
# 1. 克隆项目
git clone https://github.com/your-username/aptori.git
cd aptori/frontend

# 2. 安装依赖
npm install

# 3. 启动开发服务器
npm run dev
```

浏览器访问 [http://localhost:5173](http://localhost:5173)

---

## 可用命令

在 `frontend/` 目录下执行：

| 命令 | 说明 |
|------|------|
| `npm run dev` | 启动开发服务器（热更新） |
| `npm run build` | 构建生产版本（输出到 `dist/`） |
| `npm run preview` | 本地预览生产构建结果 |
| `npm run lint` | 运行 ESLint 代码检查 |
| `npm run test` | 运行 Vitest 测试 |

---

## 项目结构

```
aptori/
├── frontend/
│   ├── public/
│   │   ├── sitemap.xml          # 站点地图（SEO）
│   │   └── robots.txt           # 爬虫配置
│   └── src/
│       ├── components/
│       │   ├── keyboards/
│       │   │   ├── VirtualKeyboard.tsx     # 通用虚拟键盘组件
│       │   │   └── layouts/
│       │   │       ├── uyghurLayout.ts     # 维吾尔语键盘布局
│       │   │       ├── qwertyLayout.ts     # 标准 QWERTY（英文/拼音）
│       │   │       └── wubiLayout.ts       # 五笔字根键盘布局
│       │   ├── HomePage.tsx                # 首页（模式选择）
│       │   ├── TypingPage.tsx              # 练习页包装器
│       │   ├── TypingPractice.tsx          # 核心打字逻辑组件
│       │   ├── LanguageSwitcher.tsx        # 语言切换器
│       │   └── AdSlot.tsx                  # 广告位占位组件
│       ├── config/
│       │   └── modes.ts                    # 四种打字模式配置注册中心
│       ├── data/
│       │   ├── words.ts / sentences.ts / articles.ts   # 维吾尔语数据
│       │   ├── english/                    # 英文练习数据
│       │   ├── pinyin/                     # 拼音练习数据
│       │   └── wubi/                       # 五笔练习数据
│       ├── i18n/
│       │   ├── index.ts                    # i18next 初始化
│       │   └── locales/
│       │       ├── zh.json                 # 中文翻译
│       │       ├── en.json                 # 英文翻译
│       │       └── ug.json                 # 维吾尔语翻译
│       ├── services/
│       │   ├── keyboardHint.ts             # 各模式键盘高亮算法
│       │   └── activeChar.ts               # 当前应输入字符计算
│       ├── types.ts                        # TypeScript 类型定义
│       ├── utils.ts                        # 工具函数
│       ├── App.tsx                         # 路由配置
│       └── main.tsx                        # 应用入口
├── scripts/                                # 构建/部署脚本
├── docker-compose.yml
└── PLAN.md                                 # 产品与技术设计方案
```

---

## 路由说明

| 路径 | 内容 |
|------|------|
| `/` | 首页，展示四种模式入口 |
| `/uyghur` | 维吾尔语打字练习 |
| `/pinyin` | 汉语拼音打字练习 |
| `/wubi` | 五笔打字练习 |
| `/english` | 英文打字练习 |

---

## 添加新的打字模式

1. 在 `src/data/<mode>/` 下创建 `words.ts`、`sentences.ts`、`articles.ts`、`typingData.ts`
2. 在 `src/components/keyboards/layouts/` 下添加键盘布局文件
3. 在 `src/services/keyboardHint.ts` 中添加对应的提示算法类并注册
4. 在 `src/config/modes.ts` 的 `MODES` 对象中新增配置项
5. 在 `src/i18n/locales/*.json` 中补充翻译文案

---

## 五笔模式说明

五笔练习采用**编码输入模式**（参考金山打字通）：页面显示汉字，用户输入对应的五笔编码（拉丁字母序列）。这种方式无需实现完整 IME，适合针对五笔字根和编码规则的专项练习。

---

## 部署

### 阿里云自动部署（当前方案）

推送到 `main` 分支，GitHub Actions 自动构建并通过 rsync 部署到阿里云服务器。

**首次配置步骤：**

1. 服务器安装 Nginx，网站根目录设为 `/var/www/hathat`
2. 参考 `scripts/nginx.conf` 配置 Nginx
3. 生成部署专用 SSH 密钥，公钥加入服务器 `~/.ssh/authorized_keys`
4. 在 GitHub 仓库 → Settings → Secrets 中添加：
   - `DEPLOY_HOST`：服务器 IP 或域名
   - `DEPLOY_USER`：SSH 用户名（如 `root`）
   - `DEPLOY_SSH_KEY`：SSH 私钥内容

配置完成后，每次 `git push main` 即自动部署，无需手动操作。

### 手动构建

```bash
cd frontend
npm run build
# dist/ 目录即为产物，可上传到任意静态托管服务
```

---

## 技术栈

| 技术 | 用途 |
|------|------|
| React 18 | UI 框架 |
| TypeScript | 类型安全 |
| Vite 5 | 构建工具 |
| React Router 6 | 多路由导航 |
| Ant Design 5 | UI 组件库 |
| react-i18next | 国际化（中/英/维） |

---

## 许可证

MIT License
