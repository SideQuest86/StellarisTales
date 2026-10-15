"""Bilingual glossary for condition / scope labels that have no game localisation (docs/EFFECTS.md "Label language").

Rules
  * Conditions on internal story state (script variables, flags, saved event targets, situation / first-contact internals,
    arithmetic, stage scores) are not meaningful to readers: one generic natural phrase per kind (STORY / PROGRESS /
    SPECIFIC); the exact technical condition stays in the label's `detail` list (internal, never displayed).
  * Meaningful conditions and scopes are translated here (zh fully Chinese, en natural English); the game's own localisation is
    always tried first by the callers.
  * A key nobody translated degrades to the generic phrase, never to a humanised English key in the Chinese text.
"""
from __future__ import annotations
import re

STORY = ('满足此前剧情设定的条件时', 'if an earlier story condition holds')
PROGRESS = ('按调查进度', 'depending on progress')
SPECIFIC = ('满足特定条件时', 'if a specific condition holds')
OBJECT = ('相关对象', 'a related object')

# trigger keys that read internal story state -> STORY
# purely internal story state only: variables, flags, saved targets, event-chain / first-contact / situation bookkeeping
STORY_RE = re.compile(r'(variable|_flag$|^has_\w*flag|event_target|^exists$|is_same_value|same_value|first_contact|situation|event_chain|'
                      r'^check_|^modulo|arithmetic|counter|insight|^which$|^is_current_|^has_completed|^current_|clue)')
PROGRESS_RE = re.compile(r'(stage|score)')

