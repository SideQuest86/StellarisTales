"""Second-pass effect handlers: the long tail of effect keys (diplomacy, fleets, councils, leaders, terraforming ...) and the
explicit classification of bookkeeping / technical keys (docs/EFFECTS.md "Classified keys").

Installed into scripts/effects.py at import time (`install(module)`); labels follow the first-pass conventions: the game's own
names where the localisation has them (nm), the effect's own parameters for numbers, the "scaled by the game" wording when a
number depends on the save, never an invented value.

MORE[key] = (kind, zh, en); `{o}` is the first named object of the effect (its game name), `{n}` the signed number. A segment in
square brackets is dropped when its placeholder has no value, so one template serves `key = yes` and `key = { ... }`.
BOOL[key] = (kind, zh_on, en_on, zh_off, en_off) for `key = yes/no` switches.
"""
from __future__ import annotations
import re

# ----------------------------------------------------------------------------------------------- classified keys ---
CATEGORIES = {
    'ai': ('AI hint', 'AI preference or evaluation hint; it steers computer-controlled empires, nothing the player reads as an outcome'),
    'ui': ('UI / refresh', 'interface refresh, validation or recalculation pass; it re-derives state that is already shown'),
    'cosmetic': ('cosmetic', 'portrait, flag, title, animation or visual state; no gameplay effect'),
    'tutorial': ('tutorial / debug', 'tutorial, telemetry or debug plumbing'),
    'variable': ('script variable', 'arithmetic on script variables or reading a setting into one; no player-visible outcome by itself'),
    'plumbing': ('state plumbing', 'internal timers, locks, cooldowns or bookkeeping that supports other effects'),
    'param': ('parameter / template', 'a parameter or template placeholder inside another effect, not an effect of its own'),
}
CLASSIFIED = {}


def _cls(cat, *keys):
    for k in keys:
        CLASSIFIED[k] = cat


_cls('ai', 'set_ai_weapon_preference', 'set_ai_platform_weapon_preference', 'set_ai_starbase_weapon_preference',
     'set_ai_armor_ratio', 'set_ai_shields_ratio', 'set_ai_platform_armor_ratio', 'set_ai_platform_shields_ratio',
     'set_ai_starbase_armor_ratio', 'set_ai_starbase_shields_ratio', 'clear_ai_weapon_preference', 'clear_ai_armor_ratio',
     'clear_ai_shields_ratio', 'clear_ai_starbase_weapon_preference', 'clear_ai_starbase_armor_ratio', 'clear_ai_starbase_shields_ratio',
     'clear_ai_platform_weapon_preference', 'clear_ai_platform_armor_ratio', 'clear_ai_platform_shields_ratio',
     'run_ai_strategic_war_data', 'run_in_ai_mode', 'roll_ai_preferred_patron', 'set_ai_preferred_patron', 'clear_orders')
_cls('ui', 'refresh_portraits', 'refresh_psionic_aura_type', 'refresh_leader_pool', 'refresh_species_rights', 'refresh_accords',
     'validate_planet_buildings_and_districts', 'validate_and_repair_planet_buildings_and_districts', 'check_planet_employment',
     'force_show_diplomacy', 'hide_option_if_not_allowed', 'owned_planet_list_tooltip', 'room_name_override', 'force_faction_evaluation',
     'set_country_code_flags', 'remove_auto_move_target', 'store_country_backup_data', 'restore_country_backup_data', 'set_halted',
     'set_fleet_settings', 'set_fleet_formation')
_cls('cosmetic', 'randomize_flag_symbol', 'set_ruler_title_male', 'set_ruler_title_female', 'set_male_ruler_title', 'set_female_ruler_title',
     'lock_animation_state', 'set_animation_state', 'set_ring', 'date_distortion', 'set_confused', 'set_gender',
     'set_ship_design', 'set_advisor_active')
