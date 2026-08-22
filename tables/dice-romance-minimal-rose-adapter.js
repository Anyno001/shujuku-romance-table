export const diceRomanceMinimalRoseAdapter = {
  "id": "dice-romance-minimal-rose-adapter",
  "title": "骰子-恋爱精简表（蔷薇前端适配）",
  "databaseKey": "dice-romance-minimal-rose-adapter",
  "template": {
    "mate": {
      "type": "chatSheets",
      "version": 2,
      "fusionMeta": {
        "generatedBy": "rose-template-adapter",
        "generatedAt": "2026-08-22T07:07:41.372Z",
        "sources": [
          {
            "origin": "A",
            "sourceId": "local:TavernDB_template_恋爱精简表_带网络版.json",
            "name": "TavernDB_template_恋爱精简表_带网络版.json",
            "sheetCount": 10,
            "sheets": [
              {
                "key": "sheet_bei_wang_lu",
                "outputSheetKey": "sheet_bei_wang_lu",
                "name": "备忘录"
              },
              {
                "key": "sheet_quan_ju_zhuang_tai_biao",
                "outputSheetKey": "sheet_quan_ju_zhuang_tai_biao",
                "name": "全局状态表"
              },
              {
                "key": "sheet_chang_jing_di_dian_biao",
                "outputSheetKey": "sheet_chang_jing_di_dian_biao",
                "name": "本地地图表"
              },
              {
                "key": "sheet_zhu_jue_xin_xi_biao",
                "outputSheetKey": "sheet_zhu_jue_xin_xi_biao",
                "name": "主角信息表"
              },
              {
                "key": "sheet_zhong_yao_jue_se_biao",
                "outputSheetKey": "sheet_zhong_yao_jue_se_biao",
                "name": "重要角色表"
              },
              {
                "key": "sheet_lian_ai_ri_ji_biao",
                "outputSheetKey": "sheet_lian_ai_ri_ji_biao",
                "name": "恋爱日记表"
              },
              {
                "key": "sheet_ji_yao_biao",
                "outputSheetKey": "sheet_ji_yao_biao",
                "name": "纪要表"
              },
              {
                "key": "sheet_jian_ding_jian_yi_biao",
                "outputSheetKey": "sheet_jian_ding_jian_yi_biao",
                "name": "检定建议表"
              },
              {
                "key": "sheet_guan_xi_wang_luo_biao",
                "outputSheetKey": "sheet_guan_xi_wang_luo_biao",
                "name": "关系表"
              },
              {
                "key": "sheet_wu_pin_biao",
                "outputSheetKey": "sheet_wu_pin_biao",
                "name": "物品表"
              }
            ]
          }
        ]
      },
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
    "sheet_bei_wang_lu": {
      "uid": "sheet_bei_wang_lu",
      "name": "备忘录",
      "sourceData": {
        "note": "记录所有未完成的待办/任务事项，一行代表一条待办，完成后删除。\n- 任务名称：待办事项的标题，作为全表唯一稳定标识\n- 详细描述：待办的具体内容和要求\n- 关联角色：事项关联的角色。用,号隔开\n- 任务时限：完成待办的截止时间或剩余时间\n- 进度及后续：待办事项当前的进度或完成后的状况",
        "initNode": "故事初始化时，根据剧情与设定添加已有未完成待办。",
        "deleteNode": "待办完成、取消或过期时删除。",
        "updateNode": "待办取得进展、状态变化时更新。",
        "insertNode": "新增未完成待办事项时添加。",
        "ddl": "CREATE TABLE quests_events ( -- 任务与事件表\n  row_id INTEGER PRIMARY KEY, -- 行号\n  quest_name TEXT, -- 任务名称\n  detail_desc TEXT, -- 详细描述\n  relate_character TEXT, -- 关联角色\n  time_limit TEXT, -- 任务时限\n  reward TEXT -- 进度及后果\n);"
      },
      "content": [
        [
          "row_id",
          "任务名称",
          "详细描述",
          "关联角色",
          "任务时限",
          "进度及后果"
        ]
      ],
      "updateConfig": {
        "uiSentinel": -1,
        "contextDepth": -1,
        "updateFrequency": -1,
        "batchSize": -1,
        "skipFloors": -1
      },
      "exportConfig": {
        "enabled": true,
        "splitByRow": false,
        "entryName": "备忘录",
        "entryType": "keyword",
        "keywords": "关联角色",
        "preventRecursion": true,
        "injectionTemplate": "",
        "extraIndexEnabled": true,
        "extraIndexEntryName": "备忘录-索引",
        "extraIndexColumns": [
          "关联角色",
          "任务名称",
          "任务时限"
        ],
        "extraIndexColumnModes": {
          "关联角色": "both",
          "任务名称": "both",
          "任务时限": "both"
        },
        "extraIndexInjectionTemplate": "",
        "sqlInjectionTemplate": "",
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
      "orderNo": 0
    },
    "sheet_quan_ju_zhuang_tai_biao": {
      "uid": "sheet_quan_ju_zhuang_tai_biao",
      "name": "全局状态表",
      "sourceData": {
        "note": "记录当前时间、地点信息。此表有且仅有一行。\n\n【列说明】\n- 全局状态：固定字符串\"全局状态\"，标题性质\n- 当前时间 / 上轮场景时间：YYYY-MM-DD HH:MM\n- 经过的时间：{数值}{单位}，如\"3小时20分\"\"2天\"\n- 当前地点：写具体空间，外出写地点名\n\n【时间规则】\ncur_time = prev_scene_time + elapsed_time\n初始化时prev_scene_time为NULL，cur_time直接填初始时间。\n每轮推进时：将上一轮cur_time写入prev_scene_time → 填写elapsed_time → 计算新cur_time。",
        "initNode": "故事初始化时插入唯一条目。",
        "deleteNode": "禁止。",
        "updateNode": "每轮推进时更新时间字段；地点或拍摄状态变动时同步更新。\n\nSQL: UPDATE global_state SET prev_scene_time='2026-04-07 14:00', elapsed_time='2小时', cur_time='2026-04-07 16:00', current_location='别墅后巷' WHERE row_id=1;",
        "insertNode": "禁止。",
        "ddl": "CREATE TABLE global_state ( -- 全局状态表\n  row_id INTEGER PRIMARY KEY, -- 行号\n  global_status TEXT, -- 全局状态\n  cur_time TEXT, -- 当前时间\n  prev_scene_time TEXT, -- 上轮场景时间\n  elapsed_time TEXT, -- 经过的时间\n  current_location TEXT -- 当前地点\n);"
      },
      "content": [
        [
          "row_id",
          "全局状态",
          "当前时间",
          "上轮场景时间",
          "经过的时间",
          "当前地点"
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
        "entryName": "全局状态表",
        "entryType": "constant",
        "keywords": "",
        "preventRecursion": true,
        "injectionTemplate": "",
        "extraIndexEnabled": false,
        "extraIndexEntryName": "全局状态表-索引",
        "extraIndexColumns": [],
        "extraIndexColumnModes": {},
        "extraIndexInjectionTemplate": "",
        "sqlInjectionTemplate": "",
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
      "orderNo": 1
    },
    "sheet_chang_jing_di_dian_biao": {
      "uid": "sheet_chang_jing_di_dian_biao",
      "name": "本地地图表",
      "sourceData": {
        "note": "记录故事中出现过的地点。\n\n【列定义】\n- 列1: 地点名称（全表唯一，作为其他表引用地点的基准）\n- 列2: 场景描述 （≤60字）\n\n【蔷薇地图适配】X坐标、Y坐标使用0–1归一化值；X为东西方向，Y为南北方向。",
        "initNode": "为当前主要地区至少插入 3 条详细地点，优先为主角和重要角色近期使用。\n",
        "deleteNode": "禁止。",
        "updateNode": "描述变化时更新。",
        "insertNode": "出现新场景时新增。 新增地点时必须同时填写 X坐标、Y坐标（0–1）。",
        "ddl": "CREATE TABLE world_map_points (\n  row_id INTEGER PRIMARY KEY, -- 行号\n  location_name TEXT, -- 地点名称\n  environment_desc TEXT, -- 场景描述\n  x_coordinate REAL, -- X坐标\n  y_coordinate REAL -- Y坐标\n);"
      },
      "content": [
        [
          "row_id",
          "地点名称",
          "场景描述",
          "X坐标",
          "Y坐标"
        ]
      ],
      "updateConfig": {
        "uiSentinel": -1,
        "contextDepth": -1,
        "updateFrequency": -1,
        "batchSize": -1,
        "skipFloors": -1,
        "groupId": -1,
        "sendLatestRows": -1
      },
      "exportConfig": {
        "enabled": true,
        "splitByRow": false,
        "entryName": "本地地图表",
        "entryType": "constant",
        "keywords": "",
        "preventRecursion": true,
        "injectionTemplate": "",
        "extraIndexEnabled": false,
        "extraIndexEntryName": "世界地图点索引",
        "extraIndexColumns": [],
        "extraIndexColumnModes": {},
        "extraIndexInjectionTemplate": "",
        "sqlInjectionTemplate": "",
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
    "sheet_zhu_jue_xin_xi_biao": {
      "uid": "sheet_zhu_jue_xin_xi_biao",
      "name": "主角信息表",
      "sourceData": {
        "note": "记录主角核心信息。此表有且仅有一行。\n\n【列说明】\n- 主角信息：固定字符串\"主角信息\"，标题性质\n- 性别\n- 外貌特征：≤60字\n- 身份：≤40字，逗号分隔\n- 近况：一句话身体/情绪状态。正常时填\"一切如常\"，异常时写具体感受\n  √ 左膝擦伤，有点烦躁\n  √ 抑制剂快到时间了，后颈发热\n- 基础属性：\"健康:数值;力量:数值;敏捷:数值;理智:数值;观察:数值;魅力:数值\"，范围10-90\n- 特有属性：\"属性名:数值;\"格式，可NULL，通常为主角的特殊技能或者其他",
        "initNode": "故事初始化时插入主角条目。",
        "deleteNode": "禁止。",
        "updateNode": "字段变化时更新。\n\nSQL示例: UPDATE protagonist_info SET current_condition='左膝擦伤，有点烦躁', base_attributes='健康:60;力量:78;敏捷:80;理智:44;观察:62;魅力:58' WHERE row_id=1;",
        "insertNode": "禁止。",
        "ddl": "CREATE TABLE protagonist_info (\n  row_id INTEGER PRIMARY KEY,\n  protagonist_info TEXT NOT NULL, -- 主角信息\n  name TEXT NOT NULL, -- 姓名\n  gender TEXT NOT NULL, -- 性别\n  age INTEGER NOT NULL, -- 年龄\n  appearance TEXT NOT NULL, -- 外貌特征\n  identity_text TEXT NOT NULL, -- 身份\n  current_condition TEXT NOT NULL DEFAULT '一切如常', -- 近况\n  base_attributes TEXT NOT NULL, -- 基础属性\n  special_attributes TEXT, -- 特有属性\n  location_name TEXT, -- 所在地点\n  belongings TEXT -- 随身财物\n);",
        "hiddenPhysicalColumns": []
      },
      "content": [
        [
          "row_id",
          "主角信息",
          "姓名",
          "性别",
          "年龄",
          "外貌特征",
          "身份",
          "近况",
          "基础属性",
          "特有属性",
          "所在地点",
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
        "enabled": true,
        "splitByRow": false,
        "entryName": "主角信息",
        "entryType": "constant",
        "keywords": "姓名",
        "preventRecursion": true,
        "injectionTemplate": "<主角状态>\n$1\n</主角状态>",
        "extraIndexEnabled": false,
        "extraIndexEntryName": "主角信息-索引",
        "extraIndexColumns": [],
        "extraIndexColumnModes": {},
        "extraIndexInjectionTemplate": "",
        "sqlInjectionTemplate": "",
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
    "sheet_zhong_yao_jue_se_biao": {
      "uid": "sheet_zhong_yao_jue_se_biao",
      "name": "重要角色表",
      "sourceData": {
        "note": "记录所有NPC（不包括主角）的档案与动态状态。\n\n【列说明】\n- 角色类型：恋爱对象 / 家人 / 配角 等等\n- 一句话介绍：≤30字，仅客观事实，禁止性格标签\n  √ 集团唯一继承人，国民顶流偶像\n  × 温柔善良的国民偶像\n- 外貌特征：≤40字\n- 穿着打扮：≤40字，仅外在可见的服饰/饰品/妆容，禁止写气质气场\n  √ 纯白真丝衬衫\n  × 散发高贵气场\n- 基础属性：\"健康:数值;力量:数值;敏捷:数值;理智:数值;观察:数值;魅力:数值\"，范围10-90\n- 特有属性：\"属性名:数值;\"，可NULL，通常为角色的特殊技能或者其他\n- 在场状态：在场 / 离场\n- 人际关系：格式\"角色名:关系标签\"，多角色用分号分隔，同角色多标签用逗号\n  √ 爱丽丝:同学; 木下:未婚妻关系\n  × 和爱丽丝关系不好（缺角色名前缀）\n- 当下想法：≤60字，恋爱对象必填，其余可NULL\n\n【当下想法规则（仅恋爱对象）】\n- 第一人称无主语，禁止出现\"我\"\n- 用角色口语化语气，包含情绪+即时反应+潜在想法\n  √ 心脏跳得好快……先低头假装看书吧，希望不要被注意到\n  × 我不想见他（出现\"我\"）\n  × 处于暧昧期（状态归纳）",
        "initNode": "为已登场角色各插入一条。",
        "deleteNode": "禁止。",
        "updateNode": "各项状态变化时更新。",
        "insertNode": "新角色登场时新增。",
        "ddl": "CREATE TABLE important_characters (\n  row_id INTEGER PRIMARY KEY,\n  name TEXT UNIQUE, -- 姓名\n  role_type TEXT, -- 角色类型\n  gender TEXT, -- 性别\n  age TEXT, -- 年龄\n  brief_intro TEXT, -- 一句话介绍\n  appearance TEXT, -- 外貌特征\n  outfit_text TEXT, -- 穿着打扮\n  base_attributes TEXT, -- 基础属性\n  special_attributes TEXT, -- 特有属性\n  location_name TEXT, -- 所在地点\n  presence_status TEXT, -- 在场状态\n  relation_text TEXT, -- 人际关系\n  current_thought TEXT, -- 当下想法\n  past_experience TEXT, -- 过往经历\n  interaction_options TEXT -- 交互选项\n);",
        "hiddenPhysicalColumns": []
      },
      "content": [
        [
          "row_id",
          "姓名",
          "角色类型",
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
        "injectionTemplate": "<重要角色资料>\n$1\n<重要角色资料>",
        "extraIndexEnabled": false,
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
        "sqlInjectionTemplate": "",
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
      "orderNo": 4
    },
    "sheet_lian_ai_ri_ji_biao": {
      "uid": "sheet_lian_ai_ri_ji_biao",
      "name": "恋爱日记表",
      "sourceData": {
        "note": "恋爱对象日记表：记录一名或多名恋爱对象的主观日记。客观经过→纪要表；主观内心→本表；两表用AM码绑定。\n\n【列定义】\n- 写作角色（必须是恋爱对象表中已建档角色）\n- 关联角色（固定填主角姓名）\n- 关联AM码 related_am_code（对应纪要表 code_index）\n- 日记内容（120–240字）\n- 发生时间\n\n\n【强制约束】\n\n1. AM码必填：取自纪要表已有 `code_index`。同轮填本轮AM码，补写填历史AM码。多角色可共用同一AM码分别写。禁止编造、NULL或空值占位。\n\n2. 准入条件（全部满足才写）：\n   - 写作角色已在角色表建档且为恋爱对象；\n   - 事件已有或即将有对应纪要；\n   - 事件直接影响该角色对主角的好感、信任、期待、误会、心动、距离感等关系判断；\n   - 出现不适合写进纪要的主观内容：反复揣摩、甜蜜困惑、期待与不安交织、心动却嘴硬等；\n   - 删除本条后会影响理解该角色后续对主角的态度变化。\n\n3. 禁止写入：\n   - 普通聊天/问候/同行/吃饭等无特殊意义互动；\n   - 复述剧情或浅层反应；\n   - 仅因恋爱对象在场或主角礼貌正常行为即触发；\n   - 本轮无新的期待、心动、动摇、误会、关系变化；\n   - 与上一条日记情绪状态基本重复；\n   - 同一自然日同一角色最多1条，除非明显关系转折；\n   - 把纪要内容改第一人称塞进日记；\n   - 角色不可能知道的事实；\n   - 角色得出明确结论（如“他就是喜欢我”），必须保留至少两种可能；\n   - 线性逻辑推理，必须呈现跳跃、回旋、自我打断式思绪。\n\n4. 写作规则：\n   - 第一人称，符合角色当前性格、关系阶段、说话习惯和内心状态；\n   - 只写角色知道/看见/听见/猜到/误解到的内容，不上帝视角，不替主角解释动机；\n   - 未知主角姓名时只能用“那个人/他/她”等代称；\n   - 重点写：没说出口的心动、反复揣摩后的甜蜜不确定、期待与害羞的来回拉扯、意识到自己与平时不同却藏不住的小雀跃、对下次见面的隐约期待和嘴硬、对具体细节的反复回味、不愿被发现的心意及对这份心意的害羞困惑；\n   - 多用“也许/可能/该不会/会不会/说不定/但又觉得/可是/还是说”等不确定表达，猜测不可写成事实；\n   - 立场可自相矛盾，每次只推进一小步，禁止跳跃式升温；\n   - 结尾必须停在甜蜜困惑/期待摇摆/悬而未决中，禁止确定收束、客观总结、复述剧情、替主角解释动机、替关系下定义；\n   - 全文保持温柔、明亮、生活化的恋爱前期基调。\n\n5. 台词融入：\n   - 可写：角色亲耳听到主角说的话、角色自己说后反复回想的话、他人当面说出并影响角色理解主角的话；\n   - 禁止：角色未听见的话、仅玩家或旁白知道的信息、完整搬运纪要对话；\n   - 写法：引用后紧接多种解读、甜蜜反刍、自我反驳，像碎碎念嵌入独白。\n\n6. 微观描写禁止：指尖/指腹/指节/指缝/颈侧/颈窝/锁骨/耳廓/耳后/鼻尖/舌根/喉口。可概述主角普通动作、表情、语气、注视方式，重点写角色对此的不确定解读和心动反应。\n\n7. 日常事件例外：普通行为若被角色赋予特殊意义并出现甜蜜自我怀疑、反复回味、细节触发的甜蜜假设，可写。仅“说了几句话/觉得还不错”不写。\n\n\n【示例】\n他今天在我说话时突然结巴了一下。就那么一下，我的心跳好像漏了一拍。是我说了什么奇怪的话吗？想了一遍，明明很普通啊。也许他只是走神了吧。可如果是走神，为什么后来突然聊起烤肉店？是在帮我接话？还是……他真的只是饿了。天哪我在想什么啊，对着一个停顿脑补这么多。但那一瞬间他好像看了我一眼……算了，其实也没看清，说不定是我的错觉。不想了不想了。……可是那个眼神，到底是什么意思嘛？",
        "initNode": "如有明确的关键情感事件且已有对应纪要AM码，可插入对应日记。没有符合准入条件的情感事件时，不要为初始化强行插入。\n日记内容自然融入写作角色对某句具体台词的反复思考。",
        "deleteNode": "禁止。",
        "updateNode": "禁止。",
        "insertNode": "发生符合准入规则的关键情感事件后插入。必须填写关联AM码，取自纪要表已有 code_index。",
        "ddl": "CREATE TABLE romance_diary (\n  row_id INTEGER PRIMARY KEY, -- 行号\n  writer TEXT, -- 写作角色\n  related_char TEXT, -- 关联角色\n  related_am_code TEXT, -- 关联AM码\n  summary TEXT, -- 日记内容\n  time TEXT -- 发生时间\n);"
      },
      "content": [
        [
          "row_id",
          "写作角色",
          "关联角色",
          "关联AM码",
          "日记内容",
          "发生时间"
        ]
      ],
      "updateConfig": {
        "uiSentinel": -1,
        "contextDepth": -1,
        "updateFrequency": -1,
        "batchSize": -1,
        "skipFloors": -1,
        "groupId": -1,
        "sendLatestRows": 5
      },
      "exportConfig": {
        "enabled": true,
        "splitByRow": true,
        "entryName": "恋爱日记",
        "entryType": "keyword",
        "keywords": "关联AM码",
        "preventRecursion": true,
        "injectionTemplate": "<恋爱日记>\n$1\n</恋爱日记>",
        "extraIndexEnabled": false,
        "extraIndexEntryName": "恋爱日记索引",
        "extraIndexColumns": [
          "关联AM码"
        ],
        "extraIndexColumnModes": {
          "关联AM码": "both"
        },
        "extraIndexInjectionTemplate": "<恋爱日记索引>\n$1\n</恋爱日记索引>",
        "sqlInjectionTemplate": "",
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
      "orderNo": 5
    },
    "sheet_ji_yao_biao": {
      "uid": "sheet_ji_yao_biao",
      "name": "纪要表",
      "sourceData": {
        "note": "轮次日志，每轮交互结束后立刻插入一条新记录。\n\n【列定义】\n- 编码索引（AMXXXX（从0001起递增），全表唯一）\n- 时间跨度\n- 概览（≤30字）\n- 纪要（300-480字）\n- 重要对话（可NULL）\n\n【强制约束】\n1.编码索引格式 AMXXXX，从0001开始递增。\n2.时间跨度格式为 \"YYYY-MM-DD HH:MM ~ YYYY-MM-DD HH:MM\"，覆盖本轮事件的实际时间范围。\n3.概览一句话概括本轮纪要内容，≤30字。\n\n4.纪要规范：\n- 以第三方视角中立客观记录正文发生的一切，移除所有修辞与对话。不滥用环境描写、不进行动作细节分析、不加评论，不抒情，不升华。\n- 用词直白生活化，避免正式措辞（如“达成协议”“确立计划”）。\n- 结尾必须开放，在事件自然流动中结束，不得归纳状态或做出封闭式收束。\n违例：故事仍然在继续 / 新的篇章开启 / 二人关系迈入新阶段 / 未来等待着他们。\n- 多轮交互整合为一条记录。\n- 禁止内容：极端情绪（崩溃、狂喜、绝望等）、夸张、比喻、升华、情绪总结、支配欲、欲望、总结性收尾。\n- 字数不少于300字。\n\n5.重要对话仅摘录直接推动剧情转折、揭示关键信息、改变人物关系/决策或构成承诺/誓约/约定的原文台词，标明说话人。排除寒暄、重复、情绪感叹。通常3句，最多5句，总token不超过150。",
        "initNode": "故事初始化时，插入一条新记录用于记录剧情。",
        "deleteNode": "禁止。",
        "updateNode": "禁止。",
        "insertNode": "每轮交互结束后插入一条新记录。\n\n【强制约束】\ncode_index、time_span、summary、chronicle_text 均 NOT NULL，不可写 NULL 或空串。\n\nSQL示例：INSERT INTO chronicle (row_id, code_index, time_span, summary, chronicle_text, key_dialogue, day_count) VALUES ((SELECT COALESCE(MAX(row_id), 0) + 1 FROM chronicle), 'AM0036', '2026-02-04 08:00 ~ 2026-02-04 08:30', '一句话概括', '本轮纪要内容...', NULL);",
        "ddl": "CREATE TABLE chronicle (\n  row_id INTEGER PRIMARY KEY,\n  code_index TEXT UNIQUE, -- 编码索引\n  time_span TEXT, -- 时间跨度\n  summary TEXT CHECK(LENGTH(summary) <= 66), -- 概览\n  chronicle_text TEXT NOT NULL CHECK(length(chronicle_text) >= 300 AND length(chronicle_text) <= 620), -- 纪要\n  key_dialogue TEXT -- 重要对话\n);"
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
        "groupId": -1,
        "sendLatestRows": 8
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
        "sqlInjectionTemplate": "",
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
      "orderNo": 6
    },
    "sheet_jian_ding_jian_yi_biao": {
      "uid": "sheet_jian_ding_jian_yi_biao",
      "name": "检定建议表",
      "sourceData": {
        "note": "【蔷薇前端字段顺序】建议类型、发起者、展示文本、骰子命令。建议类型使用“主角行动”“角色行动”或“快进剧情”。\n\n记录每轮剧情后提供给玩家的5条行动建议及对应检定命令。此表固定保留5行，row_id 必须为1~5；每轮必须覆盖写入全部5行，不得少于或多于5行。\n\n- 列0: 建议类型\n- 列1: 发起者\n- 列2: 展示文本 - 前端展示给用户看的自然语言行动选项，不暴露骰子命令、检定术语和后台结构，长度12–60字。\n- 列3: 骰子命令 - 前端解析执行的极简DSL命令，不展示给用户，必须严格符合下方 DSL 命令格式。\n\n<检定规则>\n【检定规则】\n使用恋爱日常检定：掷 1d100，结果小于等于属性值则推进顺利。检定不用于强迫角色产生感情，只判断本次行动对日常相处、关系状态、情绪张力、误会、距离感或剧情推进造成的影响。\n\n普通检定与对抗检定都必须使用角色表中已有的基础属性 base_attributes 或特殊属性 special_attributes，禁止临时编造属性。\n\n【基础属性规则】\n基础属性 base_attributes 是所有角色应已具备的通用属性，用于保证任何角色都能参与普通检定、对抗检定和成长检定。基础属性固定为以下6项，必须全部出现，不得缺项、改名或新增基础属性：\n- 健康：身体状态、疾病、恢复、受伤、疲劳、熬夜、酒量等身体承受力。\n- 力量：搬运、扶起、拉住、护住、撑住、推开障碍等身体力量相关行动。\n- 敏捷：动作反应、身体协调、及时接住、避开、追上、抢先一步等即时行动。\n- 理智：在争执、误会、吃醋、诱惑、压力、修罗场中保持冷静判断。理智不是SAN，只表示日常关系场景里的判断和抗压。\n- 观察：发现客观可见的细节、异常、环境变化、物品痕迹和对方外在状态。观察负责“注意到什么”，不直接等于理解对方情绪。\n- 魅力：外貌、气质、声音、姿态、打扮、存在感和吸引他人注意的能力。魅力不强迫角色产生感情，只影响注意力、第一印象、暧昧机会和社交气氛。\n\nbase_attributes 格式固定为：\n健康:数值;力量:数值;敏捷:数值;理智:数值;观察:数值;魅力:数值\n\n【数值范围】\n所有基础属性与特殊属性均为10-90。\n- 普通人常见范围：40-65。\n- 明显短板：10-35。\n- 明显优势：66-80。\n- 顶尖能力：81-90，仅限设定强支撑的角色。\n- 不得超过90，不得低于10。\n- 成长后属性最高不得超过90；若成长结果会超过90，按90记录。\n\n【特殊属性规则】\nspecial_attributes 用于体现角色差异，不是所有角色都必须拥有。为了避免资料过长，special_attributes 默认可以为NULL；在查询结果中若显示为空字符串，视同 NULL。\n\n仅当角色具备明确职业、技能、兴趣、身份优势、恋爱风格、剧情功能、长期互动价值，或其是恋爱对象/重要角色时，角色表中才应具有特殊属性。\n\n生成数量建议：\n- 普通龙套：NULL或1项。\n- 功能性龙套：1-2项。\n- 重要配角：2-3项。\n- 恋爱对象/长期重要角色：3-5项。\n- 除非剧情强烈需要，不要超过5项。\n\nspecial_attributes 格式为：\n属性名:数值;属性名:数值\n\n没有特殊属性时填写NULL。\n\n特殊属性可从以下方向中选择，只不过必须贴合角色设定和当前剧情，不得为了凑数生成：\n- 日常生活类：照顾、家务、厨艺、收纳、理财、维修、驾驶、宠物照料、医疗常识。\n- 计划执行类：规划、应变、调查、学习、工作、谈判、危机处理、时间管理。\n- 社交恋爱类：沟通、察言观色、话术、礼仪、调情、克制、撒娇、安抚、拒绝、伪装平静。\n- 才艺兴趣类：音乐、摄影、绘画、舞蹈、写作、手作、运动、游戏、烘焙、园艺。\n- 身份剧情类：商业、人脉、法律、医学、表演、侦查、格斗、神秘学、贵族礼仪、黑客。\n\n恋爱对象或长期重要角色允许生成更贴合个人设定的专属特殊属性，例如：雨天照顾、旧伤护理、舞台控场、冷场补救、秘密隐瞒、占有欲克制、多线周旋、纪念日规划、手作礼物、夜宵投喂。专属属性必须短、明确、可用于检定，不能写成一句设定描述。\n\n【检定时机】\n适合检定：行动有不确定性，且结果会影响日常相处、关系推进、误会、气氛、距离感、外部介入或剧情转折。\n\n不适合检定：只是普通同行、吃饭、换场、等待、寒暄，且没有实际关系变化或失败代价。\n\n明显自然成立时写“必成”；明显越界、违背当前关系状态或对方已明确拒绝时写“必败”；不需要随机性时写“无”。\n\n【属性选择原则】\n1. 普通检定与对抗检定必须使用角色表中已有的基础属性或特殊属性，禁止临时编造属性。\n2. 有精准特殊属性时，优先使用特殊属性；没有精准特殊属性时，使用最接近的基础属性。\n3. 一个行动只选择最关键、最有不确定性的一个属性，不要同时堆多个属性。\n4. 身体状态、疲劳、生病、受伤优先用健康；搬运、护住、拉住、撑住优先用力量；追上、接住、避开、抢先一步优先用敏捷。\n5. 争执、吃醋、诱惑、修罗场、压力判断优先用理智；发现外部细节和异常优先用观察；第一印象、吸引力、被关注和暧昧机会优先用魅力。\n6. 日常照料、做饭、家务、约会安排、财务、突发事件、社交周旋、调情、拒绝、安抚等，如果角色有对应特殊属性，优先使用对应特殊属性；没有时退回最接近的基础属性。\n7. 信任、亲密、边界、暧昧程度、占有欲、公开程度、稳定度、共同回忆等是关系状态，不作为常规检定属性。它们只用于调整难度、奖惩骰和结果解释。\n\n【对抗检定原则】\n对抗检定表示双方意图、情绪或节奏发生拉扯，不表示强行压倒对方。\n\n常见对抗结构：\n- 察觉 vs 掩饰：对抗 <user> 观察 vs 角色 克制 / 伪装平静 / 理智\n- 沟通 vs 回避：对抗 <user> 沟通 vs 角色 理智 / 克制 / 拒绝\n- 照顾 vs 逞强：对抗 <user> 照顾 vs 角色 理智 / 健康 / 克制\n- 主动靠近 vs 保持距离：对抗 <user> 魅力 / 调情 / 沟通 vs 角色 理智 / 克制\n- 稳住场面 vs 外部介入：对抗 <user> 应变 / 话术 / 社交 vs 旁人 话术 / 魅力 / 观察\n\n【难度与奖惩】\n完成目标难度较高时，不过写 难度=困难 或 难度=极难；正常难度不要写该参数。\n\n当角色明显处于优势或劣势地位时，可以指定奖惩骰。格式为 奖惩=奖励1 或 奖惩=惩罚1；没有明确奖惩时不要写该参数。\n\n信任高、气氛轻松、准备充分、共同回忆正向触发时，不过给奖励1或降低难度；误会未解、气氛紧张、公开程度敏感、越过已知边界时，不过给惩罚1或提高难度；严重越界时应写必败。\n</检定规则>\n\n【展示文本约束】\n1. 数量：必须恰好 5 条，每条非空。\n2. 视角：默认由玩家角色发起行动，写“玩家角色对角色做什么”。不写主角内心独白，不写角色视角的心理活动。\n3. 写法：使用限知第三人称或省略主语的外部动作句，只描写外部可见的行动。禁止使用第一人称、第二人称，禁止称呼用户姓名。\n   √ 小心翼翼试探她的反应\n   √ 假装没注意到他的目光，继续往前走\n   √ 在她开口之前，把一直没送出手的信放在桌上\n   × 你看着他，心里想他是不是也喜欢我\n   × 艾莉丝内心一阵甜蜜，却装作若无其事\n\n4. 内容方向：\n5 条选项必须紧贴最新剧情中的恋爱互动、误会、靠近、退缩、吃醋、邀约、告白、和解、等待回应等关系节点。\n每条都要让读者看出会推动关系进展、制造误会、拉近距离或引发转折。\n\n5. 五条选项方向必须区分：\n- 第 1 条：主动推进 —— 主动做出一个贴合当前剧情的行动，使关系或事件继续向前。\n- 第 2 条：正面回应 —— 对当前的冲突、暗示、请求、沉默或变化给出明确反应声。\n- 第 3 条：保留/回避 —— 选择克制、观察、转移、沉默、退后或掩饰，保留余地但制造张力。\n- 第 4 条：制造变量 —— 借当前已有的人、物、环境、秘密、承诺或突发变化改变局面。\n- 第 5 条：快进剧情 —— 跳出当前即时互动，推进到下一个关键时间点、场景或事件节点；不得写成纯功能按钮，不得直接替玩家决定最终结果。\n\n6. 检定类型：\n检定类型应根据剧情自然决定，不过包含普通检定、对抗检定、必成、必败、无。展示文本中不得出现检定类型、属性名、难度、奖惩或骰子命令。不得为了凑齐检定类型而制造不合剧情的越界行动。\n\n【DSL 命令】\n普通检定：\n检定 <角色> <属性> [难度=困难|极难] [奖惩=奖励1|惩罚1]\n\n对抗检定：\n对抗 <发起者> <属性> vs <对手> <属性> [难度=困难|极难] [奖惩=奖励1|惩罚1]\n\n固定成功：\n必成\n\n固定失败：\n必败\n\n无需检定：\n无\n\nDSL 约束：\n1. 普通检定和对抗检定的角色名必须来自角色属性来源查询结果，不得临时编造角色。\n2. 普通检定和对抗检定的属性名必须来自该角色已有的 base_attributes 或 special_attributes，不得临时编造属性。\n3. 对抗检定的对手必须使用已有实名，不得使用“她”“他”“对方”“某人”等泛称。该限制仅针对 dice_command；display_text 中可根据剧情使用“他”“她”等自然指代。\n4. <user> 可作为玩家角色名使用。\n5. 正常难度不要写“难度=普通”；只有困难或极难时才写难度参数。\n6. 没有明确奖惩时不要写奖惩参数。\n7. dice_command 字段只能写 DSL 命令本体，不得写解释、括号说明或多余文本。\n\n【格式示例】\n以下示例用于说明展示文本与骰子命令的对应关系。生成时必须根据当前剧情、角色与属性重新编写，不得直接复用。示例中的“角色名”仅为占位，实际生成时必须替换为查询结果中的已有实名。\n\n1. 展示文本：把伞往她那边偏了一点，装作没注意到肩头已经被雨打湿。\n   骰子命令：检定 <user> 照顾\n\n2. 展示文本：在他移开视线之前，把刚才没说完的话轻声补上。\n   骰子命令：检定 <user> 沟通 难度=困难\n\n3. 展示文本：假装没有听出她话里的试探，低头整理袖口避开那道目光。\n   骰子命令：对抗 <user> 理智 vs 角色名 察言观色\n\n4. 展示文本：几个人同时看过来时，先用一句轻松的玩笑把快要凝住的场面带过去。\n   骰子命令：检定 <user> 话术 奖惩=惩罚1\n\n5. 展示文本：换上精心挑选的衣服走进聚会，让短暂对视停留得久一点，没有主动开口。\n   骰子命令：检定 <user> 魅力\n\n6. 展示文本：没有继续追问，只陪他走到街口，等这阵沉默自己落下去。\n   骰子命令：无\n\n7. 展示文本：在所有人看过来之前，先一步承认那封信确实是自己写的。\n   骰子命令：必成\n\n8. 展示文本：在她已经明确退后之后，仍然强行抓住她的手腕追问答案。\n   骰子命令：必败\n</检定规则>\n\n【角色属性来源】\n每次生成行动建议前必须获取以下查询的最新数据，并只允许使用查询结果中已有的角色名、基础属性和特殊属性。若某个角色没有对应特殊属性，则不得为其临时编造该特殊属性，应退回使用最接近的基础属性。\n\n{[sql \"SELECT 姓名, 普通属性, 特殊属性, 角色状态, 所在地点 FROM (SELECT 0 AS sort_order, name AS 姓名, base_attributes AS 普通属性, COALESCE(special_attributes, '') AS 特殊属性, '主角' AS 角色状态, location_name AS 所在地点 FROM protagonist_info UNION ALL SELECT CASE WHEN presence_status='在场' THEN 1 ELSE 2 END AS sort_order, name AS 姓名, base_attributes AS 普通属性, COALESCE(special_attributes, '') AS 特殊属性, role_type || ':' || presence_status AS 角色状态, location_name AS 所在地点 FROM important_characters) ORDER BY sort_order, 姓名\"]}\n\n【生成要求】\n1. 每轮必须生成并覆盖写入恰好5条行动建议。\n2. row_id 必须固定为1、2、3、4、5。\n3. display_text 与 dice_command 都必须是非空字符串。\n4. display_text 只给玩家看，不得暴露 dice_command。\n5. dice_command 只给前端解析，不得写自然语言解释。\n6. 五条选项必须紧贴最新剧情，优先围绕当前恋爱互动、情感波动、关系阻碍、约定、误会、试探、邀约、告白、吃醋、和解等内容。\n7. 若当前剧情无明显恋爱节点，则围绕当前场景中最可能推动关系或剧情变化的行动生成。\n8. 不得生成 row_id=1~5 之外的记录。\n9. 不得少写、漏写、复用旧选项或生成空选项。",
        "initNode": "首次生成行动建议时，根据初始剧情生成5条行动建议，并使用 INSERT OR REPLACE 一次性写入 row_id=1~5。优先围绕当前恋爱互动、情感波动、关系阻碍、约定、误会、试探、邀约、告白、吃醋、和解等内容。若初始剧情无明显恋爱节点，则围绕当前场景中最可能推动关系或剧情变化的行动生成。display_text 与 dice_command 都必须是非空字符串，禁止照搬示例。\n\nSQL示例: INSERT OR REPLACE INTO check_suggestions (row_id, suggestion_type, initiator, display_text, dice_command) VALUES\n(1, '主角行动', '<user>', '把伞往她那边偏了一点，装作没注意到肩头已经被雨打湿', '检定 <user> 照顾'),\n(2, '主角行动', '<user>', '在他移开视线之前，轻声补上刚才没说完的话', '检定 <user> 沟通 难度=困难'),\n(3, '主角行动', '<user>', '假装没有听出她话里的试探，低头整理袖口避开那道目光', '对抗 <user> 理智 vs 她 察言观色'),\n(4, '主角行动', '<user>', '几个人同时看过来时，先用一句玩笑把凝住的场面带过去', '检定 <user> 话术 奖惩=惩罚1'),\n(5, '快进剧情', '<user>', '没有继续追问，只陪他走到街口，等这阵沉默自己落下去', '无');",
        "insertNode": "禁止新增 row_id=1~5 之外的记录。除初始化和每轮覆盖写入固定5行外，不得插入第6行或其他 row_id。",
        "updateNode": "每轮交互后必须根据最新剧情重新生成5条行动建议，并用 INSERT OR REPLACE 覆盖写入 row_id=1~5。新选项必须紧密贴合本轮发生的恋爱互动、情绪转折、未决事件、新产生的约定或误会。展示文本必须遵循外部动作句规则，不写内心独白，不使用第一人称或第二人称；骰子命令必须严格从角色属性清单取角色名和属性名，对抗检定对手必须使用已有实名。明显能成功的行动用“必成”，明显失败用“必败”，无需检定用“无”。\n\nSQL示例: INSERT OR REPLACE INTO check_suggestions (row_id, suggestion_type, initiator, display_text, dice_command) VALUES\n(1, '主角行动', '<user>', '<展示文本1>', '<骰子命令1>'),\n(2, '主角行动', '<user>', '<展示文本2>', '<骰子命令2>'),\n(3, '主角行动', '<user>', '<展示文本3>', '<骰子命令3>'),\n(4, '主角行动', '<user>', '<展示文本4>', '<骰子命令4>'),\n(5, '快进剧情', '<user>', '<展示文本5>', '<骰子命令5>');",
        "deleteNode": "禁止删除。",
        "ddl": "CREATE TABLE check_suggestions (\n  row_id INTEGER PRIMARY KEY,\n  suggestion_type TEXT NOT NULL, -- 建议类型\n  initiator TEXT NOT NULL, -- 发起者\n  display_text TEXT NOT NULL CHECK(TRIM(display_text) <> ''), -- 展示文本\n  dice_command TEXT NOT NULL CHECK(TRIM(dice_command) <> '') -- 骰子命令\n);"
      },
      "content": [
        [
          "row_id",
          "建议类型",
          "发起者",
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
        "sqlInjectionTemplate": "",
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
      "orderNo": 7
    },
    "sheet_guan_xi_wang_luo_biao": {
      "uid": "sheet_guan_xi_wang_luo_biao",
      "name": "关系表",
      "sourceData": {
        "note": "记录角色之间的直接关系。每行一对角色；关系图按无向关系处理。",
        "initNode": "故事初始化时，为已登场且有持续影响的角色关系插入记录。",
        "deleteNode": "禁止删除。",
        "updateNode": "角色关系或关系说明变化时更新。",
        "insertNode": "出现新的持续性角色关系时新增。",
        "ddl": "CREATE TABLE character_relations (\n  row_id INTEGER PRIMARY KEY,\n  character_a TEXT, -- 角色A\n  character_b TEXT, -- 角色B\n  relation_desc TEXT -- 关系描述\n);"
      },
      "content": [
        [
          "row_id",
          "角色A",
          "角色B",
          "关系描述"
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
        "entryName": "关系表",
        "entryType": "constant",
        "keywords": "",
        "preventRecursion": true,
        "injectionTemplate": "",
        "extraIndexEnabled": false,
        "extraIndexEntryName": "关系表-索引",
        "extraIndexColumns": [],
        "extraIndexColumnModes": {},
        "extraIndexInjectionTemplate": "",
        "sqlInjectionTemplate": "",
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
      "orderNo": 10
    },
    "sheet_wu_pin_biao": {
      "uid": "sheet_wu_pin_biao",
      "name": "物品表",
      "sourceData": {
        "note": "记录对主角有意义的物品。\n\n【列定义】\n- 持有人：关联角色名称，用于角色卡物品分区归属。\n- 物品名称（同一持有人下唯一，≤20字）\n- 数量\n- 描述 （≤80字）\n\n【强制约束】\n1. 物品名称直接使用角色会说的口语化命名。\n   √ 爱丽丝送的橘子糖\n   × 橘子味糖果\n2. 数量为非负整数，耗尽后可为0。\n3. 描述侧重物品的情感意义与回忆关联。",
        "initNode": "按设定添加主角初始携带的物品。",
        "insertNode": "物品名称不在表里时，新增一行，可堆叠物品不新建重复行。",
        "updateNode": "物品变化时更新了，不过堆叠物品不新建重复行，数量可为0。",
        "deleteNode": "禁止。",
        "ddl": "CREATE TABLE inventory (\n  row_id INTEGER PRIMARY KEY,\n  holder TEXT NOT NULL, -- 持有人\n  item_name TEXT NOT NULL CHECK(LENGTH(item_name) <= 15), -- 物品名称\n  quantity INTEGER NOT NULL DEFAULT 1 CHECK(quantity >= 0), -- 数量\n  description TEXT NOT NULL CHECK(LENGTH(description) <= 80), -- 描述\n  UNIQUE(holder, item_name)\n);"
      },
      "content": [
        [
          "row_id",
          "持有人",
          "物品名称",
          "数量",
          "描述"
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
        "sqlInjectionTemplate": "",
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
    }
  }
};