BOOL_COND = {  # key -> (zh, en) as a positive statement about the scope
    'is_colony': ('是殖民地', 'is a colony'), 'is_star': ('是恒星', 'is a star'), 'is_gestalt': ('是格式塔意识帝国', 'is a gestalt empire'),
    'is_nomadic': ('是游牧帝国', 'is a nomadic empire'), 'is_robotic_species': ('物种是机械体', 'the species is robotic'),
    'is_machine_empire': ('是机械帝国', 'is a machine empire'), 'is_galactic_community_member': ('是银河共同体成员', 'is a Galactic Community member'),
    'is_capital': ('是首都', 'is a capital'), 'is_hive_empire': ('是蜂巢思维帝国', 'is a hive mind empire'),
    'is_homicidal': ('是杀戮型帝国', 'is a homicidal empire'), 'is_sapient': ('具有智慧', 'is sapient'),
    'is_waystation_starbase': ('是中继星港', 'is a waystation starbase'), 'is_colonizable': ('可以殖民', 'can be colonized'),
    'is_ruler': ('是统治者', 'is the ruler'), 'is_xenophile': ('亲外', 'is xenophile'), 'is_xenophobe': ('排外', 'is xenophobe'),
    'is_robot_pop_group': ('是机器人人口', 'is a robot pop group'), 'is_asteroid': ('是小行星', 'is an asteroid'),
    'is_councilor': ('是议员', 'is a councilor'), 'is_astral_scar': ('是星界伤痕', 'is an astral scar'),
    'is_psionic_portrait': ('具有灵能形象', 'has a psionic portrait'), 'is_primitive': ('是原始文明', 'is primitive'),
    'is_artificial': ('是人造天体', 'is artificial'), 'is_spiritualist': ('唯心主义', 'is spiritualist'),
    'is_robot_empire': ('是机器人帝国', 'is a robot empire'), 'is_robotic': ('是机械体', 'is robotic'),
    'is_under_colonization': ('正在被殖民', 'is being colonized'), 'is_disabled': ('已瘫痪', 'is disabled'), 'is_mobile': ('可移动', 'is mobile'),
    'is_capital_system': ('是首都星系', 'is the capital system'), 'is_civilian': ('是民用舰船', 'is a civilian ship'),
    'is_lithoid_empire': ('是石质生命帝国', 'is a lithoid empire'), 'is_fe_cluster': ('是衰落帝国星团', 'is a fallen empire cluster'),
    'is_infernal_empire': ('是炼狱帝国', 'is an infernal empire'), 'is_livestock': ('是牲畜', 'is livestock'),
    'is_individual_machine': ('是个体机械帝国', 'is an individual machine empire'), 'is_organic_species': ('物种是有机体', 'the species is organic'),
    'is_egalitarian': ('平等主义', 'is egalitarian'), 'is_bottleneck_system': ('是瓶颈星系', 'is a bottleneck system'),
    'is_wilderness_empire': ('是荒野帝国', 'is a wilderness empire'), 'is_arkship_fleet': ('是方舟舰队', 'is an arkship fleet'),
    'is_fanatic_xenophile': ('狂热亲外', 'is fanatic xenophile'), 'is_arkship_ship': ('是方舟舰船', 'is an arkship'),
    'is_megacorp': ('是巨型企业', 'is a megacorporation'), 'is_militarist': ('军国主义', 'is militarist'),
    'is_ringworld': ('是环世界', 'is a ring world'), 'is_pirate_system': ('是海盗星系', 'is a pirate system'),
    'is_psionic_species': ('物种具有灵能', 'the species is psionic'), 'is_waystation_ship': ('是中继舰船', 'is a waystation ship'),
    'is_synthetic_empire': ('是合成体帝国', 'is a synthetic empire'), 'is_at_war': ('处于战争中', 'is at war'),
    'is_galactic_community_formed': ('银河共同体已成立', 'the Galactic Community has formed'),
    'is_arkship_tier_2': ('方舟为二级', 'the arkship is tier 2'), 'is_arkship_tier_3': ('方舟为三级', 'the arkship is tier 3'),
    'is_galactic_custodian': ('是银河守护者', 'is the Galactic Custodian'), 'is_gestalt_node': ('是格式塔节点', 'is a gestalt node'),
    'is_materialist': ('唯物主义', 'is materialist'), 'is_lithoid': ('是石质生命', 'is lithoid'),
    'is_mechanical_species': ('物种是机械体', 'the species is mechanical'), 'is_authoritarian': ('威权主义', 'is authoritarian'),
    'is_fanatic_materialist': ('狂热唯物', 'is fanatic materialist'), 'is_fanatic_spiritualist': ('狂热唯心', 'is fanatic spiritualist'),
    'is_heir': ('是继承人', 'is the heir'), 'is_preventing_anomaly': ('正在阻止异常现象', 'is preventing an anomaly'),
    'is_subject': ('是附庸', 'is a subject'), 'is_sacred_site_planet': ('是圣地星球', 'is a sacred-site planet'),
    'is_terraforming_candidate': ('适合环境改造', 'is a terraforming candidate'), 'is_pacifist': ('和平主义', 'is pacifist'),
    'is_being_purged': ('正在被清洗', 'is being purged'), 'is_lithoid_or_infernal_empire': ('是石质生命或炼狱帝国', 'is a lithoid or infernal empire'),
    'is_surveyed': ('已被勘测', 'has been surveyed'), 'is_hostile': ('怀有敌意', 'is hostile'), 'is_machine': ('是机械体', 'is a machine'),
    'is_fallen_empire': ('是衰落帝国', 'is a fallen empire'), 'is_awakened_fallen_empire': ('是觉醒的衰落帝国', 'is an awakened fallen empire'),
    'is_player': ('由玩家控制', 'is controlled by a player'), 'is_fanatic_militarist': ('狂热军国', 'is fanatic militarist'),
    'is_fanatic_pacifist': ('狂热和平', 'is fanatic pacifist'), 'is_fanatic_egalitarian': ('狂热平等', 'is fanatic egalitarian'),
    'is_fanatic_authoritarian': ('狂热威权', 'is fanatic authoritarian'), 'is_fanatic_xenophobe': ('狂热排外', 'is fanatic xenophobe'),
    'is_pre_ftl': ('尚未掌握超光速航行', 'has no faster-than-light travel yet'), 'is_pirate': ('是海盗', 'is a pirate'),
    'is_planet': ('是行星', 'is a planet'), 'is_moon': ('是卫星', 'is a moon'), 'is_ship': ('是舰船', 'is a ship'),
}
BOOL_COND.update({'is_wilderness': BOOL_COND['is_wilderness_empire']})

BOOL_COND.update({
    'has_ancrel': ('已安装「远古遗物」资料片', 'the Ancient Relics DLC is installed'),
    'has_communications': ('已建立通讯', 'communications are established'),
    'has_any_ethic': ('信奉某种特定信仰', 'holds one of the listed ethics'),
    'is_exact_same_species': ('是同一物种', 'is the same species'),
    'has_active_tradition': ('已启用某项传统', 'has an active tradition'),
    'has_notification_modifier': ('带有提示修正', 'has a notification modifier'),
})
TIME_COND = {'years_passed': ('游戏已进行了一定年数', 'the game has run for a certain number of years'),
             'mid_game_years_passed': ('已进入游戏中期', 'the game has reached its mid stage'),
             'end_game_years_passed': ('已进入游戏后期', 'the game has reached its late stage')}

