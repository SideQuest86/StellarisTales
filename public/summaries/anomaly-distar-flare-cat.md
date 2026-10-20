# 超强耀斑 / Superflare

- 分类 Category：深空异闻 Exploration · DLC：《遥远繁星》Distant Stars（has_distar）

## 如何开始 How it starts

《遥远繁星》专属星系 superflare_system（G型恒星，至多一个）中，一颗冰冻星球带有“文明的遗踪”异常（1级），同一星系的气态巨行星有一颗带 superflare_planet 修正的核爆卫星。调查异常得到 distar.6；殖民那颗卫星则开始耀斑事件。

In the Distant Stars system superflare_system (G star, at most one) a frozen planet carries the level-1 anomaly "Traces of Civilization", and a gas giant has a nuked moon with the superflare_planet modifier. Investigating the anomaly gives distar.6; colonising the moon starts the flare events.

## 剧情脉络 Story outline

1. distar.6“在时光中冻结”：工业时代文明因恒星超级耀斑失去大气而灭绝，科学官提醒本星系殖民地可能受恒星影响；星球获得社会学矿藏。
2. 殖民核爆卫星后，隐藏的 distar.5 排定360–410天后的 distar.7“超强耀斑”。
3. 若此时仍有殖民地（或正在殖民），可开启 SUPERFLARE_PROJECT（30天，科研船+科学家，限时150天）；否则只能接受，星球得到20年 superflare_struck。
4. 项目成功 → distar.9；超时失败 → distar.10。若接受项目后失去殖民地，隐藏 distar.8 直接施加耀斑效果。

1. distar.6 "Frozen in Time": an industrial-age civilisation died when superflares stripped its atmosphere; the science officer warns that colonies in this system may suffer the same; the planet gains a society deposit.
2. Colonising the nuked moon makes the hidden distar.5 schedule distar.7 "Superflare" 360–410 days later.
3. If the colony still exists (or is being founded) the player can start SUPERFLARE_PROJECT (30 days, science ship + scientist, 150-day limit); otherwise the planet simply gets 20 years of superflare_struck.
4. Success → distar.9; time-out → distar.10. If the colony is lost after accepting, the hidden distar.8 applies the flare effects.

## 分支与结局 Branches and outcomes

distar.7 的两个选项按是否有殖民地互斥；项目结果 distar.9 / distar.10 互斥。

distar.7's two options are exclusive by colony state; project results distar.9 / distar.10 are exclusive.

## 条件与文明差异 Conditions and variants

distar.7 有两段文本：有殖民地时描述紧急研制护盾，无殖民地时说明没有殖民地受影响。

distar.7 has two texts: with a colony it describes the emergency shield, without one it notes no colony is affected.

## 审阅记录 Review notes

- 审阅 Reviewed：2026-10-12（已审阅 reviewed）
- 来源 Sources：common/solar_system_initializers/distant_stars_initializers.txt:1740-1827 (superflare_system); common/anomalies/95_anomaly_categories_distant_stars.txt:30-42; events/distant_stars_events_1.txt:213-390 (distar.5-10); common/special_projects/00_projects_distant_stars.txt:4-31 (SUPERFLARE_PROJECT); common/on_actions/00_on_actions.txt:1301
已核对初始化、异常、distar.5–10、项目和 on_colonized。修正：草稿把异常（2篇）和耀斑殖民链（4篇）拆成两个故事；现合并，并用审阅连接表示“殖民卫星后”。耀斑链不要求先调查异常，但 distar.7 文本引用了本异常的冰冻星球。

Checked initializer, anomaly, distar.5–10, the project and on_colonized. Correction: the draft split the anomaly (2 docs) and the flare chain (4 docs); merged with a reviewed "after colonising the moon" link. The flare chain does not require the anomaly, but distar.7 refers to this anomaly's frozen planet.
