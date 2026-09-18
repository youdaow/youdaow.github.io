/**
 * ============================================================
 *  只需修改这一个文件，全站文字都从这里读。
 *  项目数据来自 github.com/youdaow（2026-09-18 抓取）。
 *  仍带「待确认」标记的字段需要你自己核对。
 * ============================================================
 */

const DIRECTION = 'AI-first 开发'
const LOCATION = '中国 · 广东东莞'

export const profile = {
  // 取自 GitHub 显示名，想换直接改这里
  name: 'Code_Bot',
  // 首屏打字机循环播放
  roles: ['AI-first 开发者', '需求拆解控', '验收偏执狂', '桌面端工具迷'],
  // 一句话说清你是谁、在做什么。写事实，不写口号
  tagline:
    '我用 AI 做开发：负责定义问题、拆任务、验收和上线，具体代码交给模型产出。目前开源了 4 个项目，都是真实跑着的东西。',
  bio: [
    '我的工作方式是 AI-first：一个想法先由我拆成功能边界、接口形状和验收标准，再交给模型逐块实现，我负责跑通、改错、联调和部署。所以我更擅长把「要什么」说清楚，而不是从零手写某一门语言——这套流程目前的 token 支出是 0。',
    '做出来的东西集中在两类：桌面端工具（Electron + React）把重复的手工操作变成一个按钮，后端服务（Python）把接口和桥接跑起来。分发云解决「同一支视频要发到二十几个平台」，anime-chat 解决「让角色在飞书群里像个真人」。',
  ],
  // 首屏右侧「最近在做」面板，按仓库最后 push 时间排的
  now: [
    { text: 'anime-chat：飞书桥接「沉默后主动发言」', state: '进行中' },
    { text: '分发云：29 个平台的一键分发链路', state: '进行中' },
    { text: '图吧工具箱 WinUI3 社区仓库跟进', state: '关注中' },
    { text: '多线程下载工具第二版', state: '排期中' },
  ],
  direction: DIRECTION,
  location: LOCATION,
  status: '接独立项目 · 也聊全职机会', // 待确认
  meta: [
    { k: '方向', v: DIRECTION },
    { k: '地点', v: LOCATION },
    { k: '开发成本', v: 'token 支出 0' },
    { k: '回复', v: '通常 24 小时内' },
  ],
}

export const contact = {
  github: 'youdaow',
  email: '3456098479@qq.com',
  // 其它社交入口；GitHub 那行由上面的 github 用户名自动生成，不用重复填
  links: [],
}

/** type 用于筛选，分类名自定义后筛选标签会自动生成 */
export const projects = [
  {
    name: '分发云',
    summary: '多平台视频一键分发的桌面工具，覆盖 29 个平台。',
    detail:
      'Electron + React 实现，支持深浅色主题和多套配色；带密码锁，把各平台账号信息保护在本地。',
    tags: ['TypeScript', 'Electron', 'React'],
    type: '桌面应用',
    year: '2026',
    repo: 'https://github.com/youdaow/fenfayun',
    demo: '',
    stars: 1,
    featured: true,
  },
  {
    name: '二次元角色聊天 AI',
    summary: '给每个角色独立人设的聊天服务，接进了飞书。',
    detail:
      'Python 服务端，支持飞书桥接的「沉默一段时间后主动发言」；已经部署，可以直接打开体验。',
    tags: ['Python', '飞书开放平台', 'LLM'],
    type: 'Web 应用',
    year: '2026',
    repo: 'https://github.com/youdaow/anime-chat',
    demo: 'http://47.254.207.200:8899',
    stars: 0,
    featured: false,
  },
  {
    name: '多线程下载工具',
    summary: '分片并发下载，目前跑通了第一版基本流程。',
    detail:
      'Python 实现的多线程分段下载。第一版由 AI 生成，目前跑通了基本流程，断点续传还没做。',
    tags: ['Python', '多线程', 'CLI'],
    type: '效率工具',
    year: '2026',
    repo: 'https://github.com/youdaow/python-',
    demo: '',
    stars: 0,
    featured: false,
  },
  {
    name: '二次元表情包库',
    summary: '按角色和情绪整理的图片资源仓库。',
    detail:
      '给聊天场景准备的表情素材，仓库名还是占位的「-」，后面会连同命名一起整理。',
    tags: ['资源', '图片'],
    type: '数据资源',
    year: '2026',
    repo: 'https://github.com/youdaow/-',
    demo: '',
    stars: 0,
    featured: false,
  },
]

/** 开发流程：先验证该不该做，再验证能不能做，文档先于代码 */
export const workflow = [
  {
    step: '01',
    title: '先问该不该做',
    text: '拿着想法去问 agent：GitHub 上同类项目有多少、是不是已经泛滥、还差哪一块。做不出增量就不开工。',
  },
  {
    step: '02',
    title: '再问能不能做',
    text: '确认能拿到哪些接口和账号、卡点在哪、最省力的实现路径是什么。走不通的想法不留恋。',
  },
  {
    step: '03',
    title: '文档先于代码',
    text: '把功能边界、接口形状、验收标准写成文档。之后所有产出都对着这份文档，改需求先改文档。',
  },
  {
    step: '04',
    title: '分块交付与验收',
    text: '按文档拆任务交给 agent 实现，我负责跑通、联调、逐条对着验收标准检查，最后部署上线。',
  },
]

/** 只写「它是什么」，不写虚的 */
export const tools = [
  { name: 'Codex', note: 'OpenAI 的编码 agent' },
  { name: 'DSH', note: 'DeepSeek 开源的本地编码 agent 框架' },
  { name: 'opencode', note: '开源的终端编码 agent' },
  { name: 'WorkBuddy', note: '办公场景的 AI agent' },
]

/** 游戏开发：能力项只列他说过的，程度是「能搭基础系统」 */
export const gamedev = {
  engines: ['Unity', 'Godot'],
  items: ['玩家移动', '第一人称视角', '2.5D 俯视角', 'NPC 对话', '地形编辑'],
}

/** level 0-100，只影响进度条长度。写的是我能负责的部分，不是语言熟练度 */
export const skills = [
  { name: '定义问题与拆任务', level: 90 },
  { name: '驱动 AI 产出并验收', level: 86 },
  { name: '前后端联调与排错', level: 74 },
  { name: '界面与交互判断', level: 70 },
  { name: '部署上线与运维', level: 66 },
]

/** 「关于」区块里的技术栈清单，来自你仓库的实际语言分布 */
export const techStack = [
  'TypeScript',
  'React',
  'Electron',
  'Python',
  'Node.js',
  'Vite',
  '飞书开放平台',
]

/** 数字统计；ghField 会自动取 GitHub 真实数值，取不到时用 fallback */
export const stats = [
  { label: '开源仓库', ghField: 'public_repos', fallback: 5 },
  { label: '关注者', ghField: 'followers', fallback: 2 },
  { label: '获得 Star', fallback: 1 },
  { label: '可在线体验', fallback: 1 },
]

export const nav = [
  { id: 'home', label: '首页' },
  { id: 'projects', label: '项目' },
  { id: 'workflow', label: '流程' },
  { id: 'about', label: '关于' },
  { id: 'contact', label: '联系' },
]