NOUNS = {  # scope nouns of every_/random_/any_/count_ iterators
    'system_planet': ('星系中的星球', 'planet in the system'), 'owned_pop_group': ('所属人口', 'pop group you own'),
    'country': ('国家', 'country'), 'playable_country': ('玩家级国家', 'playable country'), 'system': ('星系', 'system'),
    'owned_planet': ('所属星球', 'planet you own'), 'owned_leader': ('所属领袖', 'leader you employ'), 'situation': ('情势', 'situation'),
    'system_within_border': ('境内星系', 'system within borders'), 'owned_fleet': ('所属舰队', 'fleet you own'),
    'fleet_in_system': ('星系内的舰队', 'fleet in the system'), 'controlled_ship': ('受控舰船', 'ship under control'),
    'owned_ship': ('所属舰船', 'ship you own'), 'planet_within_border': ('境内星球', 'planet within borders'),
    'galaxy_planet': ('银河中的星球', 'planet in the galaxy'), 'controlled_fleet': ('受控舰队', 'fleet under control'),
    'owned_colony': ('所属殖民地', 'colony you own'), 'member': ('成员', 'member'), 'system_ambient_object': ('星系中的环境物体', 'ambient object in the system'),
    'owned_nonprimary_starbase': ('非主要星港', 'non-primary starbase'), 'relation': ('外交关系', 'diplomatic relation'), 'subject': ('附庸', 'subject'),
    'owned_species': ('所属物种', 'species you own'), 'neighbor_system': ('相邻星系', 'neighboring system'), 'spynetwork': ('间谍网络', 'spy network'),
    'agreement': ('协议', 'agreement'), 'owned_starbase': ('所属星港', 'starbase you own'), 'system_megastructure': ('星系中的巨型建筑', 'megastructure in the system'),
    'galaxy_species': ('银河中的物种', 'species in the galaxy'), 'pool_leader': ('待招募领袖', 'leader in the pool'),
    'observed_pre_ftl_within_border': ('境内被观察的前星际文明', 'observed pre-FTL civilization within borders'), 'deposit': ('资源点', 'deposit'),
    'owned_army': ('所属陆军', 'army you own'), 'system_planet_colony': ('星系中的殖民地', 'colony in the system'), 'events': ('事件', 'event'),
    'envoy': ('使节', 'envoy'), 'ship_in_system': ('星系内的舰船', 'ship in the system'), 'starbase_in_system': ('星系内的星港', 'starbase in the system'),
    'neighbor_country': ('相邻国家', 'neighboring country'), 'war': ('战争', 'war'), 'federation_ally': ('联邦盟友', 'federation ally'),
    'ambient_object': ('环境物体', 'ambient object'), 'owned_pop_job': ('所属岗位', 'job you own'), 'owned_megastructure': ('所属巨型建筑', 'megastructure you own'),
    'galcom_member': ('银河共同体成员', 'Galactic Community member'), 'rim_system': ('边缘星系', 'rim system'), 'pop_faction': ('人口派系', 'pop faction'),
    'megastructure': ('巨型建筑', 'megastructure'), 'war_participant': ('战争参与方', 'war participant'), 'fleet_in_orbit': ('轨道上的舰队', 'fleet in orbit'),
    'moon': ('卫星', 'moon'), 'active_first_contact': ('进行中的首次接触', 'ongoing first contact'), 'defender': ('防守方', 'defender'),
    'system_ship_colony': ('星系中的舰船殖民地', 'ship colony in the system'), 'pre_ftl_within_border': ('境内前星际文明', 'pre-FTL civilization within borders'),
    'attacker': ('进攻方', 'attacker'), 'owned_contract': ('所属契约', 'contract you own'), 'rival_country': ('宿敌国家', 'rival country'),
    'ground_combat_attacker': ('地面战进攻方', 'ground-combat attacker'), 'combatant_fleet': ('参战舰队', 'combatant fleet'),
    'issued_mission': ('已发布的任务', 'issued mission'), 'system_with_aura': ('有光环的星系', 'system with an aura'), 'controlled_planet': ('受控星球', 'planet under control'),
    'planet_army': ('星球上的陆军', 'army on the planet'), 'owned_design': ('所属设计', 'design you own'), 'neighbor_system_euclidean': ('附近星系', 'nearby system'),
    'system_within_storm': ('风暴中的星系', 'system within the storm'), 'cosmic_storm': ('宇宙风暴', 'cosmic storm'), 'available_debris': ('可用残骸', 'available debris'),
    'federation': ('联邦', 'federation'), 'planet': ('星球', 'planet'), 'pop': ('人口', 'pop'), 'owned_pop': ('所属人口', 'pop you own'),
    'leader': ('领袖', 'leader'), 'fleet': ('舰队', 'fleet'), 'ship': ('舰船', 'ship'), 'species': ('物种', 'species'), 'starbase': ('星港', 'starbase'),
    'exhibit': ('展品', 'exhibit'), 'starbase_sizes': ('星港规模', 'starbase size'), 'pop_amount': ('人口数量', 'pop count'),
    'owned_pop_amount': ('所属人口数量', 'pops you own'), 'espionage_operation': ('间谍行动', 'espionage operation'),
    'starbase_in_network': ('网络中的星港', 'starbase in the network'), 'species_pop_group': ('该物种的人口', 'pop group of the species'),
    'system_planet_all': ('星系中的全部星球', 'planet in the system'), 'tile': ('地块', 'tile'), 'building': ('建筑', 'building'),
    'district': ('区划', 'district'), 'neighbor': ('邻居', 'neighbor'), 'sector': ('行政区', 'sector'), 'army': ('陆军', 'army'),
    'owned_district': ('所属区划', 'district you own'), 'bypass': ('航道旁路', 'bypass'), 'trait': ('特质', 'trait'), 'planet_modifier': ('星球修正', 'planet modifier'),
}

