# 离开家园 / Leaving Home

- 分类 Category：深空异闻 Exploration

## 如何开始 How it starts

教程专用：教程顾问事件 advisor.1 给教程星球设置 tutorial_anomaly_planet 标志并添加本异常（1级，权重3）。

Tutorial only: the tutorial advisor event advisor.1 flags the tutorial planet with tutorial_anomaly_planet and adds this anomaly (level 1, weight 3).

## 剧情脉络 Story outline

异常“离家”只有教程玩家才会遇到。三个结果各占1/3：tutorial.52、tutorial.53、tutorial.54（都是同名“教程”文字事件，教程等级2；完成教程步骤 200_researched_anomaly，tutorial.53 还会在30天后触发 story.5 接触报告）。这些结果事件来自 events/tutorial_events.txt，编译器把教程文件列为“非故事”来源，因此故事里只显示异常卡本身。

The anomaly "Leaving Home" is met only by tutorial players. Three results, 1/3 each: tutorial.52, tutorial.53, tutorial.54 (text-only 'tutorial' events at tutorial level 2 that complete the tutorial step 200_researched_anomaly; tutorial.53 also fires the story.5 contact report 30 days later). These result events live in events/tutorial_events.txt, which the compiler lists as a non-story source, so the story shows only the anomaly card itself.

## 分支与结局 Branches and outcomes

三个结果互斥（1/3），都只是教程提示文字；正文随灵性、排外/亲外星、唯物倾向变化。

The three results are exclusive (1/3 each) and are only tutorial prompt texts; the text varies with spiritualist, xenophobe/xenophile and materialist leanings.

## 条件与文明差异 Conditions and variants

tutorial.52 不用于集体意识或游牧国家；其他按伦理变化。

tutorial.52 is not used for gestalt or nomadic countries; the rest vary with ethics.

## 审阅记录 Review notes

- 审阅 Reviewed：2026-10-13（已审阅 reviewed）
- 来源 Sources：common/anomalies/98_anomaly_categories_tutorial.txt:1 (TUTORIAL_CAT); events/tutorial_events.txt:2351 (tutorial.52, 53, 54); events/advisor_events.txt:406-471 (advisor.1 adds the anomaly)
已核对异常与三个教程事件。教程事件被编译器排除是设计选择（NON_STORY_SOURCES），故不改动；见请求。

Checked the anomaly and the three tutorial events. The compiler excluding the tutorial events is a design choice (NON_STORY_SOURCES), so nothing was changed; see the requests.
