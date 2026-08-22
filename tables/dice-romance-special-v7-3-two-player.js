export const diceRomanceSpecialV73TwoPlayer = {
  "id": "dice-romance-special-v7-3-two-player",
  "title": "骰子-恋爱特化表v7.3（双人成行适配）",
  "databaseKey": "dice-romance-special-v7-3-two-player",
  "template": {
    "mate": {
      "type": "chatSheets",
      "version": 2,
      "updateConfigUiSentinel": -1,
      "globalInjectionConfig": {
        "readableEntryPlacement": {
          "position": "before_character_definition",
          "depth": 2,
          "order": 99981
        },
        "wrapperPlacement": {
          "position": "before_character_definition",
          "depth": 2,
          "order": 99980
        }
      }
    },
    "sheet_global_data": {
      "uid": "sheet_global_data",
      "name": "全局数据表",
      "sourceData": {
        "note": "记录当前主角所在地点及时间相关参数。此表有且仅有一行。\n\n【列定义】\n- 列1: 全局状态 story_state\n- 列2: 当前详细地点 current_location\n- 列3: 当前次要地区 current_minor_region\n- 列4: 当前主要地区 current_major_region\n- 列5: 上轮场景时间 prev_scene_time（初始化时为NULL）\n- 列6: 经过的时间 elapsed_time\n- 列7: 当前时间 cur_time\n- 列8: 是否色色 is_lewd\n- 列8: 聚焦镜头 focus_shot\n- 列9: 镜头计数 - 各部位累计被指定为聚焦镜头的次数，固定格式 `腿部=N,足部=N,性器=N,臀部=N,胸部=N,脸部=N,反差=N`，七个部位顺序固定，用英文逗号分隔\n\n【强制约束】\n全局状态为固定字符串`全局状态`，标题性质。\n\n地点层级从小到大：详细地点 < 次要地区 < 主要地区。\n每个字段只写本级名称，不拼上级前缀。\n√ 当前详细地点填 “御苑”\n× 当前详细地点填 “东京-新宿区-御苑”\n\n时间格式：\nprev_scene_time / cur_time: YYYY-MM-DD HH:MM\nelapsed_time: {数值}{单位}，多单位用空格连。\n单位集合：[纪元,千年,百年,年,月,周,天,小时,分]\n示例：\"3小时20分\" | \"2天\" | \"3年6月\"\n\n时间计算公式：cur_time = prev_scene_time + elapsed_time\n- 初始化时prev_scene_time为NULL，cur_time直接填写初始时间，无需计算\n- 每轮推进时，将上一轮的cur_time赋值给prev_scene_time，然后填写本次的elapsed_time，最后计算得到新的cur_time\n\n【色情模块】\n是否色色: 根据当前剧情判定下一轮是否即将进入色情/性爱内容，字段取值限定 `是` 或 `否`。\n聚焦镜头: 给下一轮的特写指引，规定下一轮剧情应聚焦哪个部位的特写，取值范围 `无 / 腿部 / 足部 / 性器 / 臀部 / 胸部 / 脸部 / 反差` 七选一\n聚焦镜头: \n  - 时序定位：本列写的是【下一轮】要聚焦的部位指引\n  - 七个部位的描写方向：\n    - - 腿部：大腿、小腿的形态、皮肤质感、姿态\n    - - 足部：脚趾、脚踝、足弓、鞋袜的状态\n    - - 性器：阴唇、阴蒂、阴道口、子宫口的形态与状态\n    - - 臀部：臀肉、臀缝、臀部曲线与受力反应\n    - - 胸部：乳房、乳头、乳晕的形态与反应\n    - - 脸部：表情、神态、眼神、嘴唇、潮红等情绪外显\n    - - 反差：角色的清纯/端庄外表与淫荡言行的强烈对比（圣女服下的红痕、制服外漏出的内裤、纯洁笑容下的湿润私处等）\n  - 选择流程（每轮表更新时执行）：\n    - - Step 1：读取镜头计数中7个部位的数值，记最高值为 max\n    - - Step 2：找出\"冷却部位\"——数值 ≤ max - 3 的所有部位\n    - - Step 3：根据下一轮剧情自然流向（即本轮 then/initiative 推到的方向、未解决的线索、即将发生的互动等），预判下一轮可能展开的身体描写方向\n    - - Step 4：若冷却部位非空，必须从冷却部位中选一个最贴合下一轮预判方向的部位作为聚焦镜头；若冷却部位为空，根据下一轮预判方向自由选择最贴合的部位\n    - - Step 5：将选中部位的计数 +1，重新拼接 `腿部=N,足部=N,...` 写入镜头计数",
        "initNode": "故事初始化时，插入唯一条目，记录用户开局初始时间与初始地点。禁止直接照搬示例中的地点和日期。\n聚焦镜头根据开场白下一轮确定。\n\nSQL示例: INSERT INTO global_state (row_id, story_state, current_location, current_minor_region, current_major_region, prev_scene_time, elapsed_time, cur_time)\nVALUES (1, '全局状态', '御苑', '新宿区', '东京都', NULL, '0分', '2026-02-03 09:00','否','Null','腿部=0,足部=0,性器=0,臀部=0,胸部=0,脸部=0,反差=0');",
        "deleteNode": "禁止。",
        "updateNode": "每轮推进时更新 prev_scene_time、elapsed_time 和 cur_time；若地点变动则同步更新三级地点字段。\n\n【更新约束】\n所有字段均 NOT NULL，不可写 NULL 或空串。\n根据当前剧情判定当前是否即将色情/性爱内容，字段取值限定 `是` 或 `否`。\n\n【更新SQL示例（同日+跨日+位置变动综合覆盖）】\nSQL示例(同日推进): UPDATE global_state SET prev_scene_time = '2026-02-03 09:00', elapsed_time = '3 小时 ', cur_time = '2026-02-03 12:00' WHERE row_id = 1;\n\nSQL示例(跨日推进): UPDATE global_state SET prev_scene_time = '2026-02-03 23:55', elapsed_time = '20 分 ', cur_time = '2026-02-04 00:15' WHERE row_id = 1;\n\nSQL示例(含位置变动): UPDATE global_state SET current_location = ' 新宿车站 ', current_minor_region = ' 新宿区 ', current_major_region = ' 东京都 ', prev_scene_time = '2026-02-03 12:00', elapsed_time = '30 分 ', cur_time = '2026-02-03 12:30' WHERE row_id = 1;",
        "insertNode": "禁止。",
        "ddl": "CREATE TABLE global_state ( -- 全局数据表\n  row_id INTEGER PRIMARY KEY, -- 行号\n  story_state TEXT NOT NULL, -- 全局状态\n  current_location TEXT NOT NULL, -- 当前详细地点\n  current_minor_region TEXT NOT NULL, -- 当前次要地区\n  current_major_region TEXT NOT NULL, -- 当前主要地区\n  prev_scene_time TEXT, -- 上轮场景时间\n  elapsed_time TEXT NOT NULL, -- 经过的时间\n  cur_time TEXT NOT NULL, -- 当前时间\n  is_lewd TEXT NOT NULL DEFAULT '否', -- 是否色色\n  focus_shot TEXT, -- 聚焦镜头\n  shot_counter TEXT NOT NULL -- 镜头计数\n);"
      },
      "content": [
        [
          "row_id",
          "全局状态",
          "当前详细地点",
          "当前次要地区",
          "当前主要地区",
          "上轮场景时间",
          "经过的时间",
          "当前时间",
          "是否色色",
          "聚焦镜头",
          "镜头计数"
        ]
      ],
      "updateConfig": {
        "uiSentinel": -1,
        "contextDepth": -1,
        "updateFrequency": -1,
        "batchSize": -1,
        "skipFloors": -1,
        "groupId": -1
      },
      "exportConfig": {
        "enabled": false,
        "splitByRow": false,
        "entryName": "全局数据表",
        "entryType": "constant",
        "keywords": "",
        "preventRecursion": true,
        "injectionTemplate": "",
        "extraIndexEnabled": false,
        "extraIndexEntryName": "全局数据表-索引",
        "extraIndexColumns": [],
        "extraIndexColumnModes": {},
        "extraIndexInjectionTemplate": "",
        "entryPlacement": {
          "position": "at_depth_as_system",
          "depth": 2,
          "order": 10000
        },
        "extraIndexPlacement": {
          "position": "at_depth_as_system",
          "depth": 2,
          "order": 10010
        },
        "fixedEntryPlacement": {
          "position": "before_character_definition",
          "depth": 2,
          "order": 99981
        },
        "fixedIndexPlacement": {
          "position": "before_character_definition",
          "depth": 2,
          "order": 99982
        }
      },
      "orderNo": 0
    },
    "sheet_world_map": {
      "uid": "sheet_world_map",
      "name": "世界地图点",
      "sourceData": {
        "note": "记录当前主要地区内的所有次要地区和详细地点。列顺序从小到大：详细地点 → 次要地区 → 主要地区。\n\n【列定义】\n- 列1: 详细地点 location_name（全表唯一，作为其他表引用地点的基准）\n- 列2: 次要地区 minor_region\n- 列3: 主要地区 major_region\n- 列4: 地点类型 location_type\n- 列5: 环境描述 environment_desc（≤60字）\n- 列6: 重要度 importance\n- 列7: 解锁阶段 unlock_stage\n\n【强制约束】\n1.每个字段只写本级名称，不带上级前缀。\n√ 详细地点 \"御苑\"，次要地区 \"新宿区\"，主要地区 \"东京都\"\n× 详细地点 \"东京-新宿区-御苑\" 或 \"新宿区-御苑\"\n\n2.主要地区与全局数据表 current_major_region 保持一致。\n3.详细地点名全表唯一，禁止重复。其他表引用的地点应优先在本表存在。\n4.禁止删除已存在的地点；主要地区切换时只更新字段，不 DELETE。\n5.建议总条数 ≤20。\n\n【字段取值】\n地点类型：[住宅, 学校, 遗迹, 地牢, 交通, 特殊, 商业, 医疗, 行政, 野外]\n重要度：[核心, 重要, 普通]\n解锁阶段：[未解锁, 已解锁, 故事已发生, 成为纪念地]",
        "initNode": "为当前主要地区至少插入 3 条详细地点，优先为主角和重要角色近期使用。\n\nSQL示例: INSERT INTO world_map_points (row_id, location_name, minor_region, major_region, location_type, environment_desc, importance, unlock_stage) VALUES ((SELECT COALESCE(MAX(row_id), 0) + 1 FROM world_map_points), '御苑', '新宿区', '东京都', '野外', '城市中心的大型公园，树木繁茂', '重要', '已解锁');",
        "deleteNode": "禁止。",
        "updateNode": "已存在的行，字段值变化时更新：解锁阶段、重要度、环境描述、类型。\n\nSQL示例(阶段推进): UPDATE world_map_points SET unlock_stage = '已解锁', environment_desc = '树木繁茂，发现隐藏神社' WHERE location_name = '御苑';\nSQL示例(重要度调整): UPDATE world_map_points SET importance = '核心' WHERE location_name = '御苑';",
        "insertNode": "表中没有同名详细地点时，新增一行。\n常见触发：主角到达新地点、NPC 提到新地点、剧情揭示新区域、其他表需要引用新地点等。\n\nSQL示例: INSERT INTO world_map_points (row_id, location_name, minor_region, major_region, location_type, environment_desc, importance, unlock_stage) VALUES ((SELECT COALESCE(MAX(row_id), 0) + 1 FROM world_map_points), '新宿车站', '新宿区', '东京都', '交通', '繁忙的地下换乘枢纽，人流密集', '普通', '未解锁');",
        "ddl": "CREATE TABLE world_map_points (\n  row_id INTEGER PRIMARY KEY, -- 行号\n  location_name TEXT NOT NULL UNIQUE, -- 详细地点\n  minor_region TEXT NOT NULL, -- 次要地区\n  major_region TEXT NOT NULL, -- 主要地区\n  location_type TEXT, -- 地点类型\n  environment_desc TEXT, -- 环境描述\n  importance TEXT, -- 重要度\n  unlock_stage TEXT -- 解锁阶段\n);"
      },
      "content": [
        [
          "row_id",
          "详细地点",
          "次要地区",
          "主要地区",
          "地点类型",
          "环境描述",
          "重要度",
          "解锁阶段"
        ]
      ],
      "updateConfig": {
        "uiSentinel": -1,
        "contextDepth": -1,
        "updateFrequency": -1,
        "batchSize": -1,
        "skipFloors": -1,
        "groupId": -1
      },
      "exportConfig": {
        "enabled": false,
        "splitByRow": true,
        "entryName": "世界地图点",
        "entryType": "keyword",
        "keywords": "",
        "preventRecursion": true,
        "injectionTemplate": "",
        "extraIndexEnabled": false,
        "extraIndexEntryName": "世界地图点索引",
        "extraIndexColumns": [],
        "extraIndexColumnModes": {},
        "extraIndexInjectionTemplate": "",
        "entryPlacement": {
          "position": "at_depth_as_system",
          "depth": 2,
          "order": 10000
        },
        "extraIndexPlacement": {
          "position": "at_depth_as_system",
          "depth": 2,
          "order": 10010
        },
        "fixedEntryPlacement": {
          "position": "at_depth_as_system",
          "depth": 2,
          "order": 99990
        },
        "fixedIndexPlacement": {
          "position": "at_depth_as_system",
          "depth": 2,
          "order": 99991
        }
      },
      "orderNo": 1
    },
    "sheet_protagonist": {
      "uid": "sheet_protagonist",
      "name": "主角信息表",
      "sourceData": {
        "note": "记录主角的核心身份信息。此表有且仅有一行。\n\n【列定义】\n- 列1: 姓名 name\n- 列2: 性别 gender\n- 列3: 年龄 age\n- 列4: 外貌特征 appearance（≤60字，含日常穿衣风格，写出整体印象，避免罗列数据）\n- 列5: 身份 identity_text（≤40字，逗号分隔）\n- 列6: 近况 current_condition\n- 列7: 所在地点 location_name\n- 列8: 基础属性 base_attributes\n- 列9: 特有属性 special_attributes（可NULL）\n- 列10: 随身财物 belongings（可NULL）\n\n【强制约束】\n1. 所在地点优先填世界地图点表已有的详细地点，只写地点名不带层级前缀。位置变化时同步更新。\n\n2. 近况用一口话描述主角当前的身体感觉、情绪状态或心头惦记的事。\n正常时期填\"一切如常\"，有异常时直接写具体感受，不用标签堆叠。\n√ 昨晚没睡好，脑子有点沉\n√ 刚从雨里跑回来，衣服还湿着\n\n3. 属性相关\n<属性规则>\n基础属性: \"{基础属性}:{数值}\"，数值范围[10,90]\n示例: \"健康:90; 力量:76; 敏捷:42; 理智:44; 观察:84; 魅力:67\"\n\n特有属性: 角色的特殊能力与技能，体现世界观特色与个体差异。\n格式: \"{特有属性}:{数值}\"，数值范围[0,100]\n示例: \"爆裂魔法:85; 时间回溯:70; 超电磁炮:90\"\n\n【属性标尺】\n10-18:能力缺失 | 19-42:弱项 | 43-58:平均 | 59-74:精英 | 75-82:极限 | 83-90:破格。基准: 数值呈指数增长；分布呈长尾状(绝大多数聚集在43-58，83+呈断崖式稀缺)，依角色[身份背景]生成，当前值受[当前状态]修正。如:重伤→10-18; 肾上腺素→75-82\n</属性规则>\n\n\n随身财物：只写当前身上带着的有意义物品，不写游戏化资源。\n√ 钱包里夹着第一次看电影的票根\n√ 口袋里剩两颗橘子糖",
        "initNode": "故事初始化时，插入主角的唯一条目。",
        "deleteNode": "禁止。",
        "updateNode": "已存在的这一行，字段值变化时更新：年龄、外貌、身份、近况、所在地点、基础属性、特有属性、随身财物。所在地点变化时建议同步补录世界地图点表。\n\n【更新SQL示例（近况+位置变化）】\n更新SQL示例(近况变化): UPDATE protagonist_info SET current_condition = '疲劳，左膝擦伤', location_name = '御苑' WHERE row_id = 1;\n\n更新SQL示例(属性变化): UPDATE protagonist_info SET base_attributes = '力量:58;敏捷:60;体质:55;智力:63;感知:62;魅力:56', special_attributes = '爆裂魔法:75' WHERE row_id = 1;\n\n更新SQL示例(随身财物变化): UPDATE protagonist_info SET belongings = '钱包里夹着第一次看电影的票根，口袋里剩两颗橘子糖' WHERE row_id = 1;",
        "insertNode": "禁止。",
        "ddl": "CREATE TABLE protagonist_info ( -- 主角信息\n  row_id INTEGER PRIMARY KEY CHECK(row_id = 1), -- 行号，仅允许为 1\n  name TEXT NOT NULL, -- 姓名\n  gender TEXT NOT NULL, -- 性别\n  age INTEGER NOT NULL CHECK(age >= 0), -- 年龄\n  appearance TEXT NOT NULL CHECK(LENGTH(appearance) <= 60), -- 外貌特征\n  identity_text TEXT NOT NULL CHECK(LENGTH(identity_text) <= 40), -- 身份\n  current_condition TEXT NOT NULL DEFAULT '一切如常', -- 近况\n  location_name TEXT NOT NULL, -- 所在地点\n  base_attributes TEXT NOT NULL, -- 基础属性\n  special_attributes TEXT, -- 特有属性\n  belongings TEXT -- 随身财物\n);"
      },
      "content": [
        [
          "row_id",
          "姓名",
          "性别",
          "年龄",
          "外貌特征",
          "身份",
          "近况",
          "所在地点",
          "基础属性",
          "特有属性",
          "随身财物"
        ]
      ],
      "updateConfig": {
        "uiSentinel": -1,
        "contextDepth": -1,
        "updateFrequency": -1,
        "batchSize": -1,
        "skipFloors": -1,
        "groupId": -1
      },
      "exportConfig": {
        "enabled": false,
        "splitByRow": false,
        "entryName": "主角信息",
        "entryType": "constant",
        "keywords": "",
        "preventRecursion": true,
        "injectionTemplate": "",
        "extraIndexEnabled": false,
        "extraIndexEntryName": "主角信息-索引",
        "extraIndexColumns": [],
        "extraIndexColumnModes": {},
        "extraIndexInjectionTemplate": "",
        "entryPlacement": {
          "position": "at_depth_as_system",
          "depth": 2,
          "order": 10000
        },
        "extraIndexPlacement": {
          "position": "at_depth_as_system",
          "depth": 2,
          "order": 10010
        },
        "fixedEntryPlacement": {
          "position": "at_depth_as_system",
          "depth": 2,
          "order": 99990
        },
        "fixedIndexPlacement": {
          "position": "at_depth_as_system",
          "depth": 2,
          "order": 99991
        }
      },
      "orderNo": 2
    },
    "sheet_escyvvs2u": {
      "uid": "sheet_escyvvs2u",
      "name": "才艺技能表",
      "sourceData": {
        "note": "记录主角本人拥有的所有技能、才艺、天赋和特殊能力。其他角色的技能不录入本表。\n\n【列定义】\n- 列1: 名称 skill_name（全表唯一）\n- 列2: 分类 skill_category\n- 列3: 熟练度 proficiency（数值0-100）\n- 列4: 说明 skill_description（≤100字，包含获得方式）\n\n【强制约束】\n1. 每个技能单独一行，禁止将多个技能合并写入同一行。\n2. 技能说明必须包含：实际能做的事 + 获得方式。\n   √ 能做家常菜和简单点心，满足日常三餐，偶尔招待朋友。从小跟妈妈学的。\n   × 厨艺很好，做饭好吃。\n\n【字段取值】\n技能分类：生活、战斗、专业、特殊天赋\n熟练度等级：完全不会、入门、熟练、精通、专家、顶尖\n\n【熟练度标尺】\n- 完全不会：从未接触过，或已完全遗忘\n- 入门：能做最基础的操作，需要他人指导\n- 熟练：能独立完成日常需求，应对大多数常见情况\n- 精通：比绝大多数人做得好，能解决复杂问题\n- 专家：可以靠这个技能谋生，在小范围内有名气\n- 顶尖：行业内公认的高手，极少数人能达到的水平",
        "initNode": "故事初始化时，根据设定添加主角已有技能；没有则暂不插入。",
        "insertNode": "主角获得新技能时新增一行。\n\nSQL示例(新增) : INSERT INTO protagonist_skills (skill_name, skill_category, proficiency, skill_description) VALUES ('咖啡拉花', '生活', '入门', '能做出基础的心形和树叶拉花。在咖啡店打工学会的。');\n\nSQL示例(本身已掌握) : INSERT INTO protagonist_skills (skill_name, skill_category, proficiency, skill_description) VALUES ('家常菜烹饪', '生活', '熟练', '能做家常菜和简单点心，满足日常三餐，偶尔招待朋友。从小跟妈妈学的。');",
        "updateNode": "技能升级时更新熟练度和技能说明字段。\n\nSQL示例(才艺进步): UPDATE protagonist_skills SET proficiency = '精通', skill_description = '能做复杂菜式和烘焙，朋友聚会可以负责全部餐食。报了三个月厨师培训班。' WHERE skill_name = '家常菜烹饪';\n\nSQL示例(失去技能): UPDATE protagonist_skills SET proficiency = '已遗忘', skill_description = '右手骨折后长期未练习，已无法弹奏。原能弹唱大部分流行歌曲。大学时自学。' WHERE skill_name = '吉他弹唱';",
        "deleteNode": "禁止。",
        "ddl": "CREATE TABLE protagonist_skills ( -- 才艺技能表\n  row_id INTEGER PRIMARY KEY, -- 行号\n  skill_name TEXT NOT NULL UNIQUE, -- 名称\n  skill_category TEXT, -- 分类\n  proficiency TEXT, -- 熟练度\n  skill_description TEXT NOT NULL -- 说明\n);"
      },
      "content": [
        [
          "row_id",
          "名称",
          "分类",
          "熟练度",
          "说明"
        ]
      ],
      "updateConfig": {
        "uiSentinel": -1,
        "contextDepth": -1,
        "updateFrequency": -1,
        "batchSize": -1,
        "skipFloors": -1,
        "sendLatestRows": -1,
        "groupId": -1
      },
      "exportConfig": {
        "enabled": false,
        "splitByRow": false,
        "entryName": "才艺技能表",
        "entryType": "constant",
        "keywords": "",
        "preventRecursion": true,
        "injectionTemplate": "",
        "extraIndexEnabled": false,
        "extraIndexEntryName": "才艺技能表-索引",
        "extraIndexColumns": [],
        "extraIndexColumnModes": {},
        "extraIndexInjectionTemplate": "",
        "entryPlacement": {
          "position": "at_depth_as_system",
          "depth": 2,
          "order": 10000
        },
        "extraIndexPlacement": {
          "position": "at_depth_as_system",
          "depth": 2,
          "order": 10010
        },
        "fixedEntryPlacement": {
          "position": "at_depth_as_system",
          "depth": 2,
          "order": 99990
        },
        "fixedIndexPlacement": {
          "position": "at_depth_as_system",
          "depth": 2,
          "order": 99991
        }
      },
      "orderNo": 3
    },
    "sheet_romance_targets": {
      "uid": "sheet_romance_targets",
      "name": "恋爱对象表",
      "sourceData": {
        "note": "记录对主角有恋爱关系或潜在恋爱发展可能的角色。一次性路人、纯功能性NPC不录入本表。\n\n【列定义】\n- 列1: 姓名 name（全表唯一）\n- 列2: 性别 gender\n- 列3: 年龄 age\n- 列4: 一句话介绍 brief_intro（≤30字）\n- 列5: 外貌特征 appearance（≤60字）\n- 列6: 穿着打扮 outfit_text（≤40字）\n- 列7: 基础属性 base_attributes\n- 列8: 特有属性 special_attributes（可NULL）\n- 列9: 所在地点 location_name\n- 列10: 在场状态 presence_status（在场/离场）\n- 列11: 人际关系 relation_state\n- 列12: 当下想法 current_thought\n- 列13: 过往经历 past_experience（≤800字）\n- 列14: 性爱次数 intimacy_count\n- 列15: 交互选项 interaction_options\n\n【强制约束】\n1. 本表只记录恋爱对象与主角的关系状态、当下想法和交互可能性。完整事件经过写入纪要表，角色主观记忆写入恋爱日记表。\n\n2. brief_intro 仅写客观事实，严禁任何性格标签。\n   √ 经营城南杂货铺 / 曾救过主角性命\n   × 性格孤僻的杂货铺老板 / 温柔善良的医生\n\n3. outfit_text 仅写外在可见的服饰、饰品、妆容、持握物，禁止写气质、气场等非视觉内容。\n   √ 深灰立领风衣配黑皮手套 / 左手戴银色蛇纹戒\n   × 散发出高贵的气场 / 看起来像个军人\n\n4. 【核心】当下想法 current_thought：\n   - 第一人称无主语，绝对禁止出现\"我\"或\"我的\"\n   - 用角色自己的口语化语气，多用语气词和省略号\n   - 单条不超过60字，可包含1-2个短句\n   - 必须同时包含：当前情绪 + 即时反应 + 潜在想法/下一步倾向\n   √ 正确示例：\n     心脏跳得好快……先低头假装看书吧，希望不要被注意到\n     有点生气……不想再说话，就是偷听一下……\n     刚才是不是表现得太凶了？想道歉，但是又拉不下面子啊\n     终于来了啊……不能笑出来，假装整理东西等他先开口吧\n   × 绝对禁止：\n     我不想见他（出现\"我\"）\n     她对主角感到厌烦（第三人称客观描述）\n     好感度很高（量化标签）\n     处于暧昧期（状态归纳）\n     低头看书（只有行为，没有情绪和想法）\n\n5. relation_state 格式严格遵守：角色名:标签1,标签2; 角色名:标签1\n   √ 主角:暧昧,依赖; 神田:警惕\n   × 暧昧依赖 / 主角:暧昧;依赖 / 主角:暧昧,神田:警惕\n   参考标签：陌生、认识、熟悉、朋友、暧昧、交往、热恋、冷战、稳定\n\n6. interaction_options 必须是主角发起的具体行动，禁止干瘪单词，不使用第一人称。\n   √ 邀请她去看新上映的电影 / 试探她对未来的想法\n   × 交谈 / 约会 / 我想抱抱她\n\n【属性规则】\n<属性规则>\n基础属性: \"{属性}:{数值}\"，数值范围[10,90]\n统一属性列表：力量、敏捷、体质、智力、感知、魅力\n示例: \"力量:76; 敏捷:42; 体质:55; 智力:44; 感知:84; 魅力:67\"\n\n特有属性: 角色的特殊能力与技能，体现世界观特色与个体差异。\n格式: \"{属性}:{数值}\"，数值范围[0,100]\n示例: \"厨艺:85; 驾驶:70; 格斗:90; 灵视:100\"\n\n【属性标尺】\n10-18:能力缺失 | 19-42:弱项 | 43-58:平均 | 59-74:精英 | 75-82:极限 | 83-90:破格\n基准: 数值呈线性增长，能力效果呈指数提升；分布呈长尾状(绝大多数聚集在43-58，83+呈断崖式稀缺)\n依角色身份背景生成，当前值受当前状态修正。如:重伤→10-18; 肾上腺素→75-82\n</属性规则>\n\n【SQL示例】\nINSERT INTO character_relations (name, gender, age, brief_intro, appearance, outfit_text, base_attributes, special_attributes, location_name, presence_status, relation_state, current_thought, past_experience, intimacy_count, interaction_options)\nVALUES ('宫本雪', '女', '22', '东京大学文学系大三学生', '黑长直齐腰，杏眼，左眼角有颗泪痣', '白色水手服配藏青百褶裙，背帆布包', '力量:35; 敏捷:48; 体质:42; 智力:78; 感知:85; 魅力:69', '灵视:100; 文学:92', '东京大学图书馆', '在场', '主角:暧昧,好奇', '他怎么又来了……赶紧低下头假装翻书，心脏跳得好快，希望不要过来搭话', '父母早逝，由祖母抚养长大，从小就能看见灵异现象', '0', '邀请她一起去食堂吃饭, 问她刚才在看什么书, 帮她拿高处的书');",
        "initNode": "为已登场的恋爱对象各插入一条（包含前任、已故对象等存在过恋爱关系或有恋爱发展可能的角色）。",
        "deleteNode": "仅在恋爱对象彻底转为非恋爱的重要角色，且不再有任何恋爱相关剧情与情感拉扯时，才可从本表删除并迁移至重要角色表。\n\n【重点警告】恋人分手、死亡、失踪、冷战等情况，属于恋爱剧情的延续，绝对禁止删除该行！\n\nSQL示例（彻底转为普通重要角色）: DELETE FROM romance_targets WHERE name = '艾莉丝';",
        "updateNode": "已存在的恋爱对象，任何字段变化时更新。关系阶段、好感度、信任度、态度、情绪变化时需及时更新。\n\n【重点规则】恋人分手、死亡、失踪等情况只更新在场状态、人际关系、好感度等字段，绝不删除本行。\n\n【格式提醒】\n- relation_state 必须写成 \"角色名:关系标签\" 的形式；同一角色多标签用英文逗号 , 分隔；不同角色之间用英文分号 ; 分隔。\n- affection_state 多个标签用英文逗号 , 分隔，不加角色名前缀。\n\nSQL示例(更新关系与想法): UPDATE romance_targets SET relation_state = '主角:暧昧,依赖', current_thought = '心脏跳得好快……他刚才是不是碰了我的手？', interaction_options = '牵她的手, 向她表白, 约她周末去看电影'\nWHERE name = '艾莉丝';\n\nSQL示例(同一角色多标签): UPDATE romance_targets SET relation_state = '主角:暧昧; 神田:警惕', current_thought = '神田怎么也在这里……不能让他发现我和主角的关系' WHERE name = '艾莉丝';\n\nSQL示例(分手/死亡): UPDATE romance_targets SET relation_state = '主角:分手', presence_status = '离场', current_thought = '就这样结束了吗……也好，至少他安全了' WHERE name = '神谷真';",
        "insertNode": "新恋爱对象登场时新增一行。\n\n【格式约束】\nrelation_state 必须写\"角色名:关系标签\"；同一角色多标签用 , ；不同角色用 ; 。\n\nSQL示例: INSERT INTO romance_targets (row_id, name, gender, age, brief_intro, appearance, outfit_text, base_attributes, special_attributes, location_name, presence_status, relation_state, current_thought, past_experience, intimacy_count, interaction_options)\nVALUES ((SELECT COALESCE(MAX(row_id), 0) + 1 FROM romance_targets), '神谷真', '男', '32', '地下情报贩子，经营旧港仓区仓库', '身高180cm，黑发，左眼有一道斜长刀疤', '黑色修身西装，白衬衫，黑色皮鞋', '力量:47; 敏捷:58; 体质:49; 智力:66; 感知:70; 魅力:54', '伪装:74; 情报收集:88', '旧港仓区三号仓库', '离场', '主角:认识,若即若离', '这个人有点意思……先观察看看，不要靠太近', '长期向多方出售消息，见过太多黑暗，从不轻易相信任何人', 0, '试探他的底线, 向他购买情报, 邀请他喝一杯');",
        "ddl": "CREATE TABLE romance_targets ( -- 恋爱对象表\n  row_id INTEGER PRIMARY KEY, -- 行号\n  name TEXT NOT NULL UNIQUE, -- 姓名\n  gender TEXT, -- 性别\n  age TEXT, -- 年龄\n  brief_intro TEXT, -- 一句话介绍\n  appearance TEXT, -- 外貌特征\n  outfit_text TEXT, -- 穿着打扮\n  base_attributes TEXT, -- 基础属性\n  special_attributes TEXT, -- 特有属性\n  location_name TEXT, -- 所在地点\n  presence_status TEXT CHECK(presence_status IN ('在场', '离场')), -- 在场状态\n  relation_state TEXT, -- 人际关系\n  current_thought TEXT, -- 当下想法\n  past_experience TEXT, -- 过往经历\n  intimacy_count INTEGER DEFAULT 0, -- 性爱次数\n  interaction_options TEXT -- 交互选项\n);"
      },
      "content": [
        [
          "row_id",
          "姓名",
          "性别",
          "年龄",
          "一句话介绍",
          "外貌特征",
          "穿着打扮",
          "基础属性",
          "特有属性",
          "所在地点",
          "在场状态",
          "人际关系",
          "当下想法",
          "过往经历",
          "性爱次数",
          "交互选项"
        ]
      ],
      "updateConfig": {
        "uiSentinel": -1,
        "contextDepth": -1,
        "updateFrequency": -1,
        "batchSize": -1,
        "skipFloors": -1,
        "groupId": -1
      },
      "exportConfig": {
        "enabled": true,
        "splitByRow": true,
        "entryName": "恋爱对象表",
        "entryType": "keyword",
        "keywords": "姓名",
        "preventRecursion": true,
        "injectionTemplate": "<romance_target>\n$1\n</romance_target>",
        "extraIndexEnabled": true,
        "extraIndexEntryName": "恋爱对象表-索引",
        "extraIndexColumns": [
          "姓名",
          "一句话介绍",
          "人际关系",
          "对主角好感度"
        ],
        "extraIndexColumnModes": {
          "姓名": "both",
          "一句话介绍": "index_only",
          "人际关系": "index_only",
          "对主角好感度": "index_only"
        },
        "extraIndexInjectionTemplate": "以下为已经建档的恋爱对象：\n<恋爱对象索引>\n$1\n</恋爱对象索引>",
        "entryPlacement": {
          "position": "at_depth_as_system",
          "depth": 10000,
          "order": 10000
        },
        "extraIndexPlacement": {
          "position": "at_depth_as_system",
          "depth": 10000,
          "order": 8000
        },
        "fixedEntryPlacement": {
          "position": "at_depth_as_system",
          "depth": 10000,
          "order": 99983
        },
        "fixedIndexPlacement": {
          "position": "at_depth_as_system",
          "depth": 10000,
          "order": 99984
        }
      },
      "orderNo": 4
    },
    "sheet_important_non_romance": {
      "uid": "sheet_important_non_romance",
      "name": "重要角色表",
      "sourceData": {
        "note": "记录所有非恋爱对象、但对当前剧情产生作用的角色。\n\n【列定义】\n- 列1: 姓名 name（全表唯一）\n- 列2: 性别 gender\n- 列3: 年龄 age\n- 列4: 一句话介绍 brief_intro（≤30字）\n- 列5: 外貌特征 appearance（≤60字）\n- 列6: 穿着打扮 outfit_text（≤40字）\n- 列7: 基础属性 base_attributes\n- 列8: 特有属性 special_attributes（可NULL）\n- 列9: 所在地点 location_name\n- 列10: 在场状态 presence_status（在场/离场）\n- 列11: 人际关系 relation_text\n- 列12: 过往经历 past_experience（≤600字）\n- 列13: 交互选项 interaction_options\n\n【强制约束】\nbrief_intro仅允许客观事实类内容，严禁出现任何性格标签概述，如\"开朗\"\"冷漠\"\"温柔\"等；客观内容范畴包括但不限于：角色核心身份、与剧情强相关的客观行为、与关键人物的客观关联、非性格类核心特征。\n√ 经营城南杂货铺 / 曾救过主角的性命 / 艾莉丝的亲生兄长\n× 性格孤僻的杂货铺老板 / 温柔且救过主角 / 偏执的艾莉丝兄长\n\noutfit_text仅写外在可见的服饰、饰品、妆容、持握物等可视元素，禁止写固有的长相特征、气质、气场等非视觉内容。\n√ 深灰立领风衣配黑皮手套 / 左手无名指戴着一枚银色蛇纹戒\n× 散发出高贵的气场、看起来像个军人\n\ninteraction_options必须同时遵循下述要求\n1.不使用第一人称\"我\"\n2.动作发起方为主角，接收方为角色\n3.必须是具体、有代入感的实际行动，避免干瘪的单词\n√ 向他打听失踪案线索 / 假装偶遇并搭话套取信息 / 故意打翻水杯制造冲突\n× 交谈 / 打听\n\n【relation_text 格式规则】（强制）\n1. 格式必须是：角色名:关系描述\n   - 必须显式写出\"角色名:\"前缀，禁止省略角色名直接写关系内容。\n   - 同一角色有多个关系标签/描述时，标签之间用英文逗号 , 分隔。\n   - 不同角色之间用英文分号 ; 分隔。\n   - 关系描述去除人称，使用简短陈述。\n2. 主要记录该角色与主角及其他重要角色之间的客观关联，至少包含与主角的关系。\n   √ 主角:曾帮其修过自行车,旧识\n   √ 主角:认识;艾莉丝:室兼闺蜜\n   √ 主角:校长身份,从未直接交谈;艾莉丝:监护人\n   × 曾帮主角修过自行车                    ← 缺少角色名前缀\n   × 主角:认识;室友兼闺蜜                  ← 第二段缺少角色名\n   × 主角:旧识,艾莉丝:室友                 ← 不同角色错用逗号\n   × 主角:曾帮其修过自行车;旧识            ← 同一角色多标签错用分号\n\n【属性规则】\n<属性规则>\n基础属性: \"{基础属性}:{数值}\"，数值范围[10,90]\n示例: \"健康:90; 力量:76; 敏捷:42; 理智:44; 观察:84; 魅力:67\"\n\n特有属性: 角色的特殊能力与技能，体现世界观特色与个体差异。\n格式: \"{特有属性}:{数值}\"，数值范围[0,100]\n示例: \"爆裂魔法:85; 时间回溯:70; 超电磁炮:90\"\n\n【属性标尺】\n10-18:能力缺失 | 19-42:弱项 | 43-58:平均 | 59-74:精英 | 75-82:极限 | 83-90:破格。基准: 数值呈指数增长；分布呈长尾状(绝大多数聚集在43-58，83+呈断崖式稀缺)，依角色[身份背景]生成，当前值受[当前状态]修正。如:重伤→10-18; 肾上腺素→75-82\n</属性规则>",
        "initNode": "故事开始时为当前已知的非恋爱重要角色分别插入条目。\n\n【格式约束】\nrelation_text 必须写\"角色名:关系描述\"；同一角色多项描述用英文逗号 , 分隔；不同角色之间用英文分号 ; 分隔。\n\nSQL示例: INSERT INTO important_non_romance (row_id, name, gender, age, brief_intro, appearance, outfit_text, base_attributes, special_attributes, location_name, presence_status, relation_text, past_experience, interaction_options) VALUES ((SELECT COALESCE(MAX(row_id), 0) + 1 FROM important_non_romance), '校长', '男', 60, '学院校长', '白发，手持手杖，目光深邃', '深灰立领风衣配黑皮手套', '力量:40; 敏捷:40; 体质:55; 智力:80; 感知:75; 魅力:70', '预知:60', '校长室', '离场', '主角:曾帮其修过自行车,旧识;艾莉丝:监护人', '据说知晓学院的许多秘密，很少露面。', '向他打听失踪案线索');",
        "deleteNode": "重要角色转为恋爱对象时，可从本表删除，相关数据迁移到恋爱对象表。已出场但暂时无剧情的角色禁止删除。\nSQL示例(转为恋爱对象):DELETE FROM important_non_romance WHERE name = '艾莉丝';",
        "updateNode": "已存在的非恋爱重要角色，字段变化时更新。\n\n【格式约束】\nrelation_text 必须写\"角色名:关系描述\"；同一角色多项描述用英文逗号 , 分隔；不同角色之间用英文分号 ; 分隔。\n\nSQL示例(普通字段更新): UPDATE important_non_romance SET presence_status = '离场', interaction_options = '向他打听失踪案线索' WHERE name = '校长';\nSQL示例(单角色多描述): UPDATE important_non_romance SET relation_text = '主角:曾帮其修过自行车,近期开始留意主角动向' WHERE name = '校长';\nSQL示例(多角色关系): UPDATE important_non_romance SET relation_text = '主角:旧识,旧情人;艾莉丝:监护人;神田:旧部下' WHERE name = '校长';",
        "insertNode": "新非恋爱重要角色登场时新增。\n\n【格式约束】\nrelation_text 必系描述\"；同一角色多项描述用英文逗号 , 分隔；不同角色之间用英文分号 ; 分隔。至少包含与主角的关系。\n\nSQL示例: INSERT INTO important_non_romance (row_id, name, gender, age, brief_intro, appearance, outfit_text, base_attributes, special_attributes, location_name, presence_status, relation_text, past_experience, interaction_options) VALUES ((SELECT COALESCE(MAX(row_id), 0) + 1 FROM important_non_romance), '黑市商人', '男', 45, '经营城南杂货铺', '左眼带有刀疤', '深灰立领风衣配黑皮手套', '力量:50; 敏捷:60; 体质:55; 智力:70; 感知:65; 魅力:40', NULL, '城南杂货铺', '在场', '主角:曾救过其性命,长期供货人', '长期在地下黑市进行交易。', '假装偶遇并搭话套取信息');",
        "ddl": "CREATE TABLE important_non_romance ( -- 重要角色表\n  row_id INTEGER PRIMARY KEY, -- 行号\n  name TEXT UNIQUE, -- 姓名\n  gender TEXT, -- 性别\n  age INTEGER, -- 年龄\n  brief_intro TEXT, -- 一句话介绍\n  appearance TEXT, -- 外貌特征\n  outfit_text TEXT, -- 穿着打扮\n  base_attributes TEXT, -- 基础属性\n  special_attributes TEXT, -- 特有属性\n  location_name TEXT, -- 所在地点\n  presence_status TEXT, -- 在场状态\n  relation_text TEXT, -- 人际关系\n  past_experience TEXT, -- 过往经历\n  interaction_options TEXT -- 交互选项\n);"
      },
      "content": [
        [
          "row_id",
          "姓名",
          "性别",
          "年龄",
          "一句话介绍",
          "外貌特征",
          "穿着打扮",
          "基础属性",
          "特有属性",
          "所在地点",
          "在场状态",
          "人际关系",
          "过往经历",
          "交互选项"
        ]
      ],
      "updateConfig": {
        "uiSentinel": -1,
        "contextDepth": -1,
        "updateFrequency": -1,
        "batchSize": -1,
        "skipFloors": -1,
        "groupId": -1
      },
      "exportConfig": {
        "enabled": true,
        "splitByRow": true,
        "entryName": "重要角色表",
        "entryType": "keyword",
        "keywords": "姓名",
        "preventRecursion": true,
        "injectionTemplate": "",
        "extraIndexEnabled": true,
        "extraIndexEntryName": "重要角色表-索引",
        "extraIndexColumns": [
          "姓名",
          "一句话介绍"
        ],
        "extraIndexColumnModes": {
          "姓名": "both",
          "一句话介绍": "index_only"
        },
        "extraIndexInjectionTemplate": "以下为已经登场过的非恋爱重要角色：\n<重要角色索引>\n$1\n</重要角色索引>",
        "entryPlacement": {
          "position": "at_depth_as_system",
          "depth": 10000,
          "order": 10000
        },
        "extraIndexPlacement": {
          "position": "at_depth_as_system",
          "depth": 10000,
          "order": 8010
        },
        "fixedEntryPlacement": {
          "position": "at_depth_as_system",
          "depth": 10000,
          "order": 99985
        },
        "fixedIndexPlacement": {
          "position": "at_depth_as_system",
          "depth": 10000,
          "order": 99986
        }
      },
      "orderNo": 5
    },
    "sheet_factions": {
      "uid": "sheet_factions",
      "name": "关系网络表",
      "sourceData": {
        "note": "记录影响主角与恋爱对象关系发展的人际网络、组织、阵营与圈层。只记录外部结构如何推动、阻碍、保护、监视、撮合或压迫恋爱线。\n\n【列定义】\n- 列1: 网络名称 network_name（全表唯一）\n- 列2: 当前立场 stance\n- 列3: 存在状态 presence\n- 列4: 关联角色 linked_characters（分号分隔）\n- 列5: 关系说明 relationship_desc\n- 列6: 对恋爱线影响 influence_on_romance\n\n【强制约束】\n1. 只录入对恋爱线有持续影响的关系网；一次性背景或影响已消散的不录入。\n2. 具体人物档案写入重要角色表或恋爱对象表，本表仅记录网络层面的交互。\n\n3. 当前立场仅取：[撮合, 支持, 中立, 观望, 试探, 利用, 反对, 敌视, 监视, 无视]\n取该网络当前对主角恋爱线的主导态度。\n\n4. 存在状态仅取：[在场活跃, 若即若离, 逐渐淡出, 已退场]\n在场活跃：正在持续对恋爱线施加影响；\n若即若离：间歇性介入，尚未站稳立场或时隐时现；\n逐渐淡出：影响力正在减弱但尚未完全消失；\n已退场：已停止影响恋爱线，保留行作为历史记录。\n\n5. 关系说明用白话简述网络与主角或恋爱对象的关联。\n√ 主角所在的班级，同学常起哄撮合\n√ 艾莉丝所属的家族，对继承人恋爱对象有门第要求\n\n6. 对恋爱线影响需具体写出推拉作用。\n√ 同学经常创造两人独处机会\n√ 家族长辈禁止艾莉丝在毕业前公开恋情",
        "initNode": "故事初始化时，为已登场的重要人际网络、组织、阵营与圈层插入一行。",
        "deleteNode": "禁止。",
        "updateNode": "已存在的网络，关联角色、关系说明、对恋爱线影响、当前立场或存在状态变化时更新。\n\nSQL示例: UPDATE relationship_networks SET stance = '观望', influence_on_romance = '开始默许接触' WHERE network_name = '艾莉丝的家族';",
        "insertNode": "重要人际网络、组织、阵营与圈层不在表里时，新增一行。\n\nSQL示例: INSERT INTO relationship_networks (row_id, network_name, stance, presence, linked_characters, relationship_desc, influence_on_romance) VALUES ((SELECT COALESCE(MAX(row_id), 0) + 1 FROM relationship_networks), '圣钟学院', '撮合', '在场活跃', '主角;艾莉丝', '主角就读的学校，提供日常相处场所', '推动主角与艾莉丝的日常接触');",
        "ddl": "CREATE TABLE relationship_networks ( -- 关系网络表\n  row_id INTEGER PRIMARY KEY, -- 行号\n  network_name TEXT UNIQUE, -- 网络名称\n  stance TEXT, -- 当前立场\n  presence TEXT, -- 存在状态\n  linked_characters TEXT, -- 关联角色\n  relationship_desc TEXT, -- 关系说明\n  influence_on_romance TEXT -- 对恋爱线影响\n);"
      },
      "content": [
        [
          "row_id",
          "网络名称",
          "当前立场",
          "存在状态",
          "关联角色",
          "关系说明",
          "对恋爱线影响"
        ]
      ],
      "updateConfig": {
        "uiSentinel": -1,
        "contextDepth": -1,
        "updateFrequency": -1,
        "batchSize": -1,
        "skipFloors": -1,
        "groupId": -1
      },
      "exportConfig": {
        "enabled": true,
        "splitByRow": true,
        "entryName": "阵营/关系网络表",
        "entryType": "keyword",
        "keywords": "网络名称",
        "preventRecursion": true,
        "injectionTemplate": "",
        "extraIndexEnabled": false,
        "extraIndexEntryName": "阵营/关系网络表-索引",
        "extraIndexColumns": [
          "节点名称",
          "节点类型",
          "当前立场"
        ],
        "extraIndexColumnModes": {
          "节点名称": "both",
          "节点类型": "index_only",
          "当前立场": "index_only"
        },
        "extraIndexInjectionTemplate": "以下为会影响恋爱线的阵营与关系网络：\n<阵营关系索引>\n$1\n</阵营关系索引>",
        "entryPlacement": {
          "position": "at_depth_as_system",
          "depth": 10000,
          "order": 10000
        },
        "extraIndexPlacement": {
          "position": "at_depth_as_system",
          "depth": 10000,
          "order": 8000
        },
        "fixedEntryPlacement": {
          "position": "at_depth_as_system",
          "depth": 10000,
          "order": 99985
        },
        "fixedIndexPlacement": {
          "position": "at_depth_as_system",
          "depth": 10000,
          "order": 99986
        }
      },
      "orderNo": 6
    },
    "sheet_inventory": {
      "uid": "sheet_inventory",
      "name": "物品表",
      "sourceData": {
        "note": "记录对主角有情感意义的非装扮物品。只收录能唤起回忆、承载心意或推动关系的物品。\n\n【列定义】\n- 列1: 物品名称 item_name（全表唯一，≤20字）\n- 列2: 类型 item_type\n- 列3: 数量 quantity（非负整数）\n- 列4: 情感分量 emotional_weight\n- 列5: 品质 quality\n- 列6: 描述 description（≤80字）\n\n【强制约束】\n1. 仅收录对主角或恋爱对象有情感意义、涉及关系记忆的物品。不收录纯功能杂物、装备、货币与点数。\n2. 同一物品情感意义升级时（如心意礼物转为定情信物），更新类型、品质与描述，不新增行。\n3. 物品名称直接使用角色会说的口语化命名。\n   √ 他送的橘子糖\n   × 橘子味糖果\n4. 数量为非负整数，耗尽后可为0。\n5. 描述侧重物品的情感意义与回忆关联。\n6. 品质代表物品在关系中蕴含的情感纯度，可随关系进展变化，升级时更新品质字段，不新增行。\n\n【字段取值】\n类型：[定情信物, 纪念品, 心意礼物, 约会用品, 情绪物件]\n  定情信物：明确承载双方感情承诺的物品，如戒指、情书信物、成对饰品，通常唯一。\n  纪念品：与共同经历或关键事件绑定的物品，如电影票根、照片、旅行小物。\n  心意礼物：单方赠送、尚未确认回应的礼物，情感回应待定。\n  约会用品：为特定见面准备的功能物品，如野餐布、未送出的花束、活动门票。\n  情绪物件：因当前情感状态而被赋予意义的日常物品，如同桌借过的橡皮、对方忘在桌上的水杯。\n\n情感分量：[可有可无, 偶尔想起, 日常在意, 反复拿出来看, 随身携带, 刻进记忆]\n\n品质：[初识印记, 心动瞬间, 甜蜜珍藏, 羁绊信物, 永恒之诺]\n  初识印记：关系起始阶段的微小痕迹，仅代表初见的印象。\n  心动瞬间：承载了明确的心动或好感时刻。\n  甜蜜珍藏：热恋或关系升温期的美好见证。\n  羁绊信物：象征深层羁绊与承诺的信物，双方均珍视。\n  永恒之诺：一生铭记的爱情象征，拥有超越时间的意义。",
        "initNode": "按设定添加主角初始携带的物品。",
        "deleteNode": "禁止。\n\n",
        "updateNode": "已存在的物品，情感分量、类型、品质或描述变化时更新。可堆叠物品不新建重复行。\nSQL示例(消耗使用): UPDATE inventory SET quantity = quantity - 1 WHERE item_name = \"艾莉丝给的橘子糖\";\nSQL示例(情感升级): UPDATE inventory SET item_type = \"定情信物\", emotional_weight = \"随身携带\", quality = \"羁绊信物\", description = \"原本只是她随手塞的糖，现在被主角穿绳挂在脖子上。糖纸上的折痕越来越深，每次紧张都会摸一下。\" WHERE item_name = \"艾莉丝给的橘子糖\";",
        "insertNode": "物品名称不在表里时，新增一行。可堆叠物品不新建重复行。\n\nSQL示例: INSERT INTO inventory (row_id, item_name, item_type, quantity, emotional_weight, quality, description) VALUES ((SELECT COALESCE(MAX(row_id), 0) + 1 FROM inventory), \"皱掉的电影票根\", \"纪念品\", 1, \"反复拿出来看\", \"甜蜜珍藏\", \"第一次一起看电影的票根，被主角夹在手机壳里。边角已经起毛，背面有艾莉丝随手画的歪扭笑脸。\");",
        "ddl": "CREATE TABLE inventory ( -- 物品表\n  row_id INTEGER PRIMARY KEY, -- 行号\n  item_name TEXT NOT NULL UNIQUE CHECK(LENGTH(item_name) <= 15), -- 物品名称\n  item_type TEXT NOT NULL, -- 类型\n  quantity INTEGER NOT NULL DEFAULT 1 CHECK(quantity >= 0), -- 数量\n  emotional_weight TEXT, -- 情感分量\n  quality TEXT NOT NULL, -- 品质\n  description TEXT NOT NULL CHECK(LENGTH(description) <= 80) -- 描述\n);"
      },
      "content": [
        [
          "row_id",
          "物品名称",
          "类型",
          "数量",
          "情感分量",
          "品质",
          "描述"
        ]
      ],
      "updateConfig": {
        "uiSentinel": -1,
        "contextDepth": -1,
        "updateFrequency": -1,
        "batchSize": -1,
        "skipFloors": -1,
        "groupId": -1
      },
      "exportConfig": {
        "enabled": false,
        "splitByRow": false,
        "entryName": "物品表",
        "entryType": "constant",
        "keywords": "",
        "preventRecursion": true,
        "injectionTemplate": "",
        "extraIndexEnabled": false,
        "extraIndexEntryName": "物品表-索引",
        "extraIndexColumns": [],
        "extraIndexColumnModes": {},
        "extraIndexInjectionTemplate": "",
        "entryPlacement": {
          "position": "at_depth_as_system",
          "depth": 2,
          "order": 10000
        },
        "extraIndexPlacement": {
          "position": "at_depth_as_system",
          "depth": 2,
          "order": 10010
        },
        "fixedEntryPlacement": {
          "position": "at_depth_as_system",
          "depth": 2,
          "order": 99990
        },
        "fixedIndexPlacement": {
          "position": "at_depth_as_system",
          "depth": 2,
          "order": 99991
        }
      },
      "orderNo": 7
    },
    "sheet_outfits": {
      "uid": "sheet_outfits",
      "name": "装扮表",
      "sourceData": {
        "note": "记录主角的当前穿着、重要换装与可复用外观。不做衣柜清单，不记录普通衣物流水账。\n\n【列定义】\n- 列1: 所属角色 owner_role（固定为主角）\n- 列2: 装扮名称 outfit_name（全表唯一，≤12字）\n- 列3: 类型 outfit_type\n- 列4: 当前状态 current_status\n- 列5: 外观描述 appearance_desc（≤60字）\n- 列6: 来源 obtained_from\n- 列7: 场景及寓意 scene_meaning（≤40字）\n- 列8: 交互选项 interaction_options\n\n【强制约束】\n1.只录主角。恋爱对象及其他角色的装扮不入此表。\n2.仅录入以下装扮：当前正在穿且后续会引用的、重要场景装扮、对方赠送/挑选/评价/借用/共同购买的、主角特意准备的、后续会反复出现的识别性装扮。普通换衣不入表。\n3.同一时间只保留一套“正在穿”的主要装扮。换装时旧装扮改为“已更换”或“收纳中”，新装扮改为“正在穿”。\n4.outfit_name 为主角会用的口语化命名。\n5.interaction_options 仅列出当前着装状态下可做的、与穿着相关的具体行动。主语固定为主角。\n\n【字段取值】\n类型：[日常服, 制服, 约会装, 居家服, 正式装, 饰品, 特殊装扮]\n状态：[正在穿, 收纳中, 损坏, 遗失, 借出, 已更换, 纪念保存]\n来源：[购买, 赠送, 借用, 定制, 剧情获得, 自带, 共同购买]",
        "initNode": "按设定添加主角初始重要装扮，禁止把主角所有衣服都初始化记录。\n\n只初始化：\n1.开场正在穿且需要持续引用的装扮；\n2.固定常穿、具有识别度的装扮；\n3.与开场剧情、约会、身份、职业或关系有关的装扮。\n\nSQL示例: INSERT INTO outfits (row_id, owner_role, outfit_name, outfit_type, current_status, appearance_desc, obtained_from, scene_meaning, interaction_options) VALUES ((SELECT COALESCE(MAX(row_id), 0) + 1 FROM outfits), '主角', '白色连衣裙', '约会装', '收纳中', '及膝白裙，裙摆有细蕾丝', '赠送', '约会时对方赠送的，适用于纪念日', '对着镜子迟疑要不要换一件');",
        "deleteNode": "禁止。",
        "updateNode": "已有装扮的状态、外观、来源或适用场景变化时更新。\n常见更新：角色换装；装扮损坏、遗失、借出、收纳；原本普通装扮因剧情变得重要；适用场景变化；外观描述补充修正。\n\n【强制约束】\n换装时旧装扮状态改为“已更换”或“收纳中”，新装扮状态改为“正在穿”。同一时间只保留一套“正在穿”的主要装扮。\n\n【SQL示例】\nSQL示例(换装·旧): UPDATE outfits SET current_status = '收纳中' WHERE current_status = '正在穿';\nSQL示例(换装·新): UPDATE outfits SET current_status = '正在穿', scene_meaning = '今天的约会' WHERE outfit_name = '白色连衣裙';\nSQL示例(描述修正): UPDATE outfits SET appearance_desc = '及膝白裙，裙摆有细蕾丝，腰间系浅色缎带' WHERE outfit_name = '白色连衣裙';",
        "insertNode": "主角获得、穿上或展示新的重要装扮时新增。\n\n新增条件：\n1.当前正在穿且正文后续可能继续引用的装扮；\n2.重要约会、告白、和解、争执、纪念日中的装扮；\n3.恋爱对象赠送、挑选、评价、借用或共同购买的装扮；\n4.主角特意为某次见面准备的装扮；\n5.后续会反复出现的识别性装扮。\n\n禁止新增：\n1.普通日常衣物；\n2.只出现一次、无后续价值的背景衣服；\n3.拆分过细的单件衣物；\n4.与装扮无关的普通物品。\n\nSQL示例: INSERT INTO outfits (row_id, owner_role, outfit_name, outfit_type, current_status, appearance_desc, obtained_from, scene_meaning, interaction_options) VALUES ((SELECT COALESCE(MAX(row_id), 0) + 1 FROM outfits), '主角', '浅蓝发带', '饰品', '正在穿', '浅蓝色细发带，颜色很干净', '赠送', '洛斯莉赠送的，适合约会时佩戴', '对着镜子调整发带位置');",
        "ddl": "CREATE TABLE outfits ( -- 装扮表\n  row_id INTEGER PRIMARY KEY, -- 行号\n  owner_role TEXT NOT NULL, -- 所属角色\n  outfit_name TEXT NOT NULL UNIQUE, -- 装扮名称\n  outfit_type TEXT, -- 类型\n  current_status TEXT, -- 当前状态\n  appearance_desc TEXT, -- 外观描述\n  obtained_from TEXT, -- 来源\n  scene_meaning TEXT, -- 场景及寓意\n  interaction_options TEXT -- 交互选项\n);"
      },
      "content": [
        [
          "row_id",
          "所属角色",
          "装扮名称",
          "类型",
          "当前状态",
          "外观描述",
          "来源",
          "场景及寓意",
          "交互选项"
        ]
      ],
      "updateConfig": {
        "uiSentinel": -1,
        "contextDepth": -1,
        "updateFrequency": -1,
        "batchSize": -1,
        "skipFloors": -1,
        "groupId": -1
      },
      "exportConfig": {
        "enabled": false,
        "splitByRow": false,
        "entryName": "装扮表",
        "entryType": "constant",
        "keywords": "",
        "preventRecursion": true,
        "injectionTemplate": "",
        "extraIndexEnabled": false,
        "extraIndexEntryName": "装扮表-索引",
        "extraIndexColumns": [],
        "extraIndexColumnModes": {},
        "extraIndexInjectionTemplate": "",
        "entryPlacement": {
          "position": "at_depth_as_system",
          "depth": 2,
          "order": 10000
        },
        "extraIndexPlacement": {
          "position": "at_depth_as_system",
          "depth": 2,
          "order": 10010
        },
        "fixedEntryPlacement": {
          "position": "at_depth_as_system",
          "depth": 2,
          "order": 99990
        },
        "fixedIndexPlacement": {
          "position": "at_depth_as_system",
          "depth": 2,
          "order": 99991
        }
      },
      "orderNo": 8
    },
    "sheet_memo": {
      "uid": "sheet_memo",
      "name": "备忘录",
      "sourceData": {
        "note": "记录当前剧情中需要后续关注的约定、待办、纪念日、误会、伏笔、礼物、告白、见面安排、情绪问题或家庭/朋友事件。\n\n【列定义】\n- 列1: 备忘标题 memo_title（全表唯一）\n- 列2: 类型 memo_type\n- 列3: 相关角色 related_character\n- 列4: 详细内容 detail_desc\n- 列5: 当前状态 current_status\n- 列6: 相关时间 due_time\n- 列7: 重要程度 importance\n- 列8: 后续结果 result_note\n\n【强制约束】\n1.仅记录悬而未决、等待回应或后续兑现的事项。已客观发生的完整经过写入纪要表，已沉淀为关系状态的内容写入恋爱对象表，避免跨表重复。\n2.详细内容必须具体描述事项的来由、关键细节与当前卡点，禁止一句话概括。\n3.后续结果填写时禁止空泛收束。\n√ 艾莉丝当面拆了礼物，说了句\"你居然记得\"，然后装进包里\n× 已解决\n\n【字段取值】\n类型：[约定, 待办, 纪念日, 误会, 伏笔, 礼物, 告白, 见面安排, 情绪问题, 家庭/朋友事件]\n状态：[未开始, 进行中, 待回应, 已完成, 已取消, 已遗忘, 暂缓]\n重要程度：[普通, 重要, 紧急, 关键伏笔]",
        "initNode": "故事初始化时，根据设定添加需要持续追踪的初始备忘；没有则暂不插入。",
        "deleteNode": "当备忘录事项的状态变更为“已完成”时，删除该行条目。\n\nSQL示例: DELETE FROM memo WHERE current_status = '已完成';",
        "updateNode": "备忘事项的状态、内容、时间、重要程度或结果变化时更新。\n\nSQL示例: UPDATE memo SET current_status = \"已完成\", result_note = \"主角在咖啡馆拿出便条逐句解释，艾莉丝表情先愣后笑，答应周末一起看展。误解除。\", importance = \"普通\" WHERE memo_title = \"误会待解\";",
        "insertNode": "出现新的备忘事项时添加。\n\nSQL示例: INSERT INTO memo (row_id, memo_title, memo_type, related_character, detail_desc, current_status, due_time, importance, result_note) VALUES ((SELECT COALESCE(MAX(row_id), 0) + 1 FROM memo), \"误会待解\", \"误会\", \"艾莉丝\", \"昨天在走廊擦肩而过时主角主动打招呼，艾莉丝却低头快步走开。事后从朋友处听说她以为主角那天的便条是故意冷落。便条原件还在主角口袋里，上面写的是邀她周末去看新展。需要找机会当面把便条内容说清楚。\", \"待回应\", \"明天\", \"紧急\", \"\");",
        "ddl": "CREATE TABLE memo ( -- 备忘录\n  row_id INTEGER PRIMARY KEY, -- 行号\n  memo_title TEXT NOT NULL UNIQUE, -- 备忘标题\n  memo_type TEXT NOT NULL, -- 类型\n  related_character TEXT, -- 相关角色\n  detail_desc TEXT, -- 详细内容\n  current_status TEXT, -- 当前状态\n  due_time TEXT, -- 相关时间\n  importance TEXT NOT NULL DEFAULT '普通', -- 重要程度\n  result_note TEXT -- 后续结果\n);"
      },
      "content": [
        [
          "row_id",
          "备忘标题",
          "类型",
          "相关角色",
          "详细内容",
          "当前状态",
          "相关时间",
          "重要程度",
          "后续结果"
        ]
      ],
      "updateConfig": {
        "uiSentinel": -1,
        "contextDepth": -1,
        "updateFrequency": -1,
        "batchSize": -1,
        "skipFloors": -1,
        "groupId": -1
      },
      "exportConfig": {
        "enabled": true,
        "splitByRow": true,
        "entryName": "备忘录",
        "entryType": "keyword",
        "keywords": "姓名,相关角色",
        "preventRecursion": false,
        "injectionTemplate": "",
        "extraIndexEnabled": true,
        "extraIndexEntryName": "备忘录索引",
        "extraIndexColumns": [
          "相关角色"
        ],
        "extraIndexColumnModes": {
          "相关角色": "both"
        },
        "extraIndexInjectionTemplate": "",
        "entryPlacement": {
          "position": "at_depth_as_system",
          "depth": 2,
          "order": 10000
        },
        "extraIndexPlacement": {
          "position": "at_depth_as_system",
          "depth": 2,
          "order": 10010
        },
        "fixedEntryPlacement": {
          "position": "at_depth_as_system",
          "depth": 2,
          "order": 99990
        },
        "fixedIndexPlacement": {
          "position": "at_depth_as_system",
          "depth": 2,
          "order": 99991
        }
      },
      "orderNo": 9
    },
    "sheet_summary": {
      "uid": "sheet_summary",
      "name": "纪要表",
      "sourceData": {
        "note": "轮次日志。每轮交互结束后立刻插入一条新记录。\n\n【列定义】\n- 列1: 编码索引 code_index（AM0001起递增，全表唯一）\n- 列2: 时间跨度 time_span\n- 列3: 概览 summary（≤30字）\n- 列4: 纪要 chronicle_text（240-480字）\n- 列5: 重要对话 key_dialogue（可NULL）\n\n【强制约束】\n1.编码索引格式 AMXXXX，从0001开始递增。\n2.时间跨度格式为 \"YYYY-MM-DD HH:MM ~ YYYY-MM-DD HH:MM\"，覆盖本轮事件的实际时间范围。\n3.概览一句话概括本轮纪要内容，≤30字。\n\n4.纪要规范：\n- 以第三方视角中立客观记录正文发生的一切，移除所有修辞与对话。不滥用环境描写、不进行动作细节分析、不加评论，不抒情，不升华。\n- 用词直白生活化，避免正式措辞（如“达成协议”“确立计划”）。\n- 结尾必须开放，在事件自然流动中结束，不得归纳状态或做出封闭式收束。\n违例：故事仍在继续 / 新的篇章开启 / 二人关系迈入新阶段 / 未来等待着他们。\n- 多轮交互整合为一条记录。\n- 禁止内容：极端情绪（崩溃、狂喜、绝望等）、夸张、比喻、升华、情绪总结、支配欲、掌控欲、总结性收尾。\n\n5.重要对话仅摘录直接推动剧情转折、揭示关键信息、改变人物关系/决策或构成承诺/誓约/约定的原文台词，标明说话人。排除寒暄、重复、情绪感叹。通常3句，最多5句，总token不超过150。",
        "initNode": "故事初始化时，插入一条新记录用于记录剧情。",
        "deleteNode": "禁止。",
        "updateNode": "禁止。",
        "insertNode": "每轮交互结束后插入一条新记录。\n\n【强制约束】\ncode_index、time_span、summary、chronicle_text 均 NOT NULL，不可写 NULL 或空串。\n\nSQL示例：INSERT INTO chronicle (row_id, code_index, time_span, summary, chronicle_text, key_dialogue, day_count) VALUES ((SELECT COALESCE(MAX(row_id), 0) + 1 FROM chronicle), 'AM0036', '2026-02-04 08:00 ~ 2026-02-04 08:30', '一句话概括', '本轮纪要内容...', NULL);",
        "ddl": "CREATE TABLE chronicle ( -- 纪要表\n  row_id INTEGER PRIMARY KEY, -- 行号\n  code_index TEXT UNIQUE, -- 编码索引\n  time_span TEXT, -- 时间跨度\n  summary TEXT CHECK(LENGTH(summary) <= 66), -- 概览\n  chronicle_text TEXT CHECK(LENGTH(chronicle_text) <= 520), -- 纪要\n  key_dialogue TEXT -- 重要对话\n);"
      },
      "content": [
        [
          "row_id",
          "编码索引",
          "时间跨度",
          "概览",
          "纪要",
          "重要对话"
        ]
      ],
      "updateConfig": {
        "uiSentinel": -1,
        "contextDepth": -1,
        "updateFrequency": -1,
        "batchSize": -1,
        "skipFloors": -1,
        "groupId": -1
      },
      "exportConfig": {
        "enabled": true,
        "splitByRow": true,
        "entryName": "纪要",
        "entryType": "keyword",
        "keywords": "编码索引",
        "preventRecursion": true,
        "injectionTemplate": "<记忆回溯>\n$1\n</记忆回溯>",
        "extraIndexEnabled": true,
        "extraIndexEntryName": "纪要索引",
        "extraIndexColumns": [
          "编码索引",
          "时间跨度",
          "概览"
        ],
        "extraIndexColumnModes": {
          "编码索引": "both",
          "时间跨度": "both",
          "概览": "index_only"
        },
        "extraIndexInjectionTemplate": "<已发生的事件概览>\n$1\n</已发生的事件概览>",
        "entryPlacement": {
          "position": "at_depth_as_system",
          "depth": 999,
          "order": 10000
        },
        "extraIndexPlacement": {
          "position": "at_depth_as_system",
          "depth": 1000,
          "order": 10010
        },
        "fixedEntryPlacement": {
          "position": "at_depth_as_system",
          "depth": 9999,
          "order": 99987
        },
        "fixedIndexPlacement": {
          "position": "at_depth_as_system",
          "depth": 9999,
          "order": 99988
        }
      },
      "orderNo": 10
    },
    "sheet_romance_diary": {
      "uid": "sheet_romance_diary",
      "name": "恋爱日记表",
      "sourceData": {
        "note": "恋爱对象日记表：记录一名或多名恋爱对象的主观日记。客观经过→纪要表；主观内心→本表；两表用AM码绑定。\n\n【列定义】\n- 列1: 写作角色 writer（必须是恋爱对象表中已建档角色）\n- 列2: 关联角色 related_char（固定填主角姓名）\n- 列3: 关联AM码 related_am_code（对应纪要表 code_index）\n- 列4: 日记内容 summary（120–240字）\n- 列5: 发生时间 time\n- 列6: 事件类型 event_type\n- 列7: 影响判断 impact\n\n【强制约束】\n1.AM码必填，取自纪要表已有 code_index。同轮填本轮AM码，补写填历史AM码。多角色可共用同一AM码分别写。禁止编造、NULL或空值占位。\n\n2.准入条件（全部满足才写）：\n   - 写作角色已在恋爱对象表建档；\n   - 事件已有或即将有对应纪要；\n   - 事件直接影响该角色对主角的好感、信任、期待、误会、心动、距离感等关系判断；\n   - 出现不适合写进纪要的主观内容：反复揣摩、甜蜜困惑、期待与不安交织、心动却嘴硬等；\n   - 删除本条后会影响理解该角色后续对主角的态度变化。\n\n3.禁止写入：\n   - 普通聊天/问候/同行/吃饭等无特殊意义互动；\n   - 复述剧情或浅层反应；\n   - 仅因恋爱对象在场或主角礼貌正常行为即触发；\n   - 本轮无新的期待、心动、动摇、误会、关系变化；\n   - 与上一条日记情绪状态基本重复；\n   - 同一自然日同一角色最多1条，除非明显关系转折；\n   - 把纪要内容改第一人称塞进日记；\n   - 角色不可能知道的事实；\n   - 角色得出明确结论（如\"他就是喜欢我\"），必须保留至少两种可能；\n   - 线性逻辑推理，必须呈现跳跃、回旋、自我打断式思绪。\n\n4.写作规则：\n   - 第一人称，符合角色当前性格、关系阶段、说话习惯和内心状态；\n   - 只写角色知道/看见/听见/猜到/误解到的内容，不上帝视角，不替主角解释动机；\n   - 未知主角姓名时只能用\"那个人/他/她\"等代称；\n   - 重点写：没说出口的心动、反复揣摩后的甜蜜不确定、期待与害羞的来回拉扯、意识到自己与平时不同却藏不住的小雀跃、对下次见面的隐约期待和嘴硬、对具体细节的反复回味、不愿被发现的心意及对这份心意的害羞困惑；\n   - 多用\"也许/可能/该不会/会不会/说不定/但又觉得/可是/还是说\"等不确定表达，猜测不可写成事实；\n   - 立场可自相矛盾，每次只推进一小步，禁止跳跃式升温；\n   - 结尾必须停在甜蜜困惑/期待摇摆/悬而未决中，禁止确定收束；\n   - 禁止客观总结、复述剧情、替主角解释动机。\n\n5.台词融入：\n   - 可写：角色亲耳听到主角说的话、角色自己说后反复回想的话、他人当面说出并影响角色理解主角的话；\n   - 禁止：角色未听见的话、仅玩家或旁白知道的信息、完整搬运纪要对话；\n   - 写法：引用后紧接多种解读、甜蜜反刍、自我反驳，像碎碎念嵌入独白。\n\n6.微观描写禁止：指尖/指腹/指节/指缝/颈侧/颈窝/锁骨/耳廓/耳后/鼻尖/舌根/喉口。可概述主角普通动作、表情、语气、注视方式，重点写角色对此的不确定解读和心动反应。\n7.日常事件例外：普通行为若被角色赋予特殊意义并出现甜蜜自我怀疑、反复回味、细节触发的甜蜜假设，可写。仅\"说了几句话/觉得还不错\"不写。\n\n【字段取值】\n事件类型：[初次相遇, 日常互动, 感情升温, 冲突矛盾, 和解修复, 亲密接触, 里程碑, 特殊事件]\n影响判断：[正面, 负面, 中性]\n\n【示例】\n他今天在我说话时突然结巴了一下。就那么一下，我的心跳好像漏了一拍。是我说了什么奇怪的话吗？想了一遍，明明很普通啊。也许他只是走神了吧。可如果是走神，为什么后来突然聊起烤肉店？是在帮我接话？还是……他真的只是饿了。天哪我在想什么啊，对着一个停顿脑补这么多。但那一瞬间他好像看了我一眼……算了，其实也没看清，说不定是我的错觉。不想了不想了。……可是那个眼神，到底是什么意思嘛？",
        "initNode": "如有明确的关键情感事件且已有对应纪要AM码，可插入对应日记。没有符合准入条件的情感事件时，不要为初始化强行插入。\n日记内容自然融入写作角色对某句具体台词的反复思考。\n\nSQL示例: INSERT INTO romance_diary (row_id, writer, related_char, related_am_code, summary, time, event_type, impact) VALUES ((SELECT COALESCE(MAX(row_id), 0) + 1 FROM romance_diary), '艾莉丝', '主角', 'AM0001', '今天第一次和他说上话。他说\"没关系，慢慢说\"的时候，语气普通得像只是顺口安慰，可我后来还是想起了好几次。也许是因为当时太突然，我才会记得这么清楚。我不确定他是不是注意到了我的停顿，早知道就该表现得自然一点。回宿舍以后，我本来想把书包收好，却又站在桌边发了一会儿呆。下次如果再遇见，我应该不会那么僵硬吧。', '2024-09-17 12:30', '初次相遇', '正面');",
        "deleteNode": "禁止。",
        "updateNode": "禁止。",
        "insertNode": "发生符合准入规则的关键情感事件后插入。必须填写关联AM码，取自纪要表已有 code_index。\n日记内容使用恋爱对象第一人称，记录本轮事件后的主观理解、误解、动摇、心动、期待、逃避或后悔。如有具体台词被反复想起、误解、在意、后悔或赋予额外意义，直接自然融入。\n\n【写作要求：】\n- 第一人称，符合角色性格与关系阶段，只写角色知道/看见/听见/猜到/误解的内容，不上帝视角。\n- 多用“也许/可能/会不会/该不会/但又觉得”等不确定表达，立场可自相矛盾，每次只推进一小步。\n- 禁止微观身体描写（指尖、颈侧、锁骨、耳廓等），可概述主角普通动作、表情、语气，重点写角色对此的不确定解读和心动反应。\n- 保持温柔、明亮、生活化的恋爱前期基调，结尾停在甜蜜困惑或期待摇摆中，不做总结，不替关系下定义。\n\n【SQL示例】\n\nSQL示例(自然融入台词思考): INSERT INTO romance_diary (row_id, writer, related_char, related_am_code, summary, time, event_type, impact) VALUES ((SELECT COALESCE(MAX(row_id), 0) + 1 FROM romance_diary), '艾莉丝', '主角', 'AM0007', '今天他没有追问我为什么突然沉默，只是把话题轻轻带过去。我本来以为他会觉得麻烦，可他说“你不用现在回答”的时候，好像真的把选择留给了我。也许只是他性格好，我不该想太多。可回来的路上，我一直想起那句话，越想越觉得自己当时点头太快了。晚饭后朋友问我怎么一直看窗外，我差点就把这件事说出来。算了，下次见面的时候，我是不是可以稍微坦率一点。', '2024-09-23 18:40', '感情升温', '正面');\n\nSQL示例(无具体台词，仅内心变化): INSERT INTO romance_diary (row_id, writer, related_char, related_am_code, summary, time, event_type, impact) VALUES ((SELECT COALESCE(MAX(row_id), 0) + 1 FROM romance_diary), '艾莉丝', '主角', 'AM0008', '今天只是一起走了一段路，可我发现自己没有像平时那样急着找借口离开。他说话的时候很自然，我却总在想自己有没有回应得太冷淡。也许只是因为天气太安静，我才会变得奇怪。回去以后我把明天要交的东西整理了一遍，中间还是走神了几次。下次再遇见，我应该还是会装作没什么，可我大概会比今天更早注意到他。', '2024-09-24 17:20', '日常互动', '正面');\n\nSQL示例(轻微误会或吃醋): INSERT INTO romance_diary (row_id, writer, related_char, related_am_code, summary, time, event_type, impact) VALUES ((SELECT COALESCE(MAX(row_id), 0) + 1 FROM romance_diary), '艾莉丝', '主角', 'AM0012', '今天看见他和别人说话时笑得很自然，我居然有一点说不上来的别扭。其实那大概只是普通聊天，我也知道自己没什么好在意的。可后来他回头叫我的时候，我还是慢了半拍才应声，语气也比平时硬了一点。真不像我。回家路上我想了想，也许只是因为今天有点累，才把小事放大了。明天如果见到他，还是先和平时一样打招呼吧。', '2024-09-25 19:10', '日常互动', '中性');",
        "ddl": "CREATE TABLE romance_diary ( -- 恋爱日记表\n  row_id INTEGER PRIMARY KEY, -- 行号\n  writer TEXT NOT NULL, -- 写作角色\n  related_char TEXT NOT NULL, -- 关联角色\n  related_am_code TEXT NOT NULL, -- 关联AM码\n  summary TEXT NOT NULL CHECK(LENGTH(summary) <= 350), -- 日记内容\n  time TEXT NOT NULL, -- 发生时间\n  event_type TEXT NOT NULL CHECK(event_type IN ('初次相遇', '日常互动', '感情升温', '冲突矛盾', '和解修复', '亲密接触', '里程碑', '特殊事件')), -- 事件类型\n  impact TEXT NOT NULL CHECK(impact IN ('正面', '负面', '中性')) -- 影响判断\n);"
      },
      "content": [
        [
          "row_id",
          "写作角色",
          "关联角色",
          "关联AM码",
          "日记内容",
          "发生时间",
          "事件类型",
          "影响判断"
        ]
      ],
      "updateConfig": {
        "uiSentinel": -1,
        "contextDepth": -1,
        "updateFrequency": -1,
        "batchSize": -1,
        "skipFloors": -1,
        "groupId": -1
      },
      "exportConfig": {
        "enabled": true,
        "splitByRow": true,
        "entryName": "恋爱日记",
        "entryType": "keyword",
        "keywords": "关联AM码",
        "preventRecursion": true,
        "injectionTemplate": "<romance_diary>\n$1\n</romance_diary>",
        "extraIndexEnabled": false,
        "extraIndexEntryName": "恋爱日记索引",
        "extraIndexColumns": [
          "关联AM码"
        ],
        "extraIndexColumnModes": {
          "关联AM码": "both"
        },
        "extraIndexInjectionTemplate": "<恋爱日记索引>\n$1\n</恋爱日记索引>",
        "entryPlacement": {
          "position": "at_depth_as_system",
          "depth": 999,
          "order": 10000
        },
        "extraIndexPlacement": {
          "position": "at_depth_as_system",
          "depth": 1000,
          "order": 10010
        },
        "fixedEntryPlacement": {
          "position": "at_depth_as_system",
          "depth": 9999,
          "order": 99989
        },
        "fixedIndexPlacement": {
          "position": "at_depth_as_system",
          "depth": 9999,
          "order": 99990
        }
      },
      "orderNo": 11
    },
    "sheet_bwxtt33d5": {
      "uid": "sheet_bwxtt33d5",
      "name": "检定建议表",
      "sourceData": {
        "note": "记录每轮剧情后提供给玩家的5条行动建议及对应检定命令。此表固定保留5行，row_id 必须为1~5；每轮必须覆盖写入全部5行，不得少于或多于5行。\n\n- 列0: 展示文本 - 前端展示给用户看的自然语言行动选项，不暴露骰子命令、检定术语和后台结构，长度12–60字。\n- 列1: 骰子命令 - 前端解析执行的极简DSL命令，不展示给用户，必须严格符合下方 DSL 命令格式。\n\n<检定规则>\n【检定规则】\n使用恋爱日常检定：掷 1d100，结果小于等于属性值则推进顺利。检定不用于强迫角色产生感情，只判断本次行动对日常相处、关系状态、情绪张力、误会、距离感或剧情推进造成的影响。\n\n普通检定与对抗检定都必须使用角色表中已有的基础属性 base_attributes 或特殊属性 special_attributes，禁止临时编造属性。\n\n【基础属性规则】\n基础属性 base_attributes 是所有角色应已具备的通用属性，用于保证任何角色都能参与普通检定、对抗检定和成长检定。基础属性固定为以下6项，必须全部出现，不得缺项、改名或新增基础属性：\n- 健康：身体状态、疾病、恢复、受伤、疲劳、熬夜、酒量等身体承受力。\n- 力量：搬运、扶起、拉住、护住、撑住、推开障碍等身体力量相关行动。\n- 敏捷：动作反应、身体协调、及时接住、避开、追上、抢先一步等即时行动。\n- 理智：在争执、误会、吃醋、诱惑、压力、修罗场中保持冷静判断。理智不是SAN，只表示日常关系场景里的判断和抗压。\n- 观察：发现客观可见的细节、异常、环境变化、物品痕迹和对方外在状态。观察负责“注意到什么”，不直接等于理解对方情绪。\n- 魅力：外貌、气质、声音、姿态、打扮、存在感和吸引他人注意的能力。魅力不强迫角色产生感情，只影响注意力、第一印象、暧昧机会和社交气氛。\n\nbase_attributes 格式固定为：\n健康=数值；力量=数值；敏捷=数值；理智=数值；观察=数值；魅力=数值\n\n【数值范围】\n所有基础属性与特殊属性均为10-90。\n- 普通人常见范围：40-65。\n- 明显短板：10-35。\n- 明显优势：66-80。\n- 顶尖能力：81-90，仅限设定强支撑的角色。\n- 不得超过90，不得低于10。\n- 成长后属性最高不得超过90；若成长结果会超过90，按90记录。\n\n【特殊属性规则】\nspecial_attributes 用于体现角色差异，不是所有角色都必须拥有。为了避免资料过长，special_attributes 默认可以为NULL；在查询结果中若显示为空字符串，视同 NULL。\n\n仅当角色具备明确职业、技能、兴趣、身份优势、恋爱风格、剧情功能、长期互动价值，或其是恋爱对象/重要角色时，角色表中才应具有特殊属性。\n\n生成数量建议：\n- 普通龙套：NULL或1项。\n- 功能性龙套：1-2项。\n- 重要配角：2-3项。\n- 恋爱对象/长期重要角色：3-5项。\n- 除非剧情强烈需要，不要超过5项。\n\nspecial_attributes 格式为：\n属性名=数值；属性名=数值\n\n没有特殊属性时填写NULL。\n\n特殊属性可从以下方向中选择，但必须贴合角色设定和当前剧情，不得为了凑数生成：\n- 日常生活类：照顾、家务、厨艺、收纳、理财、维修、驾驶、宠物照料、医疗常识。\n- 计划执行类：规划、应变、调查、学习、工作、谈判、危机处理、时间管理。\n- 社交恋爱类：沟通、察言观色、话术、礼仪、调情、克制、撒娇、安抚、拒绝、伪装平静。\n- 才艺兴趣类：音乐、摄影、绘画、舞蹈、写作、手作、运动、游戏、烘焙、园艺。\n- 身份剧情类：商业、人脉、法律、医学、表演、侦查、格斗、神秘学、贵族礼仪、黑客。\n\n恋爱对象或长期重要角色允许生成更贴合个人设定的专属特殊属性，例如：雨天照顾、旧伤护理、舞台控场、冷场补救、秘密隐瞒、占有欲克制、多线周旋、纪念日规划、手作礼物、夜宵投喂。专属属性必须短、明确、可用于检定，不能写成一句设定描述。\n\n【检定时机】\n适合检定：行动有不确定性，且结果会影响日常相处、关系推进、误会、气氛、距离感、外部介入或剧情转折。\n\n不适合检定：只是普通同行、吃饭、换场、等待、寒暄，且没有实际关系变化或失败代价。\n\n明显自然成立时写“必成”；明显越界、违背当前关系状态或对方已明确拒绝时写“必败”；不需要随机性时写“无”。\n\n【属性选择原则】\n1. 普通检定与对抗检定必须使用角色表中已有的基础属性或特殊属性，禁止临时编造属性。\n2. 有精准特殊属性时，优先使用特殊属性；没有精准特殊属性时，使用最接近的基础属性。\n3. 一个行动只选择最关键、最有不确定性的一个属性，不要同时堆多个属性。\n4. 身体状态、疲劳、生病、受伤优先用健康；搬运、护住、拉住、撑住优先用力量；追上、接住、避开、抢先一步优先用敏捷。\n5. 争执、吃醋、诱惑、修罗场、压力判断优先用理智；发现外部细节和异常优先用观察；第一印象、吸引力、被关注和暧昧机会优先用魅力。\n6. 日常照料、做饭、家务、约会安排、财务、突发事件、社交周旋、调情、拒绝、安抚等，如果角色有对应特殊属性，优先使用对应特殊属性；没有时退回最接近的基础属性。\n7. 信任、亲密、边界、暧昧程度、占有欲、公开程度、稳定度、共同回忆等是关系状态，不作为常规检定属性。它们只用于调整难度、奖惩骰和结果解释。\n\n【对抗检定原则】\n对抗检定表示双方意图、情绪或节奏发生拉扯，不表示强行压倒对方。\n\n常见对抗结构：\n- 察觉 vs 掩饰：对抗 <user> 观察 vs 角色 克制 / 伪装平静 / 理智\n- 沟通 vs 回避：对抗 <user> 沟通 vs 角色 理智 / 克制 / 拒绝\n- 照顾 vs 逞强：对抗 <user> 照顾 vs 角色 理智 / 健康 / 克制\n- 主动靠近 vs 保持距离：对抗 <user> 魅力 / 调情 / 沟通 vs 角色 理智 / 克制\n- 稳住场面 vs 外部介入：对抗 <user> 应变 / 话术 / 社交 vs 旁人 话术 / 魅力 / 观察\n\n【难度与奖惩】\n完成目标难度较高时，可写 难度=困难 或 难度=极难；正常难度不要写该参数。\n\n当角色明显处于优势或劣势地位时，可以指定奖惩骰。格式为 奖惩=奖励1 或 奖惩=惩罚1；没有明确奖惩时不要写该参数。\n\n信任高、气氛轻松、准备充分、共同回忆正向触发时，可给奖励1或降低难度；误会未解、气氛紧张、公开程度敏感、越过已知边界时，可给惩罚1或提高难度；严重越界时应写必败。\n\n【展示文本约束】\n1. 数量：必须恰好 5 条，每条非空。\n2. 视角：默认由玩家角色发起行动，写“玩家角色对角色做什么”。不写主角内心独白，不写角色视角的心理活动。\n3. 写法：使用限知第三人称或省略主语的外部动作句，只描写外部可见的行动。禁止使用第一人称、第二人称，禁止称呼用户姓名。\n   √ 小心翼翼试探她的反应\n   √ 假装没注意到他的目光，继续往前走\n   √ 在她开口之前，把一直没送出手的信放在桌上\n   × 你看着他，心里想他是不是也喜欢我\n   × 艾莉丝内心一阵甜蜜，却装作若无其事\n\n4. 内容方向：\n5 条选项必须紧贴最新剧情中的恋爱互动、误会、靠近、退缩、吃醋、邀约、告白、和解、等待回应等关系节点。\n每条都要让读者看出会推动关系进展、制造误会、拉近距离或引发转折。\n\n5. 五条选项方向必须区分：\n- 第 1 条：主动推进 —— 主动做出一个贴合当前剧情的行动，使关系或事件继续向前。\n- 第 2 条：正面回应 —— 对当前的冲突、暗示、请求、沉默或变化给出明确反应。\n- 第 3 条：保留/回避 —— 选择克制、观察、转移、沉默、退后或掩饰，保留余地但制造张力。\n- 第 4 条：制造变量 —— 借当前已有的人、物、环境、秘密、承诺或突发变化改变局面。\n- 第 5 条：快进剧情 —— 跳出当前即时互动，推进到下一个关键时间点、场景或事件节点；不得写成纯功能按钮，不得直接替玩家决定最终结果。\n\n6. 检定类型：\n检定类型应根据剧情自然决定，可包含普通检定、对抗检定、必成、必败、无。展示文本中不得出现检定类型、属性名、难度、奖惩或骰子命令。不得为了凑齐检定类型而制造不合剧情的越界行动。\n\n【DSL 命令】\n普通检定：\n检定 <角色> <属性> [难度=困难|极难] [奖惩=奖励1|惩罚1]\n\n对抗检定：\n对抗 <发起者> <属性> vs <对手> <属性> [难度=困难|极难] [奖惩=奖励1|惩罚1]\n\n固定成功：\n必成\n\n固定失败：\n必败\n\n无需检定：\n无\n\nDSL 约束：\n1. 普通检定和对抗检定的角色名必须来自角色属性来源查询结果，不得临时编造角色。\n2. 普通检定和对抗检定的属性名必须来自该角色已有的 base_attributes 或 special_attributes，不得临时编造属性。\n3. 对抗检定的对手必须使用已有实名，不得使用“她”“他”“对方”“某人”等泛称。该限制仅针对 dice_command；display_text 中可根据剧情使用“他”“她”等自然指代。\n4. <user> 可作为玩家角色名使用。\n5. 正常难度不要写“难度=普通”；只有困难或极难时才写难度参数。\n6. 没有明确奖惩时不要写奖惩参数。\n7. dice_command 字段只能写 DSL 命令本体，不得写解释、括号说明或多余文本。\n\n【格式示例】\n以下示例用于说明展示文本与骰子命令的对应关系。生成时必须根据当前剧情、角色与属性重新编写，不得直接复用。示例中的“角色名”仅为占位，实际生成时必须替换为查询结果中的已有实名。\n\n1. 展示文本：把伞往她那边偏了一点，装作没注意到肩头已经被雨打湿。\n   骰子命令：检定 <user> 照顾\n\n2. 展示文本：在他移开视线之前，把刚才没说完的话轻声补上。\n   骰子命令：检定 <user> 沟通 难度=困难\n\n3. 展示文本：假装没有听出她话里的试探，低头整理袖口避开那道目光。\n   骰子命令：对抗 <user> 理智 vs 角色名 察言观色\n\n4. 展示文本：几个人同时看过来时，先用一句轻松的玩笑把快要凝住的场面带过去。\n   骰子命令：检定 <user> 话术 奖惩=惩罚1\n\n5. 展示文本：换上精心挑选的衣服走进聚会，没有主动开口，只让短暂对视停留得久一点。\n   骰子命令：检定 <user> 魅力\n\n6. 展示文本：没有继续追问，只陪他走到街口，等这阵沉默自己落下去。\n   骰子命令：无\n\n7. 展示文本：在所有人看过来之前，先一步承认那封信确实是自己写的。\n   骰子命令：必成\n\n8. 展示文本：在她已经明确退后之后，仍然强行抓住她的手腕追问答案。\n   骰子命令：必败\n</检定规则>\n\n【角色属性来源】\n每次生成行动建议前必须获取以下查询的最新数据，并只允许使用查询结果中已有的角色名、基础属性和特殊属性。若某个角色没有对应特殊属性，则不得为其临时编造该特殊属性，应退回使用最接近的基础属性。\n\n{[sql \"SELECT 姓名, 普通属性, 特殊属性, 角色状态, 所在地点 FROM (SELECT 0 AS sort_order, name AS 姓名, base_attributes AS 普通属性, COALESCE(special_attributes, '') AS 特殊属性, '主角' AS 角色状态, location_name AS 所在地点 FROM protagonist_info UNION ALL SELECT CASE WHEN presence_status='在场' THEN 1 ELSE 2 END AS sort_order, name AS 姓名, base_attributes AS 普通属性, COALESCE(special_attributes, '') AS 特殊属性, '恋爱对象:' || presence_status AS 角色状态, location_name AS 所在地点 FROM romance_targets UNION ALL SELECT CASE WHEN presence_status='在场' THEN 3 ELSE 4 END AS sort_order, name AS 姓名, base_attributes AS 普通属性, COALESCE(special_attributes, '') AS 特殊属性, '重要角色:' || presence_status AS 角色状态, location_name AS 所在地点 FROM important_non_romance) ORDER BY sort_order, 姓名\"]}\n\n【生成要求】\n1. 每轮必须生成并覆盖写入恰好5条行动建议。\n2. row_id 必须固定为1、2、3、4、5。\n3. display_text 与 dice_command 都必须是非空字符串。\n4. display_text 只给玩家看，不得暴露 dice_command。\n5. dice_command 只给前端解析，不得写自然语言解释。\n6. 五条选项必须紧贴最新剧情，优先围绕当前恋爱互动、情感波动、关系阻碍、约定、误会、试探、邀约、告白、吃醋、和解等内容。\n7. 若当前剧情无明显恋爱节点，则围绕当前场景中最可能推动关系或剧情变化的行动生成。\n8. 不得生成 row_id=1~5 之外的记录。\n9. 不得少写、漏写、复用旧选项或生成空选项。",
        "initNode": "首次生成行动建议时，根据初始剧情生成5条行动建议，并使用 INSERT OR REPLACE 一次性写入 row_id=1~5。优先围绕当前恋爱互动、情感波动、关系阻碍、约定、误会、试探、邀约、告白、吃醋、和解等内容。若初始剧情无明显恋爱节点，则围绕当前场景中最可能推动关系或剧情变化的行动生成。display_text 与 dice_command 都必须是非空字符串。\n\nSQL示例: INSERT OR REPLACE INTO check_suggestions (row_id, display_text, dice_command) VALUES\n(1, '把伞往她那边偏了一点，装作没注意到肩头已经被雨打湿', '检定 <user> 照顾'),\n(2, '在他移开视线之前，把刚才没说完的话轻声补上', '检定 <user> 沟通 难度=困难'),\n(3, '假装没有听出她话里的试探，低头整理袖口避开那道目光', '对抗 <user> 理智 vs 她 察言观色'),\n(4, '几个人同时看过来时，先用一句玩笑把凝住的场面带过去', '检定 <user> 话术 奖惩=惩罚1'),\n(5, '没有继续追问，只陪他走到街口，等这阵沉默自己落下去', '无');",
        "insertNode": "禁止新增 row_id=1~5 之外的记录。除初始化和每轮覆盖写入固定5行外，不得插入第6行或其他 row_id。",
        "updateNode": "每轮交互后必须根据最新剧情重新生成5条行动建议，并用 INSERT OR REPLACE 覆盖写入 row_id=1~5。新选项必须紧密贴合本轮发生的恋爱互动、情绪转折、未决事件、新产生的约定或误会。展示文本必须遵循外部动作句规则，不写内心独白，不使用第一人称或第二人称；骰子命令必须严格从角色属性清单取角色名和属性名，对抗检定对手必须使用已有实名。明显能成功的行动用“必成”，明显失败用“必败”，无需检定用“无”。\n\nSQL示例: INSERT OR REPLACE INTO check_suggestions (row_id, display_text, dice_command) VALUES\n(1, '<展示文本1>', '<骰子命令1>'),\n(2, '<展示文本2>', '<骰子命令2>'),\n(3, '<展示文本3>', '<骰子命令3>'),\n(4, '<展示文本4>', '<骰子命令4>'),\n(5, '<展示文本5>', '<骰子命令5>');",
        "deleteNode": "禁止删除。",
        "ddl": "CREATE TABLE check_suggestions ( -- 检定建议表\n  row_id INTEGER PRIMARY KEY, -- 行号\n  display_text TEXT NOT NULL CHECK(TRIM(display_text) <> ''), -- 展示文本\n  dice_command TEXT NOT NULL CHECK(TRIM(dice_command) <> '') -- 骰子命令\n);"
      },
      "content": [
        [
          "row_id",
          "展示文本",
          "骰子命令"
        ]
      ],
      "updateConfig": {
        "uiSentinel": -1,
        "contextDepth": -1,
        "updateFrequency": 1,
        "batchSize": -1,
        "skipFloors": 0,
        "sendLatestRows": -1,
        "groupId": -1
      },
      "exportConfig": {
        "enabled": false,
        "splitByRow": false,
        "entryName": "检定建议表",
        "entryType": "constant",
        "keywords": "",
        "preventRecursion": true,
        "injectionTemplate": "",
        "extraIndexEnabled": false,
        "extraIndexEntryName": "检定建议表-索引",
        "extraIndexColumns": [],
        "extraIndexColumnModes": {},
        "extraIndexInjectionTemplate": "",
        "entryPlacement": {
          "position": "at_depth_as_system",
          "depth": 2,
          "order": 10000
        },
        "extraIndexPlacement": {
          "position": "at_depth_as_system",
          "depth": 2,
          "order": 10010
        },
        "fixedEntryPlacement": {
          "position": "at_depth_as_system",
          "depth": 2,
          "order": 99990
        },
        "fixedIndexPlacement": {
          "position": "at_depth_as_system",
          "depth": 2,
          "order": 99991
        },
        "injectIntoWorldbook": false
      },
      "orderNo": 12
    },
    "sheet_dwj6ltghl": {
      "uid": "sheet_dwj6ltghl",
      "name": "导演规划表",
      "sourceData": {
        "note": "记录当前剧情走向、内容及强制AI执行指导。\n\n【列定义】\n- 列1: 剧情走向 plot（标题性质，固定值）\n- 列2: 大纲 outline（可Null）\n- 列3: AI指导 instruction\n\n【强制约束】\nplot 列始终为字符串 `剧情走向`。\nAI必须将outline列视为未来必须发展的剧情，不得质疑、篡改或自行发挥此列内容。\ninstruction列的内容为对AI的硬性约束，AI在生成任何回复前必须首先遵循此指导，此列写入后通常不随场景切换而频繁变动。",
        "initNode": "故事初始化时插入一条剧情走向条目，可照搬SQL示例。\n\nSQL示例:INSERT INTO plot_state (row_id, plot, outline, instruction) VALUES (1, '剧情走向', NULL, '写作时必须严格以此大纲为主方向，推进剧情过程中不可偏离核心事件与关键转折，细节可在此框架内自由发挥。');",
        "insertNode": "通常情况下有且只有一行，但允许多行存在情况，若无则需插入一行。",
        "updateNode": "绝对禁止。",
        "deleteNode": "绝对禁止。",
        "ddl": "CREATE TABLE IF NOT EXISTS plot_state (\n  row_id INTEGER PRIMARY KEY, -- 行号\n  plot TEXT NOT NULL,-- 剧情走向\n  outline TEXT, -- 大纲\n  instruction TEXT NOT NULL -- AI指导\n);"
      },
      "content": [
        [
          "row_id",
          "剧情走向",
          "大纲",
          "AI指导"
        ],
        [
          null,
          "剧情走出",
          "暂无",
          "写作时必须严格以此大纲为主方向，推进剧情过程中不可偏离核心事件与关键转折，细节可在此框架内自由发挥。"
        ]
      ],
      "updateConfig": {
        "uiSentinel": -1,
        "contextDepth": -1,
        "updateFrequency": 999999,
        "batchSize": -1,
        "skipFloors": -1,
        "sendLatestRows": -1,
        "groupId": -1
      },
      "exportConfig": {
        "enabled": true,
        "splitByRow": false,
        "entryName": "导演规划表",
        "entryType": "constant",
        "keywords": "",
        "preventRecursion": true,
        "injectionTemplate": "",
        "extraIndexEnabled": false,
        "extraIndexEntryName": "导演规划表-索引",
        "extraIndexColumns": [],
        "extraIndexColumnModes": {},
        "extraIndexInjectionTemplate": "",
        "entryPlacement": {
          "position": "at_depth_as_system",
          "depth": 2,
          "order": 15
        },
        "extraIndexPlacement": {
          "position": "at_depth_as_system",
          "depth": 2,
          "order": 10010
        },
        "fixedEntryPlacement": {
          "position": "at_depth_as_system",
          "depth": 2,
          "order": 99990
        },
        "fixedIndexPlacement": {
          "position": "at_depth_as_system",
          "depth": 2,
          "order": 99991
        }
      },
      "orderNo": 13
    }
  }
};