WORDS = {  # single words of humanised keys (for objects with no localisation); a key with an unknown word becomes OBJECT
    'system': '星系', 'planet': '星球', 'country': '国家', 'fleet': '舰队', 'ship': '舰船', 'leader': '领袖', 'pop': '人口', 'species': '物种',
    'empire': '帝国', 'hive': '蜂巢', 'gestalt': '格式塔', 'machine': '机械', 'robot': '机器人', 'robotic': '机械', 'lithoid': '石质', 'infernal': '炼狱',
    'fallen': '衰落', 'awakened': '觉醒', 'pirate': '海盗', 'colony': '殖民地', 'starbase': '星港', 'station': '空间站', 'mining': '采矿',
    'research': '研究', 'age': '时代', 'stone': '石器', 'bronze': '青铜', 'iron': '铁器', 'steam': '蒸汽', 'atomic': '原子', 'industrial': '工业',
    'space': '太空', 'early': '早期', 'late': '晚期', 'medieval': '中世纪', 'renaissance': '文艺复兴', 'deposit': '资源点', 'modifier': '修正',
    'tech': '科技', 'technology': '科技', 'physics': '物理', 'society': '社会', 'engineering': '工程', 'speed': '速度', 'mult': '倍率', 'add': '增加',
    'cost': '成本', 'time': '时间', 'growth': '增长', 'logistic': '逻辑斯蒂', 'biological': '生物', 'exp': '经验', 'gain': '获取', 'survey': '勘测',
    'anomaly': '异常', 'terraform': '改造', 'building': '建筑', 'envoys': '使节', 'envoy': '使节', 'loyalty': '忠诚度', 'monthly': '每月', 'subjects': '附庸',
    'storm': '风暴', 'storms': '风暴', 'unity': '团结', 'produces': '产出', 'influence': '影响', 'timed': '限时', 'num': '数量', 'alternatives': '备选项',
    'cohesion': '凝聚力', 'ethics': '信仰', 'shift': '偏移', 'councilor': '议员', 'species_leader': '物种领袖', 'all': '全部', 'military': '军事',
    'defense': '防御', 'armor': '装甲', 'shield': '护盾', 'hull': '船体', 'weapon': '武器', 'damage': '伤害', 'low': '低', 'mid': '中', 'high': '高',
    'radiation': '辐射', 'hostile': '敌对', 'precursor': '先驱者', 'world': '世界', 'neighbor': '邻近', 'first': '首次', 'contact': '接触',
    'crisis': '天灾', 'contract': '契约', 'forever': '永远', 'cruise': '巡航', 'issued': '已发出', 'arkship': '方舟', 'nomad': '游牧', 'waystation': '中继站',
    'euclidean': '直线距离', 'interference': '干扰', 'egg': '卵', 'hatchling': '幼体', 'default': '默认', 'ancient': '远古', 'relic': '遗物',
    'cloud': '云', 'crystal': '晶体', 'drone': '无人机', 'prediction': '预测', 'psionic': '灵能', 'portrait': '形象', 'trait': '特质', 'ethic': '信仰',
    'civic': '国民理念', 'tradition': '传统', 'ascension': '飞升', 'perk': '天赋', 'edict': '法令', 'policy': '政策', 'resolution': '决议',
    'federation': '联邦', 'alliance': '联盟', 'war': '战争', 'peace': '和平', 'army': '陆军', 'tier': '等级', 'level': '等级', 'size': '规模',
}

