export const brainstormColumns = [
  {
    title: "RESEARCH FINDINGS",
    type: "finding",
    items: [
      { index: "F1", title: "视觉是主要注意入口", body: "听障儿童更依赖视觉、动作与表情来保持注意。", evidence: "听障儿童主要依靠视觉刺激维持注意，但视觉注意持续能力有限，复杂信息容易造成疲劳。" },
      { index: "F2", title: "具象内容更容易理解", body: "具体形象记忆较深，进入抽象语言需要更长时间。", evidence: "语言发展较慢，使听障儿童从具象形象思维过渡到抽象语言的周期更长。" },
      { index: "F3", title: "注意持续时间有限", body: "复杂、重复、过长的任务容易降低儿童持续参与。", evidence: "低龄听障儿童更容易被新奇、强对比和变化刺激吸引，流程应保持短而清楚。" },
      { index: "F4", title: "口语学习依赖高频重复", body: "发音和表达需要短时、多次、持续地进行复习。", evidence: "发音复述能力较弱，需要增加重复复习，并让训练内容由简到难逐步推进。" },
    ],
  },
  {
    title: "DESIGN IMPLICATIONS",
    type: "implication",
    items: [
      { index: "I1", title: "降低视觉与操作负担", body: "一次只聚焦一个目标，减少元素、步骤与信息干扰。" },
      { index: "I2", title: "从真实物品开始", body: "先建立物品—词语—情境的直观对应，再进入表达。" },
      { index: "I3", title: "短任务 × 高频发生", body: "把长训练拆成可反复进入家庭日常的短练习。" },
      { index: "I4", title: "降低家长执行门槛", body: "无需重新学习复杂康复方法，也能直接开始练习。", evidence: "家庭康复虽然陪伴性强，但家长普遍缺乏专业建议，同时需要兼顾工作和家庭。" },
    ],
  },
  {
    title: "DESIGN DECISIONS",
    type: "decision",
    items: [
      { index: "D1", title: "NFC 贴纸作为学习入口", body: "每张物品贴纸绑定 NFC，手机一碰直接进入对应练习。", evidence: "用实体触点代替搜索与多级导航，让儿童和家长从真实物品直接开始。" },
      { index: "D2", title: "场景、内容与任务量一起设计", body: "选高频具体物品，数量可调，单次练习约 10–15 分钟。", evidence: "卧室、吃饭、出门等熟悉场景降低理解成本；任务量控制避免一次训练过长。" },
      { index: "D3", title: "把训练变成可重复动作链", body: "采用“贴 → 碰 → 听/说 → 情境使用”的短循环。", evidence: "每次任务动作固定、步骤少，使儿童可以通过重复操作建立练习习惯。" },
      { index: "D4", title: "APP 负责指导而非制造场景", body: "实体环境触发学习，APP 提供示范、反馈与下一步任务。", evidence: "避免儿童先进入复杂数字界面寻找内容，让数字端成为实体学习的支持层。" },
    ],
  },
  {
    title: "SYSTEM OUTPUTS",
    type: "output",
    items: [
      { index: "S1", title: "Sticker Book", body: "以家庭高频场景组织物品、动作与主题学习内容。" },
      { index: "S2", title: "NFC Object Stickers", body: "把学习入口从贴纸册延伸到真实家庭物品。" },
      { index: "S3", title: "Digital Guidance", body: "提供发音示范、跟读练习、即时反馈和任务引导。" },
      { index: "S4", title: "Progressive Learning", body: "从物品识别逐渐进入组合、表达与日常沟通。" },
    ],
  },
];
