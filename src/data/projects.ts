// 项目详情数据。首页项目卡片、详情页都读这里。
// 想加项目：复制一个对象，改 slug（要唯一，首页链接用它）、name、各字段即可。
// 每个 section 是一部分；section.blocks 是该部分里的内容块，类型可选：
//   paragraph   纯文字
//   image-text  图文（imageSide: 'left' | 'right' 控制图在左还是右）
//   video-text  视频/文字（mediaType: 'video' | 'image'）
//   run-it      只放视频 / GIF / 图片（顶部和正文里都能用）
//   gallery     多图网格
//   before-after 项目前后对比：before/after 两张图，配 Before/After 按钮切换；
//               可选 beforeLabel/afterLabel（默认 Before/After）、beforeCap/afterCap（按钮下说明）
// 想换某个项目的主色：加 accent 字段，填十六进制色值，例如 accent: '#2E8B8B'

export type Block =
  | { type: 'paragraph'; body: string }
  | {
      type: 'image-text'
      image: string
      alt: string
      caption?: string
      body: string
      imageSide?: 'left' | 'right'
    }
  | {
      type: 'video-text'
      media: string
      mediaType?: 'video' | 'image'
      caption?: string
      body: string
    }
  | { type: 'run-it'; media: string; mediaType?: 'video' | 'image'; caption?: string }
  | { type: 'gallery'; images: { src: string; alt: string; caption?: string }[] }
  | {
      type: 'before-after'
      before: string
      after: string
      beforeLabel?: string
      afterLabel?: string
      beforeCap?: string
      afterCap?: string
      caption?: string
    }

export interface Section {
  index: string // 目录里显示的编号，如 "01"
  id: string // 锚点 id，英文短横，如 "what-it-replaced"
  title: string // 该部分标题（中文）
  blocks: Block[]
}

export interface Project {
  slug: string
  index: string
  name: string
  summary: string
  accent?: string // 可选：该项目主色（十六进制）。不填则用站点默认紫
  meta: { role: string; with: string; timeline: string; stack: string }
  intro: string
  heroRunIt?: { media: string; mediaType?: 'video' | 'image'; caption?: string }
  sections: Section[]
}

const PH = '/placeholders/ph.svg'