_cls('tutorial', 'set_tutorial_level', 'endgame_telemetry', 'win')
_cls('variable', 'get_galaxy_setup_value', 'ceiling_variable', 'round_variable_to_closest', 'add_variable', 'export_resource_maximum_to_variable')
_cls('plumbing', 'set_mia_return_delay', 'set_cooldown', 'set_government_cooldown', 'reset_policy_cooldowns', 'renew_bypass_lock',
     'fill_astral_rift_event_pool', 'start_astral_action_cooldown', 'set_system_locked', 'set_player', 'freeze_leader_age',
     'reset_years_of_peace', 'set_years_served', 'set_custom_capital_location', 'change_colony_foundation_date', 'set_built_species',
     'link_to', 'set_auto_upgrade_components')
_cls('param', 'inverse', 'effect_on_blob', 'create_smaller_size_creature_in_fleet')

# ------------------------------------------------------------------------------------------------ simple labels ---
MORE = {
    # diplomacy / galactic community
    'add_favors': ('opinion', '获得恩惠[ {n}]', 'Gains favors[ {n}]'), 'remove_favors': ('opinion', '失去恩惠[ {n}]', 'Loses favors[ {n}]'),
    'add_intel_report': ('generic', '获得一份情报报告[（等级 {m}）]', 'Gains an intel report[ (level {m})]'),
    'add_static_war_exhaustion': ('generic', '战争疲劳[ {n}]', 'War exhaustion[ {n}]'),
    'leave_alliance': ('generic', '退出所在联盟', 'Leaves the alliance'),
    'set_truce': ('generic', '缔结停战', 'A truce is set'), 'end_truce': ('generic', '停战终止', 'The truce ends'),
    'join_war': ('generic', '加入一场战争', 'Joins a war'), 'join_war_on_side': ('generic', '加入战争的一方', 'Joins one side of a war'),
    'remove_war_participant': ('generic', '退出战争', 'Leaves the war'), 'end_rivalry': ('generic', '结束宿敌关系', 'The rivalry ends'),
    'clear_relations': ('generic', '清除相关外交关系', 'Clears the listed diplomatic relations'),
    'end_all_treaties_with': ('generic', '终止与对方的全部条约', 'All treaties with the other party end'),
    'add_casus_belli': ('generic', '获得宣战理由[「{o}」]', 'Gains a casus belli[ "{o}"]'),
    'set_closed_borders': ('generic', '边境封闭状态被改变', 'Closed-border status changes'),
    'remove_communications': ('generic', '中断通讯', 'Communications are cut'),
    'remove_claims': ('planet', '失去领土宣称', 'Territorial claims are removed'),
    'reverse_first_contact': ('generic', '首次接触被逆转', 'First contact is reversed'),
    'finish_first_contact': ('generic', '首次接触完成', 'First contact is completed'),
    'revert_accords': ('generic', '解除盟约[「{o}」]', 'Reverts an accord[ "{o}"]'),
    'replace_patron': ('generic', '更换赞助者', 'The patron is replaced'),
    'set_federation_leader': ('generic', '指定联邦领导者', 'Sets the federation leader'),
    'remove_from_federation': ('generic', '退出联邦', 'Leaves the federation'),
    'remove_secret_fealty': ('generic', '解除暗中效忠', 'Secret fealty ends'),
    'conquer': ('planet', '被征服', 'Is conquered'),
    'add_to_galactic_community': ('generic', '加入银河共同体', 'Joins the Galactic Community'),
    'add_to_galactic_community_no_message': ('generic', '加入银河共同体', 'Joins the Galactic Community'),
    'remove_from_galactic_community': ('generic', '退出银河共同体', 'Leaves the Galactic Community'),
    'add_to_galactic_council': ('generic', '加入银河议会', 'Joins the Galactic Council'),
    'remove_from_galactic_council': ('generic', '退出银河议会', 'Leaves the Galactic Council'),
    'set_galactic_custodian': ('generic', '成为银河守护者', 'Becomes the Galactic Custodian'),
    'set_galactic_emperor': ('generic', '成为银河皇帝', 'Becomes the Galactic Emperor'),
    'set_galactic_defense_force': ('generic', '银河防卫军被设立', 'The Galactic Defense Force is set'),
    'transfer_galactic_defense_force_fleets': ('fleet', '银河防卫军舰队被转交', 'Galactic Defense Force fleets are transferred'),
    'create_fleet_from_naval_cap': ('fleet', '按海军容量创建一支舰队', 'Creates a fleet from naval capacity'),
    'destroy_fleet_naval_cap': ('fleet', '按海军容量摧毁舰队', 'Destroys fleets up to a naval capacity'),
    'pass_resolution_no_cooldown': ('generic', '通过决议[「{o}」]（无冷却）', 'Passes a resolution[ "{o}"] (no cooldown)'),
    'cancel_resolution': ('generic', '撤销决议[「{o}」]', 'Cancels a resolution[ "{o}"]'),
    'set_market_leader': ('generic', '成为市场领导者', 'Becomes the market leader'),
    'unlock_council_slots': ('generic', '解锁议会席位[ {n}]', 'Unlocks council slots[ {n}]'),
    'unlock_council_selection': ('generic', '解锁议会人选', 'Unlocks council selection'),
    'set_council_size': ('generic', '议会规模设为[ {m}]', 'Council size is set to[ {m}]'),
    'set_council_agenda': ('generic', '议会议程设为[「{o}」]', 'The council agenda is set[ to "{o}"]'),
    'add_council_agenda_progress': ('generic', '议会议程进度[ {n}]', 'Council agenda progress[ {n}]'),
    'add_council_agenda_progress_percent': ('generic', '议会议程进度[ {n}]（比例）', 'Council agenda progress[ {n}] (fraction)'),
    'add_permanent_councillor': ('leader', '获得一名常任议员', 'Gains a permanent councillor'),
    'add_imperial_authority': ('generic', '帝国权威[ {n}]', 'Imperial authority[ {n}]'),
    'add_victory_score': ('generic', '胜利点数[ {n}]', 'Victory score[ {n}]'),
    'transfer_resources_to_empire': ('resource', '把资源转给另一个帝国', 'Resources are transferred to another empire'),
    'transfer_resource_stockpile': ('resource', '整个资源库存被转交', 'The whole resource stockpile is transferred'),
    'steal_planet_output': ('resource', '窃取星球产出', "A planet's output is stolen"),
    'set_resource': ('resource', '资源被设为[ {m}]', 'A resource is set to[ {m}]'),
    'clear_resources': ('resource', '清空全部资源', 'All resources are cleared'),
    'add_resource_from_debris': ('resource', '从残骸中获得资源', 'Gains resources from debris'),
    'give_culling_rewards': ('resource', '获得捕杀奖励', 'Gains culling rewards'),
    # country / government
    'add_tradition': ('generic', '获得传统[「{o}」]', 'Gains a tradition[ "{o}"]'),
    'copy_traditions_from': ('generic', '复制对方的传统', "Copies the other party's traditions"),
    'add_ascension_perk': ('generic', '获得飞升天赋[「{o}」]', 'Gains an ascension perk[ "{o}"]'),
    'remove_ascension_perk': ('generic', '失去飞升天赋[「{o}」]', 'Loses an ascension perk[ "{o}"]'),
    'copy_ascension_perks_from': ('generic', '复制对方的飞升天赋', "Copies the other party's ascension perks"),
    'add_edict': ('generic', '颁布法令[「{o}」]', 'Enacts an edict[ "{o}"]'),
    'clear_ethos': ('ethic', '清除全部信仰', 'All ethics are cleared'),
    'copy_ethos_and_authority': ('ethic', '复制对方的信仰与统治权柄', "Copies the other party's ethics and authority"),
    'force_remove_civic_by_index': ('generic', '失去一项国民理念', 'Loses a civic'),
    'set_population_controls': ('generic', '人口控制设置被改变', 'Population controls change'),
    'set_colonization_controls': ('generic', '殖民控制设置被改变', 'Colonization controls change'),
    'set_military_service_type': ('generic', '兵役制度被改变', 'Military service type changes'),
    'set_migration_controls': ('generic', '迁徙控制设置被改变', 'Migration controls change'),
    'set_slavery_type': ('generic', '奴役方式被改变', 'Slavery type changes'),
    'set_purge_type': ('generic', '清洗方式被改变', 'Purge type changes'),
    'enable_faction_of_type': ('generic', '允许出现派系[「{o}」]', 'A faction can appear[ ("{o}")]'),
    'set_faction_properties': ('generic', '派系的属性被改变', "The faction's properties change"),
    'set_faction_extorted': ('generic', '派系的被勒索状态被改变', "The faction's extorted state changes"),
    'create_rebels': ('generic', '出现一个叛乱国家', 'A rebel country appears'),
    'create_sector': ('generic', '创建一个行政区', 'Creates a sector'),
    'mutate_species': ('pop', '物种发生变异', 'The species mutates'),
    'integrate_species': ('pop', '物种被整合', 'The species is integrated'),
    'merge_species': ('pop', '物种被合并', 'The species are merged'),
    'set_species_homeworld': ('planet', '指定物种的母星', "Sets the species' homeworld"),
    'set_planetary_ascension_tier': ('planet', '星球飞升等级设为[ {m}]', 'Planetary ascension tier is set to[ {m}]'),
    # leaders
    'return_leader_from_exile': ('leader', '放逐中的领袖回归', 'The exiled leader returns'),
    'kill_exiled_leader': ('leader', '放逐中的领袖死亡', 'The exiled leader dies'),
    'return_from_mia': ('leader', '失踪的领袖归来', 'The missing leader returns'),
    'add_skill': ('leader', '领袖等级[ {n}]', 'Leader level[ {n}]'), 'set_skill': ('leader', '领袖等级设为[ {m}]', 'Leader level is set to[ {m}]'),
    'add_age': ('leader', '领袖年龄[ {n}]', 'Leader age[ {n}]'),
    'change_leader_class': ('leader', '领袖职业变为[「{o}」]', 'The leader changes class[ to "{o}"]'),
    'remove_all_traits': ('trait', '移除全部特质', 'All traits are removed'),
    'remove_all_negative_traits': ('trait', '移除全部负面特质', 'All negative traits are removed'),
    'create_saved_leader': ('leader', '保存一名领袖的副本', 'A copy of a leader is saved'),
    'activate_saved_leader': ('leader', '启用先前保存的领袖', 'Activates a previously saved leader'),
    # military
    'multiply_crisis_strength': ('generic', '天灾强度乘以[ {m}]', 'Crisis strength is multiplied by[ {m}]'),
    'repair_percentage': ('ship', '修复舰船[ {n}]（比例）', 'Repairs the ship by[ {n}] (fraction)'),
    'repair_amount': ('ship', '修复舰船[ {n}]', 'Repairs the ship by[ {n}]'),
    'repair_armor_percentage': ('ship', '修复装甲[ {n}]（比例）', 'Repairs armor by[ {n}] (fraction)'),
    'repair_shield_percentage': ('ship', '恢复护盾[ {n}]（比例）', 'Restores shields by[ {n}] (fraction)'),
    'repair_ship': ('ship', '舰船被完全修复', 'The ship is fully repaired'),
    'reduce_shield': ('ship', '护盾受损', 'Shields take damage'),
    'modify_army': ('army', '陆军被改变', 'An army is modified'),
    'damage_army': ('army', '陆军受损[ {n}]', 'An army takes damage[ {n}]'),
    'remove_all_armies': ('army', '移除全部陆军', 'All armies are removed'),
    'create_random_fleet': ('fleet', '随机创建一支舰队', 'Creates a random fleet'),
    'give_fleet': ('fleet', '舰队被转交他人', 'The fleet is handed to another empire'),
    'end_fleet_contract': ('fleet', '舰队契约终止', 'The fleet contract ends'),
    'transfer_carrier': ('fleet', '载具被转交', 'The carrier is transferred'),
    'delete_dimensional_fleet': ('fleet', '该维度舰队被移除', 'The dimensional fleet is removed'),
    'give_dna': ('generic', '获得一份基因样本', 'Gains a DNA sample'),
    'steal_relic': ('relic', '窃取遗珍', 'Steals a relic'), 'steal_specimens': ('relic', '窃取标本[ {n}]', 'Steals specimens[ {n}]'),
    'remove_specimen': ('relic', '失去标本[「{o}」]', 'Loses a specimen[ "{o}"]'),
    'unlock_exhibit': ('relic', '解锁展品[「{o}」]', 'Unlocks an exhibit[ "{o}"]'),
    'add_to_vivarium': ('generic', '把生物放入生态馆', 'Adds a creature to the vivarium'),
    'release_vivarium_fauna': ('generic', '放出生态馆中的生物', 'Releases fauna from the vivarium'),
    'release_vivarium_fauna_count': ('generic', '放出生态馆中的一批生物', 'Releases a number of fauna from the vivarium'),
    'reanimate_space_fauna': ('fleet', '复活太空生物', 'Reanimates space fauna'),
    'spawn_custom_debris': ('generic', '生成残骸', 'Spawns debris'), 'pass_debris_ownership': ('generic', '残骸的所有权转移', 'Debris ownership is passed on'),
    'destroy_and_spawn_debris_for': ('generic', '摧毁并留下残骸', 'Destroys and leaves debris'),
    # planets / systems / galaxy
    'create_colony': ('planet', '建立一个殖民地', 'A colony is founded'), 'start_colony': ('planet', '开始一个殖民地', 'Starts a colony'),
    'set_colony_type': ('planet', '殖民地类型被改变[：「{o}」]', 'Colony type changes[ to "{o}"]'),
    'add_growth': ('pop', '人口增长[ {n}]', 'Pop growth[ {n}]'),
    'add_pop_amount': ('pop', '人口[ {n}]', 'Pops[ {n}]'),
    'transfer_pop_amount': ('pop', '人口被转移', 'Pops are transferred'),
    'displace_pop_amount': ('pop', '人口被迁出[ {n}]', 'Pops are displaced[ {n}]'),
    'sacrifice_assigned_pop_amount': ('pop', '在岗人口被献祭', 'Assigned pops are sacrificed'),
    'sacrifice_pop_group': ('pop', '一组人口被献祭', 'A pop group is sacrificed'),
    'pop_force_remove_ethic': ('pop', '人口失去信仰[「{o}」]', 'Pops lose an ethic[ ("{o}")]'),
    'pop_force_transfer_ethic': ('pop', '人口的信仰发生转变', 'Pops shift from one ethic to another'),
    'remove_terrified': ('pop', '人口不再恐惧', 'Pops are no longer terrified'),
    'remove_district': ('planet', '拆除区划[「{o}」]', 'Removes a district[ "{o}"]'),
    'remove_all_districts': ('planet', '拆除全部区划', 'All districts are removed'),
    'remove_random_district': ('planet', '随机拆除一个区划', 'A random district is removed'),
    'downgrade_all_buildings': ('building', '全部建筑降级', 'All buildings are downgraded'),
    'add_holding': ('building', '新增据点[「{o}」]', 'Adds a holding[ "{o}"]'),
    'remove_holding': ('building', '移除据点[「{o}」]', 'Removes a holding[ "{o}"]'),
    'add_starbase_component': ('building', '星港获得组件[「{o}」]', 'The starbase gains a component[ "{o}"]'),
    'set_starbase_building': ('building', '星港建筑被设置', 'A starbase building is set'),
    'remove_random_starbase_module': ('building', '随机拆除一个星港模块', 'A random starbase module is removed'),
    'close_branch_office': ('building', '关闭一间分公司', 'A branch office is closed'),
    'delete_megastructure': ('planet', '该巨型建筑被移除', 'The megastructure is removed'),
    'upgrade_megastructure_to': ('planet', '巨型建筑升级为[「{o}」]', 'The megastructure is upgraded[ to "{o}"]'),
    'activate_gateway': ('planet', '星门被启用', 'The gateway is activated'),
    'start_terraform_process': ('planet', '开始改造星球[：「{o}」]', 'Starts terraforming[ to "{o}"]'),
    'start_terraform_progress': ('planet', '开始改造星球[：「{o}」]', 'Starts terraforming[ to "{o}"]'),
    'stop_terraform_process': ('planet', '停止星球改造', 'Stops the terraforming'),
    'add_terraform_progress': ('planet', '改造进度[ {n}]', 'Terraforming progress[ {n}]'),
    'finish_terraformation': ('planet', '星球改造完成', 'Terraforming is completed'),
    'add_terraformation_total_time_mult': ('planet', '改造总时长倍率[ {m}]', 'Terraforming total time multiplier[ {m}]'),
    'reroll_planet_modifiers': ('planet', '重新随机星球修正', 'Planet modifiers are re-rolled'),
    'add_random_non_blocker_deposit': ('deposit', '新增一个随机资源点', 'Adds a random deposit'),
    'complete_special_project': ('project', '完成特殊项目[「{o}」]', 'Completes a special project[ "{o}"]'),
    'fleet_action_research_special_project': ('project', '舰队着手研究特殊项目', 'The fleet researches a special project'),
    'progress_all_researches': ('research', '全部在研科技进度[ {n}]', 'Progress on all current researches[ {n}]'),
    'add_mission_progress': ('project', '任务进度[ {n}]', 'Mission progress[ {n}]'),
    'set_mission': ('project', '任务被设置[：「{o}」]', 'A mission is set[ ("{o}")]'),
    'set_situation_progress': ('project', '情势进度被设置', 'Situation progress is set'),
    'change_situation_target': ('project', '情势的目标被改变', "The situation's target changes"),
    'spawn_astral_rift': ('planet', '生成一道星界裂隙', 'Spawns an astral rift'),
    'destroy_astral_rift': ('planet', '星界裂隙被摧毁', 'The astral rift is destroyed'),
    'link_wormholes': ('planet', '两个虫洞被连通', 'Two wormholes are linked'),
    'spawn_random_anomaly': ('generic', '出现一处随机异常现象', 'A random anomaly appears'),
    'create_cosmic_storm': ('planet', '出现一场宇宙风暴[（{o}）]', 'A cosmic storm appears[ ({o})]'),
    'create_cosmic_storm_influence_field': ('planet', '宇宙风暴形成影响范围', 'A cosmic storm influence field forms'),
    'destroy_cosmic_storm': ('planet', '宇宙风暴消散', 'The cosmic storm dissipates'),
    'spawn_psionic_aura': ('generic', '出现灵能光环[（{o}）]', 'A psionic aura appears[ ({o})]'),
    'destroy_psionic_aura': ('generic', '灵能光环消失', 'The psionic aura vanishes'),
    'add_aura_intensity': ('generic', '光环强度[ {n}]', 'Aura intensity[ {n}]'),
    'set_aura_intensity': ('generic', '光环强度设为[ {m}]', 'Aura intensity is set to[ {m}]'),
    'activate_fog_machine': ('generic', '启动迷雾发生器', 'Activates a fog machine'),
    'deactivate_fog_machine': ('generic', '关闭迷雾发生器', 'Deactivates the fog machine'),
    'remove_hyperlane': ('planet', '移除一条超空间航道', 'A hyperlane is removed'),
    'move_system': ('planet', '星系被移动', 'The system is moved'),
}