WORDS.update({
    'a': '', 'access': '通行', 'accessible': '可进入的', 'active': '活跃的', 'affected': '受影响的', 'agreement': '协议', 'ai': 'AI', 'alloy': '合金',
    'alternative': '替代', 'amoeba': '阿米巴', 'amount': '数量', 'and': '与', 'anglers': '垂钓者', 'anti': '反', 'anvil': '铁砧', 'any': '任意',
    'apocalyptic': '末世', 'apply': '应用', 'aquatic': '水生', 'armies': '陆军', 'ascensionist': '飞升主义', 'assigned': '在岗', 'assimilation': '同化',
    'assimilator': '同化者', 'association': '联盟关系', 'asteroid': '小行星', 'astral': '星界', 'attacker': '进攻方', 'aura': '光环', 'available': '可用的',
    'awareness': '觉察度', 'be': '', 'beastmasters': '驭兽者', 'been': '已', 'behemoth': '巨兽', 'being': '正在', 'binary': '双星', 'blocker': '阻挡物',
    'blocks': '阻挡', 'branch': '分部', 'broken': '破碎', 'buildings': '建筑', 'can': '能够', 'candidate': '候选', 'capital': '首都', 'capitalist': '资本主义',
    'caravan': '商队', 'caravaneer': '商队团', 'casus': '宣战', 'catalytic': '催化', 'category': '类别', 'center': '中心', 'chosen': '天选', 'citizenship': '公民权',
    'civilian': '民用', 'claim': '宣称', 'climate': '气候', 'cloaking': '隐形', 'cloning': '克隆', 'closed': '封闭', 'cold': '寒冷', 'colonizable': '可殖民',
    'commercial': '商业', 'communications': '通讯', 'complete': '完成', 'component': '组件', 'constructing': '建造中', 'contains': '含有', 'controlled': '受控',
    'corporeal': '肉体', 'cosmic': '宇宙', 'count': '数量', 'covenant': '契约', 'create': '创建', 'crime': '犯罪度', 'criminal': '犯罪', 'critter': '小生物',
    'culture': '文化', 'curator': '策展人', 'current': '当前', 'custom': '自定义', 'cutholoids': '岩居兽', 'cybernetic': '义体', 'cyborg': '半机械', 'cycle': '轮回',
    'deep': '深', 'defender': '防守方', 'deficit': '赤字', 'democracy': '民主制', 'democratic': '民主', 'devastation': '荒废度', 'deviancy': '异常', 'devouring': '吞噬',
    'dictatorial': '独裁', 'difficulty': '难度', 'dimensional': '维度', 'diplo': '外交', 'diplomatic': '外交', 'dissociation': '解离', 'distance': '距离',
    'distar': '遥远恒星', 'districts': '区划', 'dna': '基因', 'dry': '干燥', 'eager': '热切', 'eater': '吞噬者', 'ego': '自我', 'eligible': '符合条件的',
    'enclave': '飞地', 'energy': '能量', 'entropy': '熵', 'environmental': '环境', 'espionage': '间谍', 'established': '已建立的', 'event': '事件',
    'exempt': '豁免', 'exhibit': '展品', 'exotic': '奇异', 'exploring': '探索中', 'faction': '派系', 'failed': '失败的', 'fanatic': '狂热', 'fauna': '动物',
    'favoring': '偏向', 'fleets': '舰队', 'flight': '飞行', 'flora': '植物', 'food': '食物', 'forced': '被迫', 'forger': '锻造者', 'founder': '创始',
    'free': '空闲', 'galactic': '银河', 'galaxy': '银河', 'galvanic': '电镀', 'gang': '帮派', 'gas': '气体', 'genocidal': '灭绝', 'go': '进入', 'grand': '大',
    'group': '群体', 'guaranteed': '有保障的', 'guardian': '守护者', 'guided': '受引导的', 'habitability': '宜居性', 'habitable': '宜居', 'habitat': '栖息地',
    'happened': '已发生', 'happiness': '幸福度', 'harming': '损害', 'harvest': '收获', 'harvestable': '可收获的', 'has': '有', 'have': '有', 'head': '负责人',
    'hidden:owner': '', 'holy': '神圣', 'hospitality': '待客', 'hp': '耐久', 'human': '人类', 'hyperlane': '超空间航道', 'hyperspace': '超空间', 'ideal': '理想',
    'idle': '闲置', 'immortal': '不死', 'imperial': '帝国', 'in': '在', 'inside': '内', 'intel': '情报', 'is': '是', 'job': '岗位', 'killed': '被消灭',
    'knights': '骑士', 'last': '最近', 'latent': '潜在', 'law': '法律', 'leased': '租赁', 'leviathans': '利维坦', 'lgate': 'L星门', 'lithoids': '石质生命',
    'living': '生活', 'location': '位置', 'marauder': '掠夺者', 'market': '市场', 'matching': '匹配', 'max': '最大', 'megacorp': '巨型企业', 'megastructure': '巨型建筑',
    'memorialist': '纪念者', 'menace': '威胁', 'mercenary': '雇佣兵', 'met': '已遇到', 'mindwardens': '心灵守护者', 'mineral': '矿物', 'minor': '次要',
    'mission': '任务', 'mob': '暴民', 'module': '模块', 'moon': '卫星', 'most': '最多', 'multiplayer': '多人游戏', 'mutation': '变异', 'natural': '天然',
    'nemesis': '复仇女神', 'no': '无', 'non': '非', 'nonshipyard': '非造船厂', 'normal': '普通', 'notification': '提示', 'obtain': '获得', 'of': '', 'oligarchic': '寡头',
    'oligarchy': '寡头制', 'on': '在', 'opinion': '态度', 'or': '或', 'orbital': '轨道', 'organic': '有机', 'organo': '有机体', 'overlord': '宗主', 'owned': '所属',
    'owner': '所有者', 'owns': '拥有', 'participant': '参与方', 'patron': '赞助者', 'perc': '百分比', 'pest': '害虫', 'phototrophic': '光合', 'planetary': '行星',
    'planets': '星球', 'platform': '平台', 'point': '点', 'position': '位置', 'potential': '潜在', 'pre': '前', 'preferred': '偏好的', 'prefers': '偏好', 'preftl': '前星际',
    'presapient': '前智慧', 'prevprev': '上两层对象', 'purge': '清洗', 'purity': '纯净', 'rare': '稀有', 'reanimator': '复活者', 'receive': '接收', 'reduced': '减少的',
    'regular': '常规', 'relative': '相对', 'relentless': '不懈', 'researching': '正在研究', 'resource': '资源', 'rim': '边缘', 'rivals': '宿敌', 'sabotage': '破坏',
    'same': '相同', 'sapient': '开智', 'sb': '星港', 'scavenger': '拾荒者', 'science': '科学', 'scion': '后裔', 'scope': '范围', 'scripted': '脚本', 'secret': '秘密',
    'sector': '星域', 'sector.sector': '星域首府', 'seeded': '播种的', 'separatism': '分离主义', 'set': '设置', 'setting': '设置', 'shackled': '被束缚', 'ships': '舰船',
    'site': '遗址', 'slave': '奴隶', 'slavery': '奴役', 'spawn': '生成', 'specialist': '专业人才', 'specimen': '标本', 'sphere': '领域', 'spiritualist': '唯心',
    'spy': '间谍', 'spynetwork': '间谍网络', 'stability': '稳定度', 'star': '恒星', 'start': '开局', 'starting': '起始', 'subspecies': '亚种', 'subterranean': '地下',
    'suitable': '适合', 'superstitious': '迷信', 'synth': '合成', 'synthetic': '合成', 'taken': '被占领', 'tankbound': '缸中', 'targeted': '被针对的', 'task': '任务',
    'term': '条款', 'tier1or2': '一或二级', 'tier1or2or3': '一至三级', 'tiyanki': '提雅奇', 'total': '总', 'toxic': '有毒', 'toxoids': '毒质人', 'treasure': '宝藏',
    'trinary': '三星', 'truce': '停战', 'trust': '信任', 'twisted': '扭曲', 'type': '类型', 'uncleared': '未清理的', 'under': '受', 'undermining': '削弱',
    'unfriendly': '不友好', 'uninhabitable': '不宜居', 'unique': '独特', 'unplugged': '断线者', 'uses': '使用', 'using': '使用', 'valid': '有效', 'value': '数值',
    'values': '重视', 'virtual': '虚拟', 'vivarium': '生态馆', 'void': '虚空', 'voidworms': '虚空蠕虫', 'volatile': '挥发', 'wet': '潮湿', 'whisperers': '低语者',
    'will': '将', 'worker': '工人', 'years': '年数', 'zone': '分区', 'zroni': '泽珞',
})