export const projects: Project[] = [
  // ============ 项目一：完整示例（8 部分） ============
  {
    slug: 'onboarding',
    index: '01',
    name: '项目占位一',
    summary: '一句话介绍这个项目：从证据到结论，它是怎么工作的。',
    meta: {
      role: '独立设计与前端开发',
      with: '与 CEO 直接对接，后端由另一位工程师负责',
      timeline: '约两周',
      stack: 'React、TypeScript、Tailwind、多语言',
    },
    intro:
      '这是「标题 + 简介」区域。用一两段话讲清楚这个项目是什么、解决什么问题、为什么值得一看。下面的 8 个部分会按顺序展开背景、决策、过程和反思。',
    heroRunIt: {
      media: PH,
      caption: 'Run it：把可交互的成品放在这里（视频 / GIF / 图片均可）。',
    },
    sections: [
      {
        index: '01',
        id: 'what-it-replaced',
        title: '它替代了什么',
        blocks: [
          {
            type: 'paragraph',
            body: '写一段背景：原来的方案长什么样、有什么问题。比如它要人在还不了解产品时先做选择，或者在承诺「绝不会代发」的同一屏里索要收件箱权限——自相矛盾。',
          },
          {
            type: 'image-text',
            image: PH,
            alt: '新旧方案对比',
            caption: '左：旧方案；右：新方案。',
            imageSide: 'left',
            body: '图文块示例：图在左侧，文字在右侧。把对比讲清楚——旧流程不能吸收产品方向的改变，新流程则把「获取权限」变成了用户能理解的交换。',
          },
          {
            type: 'run-it',
            media: PH,
            caption: 'Run it：两个方案并排跑，让用户自己切换着看。',
          },
          {
            type: 'before-after',
            before: PH,
            after: PH,
            caption: '前后对比：点 Before / After 切换同一屏的改前改后。',
            beforeCap: '改前：上一版方案的某一屏',
            afterCap: '改后：这一版把同一屏重做后的样子',
          },
        ],
      },
      {
        index: '02',
        id: 'context',
        title: '背景与它带来的',
        blocks: [
          {
            type: 'paragraph',
            body: '这一段讲「上下文」：为什么这个顺序是这样排的。可以点出一句核心论点，比如「它看到的越多，能替你承担的就越多」，然后展开每一步是在收集上下文还是在消耗上下文。',
          },
          {
            type: 'gallery',
            images: [
              { src: PH, alt: '连线', caption: '1 · 连线' },
              { src: PH, alt: '扫描', caption: '2 · 扫描' },
              { src: PH, alt: '报告', caption: '3 · 报告' },
              { src: PH, alt: '交接', caption: '4 · 交接' },
            ],
          },
          {
            type: 'video-text',
            media: PH,
            mediaType: 'image',
            caption: '视频文字块：上面是视频/GIF/图片，下面是说明文字。',
            body: '视频文字块示例：把「连线」这一幕做成可交互的录屏，说明那行 credits 备注为什么放在集成列表下方。',
          },
        ],
      },
      {
        index: '03',
        id: 'feel',
        title: '它要让人感受到什么',
        blocks: [
          {
            type: 'paragraph',
            body: '用户真正需要「理解」的不是信息，而是某种感觉——比如「这个 AI 已经懂我，而且已经在干活了」。把衡量每一屏的标准写清楚（收集了什么、如何提升「顿悟」的质量、用户什么时候看到回报）。',
          },
          {
            type: 'image-text',
            image: PH,
            alt: '评审框架',
            caption: '逐屏评审对照框架',
            imageSide: 'right',
            body: '图文块示例：图在右侧。放一张评审表或框架图，说明每一屏是怎么被打分、又是被谁的标准打的。',
          },
        ],
      },
      {
        index: '04',
        id: 'decisions',
        title: '两个关键决策',
        blocks: [
          {
            type: 'paragraph',
            body: '把最难的两个取舍单列出来：每个选项是什么、放弃了什么、为什么这么选。用清晰的对照，比一段长论述更有说服力。',
          },
          {
            type: 'gallery',
            images: [
              { src: PH, alt: '决策一', caption: '决策一：用逐行写出的简报，而不是进度条' },
              { src: PH, alt: '决策二', caption: '决策二：删掉预写好的起始任务' },
            ],
          },
        ],
      },
      {
        index: '05',
        id: 'visual',
        title: '视觉方向的确定',
        blocks: [
          {
            type: 'paragraph',
            body: '讲视觉探索：做了多个可点击的方向稿（而不是静态情绪板），因为不能点的方向很难评判。最后胜出的方向是什么、配色和字体怎么定。',
          },
          {
            type: 'gallery',
            images: [
              { src: PH, alt: '方向 A', caption: 'A · 印刷实验室' },
              { src: PH, alt: '方向 B', caption: 'B · 玩具箱' },
              { src: PH, alt: '方向 C', caption: 'C · 工作室' },
              { src: PH, alt: '方向 D', caption: 'D · 小镇（胜出）' },
            ],
          },
          {
            type: 'run-it',
            media: PH,
            caption: 'Run it：把胜出方向铺满每一幕，确认一致。',
          },
        ],
      },
      {
        index: '06',
        id: 'last-screen',
        title: '最后一屏是怎么定的',
        blocks: [
          {
            type: 'paragraph',
            body: '最后一屏最费功夫。讲它从什么起点开始（比如一张挂在工牌绳上的身份卡），为什么改成档案，以及同一天里做出了几个版本、哪个胜出。',
          },
          {
            type: 'image-text',
            image: PH,
            alt: '三个版本',
            caption: '三个版本同一天做出',
            imageSide: 'left',
            body: '图文块示例：把三个候选版本并排讲，说明为什么第三个（两张叠放的纸、头像卡为主角）赢了。',
          },
        ],
      },
      {
        index: '07',
        id: 'built',
        title: '我做了什么',
        blocks: [
          {
            type: 'paragraph',
            body: '列清楚你实际负责的范围：前端、状态、动画、多语言……哪些是对接别人的。也可以提一句交付方式（比如以原型 + 共用组件合入，不影响生产路径）。',
          },
          {
            type: 'video-text',
            media: PH,
            mediaType: 'image',
            caption: '成品截图或录屏',
            body: '视频文字块示例：放成品截图，配一句你最自豪或最关键的细节。',
          },
        ],
      },
      {
        index: '08',
        id: 'differently',
        title: '我会怎么做不同',
        blocks: [
          {
            type: 'paragraph',
            body: '诚实收尾：哪些地方如果重来会改。比如视觉系统是为拉动整个产品向前设计的，但若其它页面没跟上，就会显得像属于一个没到来的版本。要么把野心收到产品能吸收的范围，要么先推动跨页面统一。',
          },
          {
            type: 'paragraph',
            body: '（占位）这一块也可以放上一篇 / 下一篇项目的链接，方便读者继续看。链接逻辑在详情页顶部「更多项目」里已经处理了。',
          },
        ],
      },
    ],
  },

  // ============ 项目二：占位页（先留空，后续按项目一的结构补） ============
  {
    slug: 'method-kit',
    index: '02',
    name: '项目占位二',
    summary: '一句话介绍这个项目：它解决了什么问题，适合谁用。',
    meta: {
      role: '（占位）',
      with: '（占位）',
      timeline: '（占位）',
      stack: '（占位）',
    },
    intro: '这是项目二的占位详情页。结构已经搭好，照着项目一的内容把 8 个部分填上即可。',
    sections: [
      {
        index: '01',
        id: 'coming-soon',
        title: '内容整理中',
        blocks: [
          {
            type: 'paragraph',
            body: '这个项目详情还在整理。把下面的 sections 数组按项目一的样子补充 8 个部分即可，每块用 paragraph / image-text / video-text / run-it / gallery 自由组合。',
          },
        ],
      },
    ],
  },

  // ============ 项目三：占位页 ============
  {
    slug: 'data-pipe',
    index: '03',
    name: '项目占位三',
    summary: '一句话介绍这个项目：输入是什么，输出是什么。',
    meta: {
      role: '（占位）',
      with: '（占位）',
      timeline: '（占位）',
      stack: '（占位）',
    },
    intro: '这是项目三的占位详情页。结构已经搭好，照着项目一的内容把 8 个部分填上即可。',
    sections: [
      {
        index: '01',
        id: 'coming-soon',
        title: '内容整理中',
        blocks: [
          {
            type: 'paragraph',
            body: '这个项目详情还在整理。把下面的 sections 数组按项目一的样子补充 8 个部分即可。',
          },
        ],
      },
    ],
  },
]
