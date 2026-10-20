# 异常能源放射 / Irregular Energy Emissions

- 分类 Category：深空异闻 Exploration · DLC：《遥远繁星》Distant Stars（has_distar）

## 如何开始 How it starts

需要《遥远繁星》。任意恒星可能生成（4级，权重0.1，全局一次）；格式塔帝国或主物种有机械特质的帝国为0。

Requires Distant Stars. Can spawn on any star (level 4, weight 0.1, once per game); 0 for gestalts or empires whose species has mechanical traits.

## 剧情脉络 Story outline

distar.1070“恒星规律”：读数显示恒星有规律脉动，到场后却毫无迹象；科学官坚信别处的恒星也在异常脉动。追查 → 在2–20跳内找一颗目标恒星（找不到时放宽条件，仍不行则在本国境内生成后备星系），开启 STAR_CRAZY（60天）；若最终没有目标则3天后 distar.1071“一会就好”：科学官承认是偏执。认定是故障 → 凝聚力。
STAR_CRAZY 完成：若由当初的科学官主持，50% distar.1072“传感器故障”（真有更高能量输出，科学官获得细致特质与能量矿藏）/ 50% distar.1073“疯狂之星”（是科学官本人精神失常，自封“世界的守护者”，被送回首都治疗）；换人主持则必为 distar.1072。

distar.1070 "Star Patterns": the star seemed to pulse regularly, but on arrival nothing is found; the science officer insists other stars are pulsing too. Investigate → a target star 2–20 jumps away is chosen (looser search, then a fallback system spawned inside our borders) and STAR_CRAZY (60 days) opens; if no target exists, distar.1071 "For a minute there..." 3 days later: the officer admits it was paranoia. Call it a malfunction → unity.
STAR_CRAZY: if the same officer leads it, 50% distar.1072 "Sensor Malfunction" (the star really is stronger; the officer gains Meticulous and the star an energy deposit) / 50% distar.1073 "Star Crazy" (the officer has gone mad, styles themself Protector of the Realm and is sent home for treatment); with another leader it is always distar.1072.

## 分支与结局 Branches and outcomes

1072/1073 为50/50（仅限原科学官）；1071 是找不到目标时的后备结果。

1072/1073 are 50/50 (original officer only); 1071 is the fallback when no target exists.

## 条件与文明差异 Conditions and variants

无思潮差异。

No ethics-based differences.

## 审阅记录 Review notes

- 审阅 Reviewed：2026-10-12（已审阅 reviewed）
- 来源 Sources：common/anomalies/95_anomaly_categories_distant_stars.txt:1265-1291; events/distant_stars_events_2.txt:2598 (distar.1070); common/solar_system_initializers/distant_stars_initializers.txt:4955 (star_crazy_fallback_system); common/special_projects/00_projects_distant_stars.txt:1127-1172 (STAR_CRAZY); events/distant_stars_events_2.txt:2727/2755/2800 (distar.1071-1073)
已核对异常、distar.1070–1073、STAR_CRAZY 与后备星系初始化。树结构正确。事件链 star_crazy_chain（“能量辐射”）的计数名与此故事相关，但没有任何脚本开启它，见 chain-star-crazy-chain。

Checked the anomaly, distar.1070–1073, STAR_CRAZY and the fallback initializer. Tree correct. The event chain star_crazy_chain ("Energy Emissions") is named for this story but no script starts it; see chain-star-crazy-chain.