WORDS.update({
    'architects': '建筑师', 'archive': '档案馆', 'artifact': '神器', 'asset': '资产', 'attunement': '共鸣度', 'authority': '统治权柄', 'backup': '备份', 'baths': '浴场',
    'beliefs': '信仰', 'belli': '理由', 'belt': '带', 'bio': '生物', 'biochemical': '生化', 'blockers': '阻挡物', 'bombardment': '轨道轰炸', 'border': '边境',
    'borders': '边境', 'breach': '违反', 'but': '但', 'by': '被', 'caster': '投射器', 'chain': '链', 'champions': '冠军', 'changed': '被改变的', 'class': '类别',
    'closer': '更近', 'cluster': '星团', 'collection': '收集', 'colonies': '殖民地', 'combat': '战斗', 'commander': '指挥官', 'community': '共同体', 'conflict': '冲突',
    'consumer': '消费', 'contracts': '合约', 'control': '控制', 'controllable': '可控', 'coop': '合作社', 'council': '议会', 'created': '已创建', 'crystals': '水晶',
    'curators': '策展人', 'cybernetics': '义体', 'declared': '被宣告', 'defeated': '被击败', 'deposits': '资源点', 'diadochi': '继业者', 'district': '区划',
    'domain': '领域', 'drinkers': '饮者', 'drug': '毒品', 'dweller': '居民', 'emitter': '发射器', 'empires': '帝国', 'enabled': '启用', 'encryption': '加密',
    'equilibrators': '平衡器', 'equivalent': '等价', 'expansion': '扩张', 'experimenters': '实验者', 'explorer': '探索者', 'extorted': '被勒索', 'extreme': '极端',
    'fealty': '效忠', 'fleet1': '舰队一', 'fleet2': '舰队二', 'fleet3': '舰队三', 'focus': '专长', 'for': '对', 'fortune': '命运', 'friendly': '友好', 'from': '来自',
    'ftl': '超光速', 'game': '游戏', 'giant': '巨', 'goal': '目标', 'harmony': '和谐', 'housing': '住房', 'income': '收入', 'incompatible': '不兼容',
    'increased': '提升的', 'industrialist': '工业家', 'integrated': '被整合', 'integration': '整合', 'interest': '关注点', 'interfacing': '接口', 'jobs': '岗位',
    'joining': '加入', 'knowledge': '知识', 'losing': '处于劣势', 'lured': '被引诱', 'madness': '疯狂', 'masters': '大师', 'mia': '失踪', 'migration': '迁徙',
    'mindwarden': '心灵守护者', 'minister': '大臣', 'motes': '微粒', 'muutagan': '穆塔甘', 'naval': '海军', 'necrophaged': '被噬尸', 'negative': '负面',
    'neutral': '中立', 'newfound': '新发现', 'nominee': '提名', 'not': '不', 'office': '办事处', 'omens': '预兆', 'one': '一', 'open': '开放', 'operation': '行动',
    'origin': '起源', 'others': '他人', 'pact': '条约', 'paperclip': '回形针', 'percentage': '比例', 'picked': '已选择', 'positive': '正面', 'power': '实力',
    'prescripted': '预设', 'preset': '预设', 'primitives': '原始文明', 'progress': '进度', 'prosperity': '繁荣', 'psychosis': '精神错乱', 'queen': '女王',
    'reached': '达到', 'refugee': '难民', 'relation': '关系', 'relations': '关系', 'remote': '远程', 'reserve': '后备', 'resources': '资源', 'rift': '裂隙',
    'riggan': '里甘', 'rights': '权利', 'ring': '环', 'rule': '统治', 'sapience': '智慧', 'schools': '学校', 'scientist': '科学家', 'scrapped': '被拆解',
    'seeker': '追寻者', 'servitor': '侍从', 'shackles': '枷锁', 'shock': '冲击', 'shroud': '虚境', 'shrouded': '虚境', 'side': '一方', 'sleep': '沉睡',
    'slots': '空位', 'smuggled': '被走私', 'societal': '社会', 'societies': '社团', 'special': '特殊', 'specialization': '专精', 'specialty': '专长',
    'splitter': '分裂器', 'stage': '阶段', 'standard': '标准', 'status': '状态', 'stockpile': '库存', 'story': '剧情', 'strategic': '战略', 'strength': '强度',
    'structure': '结构', 'subject': '附庸', 'suppressed': '被压制', 'swarm': '虫群', 'synergy': '协同', 'systems': '星系', 'target': '目标', 'template': '模板',
    'terraforming': '环境改造', 'to': '', 'trove': '宝库', 'troves': '宝库', 'underworld': '地下世界', 'unhappiness': '不满', 'wars': '战争', 'weapons': '武器',
    'with': '与', 'wormhole': '虫洞', 'worship': '崇拜', 'xuracorp': '朱拉企业',
})