BOOL = {
    'set_cloaking_active': ('ship', '启用隐形', 'Cloaking is switched on', '关闭隐形', 'Cloaking is switched off'),
    'enable_galactic_market': ('generic', '启用银河市场', 'The galactic market is enabled', '禁用银河市场', 'The galactic market is disabled'),
}

# scope keys: `key = { ... }` runs the children against another object
SCOPES = {
    'prevprev': ('上两层对象', 'the scope two levels up'), 'prevprevprev': ('上三层对象', 'the scope three levels up'),
    'capital_star': ('首都所在恒星', "the capital system's star"), 'system_star': ('该星系的恒星', "the system's star"),
    'galactic_emperor': ('银河皇帝', 'the Galactic Emperor'), 'galactic_custodian': ('银河守护者', 'the Galactic Custodian'),
    'issuer': ('决议的发起者', "the resolution's issuer"), 'branch_office_owner': ('分公司的所有者', 'the branch office owner'),
    'envoy_location_country': ('使节所在的国家', "the envoy's host country"), 'astral_rift': ('星界裂隙', 'the astral rift'),
    'research_station': ('研究站', 'the research station'), 'carrier': ('载具', 'the carrier'),
    'last_created_army': ('刚创建的陆军', 'the army just created'), 'last_created_cosmic_storm': ('刚创建的宇宙风暴', 'the cosmic storm just created'),
    'last_created_design': ('刚创建的设计', 'the design just created'), 'no_scope': ('全局', 'no particular scope'),
}

