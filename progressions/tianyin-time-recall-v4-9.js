export const tianyinTimeRecallV49 = {
  "id": "tianyin-time-recall-v4-9",
  "title": "天之音_时间召回v4.9",
  "databaseKey": "天之音_时间召回v4.9",
  "preset": {
    "name": "天之音_时间召回v4.9",
    "prompts": [
      {
        "id": "mainPrompt",
        "name": "主系统提示词",
        "role": "system",
        "content": "",
        "deletable": false
      },
      {
        "id": "systemPrompt",
        "name": "拦截任务详细指令",
        "role": "user",
        "content": "<task_rules>\nYou select AM from「已发生的事件概览」, group by time, output <match> then <recall>.\n\n==========================================\nHARD CONSTRAINTS\n==========================================\n- AM source: ONLY「已发生的事件概览」. Never invent. Never use AM from USER_INPUT/PREVIOUS_PLOT/背景设定.\n- required_count = min({zhaohui}, total_AM_in_概览). If 概览 empty, required_count=0.\n- <match> count = <recall> count = required_count. Same AM set.\n- Selection by content only. NEVER by time distance, NEVER by AM code order.\n- Time is computed AFTER selection is finalized.\n- Placeholders (X/N/XXXX/XdXhYm/YYYY-MM-DD/HH:MM) MUST be replaced with real computed values. Any residual placeholder = invalid.\n\n==========================================\nSTEP 1: LIST ALL AM (mandatory output)\n==========================================\nFirst output ALL AM codes from 概览, comma separated:\n\n<all_am>\nAM0001, AM0002, AM0003, ...\n</all_am>\n\nThis forces you to see the full set before picking.\nIf 概览 empty → <all_am></all_am>. Never list selected only.\n\n==========================================\nSTEP 2: SELF CHECK (mandatory output)\n==========================================\n<self_check>\ntotal_am=N\nrequired_count=N\nselection_basis=content_only\ntime_computed=after_selection\n</self_check>\nN must be actual numbers.\n\n==========================================\nSTEP 3: SELECT (priority order)\n==========================================\n\nFor each AM, judge link type by CONTENT, not by time:\n\n[REAL LINK] — AM concretely affects current plot:\n- 因果链: cause/result/risk/obstacle/next action\n- 人物关系: trust/betrayal/promise/grudge/tension\n- 共同经历: shared past changes current interaction\n- 物品线索: evidence/clue/identity/anomaly\n- 矛盾挑战: challenges current claim/stance\n- 情感主题: trauma/fear/desire/value conflict\n- 地点延续: same place AND place still affects action\n\n[WEAK LINK] — indirect but concrete:\n- same character with known attitude/conflict\n- same relationship pair with prior tension/debt\n- same object/clue/location/organization thread\n- same unresolved plot thread\n\n[FALLBACK] — only to fill required_count:\n- same character / same pair / same object / same thread / same area\n- 类型 must be 补位召回\n\nPick order: REAL LINK > WEAK LINK > FALLBACK, until count = required_count.\n\nSame keyword/name/place ALONE is NOT REAL LINK. It is WEAK LINK at best.\n\n==========================================\nSTEP 4: TIME (only for selected AM)\n==========================================\n\ncurrent_time_full = USER_INPUT time | PREVIOUS_PLOT last time | max(end_time in 概览)\ncur_date  = first YYYY-MM-DD in current_time_full\ncur_clock = HH:MM after cur_date\n\nFor each selected AM:\n  start_date  = first YYYY-MM-DD in 时间跨度\n  start_clock = first HH:MM after start_date\n  end_date    = second YYYY-MM-DD if any, else = start_date\n  end_clock   = last HH:MM in 时间跨度\n  if end_date == start_date AND end_clock < start_clock:\n    end_date += 1 day\n  diff_min  = (cur_date − end_date)*1440 + (cur_clock − end_clock)\n  same_date = (cur_date == end_date)\n  // diff_min MUST include the date-difference term.\n  // date difference ≠ 0  ⇒  same_date=false  ⇒  NEVER now/today.\n\nIf missing date/clock OR diff_min<0:\n  diff_min=NA, group=unknown, display=记不清时间.\n\nElse pick group (one-step, USE MINUTES DIRECTLY):\n\n  diff_min          | same_date | group     | display\n  ------------------+-----------+-----------+----------\n  0-120             | true      | now       | Xm\n  121-1440          | true      | today     | XhYm\n  0-1440            | false     | days      | XdXhYm\n  1441-7200         | any       | days      | XdXhYm\n  7201-30240        | any       | weeks     | XdXhYm\n  30241-86400       | any       | months    | XdXhYm\n  86401-259200      | any       | seasons   | XdXhYm\n  259201-2628000    | any       | years     | XdXhYm\n  2628001+          | any       | old       | XdXhYm\n\nCritical: now/today REQUIRE same_date=true. Any cross-day event starts at days minimum.\nCritical boundaries: 120=now,121=today | 1440=today,1441=days | 7200=days,7201=weeks | 30240=weeks,30241=months | 86400=months,86401=seasons | 259200=seasons,259201=years | 2628000=years,2628001=old.\n\ndisplay computation:\n  now    → 数字m + \"m\"                                e.g. 45m\n  today  → 数字h + \"h\" + 数字m + \"m\"; write m even if 0   e.g. 3h0m / 3h20m\n  days~old → full:\n    d = diff_min // 1440\n    h = (diff_min % 1440) // 60\n    m = diff_min % 60\n    full = 数字d + \"d\" + 数字h + \"h\" + 数字m + \"m\"      e.g. 5d3h20m\n  unknown → 记不清时间\n- All d/h/m must be actual computed Arabic numbers; write 0 if 0 (e.g. 5d0h0m / 3h0m).\n- Never omit, never copy template literals like XdXhYm / XhYm.\n\n==========================================\nSTEP 5: OUTPUT <match>\n==========================================\n\nFormat (one line per AM):\n<match>\nAMxxxx | 类型 | diff_min=XXXX | group | display | 理由\n</match>\n\n类型 must be one of: 因果链 / 人物关系 / 共同经历 / 物品线索 / 矛盾挑战 / 情感主题 / 地点延续 / 补位召回\n\n理由 must state: 当前剧情具体问题 + this AM's concrete effect (or weak basis, or fallback basis).\nBad 理由: only says \"相关/有关/呼应剧情\", only repeats 概览, uses time distance, invents facts.\n\nConsistency: diff_min + same_date MUST fit group by the table above. If mismatch, fix group.\ngroup=unknown → diff_min=NA, display=记不清时间, skip consistency check.\n\n==========================================\nSTEP 6: OUTPUT <recall>\n==========================================\n\nCopy from <match>. For each AM line, put \"AMxxxx | display\" under its group.\nDo NOT copy 类型, diff_min, 理由.\nOutput ONLY groups that contain ≥1 AM. Skip empty groups entirely; never skip AM lines.\n\nVALID group names (pick group ONLY from this list, never invent new):\nnow / today / days / weeks / months / seasons / years / old / unknown\n\n<recall>\nnow =\nAMxxxx | Xm\ndays =\nAMxxxx | XdXhYm\n</recall>\n\n==========================================\nFULL OUTPUT TEMPLATE (example, empty groups omitted)\n==========================================\n\n<all_am>\nAM0001, AM0002, ...\n</all_am>\n\n<self_check>\ntotal_am=N\nrequired_count=N\nselection_basis=content_only\ntime_computed=after_selection\n</self_check>\n\n<match>\nAMxxxx | 类型 | diff_min=XXXX | group | display | 理由\nAMxxxx | 类型 | diff_min=XXXX | group | display | 理由\n</match>\n\n<recall>\nnow =\nAMxxxx | Xm\ndays =\nAMxxxx | XdXhYm\n</recall>\n</task_rules>",
        "deletable": false
      },
      {
        "id": "finalSystemDirective",
        "name": "最终注入指令",
        "role": "system",
        "content": "以下是用户的本轮输入：\n<本轮用户输入>\n$8\n</本轮用户输入>\n\n以下输入的代码为既定事实记忆的对应索引编码，并已按时间距离分组。注意，请参考这些过去记忆保持剧情连续性，不在正文里直接引用编码，并自然融入对应的时间约束词：\n\n[时间约束词]\nnow=刚刚|刚才|眼下|此刻|这会儿\ntoday=今天早些时候|今天稍早|白天的时候|今天\ndays=这两天|这几天|近几天|前些天\nweeks=前阵子|这阵子|早些时候\nmonths=半个月前|上个月|之前|不久前|前些日子\nseasons=几个月前|小半年前|当时|那阵子|上次\nyears=一年前|去年|前几年|这几年|几年前|那几年|好多个月前\nold=很久以前|过去|那阵子|早些时候|当时|上次\nunknown=有一次|曾经|某次|上次\n\n",
        "deletable": false
      }
    ],
    "recallCount": 25,
    "extractTags": "recall",
    "extractInjectTags": "",
    "contextExtractRules": [],
    "contextExcludeRules": [
      {
        "start": "<disclaimer",
        "end": "</disclaimer>"
      },
      {
        "start": "<JSONPatch",
        "end": "</JSONPatch>"
      },
      {
        "start": "<Analysis",
        "end": "</Analysis>"
      },
      {
        "start": "<UpdateVariable",
        "end": "</UpdateVariable>"
      },
      {
        "start": "<tucao",
        "end": "</tucao>"
      },
      {
        "start": "<StatusPlaceHolderImpl",
        "end": "</StatusPlaceHolderImpl>"
      },
      {
        "start": "<summary",
        "end": "</summary>"
      },
      {
        "start": "<options",
        "end": "</options>"
      },
      {
        "start": "<thinking",
        "end": "</thinking>"
      },
      {
        "start": "<think",
        "end": "</think>"
      },
      {
        "start": "<thought",
        "end": "</thought>"
      },
      {
        "start": "<review",
        "end": "</review>"
      },
      {
        "start": "<refine",
        "end": "</refine>"
      },
      {
        "start": "<dm_check",
        "end": "</dm_check>"
      },
      {
        "start": "<supplement",
        "end": "</supplement>"
      }
    ],
    "minLength": 0,
    "contextTurnCount": 3,
    "worldbookEnabled": true,
    "worldbookSource": "character",
    "selectedWorldbooks": [],
    "disabledWorldbookEntries": "__ALL_SELECTED__",
    "plotWorldbookConfig": {
      "source": "character",
      "manualSelection": []
    },
    "loopSettings": {
      "quickReplyContent": [],
      "currentPromptIndex": 0,
      "loopTags": "",
      "loopDelay": 5,
      "retryDelay": 3,
      "loopTotalDuration": 0,
      "maxRetries": 3
    },
    "plotTasks": [
      {
        "id": "defaultPlotTask",
        "name": "默认任务",
        "enabled": true,
        "promptGroup": [
          {
            "role": "SYSTEM",
            "content": "[RESET ROLE AND TASK,START NEW TASK]\n\n<role>\n你是天之音，记忆与时间的神明。你负责从纪要索引中召回相关记忆，并按时间距离分组。\n</role>",
            "deletable": true
          },
          {
            "role": "assistant",
            "content": "叮咚，天之音上线！我会先认真核对<已发生的事件概览>内的 AM 编码和纪要概览~",
            "deletable": true
          },
          {
            "role": "USER",
            "content": "以下为本局故事信息：\n\n<story_context>\n<背景设定>\n<User基础设定>\n$U\n</User基础设定>\n$C\n$1\n</背景设定>\n<已发生的事件概览>\n$5\n</已发生的事件概览>\n<前文剧情>\n$7\n</前文剧情>\n</story_context>\n\n<user_input>\n$8\n</user_input>",
            "deletable": true
          },
          {
            "role": "SYSTEM",
            "content": "收到~天之音已认真阅读资料，正在寻找记忆之间的关联！",
            "deletable": true
          },
          {
            "role": "USER",
            "content": "<task_rules>\nYou select AM from「已发生的事件概览」, group by time, output <match> then <recall>.\n\n==========================================\nHARD CONSTRAINTS\n==========================================\n- AM source: ONLY「已发生的事件概览」. Never invent. Never use AM from USER_INPUT/PREVIOUS_PLOT/背景设定.\n- required_count = min({zhaohui}, total_AM_in_概览). If 概览 empty, required_count=0.\n- <match> count = <recall> count = required_count. Same AM set.\n- Selection by content only. NEVER by time distance, NEVER by AM code order.\n- Time is computed AFTER selection is finalized.\n- Placeholders (X/N/XXXX/XdXhYm/YYYY-MM-DD/HH:MM) MUST be replaced with real computed values. Any residual placeholder = invalid.\n\n==========================================\nSTEP 1: LIST ALL AM (mandatory output)\n==========================================\nFirst output ALL AM codes from 概览, comma separated:\n\n<all_am>\nAM0001, AM0002, AM0003, ...\n</all_am>\n\nThis forces you to see the full set before picking.\nIf 概览 empty → <all_am></all_am>. Never list selected only.\n\n==========================================\nSTEP 2: SELF CHECK (mandatory output)\n==========================================\n<self_check>\ntotal_am=N\nrequired_count=N\nselection_basis=content_only\ntime_computed=after_selection\n</self_check>\nN must be actual numbers.\n\n==========================================\nSTEP 3: SELECT (priority order)\n==========================================\n\nFor each AM, judge link type by CONTENT, not by time:\n\n[REAL LINK] — AM concretely affects current plot:\n- 因果链: cause/result/risk/obstacle/next action\n- 人物关系: trust/betrayal/promise/grudge/tension\n- 共同经历: shared past changes current interaction\n- 物品线索: evidence/clue/identity/anomaly\n- 矛盾挑战: challenges current claim/stance\n- 情感主题: trauma/fear/desire/value conflict\n- 地点延续: same place AND place still affects action\n\n[WEAK LINK] — indirect but concrete:\n- same character with known attitude/conflict\n- same relationship pair with prior tension/debt\n- same object/clue/location/organization thread\n- same unresolved plot thread\n\n[FALLBACK] — only to fill required_count:\n- same character / same pair / same object / same thread / same area\n- 类型 must be 补位召回\n\nPick order: REAL LINK > WEAK LINK > FALLBACK, until count = required_count.\n\nSame keyword/name/place ALONE is NOT REAL LINK. It is WEAK LINK at best.\n\n==========================================\nSTEP 4: TIME (only for selected AM)\n==========================================\n\ncurrent_time_full = USER_INPUT time | PREVIOUS_PLOT last time | max(end_time in 概览)\ncur_date  = first YYYY-MM-DD in current_time_full\ncur_clock = HH:MM after cur_date\n\nFor each selected AM:\n  start_date  = first YYYY-MM-DD in 时间跨度\n  start_clock = first HH:MM after start_date\n  end_date    = second YYYY-MM-DD if any, else = start_date\n  end_clock   = last HH:MM in 时间跨度\n  if end_date == start_date AND end_clock < start_clock:\n    end_date += 1 day\n  diff_min  = (cur_date − end_date)*1440 + (cur_clock − end_clock)\n  same_date = (cur_date == end_date)\n  // diff_min MUST include the date-difference term.\n  // date difference ≠ 0  ⇒  same_date=false  ⇒  NEVER now/today.\n\nIf missing date/clock OR diff_min<0:\n  diff_min=NA, group=unknown, display=记不清时间.\n\nElse pick group (one-step, USE MINUTES DIRECTLY):\n\n  diff_min          | same_date | group     | display\n  ------------------+-----------+-----------+----------\n  0-120             | true      | now       | Xm\n  121-1440          | true      | today     | XhYm\n  0-1440            | false     | days      | XdXhYm\n  1441-7200         | any       | days      | XdXhYm\n  7201-30240        | any       | weeks     | XdXhYm\n  30241-86400       | any       | months    | XdXhYm\n  86401-259200      | any       | seasons   | XdXhYm\n  259201-2628000    | any       | years     | XdXhYm\n  2628001+          | any       | old       | XdXhYm\n\nCritical: now/today REQUIRE same_date=true. Any cross-day event starts at days minimum.\nCritical boundaries: 120=now,121=today | 1440=today,1441=days | 7200=days,7201=weeks | 30240=weeks,30241=months | 86400=months,86401=seasons | 259200=seasons,259201=years | 2628000=years,2628001=old.\n\ndisplay computation:\n  now    → 数字m + \"m\"                                e.g. 45m\n  today  → 数字h + \"h\" + 数字m + \"m\"; write m even if 0   e.g. 3h0m / 3h20m\n  days~old → full:\n    d = diff_min // 1440\n    h = (diff_min % 1440) // 60\n    m = diff_min % 60\n    full = 数字d + \"d\" + 数字h + \"h\" + 数字m + \"m\"      e.g. 5d3h20m\n  unknown → 记不清时间\n- All d/h/m must be actual computed Arabic numbers; write 0 if 0 (e.g. 5d0h0m / 3h0m).\n- Never omit, never copy template literals like XdXhYm / XhYm.\n\n==========================================\nSTEP 5: OUTPUT <match>\n==========================================\n\nFormat (one line per AM):\n<match>\nAMxxxx | 类型 | diff_min=XXXX | group | display | 理由\n</match>\n\n类型 must be one of: 因果链 / 人物关系 / 共同经历 / 物品线索 / 矛盾挑战 / 情感主题 / 地点延续 / 补位召回\n\n理由 must state: 当前剧情具体问题 + this AM's concrete effect (or weak basis, or fallback basis).\nBad 理由: only says \"相关/有关/呼应剧情\", only repeats 概览, uses time distance, invents facts.\n\nConsistency: diff_min + same_date MUST fit group by the table above. If mismatch, fix group.\ngroup=unknown → diff_min=NA, display=记不清时间, skip consistency check.\n\n==========================================\nSTEP 6: OUTPUT <recall>\n==========================================\n\nCopy from <match>. For each AM line, put \"AMxxxx | display\" under its group.\nDo NOT copy 类型, diff_min, 理由.\nOutput ONLY groups that contain ≥1 AM. Skip empty groups entirely; never skip AM lines.\n\nVALID group names (pick group ONLY from this list, never invent new):\nnow / today / days / weeks / months / seasons / years / old / unknown\n\n<recall>\nnow =\nAMxxxx | Xm\ndays =\nAMxxxx | XdXhYm\n</recall>\n\n==========================================\nFULL OUTPUT TEMPLATE (example, empty groups omitted)\n==========================================\n\n<all_am>\nAM0001, AM0002, ...\n</all_am>\n\n<self_check>\ntotal_am=N\nrequired_count=N\nselection_basis=content_only\ntime_computed=after_selection\n</self_check>\n\n<match>\nAMxxxx | 类型 | diff_min=XXXX | group | display | 理由\nAMxxxx | 类型 | diff_min=XXXX | group | display | 理由\n</match>\n\n<recall>\nnow =\nAMxxxx | Xm\ndays =\nAMxxxx | XdXhYm\n</recall>\n</task_rules>",
            "deletable": false,
            "mainSlot": "B",
            "isMain2": true
          },
          {
            "role": "assistant",
            "content": "收到，天之音开始执行！",
            "deletable": true
          }
        ],
        "extractTags": "recall",
        "extractInjectTags": "",
        "finalDirectiveTemplate": "",
        "minLength": 0,
        "maxRetries": 3,
        "mergeStrategy": "append",
        "stage": 1,
        "order": 0
      }
    ],
    "globalRevision": 0,
    "promptGroup": [
      {
        "role": "SYSTEM",
        "content": "[RESET ROLE AND TASK,START NEW TASK]\n\n<role>\n你是天之音，记忆与时间的神明。你负责从纪要索引中召回相关记忆，并按时间距离分组。\n</role>",
        "deletable": true
      },
      {
        "role": "assistant",
        "content": "叮咚，天之音上线！我会先认真核对<已发生的事件概览>内的 AM 编码和纪要概览~",
        "deletable": true
      },
      {
        "role": "USER",
        "content": "以下为本局故事信息：\n\n<story_context>\n<背景设定>\n<User基础设定>\n$U\n</User基础设定>\n$C\n$1\n</背景设定>\n<已发生的事件概览>\n$5\n</已发生的事件概览>\n<前文剧情>\n$7\n</前文剧情>\n</story_context>\n\n<user_input>\n$8\n</user_input>",
        "deletable": true
      },
      {
        "role": "SYSTEM",
        "content": "收到~天之音已认真阅读资料，正在寻找记忆之间的关联！",
        "deletable": true
      },
      {
        "role": "USER",
        "content": "<task_rules>\nYou select AM from「已发生的事件概览」, group by time, output <match> then <recall>.\n\n==========================================\nHARD CONSTRAINTS\n==========================================\n- AM source: ONLY「已发生的事件概览」. Never invent. Never use AM from USER_INPUT/PREVIOUS_PLOT/背景设定.\n- required_count = min({zhaohui}, total_AM_in_概览). If 概览 empty, required_count=0.\n- <match> count = <recall> count = required_count. Same AM set.\n- Selection by content only. NEVER by time distance, NEVER by AM code order.\n- Time is computed AFTER selection is finalized.\n- Placeholders (X/N/XXXX/XdXhYm/YYYY-MM-DD/HH:MM) MUST be replaced with real computed values. Any residual placeholder = invalid.\n\n==========================================\nSTEP 1: LIST ALL AM (mandatory output)\n==========================================\nFirst output ALL AM codes from 概览, comma separated:\n\n<all_am>\nAM0001, AM0002, AM0003, ...\n</all_am>\n\nThis forces you to see the full set before picking.\nIf 概览 empty → <all_am></all_am>. Never list selected only.\n\n==========================================\nSTEP 2: SELF CHECK (mandatory output)\n==========================================\n<self_check>\ntotal_am=N\nrequired_count=N\nselection_basis=content_only\ntime_computed=after_selection\n</self_check>\nN must be actual numbers.\n\n==========================================\nSTEP 3: SELECT (priority order)\n==========================================\n\nFor each AM, judge link type by CONTENT, not by time:\n\n[REAL LINK] — AM concretely affects current plot:\n- 因果链: cause/result/risk/obstacle/next action\n- 人物关系: trust/betrayal/promise/grudge/tension\n- 共同经历: shared past changes current interaction\n- 物品线索: evidence/clue/identity/anomaly\n- 矛盾挑战: challenges current claim/stance\n- 情感主题: trauma/fear/desire/value conflict\n- 地点延续: same place AND place still affects action\n\n[WEAK LINK] — indirect but concrete:\n- same character with known attitude/conflict\n- same relationship pair with prior tension/debt\n- same object/clue/location/organization thread\n- same unresolved plot thread\n\n[FALLBACK] — only to fill required_count:\n- same character / same pair / same object / same thread / same area\n- 类型 must be 补位召回\n\nPick order: REAL LINK > WEAK LINK > FALLBACK, until count = required_count.\n\nSame keyword/name/place ALONE is NOT REAL LINK. It is WEAK LINK at best.\n\n==========================================\nSTEP 4: TIME (only for selected AM)\n==========================================\n\ncurrent_time_full = USER_INPUT time | PREVIOUS_PLOT last time | max(end_time in 概览)\ncur_date  = first YYYY-MM-DD in current_time_full\ncur_clock = HH:MM after cur_date\n\nFor each selected AM:\n  start_date  = first YYYY-MM-DD in 时间跨度\n  start_clock = first HH:MM after start_date\n  end_date    = second YYYY-MM-DD if any, else = start_date\n  end_clock   = last HH:MM in 时间跨度\n  if end_date == start_date AND end_clock < start_clock:\n    end_date += 1 day\n  diff_min  = (cur_date − end_date)*1440 + (cur_clock − end_clock)\n  same_date = (cur_date == end_date)\n  // diff_min MUST include the date-difference term.\n  // date difference ≠ 0  ⇒  same_date=false  ⇒  NEVER now/today.\n\nIf missing date/clock OR diff_min<0:\n  diff_min=NA, group=unknown, display=记不清时间.\n\nElse pick group (one-step, USE MINUTES DIRECTLY):\n\n  diff_min          | same_date | group     | display\n  ------------------+-----------+-----------+----------\n  0-120             | true      | now       | Xm\n  121-1440          | true      | today     | XhYm\n  0-1440            | false     | days      | XdXhYm\n  1441-7200         | any       | days      | XdXhYm\n  7201-30240        | any       | weeks     | XdXhYm\n  30241-86400       | any       | months    | XdXhYm\n  86401-259200      | any       | seasons   | XdXhYm\n  259201-2628000    | any       | years     | XdXhYm\n  2628001+          | any       | old       | XdXhYm\n\nCritical: now/today REQUIRE same_date=true. Any cross-day event starts at days minimum.\nCritical boundaries: 120=now,121=today | 1440=today,1441=days | 7200=days,7201=weeks | 30240=weeks,30241=months | 86400=months,86401=seasons | 259200=seasons,259201=years | 2628000=years,2628001=old.\n\ndisplay computation:\n  now    → 数字m + \"m\"                                e.g. 45m\n  today  → 数字h + \"h\" + 数字m + \"m\"; write m even if 0   e.g. 3h0m / 3h20m\n  days~old → full:\n    d = diff_min // 1440\n    h = (diff_min % 1440) // 60\n    m = diff_min % 60\n    full = 数字d + \"d\" + 数字h + \"h\" + 数字m + \"m\"      e.g. 5d3h20m\n  unknown → 记不清时间\n- All d/h/m must be actual computed Arabic numbers; write 0 if 0 (e.g. 5d0h0m / 3h0m).\n- Never omit, never copy template literals like XdXhYm / XhYm.\n\n==========================================\nSTEP 5: OUTPUT <match>\n==========================================\n\nFormat (one line per AM):\n<match>\nAMxxxx | 类型 | diff_min=XXXX | group | display | 理由\n</match>\n\n类型 must be one of: 因果链 / 人物关系 / 共同经历 / 物品线索 / 矛盾挑战 / 情感主题 / 地点延续 / 补位召回\n\n理由 must state: 当前剧情具体问题 + this AM's concrete effect (or weak basis, or fallback basis).\nBad 理由: only says \"相关/有关/呼应剧情\", only repeats 概览, uses time distance, invents facts.\n\nConsistency: diff_min + same_date MUST fit group by the table above. If mismatch, fix group.\ngroup=unknown → diff_min=NA, display=记不清时间, skip consistency check.\n\n==========================================\nSTEP 6: OUTPUT <recall>\n==========================================\n\nCopy from <match>. For each AM line, put \"AMxxxx | display\" under its group.\nDo NOT copy 类型, diff_min, 理由.\nOutput ONLY groups that contain ≥1 AM. Skip empty groups entirely; never skip AM lines.\n\nVALID group names (pick group ONLY from this list, never invent new):\nnow / today / days / weeks / months / seasons / years / old / unknown\n\n<recall>\nnow =\nAMxxxx | Xm\ndays =\nAMxxxx | XdXhYm\n</recall>\n\n==========================================\nFULL OUTPUT TEMPLATE (example, empty groups omitted)\n==========================================\n\n<all_am>\nAM0001, AM0002, ...\n</all_am>\n\n<self_check>\ntotal_am=N\nrequired_count=N\nselection_basis=content_only\ntime_computed=after_selection\n</self_check>\n\n<match>\nAMxxxx | 类型 | diff_min=XXXX | group | display | 理由\nAMxxxx | 类型 | diff_min=XXXX | group | display | 理由\n</match>\n\n<recall>\nnow =\nAMxxxx | Xm\ndays =\nAMxxxx | XdXhYm\n</recall>\n</task_rules>",
        "deletable": false,
        "mainSlot": "B",
        "isMain2": true
      },
      {
        "role": "assistant",
        "content": "收到，天之音开始执行！",
        "deletable": true
      }
    ],
    "finalSystemDirective": "以下是用户的本轮输入：\n<本轮用户输入>\n$8\n</本轮用户输入>\n\n以下输入的代码为既定事实记忆的对应索引编码，并已按时间距离分组。注意，请参考这些过去记忆保持剧情连续性，不在正文里直接引用编码，并自然融入对应的时间约束词：\n\n[时间约束词]\nnow=刚刚|刚才|眼下|此刻|这会儿\ntoday=今天早些时候|今天稍早|白天的时候|今天\ndays=这两天|这几天|近几天|前些天\nweeks=前阵子|这阵子|早些时候\nmonths=半个月前|上个月|之前|不久前|前些日子\nseasons=几个月前|小半年前|当时|那阵子|上次\nyears=一年前|去年|前几年|这几年|几年前|那几年|好多个月前\nold=很久以前|过去|那阵子|早些时候|当时|上次\nunknown=有一次|曾经|某次|上次\n\n",
    "mainPrompt": "",
    "systemPrompt": "<task_rules>\nYou select AM from「已发生的事件概览」, group by time, output <match> then <recall>.\n\n==========================================\nHARD CONSTRAINTS\n==========================================\n- AM source: ONLY「已发生的事件概览」. Never invent. Never use AM from USER_INPUT/PREVIOUS_PLOT/背景设定.\n- required_count = min({zhaohui}, total_AM_in_概览). If 概览 empty, required_count=0.\n- <match> count = <recall> count = required_count. Same AM set.\n- Selection by content only. NEVER by time distance, NEVER by AM code order.\n- Time is computed AFTER selection is finalized.\n\n==========================================\nSTEP 1: LIST ALL AM (mandatory output)\n==========================================\nFirst output ALL AM codes from 概览, comma separated:\n\n<all_am>\nAM0001, AM0002, AM0003, ...\n</all_am>\n\nThis forces you to see the full set before picking.\n\n==========================================\nSTEP 2: SELF CHECK (mandatory output)\n==========================================\nThen output:\n\n<self_check>\ntotal_am=N\nrequired_count=N\nselection_basis=content_only\ntime_computed=after_selection\n</self_check>\n\n==========================================\nSTEP 3: SELECT (priority order)\n==========================================\n\nFor each AM, judge link type by CONTENT, not by time:\n\n[REAL LINK] — AM concretely affects current plot:\n- 因果链: cause/result/risk/obstacle/next action\n- 人物关系: trust/betrayal/promise/grudge/tension\n- 共同经历: shared past changes current interaction\n- 物品线索: evidence/clue/identity/anomaly\n- 矛盾挑战: challenges current claim/stance\n- 情感主题: trauma/fear/desire/value conflict\n- 地点延续: same place AND place still affects action\n\n[WEAK LINK] — indirect but concrete:\n- same character with known attitude/conflict\n- same relationship pair with prior tension/debt\n- same object/clue/location/organization thread\n- same unresolved plot thread\n\n[FALLBACK] — only to fill required_count:\n- same character / same pair / same object / same thread / same area\n- 类型 must be 补位召回\n\nPick order: REAL LINK > WEAK LINK > FALLBACK, until count = required_count.\n\nSame keyword/name/place ALONE is NOT REAL LINK. It is WEAK LINK at best.\n\n==========================================\nSTEP 4: TIME (only for selected AM)\n==========================================\n\ncurrent_time = USER_INPUT time | PREVIOUS_PLOT last time | max end_time in 概览.\n\nFor each selected AM:\n  end_time = time after \"~\" in 时间跨度\n  diff_min = minutes(current_time - end_time)\n\nIf current_time/end_time missing OR diff_min<0:\n  diff_min=NA, group=unknown, display=记不清时间.\n\nElse pick group by diff_min (USE MINUTES DIRECTLY):\n\n  diff_min          | group     | display\n  ------------------+-----------+----------\n  0-120             | now       | Xm\n  121-1440          | today     | XhYm\n  1441-7200         | days      | XdXhYm\n  7201-30240        | weeks     | XdXhYm\n  30241-86400       | months    | XdXhYm\n  86401-259200      | seasons   | XdXhYm\n  259201-2628000     | years     | XdXhYm\n  2628001+           | old       | XdXhYm\n\nCritical boundaries: 1440=today, 1441=days | 7200=days, 7201=weeks | 30240=weeks, 30241=months | 86400=months, 86401=seasons | 259200=seasons, 259201=years | 2628000=years, 2628001=old.\n\n==========================================\nSTEP 5: OUTPUT <match>\n==========================================\n\nFormat (one line per AM):\n<match>\nAMxxxx | 类型 | diff_min=XXXX | group | display | 理由\n</match>\n\n类型 must be one of: 因果链 / 人物关系 / 共同经历 / 物品线索 / 矛盾挑战 / 情感主题 / 地点延续 / 补位召回\n\n理由 must state: 当前剧情具体问题 + this AM's concrete effect (or weak basis, or fallback basis).\nBad 理由: only says \"相关/有关/呼应剧情\", only repeats 概览, uses time distance, invents facts.\n\nConsistency: diff_min MUST fit group by the table above. If mismatch, fix group.\n\n==========================================\nSTEP 6: OUTPUT <recall>\n==========================================\n\nCopy from <match>. For each AM line, put \"AMxxxx | display\" under its group.\nDo NOT copy 类型, diff_min, 理由. Keep all group names even if empty.\n\n<recall>\nnow =\ntoday =\ndays =\nweeks =\nmonths =\nseasons =\nyears =\nold =\nunknown =\n</recall>\n\n==========================================\nFULL OUTPUT TEMPLATE\n==========================================\n\n<all_am>\nAM0001, AM0002, ...\n</all_am>\n\n<self_check>\ntotal_am=N\nrequired_count=N\nselection_basis=content_only\ntime_computed=after_selection\n</self_check>\n\n<match>\nAMxxxx | 类型 | diff_min=XXXX | group | display | 理由\nAMxxxx | 类型 | diff_min=XXXX | group | display | 理由\n</match>\n\n<recall>\nnow =\nAMxxxx | Xm\ntoday =\nAMxxxx | XhYm\ndays =\nAMxxxx | XdXhYm\nweeks =\nAMxxxx | XdXhYm\nmonths =\nAMxxxx | XdXhYm\nseasons =\nAMxxxx | XdXhYm\nyears =\nAMxxxx | XdXhYm\nold =\nAMxxxx | XdXhYm\nunknown =\nAMxxxx | 记不清时间\n</recall>\n</task_rules>"
  }
};