WORDS.update({
    'adopt': '采纳', 'advanced': '高级', 'approach': '方针', 'capacity': '容量', 'celestial': '天界', 'check': '检查', 'clone': '克隆', 'collision': '碰撞',
    'compare': '', 'composure': '镇定', 'computer': '计算机', 'decryption': '解密', 'defensive': '防御', 'destination': '目的地', 'diplomacy': '外交',
    'eligibility': '资格', 'end': '终结', 'enlightenment': '启蒙', 'era': '时期', 'fe': '衰落帝国', 'fertility': '肥沃', 'forge': '熔炉', 'formula': '配方',
    'galcom': '银河共同体', 'generation': '生成', 'goods': '商品', 'governors': '总督', 'homicidal': '杀戮', 'ignited': '被点燃', 'killer': '杀手', 'lvl': '等级',
    'modern': '现代', 'nomads': '游牧', 'observed': '被观察', 'offensive': '进攻', 'playable': '可玩', 'project': '专项', 'rank': '排名', 'reduction': '削减',
    'repeatable': '可重复', 'revenge': '复仇', 'reward': '奖励', 'score': '得分', 'solar': '恒星', 'specimens': '标本', 'state': '状态', 'steal': '窃取',
    'subterfuge': '诡计', 'technological': '技术', 'than': '于', 'the': '', 'theme': '主题', 'trade': '贸易', 'treaty': '条约', 'trigger': '条件', 'uncovered': '被揭示',
    'universe': '宇宙', 'urban': '都市', 'victorian': '维多利亚', 'voidworm': '虚空蠕虫', 'composer': '谱线者', 'strands': '丝线', 'instrument': '工具', 'desire': '欲望',
    'cradle': '摇篮', 'souls': '灵魂', 'cycle': '轮回', 'ancient': '远古', 'pink': '粉红', 'storm': '风暴', 'respawn': '重生', 'resources': '资源',
})