OBJ_KEYS = ('type', 'design', 'component', 'class', 'special_project', 'ethic', 'policy', 'holding', 'building', 'civic', 'agenda',
            'new_ethic', 'resource', 'species', 'relic', 'perk', 'tradition', 'district', 'storm', 'category', 'initializer')
NUM_KEYS = ('amount', 'value', 'count', 'percentage', 'score', 'level', 'size', 'fraction', 'mult')
NUM_RE = re.compile(r'^-?\d+(?:\.\d+)?$')
REF = re.compile(r'^(yes|no|root|this|prev|from|fromfrom|owner|controller|random|all|none|last_created_\w+|event_target:.+|global_event_target:.+|value:.+|@.*|.*\..*)$', re.I)


def _fill(template, obj, num):
    def seg(m):
        inner = m[1]
        if ('{o}' in inner and not obj) or ('{n}' in inner and not num) or ('{m}' in inner and not num):
            return ''
        return inner
    t = re.sub(r'\[([^\]]*)\]', seg, template)
    return t.replace('{o}', obj or '').replace('{n}', num or '').replace('{m}', (num or '').lstrip('+'))


def install(E):
    L, entry, nm, params_of, to_num, amount = E.L, E.entry, E.nm, E.params_of, E.to_num, E.amount

    def objname(n, ctx):
        v = n['v']
        cand = None
        if isinstance(v, str) and not NUM_RE.match(v) and not REF.match(v):
            cand = v
        elif isinstance(v, list):
            p = params_of(n)
            cand = next((p[k] for k in OBJ_KEYS if isinstance(p.get(k), str) and not REF.match(p[k])), None)
        return (cand, nm(ctx, cand)) if cand else (None, None)

    def numval(n):
        v = n['v']
        if isinstance(v, str):
            return v if NUM_RE.match(v) or v.startswith(('@', 'value:')) else None
        p = params_of(n)
        return next((p[k] for k in NUM_KEYS if k in p and isinstance(p[k], (str, list))), None)

    def make(spec):
        kind, zh, en = spec

        def f(n, ctx, st):
            o, name = objname(n, ctx)
            raw = numval(n)
            num, extra = amount(to_num(raw, ctx)) if raw is not None else (None, {})
            e = entry(kind, L(_fill(zh, name and name['zh'], num), _fill(en, name and name['en'], num)), n, st, **extra)
            if o:
                e['object'] = o
            return [e]
        return f

    def make_bool(spec):
        kind, zh_on, en_on, zh_off, en_off = spec

        def f(n, ctx, st):
            v = n['v']
            if v == 'no':
                return [entry(kind, L(zh_off, en_off), n, st)]
            if v == 'yes':
                return [entry(kind, L(zh_on, en_on), n, st)]
            return None
        return f

    def make_scope(key, lab):
        label = L(*lab)

        def f(n, ctx, st):
            if not isinstance(n['v'], list):
                return None
            ctx.count('handled', 'scope:' + key)
            return E._walk([x for x in n['v'] if x['k'] != 'limit'], ctx, st.child(target=label))
        return f

    for key, spec in MORE.items():
        E.HANDLERS[key] = make(spec)
    for key, spec in BOOL.items():
        E.HANDLERS[key] = make_bool(spec)
    for key, lab in SCOPES.items():
        E.HANDLERS[key] = make_scope(key, lab)
        E.SKIP_EXACT.discard(key)
    for key in CLASSIFIED:
        E.HANDLERS.pop(key, None)
        E.SKIP_EXACT.add(key)
    for key, lab in SCOPES.items():
        E.SCOPE_NAMES.setdefault(key, L(*lab))
    E.CLASSIFIED = CLASSIFIED
    E.CATEGORIES = CATEGORIES
