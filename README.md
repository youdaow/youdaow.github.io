# 个人网站

暗色、克制的个人主页：项目作品、能力分布、联系方式。React 19 + Vite 8，零第三方 UI 库，动效全部自己定义、无模板。

这是一个 AI-first 开发的项目：人负责定义要什么、拆任务、验收和上线，具体代码由模型产出。

视觉取向参考了 Linear / Vercel / Stripe / Anthropic 官网的做法：全站只有一个强调色、标题不用渐变、不用 emoji、靠字号层级和 1px 发丝线建立秩序，动效只在有信息量的地方出现。

## 本地运行

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # 产物在 dist/
npm run preview  # 本地预览构建结果
```

## 换成你自己的内容

**只需要改 [`src/content.js`](src/content.js) 一个文件**，全站文字都从这里读。

| 字段 | 作用 |
| --- | --- |
| `profile.name` | 页面各处的名字，同时决定导航栏方框里的首字母 |
| `profile.roles` | 首屏打字机循环播放的身份标签 |
| `profile.tagline` | 首屏一句话定位。建议写事实，不要写口号 |
| `profile.bio` | 「关于我」段落，数组每项一段 |
| `profile.now` | 首屏右侧「最近在做」面板，`state` 支持 `进行中 / 已上线 / 排期中 / 关注中` |
| `profile.meta` | 首屏顶部元信息条（方向 / 地点 / 回复速度） |
| `contact.github` | GitHub 用户名，全站链接自动拼接；填真实用户名后统计数字会去 GitHub API 取实际数值 |
| `contact.email` | 邮箱，点渠道行可一键复制 |
| `contact.links` | 其它社交入口，用不到的删掉即可 |
| `projects` | 项目列表。`featured: true` 的那条会渲染成顶部精选卡 + 右侧规格表，其余进入可展开的表格；`type` 自动生成筛选标签；`demo` 留空则不显示演示链接 |
| `workflow` | 「我怎么做事」四步流程，`step` 是显示用的编号 |
| `tools` | 常用 agent 清单。`note` 只写"它是什么"，别写虚的 |
| `skills` | 能力条，`level` 为 0-100 |
| `stats` | 数字滚动统计，`ghField` 填 `public_repos` / `followers` 等可自动取 GitHub 数据，取不到时用 `fallback` |

想换强调色：只改 `src/styles/tokens.css` 里的 `--accent` / `--accent-hi` / `--accent-rgb` 三行，全站跟着变。

## 深浅色切换

导航栏右侧的太阳/月亮按钮。**默认跟随系统 `prefers-color-scheme`**，手动切换后写入 `localStorage.theme` 并记住。两套主题各自的颜色都在 `src/styles/tokens.css`：`:root` 是深色，`[data-theme='light']` 是浅色——组件样式里不允许出现硬编码颜色，全部走变量，所以加新组件时也只要用 `var(--text)` / `var(--rule)` 这类语义变量。

`index.html` 里那段内联脚本负责在首屏绘制前定好主题，删掉会让浅色用户每次进来先看到一闪的深色，别删。

`--accent-hi` 的语义是"用于文字和描边的强调色"：深色主题下比 `--accent` 更亮，浅色主题下更暗，两边都为了保证对比度。

## 部署到自己的服务器（当前采用）

线上地址：**http://47.254.207.200/me/** ，站点文件在服务器 `/var/www/me/`。

架构上它挂在 anime-chat 那个 server 块里（子路径 `/me/`），不是独立的 server 块——因为这台机器 80 端口已被 anime-chat 用 `listen 80 default_server; server_name _;` 独占，再加一个 `server_name _` 的块会被它遮蔽、根本访问不到。

### 以后更新（改完 content.js 之后）

```bash
npm run build
scp -r dist/index.html dist/assets kl:/var/www/me/
```

`index.html` 不缓存、`/me/assets/` 走一年强缓存，所以传完刷新页面就生效。`kl` 是 `~/.ssh/config` 里配好的主机别名。

### 换路径的话

改 `location` 前**务必先确认不与 anime-chat 的路由冲突**，否则会把它对应页面遮掉：

```bash
ssh kl 'curl -s -o /dev/null -w "%{http_code}\n" http://127.0.0.1:8899/新路径'
# 返回 404 才安全
```

配置片段和注意事项见 [`deploy/portfolio.nginx.conf`](deploy/portfolio.nginx.conf)。改动流程：拉下 `/etc/nginx/sites-available/anime-chat` → 本地改 → `nginx -t` 通过才 `systemctl reload nginx`（失败就回滚，服务器上有 `.bak` 备份）。

## 部署到 GitHub Pages（备选）

1. 仓库 Settings → Pages → Build and deployment 选 **GitHub Actions**
2. 新建 `.github/workflows/deploy.yml`：

```yaml
name: 部署个人网站
on:
  push:
    branches: [main]
permissions:
  contents: read
  pages: write
  id-token: write
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
      - uses: actions/configure-pages@v5
      - run: npm ci
      - run: npm run build
      - uses: actions/upload-pages-artifact@v3
        with:
          path: dist
  deploy:
    needs: build
    runs-on: ubuntu-latest
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    steps:
      - id: deployment
        uses: actions/deploy-pages@v4
```

`vite.config.js` 里已经是 `base: './'`，项目页和独立域名都能直接部署。

## 目录结构

```
src/
├─ content.js              全站文案与数据，改这里
├─ hooks.js                滚动进度、视口检测、数字滚动、GitHub 数据
├─ styles/tokens.css       设计变量（颜色 / 字体 / 间距），改配色只动这里
├─ styles/base.css         重置、版心、按钮、标签、滚动渐入
└─ components/
   ├─ Nav                  吸顶导航 + 1px 滚动进度 + 移动端抽屉
   ├─ Hero                 元信息条 + 打字机 + 「最近在做」面板
   ├─ Projects             精选卡 + 规格表 + 可筛选可展开的项目表
   ├─ Workflow              四步开发流程 + 常用 agent 清单
   ├─ About                正文 + 技术栈 + 统计格 + 我能负责的部分
   ├─ Contact              渠道行 + 复制邮箱 + 校验表单（mailto）
   ├─ Footer
   ├─ Reveal / TypedText   滚动渐入容器、打字机组件
   └─ icons.jsx            内联 SVG 图标，无图标库
```

已适配 `prefers-reduced-motion`：系统开启「减弱动态效果」时，打字机和所有过渡会立即到位，只保留静态排版。