WORDS.update({'cleanse': '净化', 'combatant': '参战方', 'flare': '耀斑', 'government': '政府', 'log': '记录', 'nanobots': '纳米机器人', 'skipped': '被跳过',
              'stop': '制止', 'tear': '裂口', 'visit': '到访', 'worlds': '世界', 'planet': '星球', 'killer': '杀手'})

WORDS.update({'scale': '规模系数', 'crisis': '天灾', 'strength': '强度'})
WORDS.update({'exact': '完全', 'geology': '地质', 'item': '物品', 'wonder': '奇观'})
WORDS.update({'aesthetic': '审美', 'atrocities': '暴行', 'historical': '历史', 'xeno': '异种'})


def zh_words(key):
    """Chinese for a humanised key made only of known words, else None."""
    words = [w for w in re.split(r'[_\s:.@]+', str(key).lower()) if w and not w.isdigit()]
    if not words or any(w not in WORDS for w in words):
        return None
    return ''.join(WORDS[w] for w in words)


def classify(key):
    """Generic phrase pair for a condition key with no wording of its own."""
    k = key.lower()
    if PROGRESS_RE.search(k) and ('site' in k or 'stage' in k or 'score' in k):
        return PROGRESS
    if STORY_RE.search(k):
        return STORY
    return SPECIFIC
