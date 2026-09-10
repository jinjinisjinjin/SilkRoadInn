(function (global) {
  const portraits = {
    keeper: "./assets/keeper_story_portrait_v2.png",
    guard: "./assets/npc_repair_portrait/npc_shazhou_guard_v1.png",
    woman: "./assets/npc_repair_portrait/npc_dunhuang_woman_v1.png",
    farmer: "./assets/npc_repair_portrait/npc_farmer_v1.png",
    donor: "./assets/npc_repair_portrait/npc_temple_donor_v1.png",
    monk: "./assets/npc_repair_portrait/npc_pilgrim_monk_v1.png",
    merchant: "./assets/npc_repair_portrait/npc_sogdian_merchant_v1.png",
    herder: "./assets/npc_repair_portrait/npc_uighur_herder_v1.png",
    envoy: "./assets/npc_repair_portrait/npc_changan_envoy_v1.png",
    maid: "./assets/npc_repair_portrait/npc_changan_maid_v1.png",
    caravan: "./assets/npc_repair_portrait/npc_caravan_leader_v1.png",
  };

  const rewards = {
    chapter1: {
      eyebrow: "第一章完成",
      title: "流沙驿初明",
      description: "旧驿重新有了炉火、人声与一面能被看见的食单。",
      items: [
        { src: "./assets/ui/order_gift_coffer_v1.png", label: "初明礼匣", amount: "×1" },
        { src: "./assets/ui/ui_camel_bell_stamina.png", label: "驼铃", amount: "+10" },
        { src: "./assets/ui/bonus_ruby_lv01.png", label: "红宝石", amount: "×1", kind: "ruby", level: 1 },
      ],
    },
    chapter2: {
      eyebrow: "第二章完成",
      title: "西市烟火",
      description: "前厅、西市、南北铺与井台相继开张，流沙驿终于聚成一处真正的市井。",
      items: [
        { src: "./assets/ui/order_gift_coffer_v1.png", label: "西市烟火礼匣", amount: "×1" },
        { src: "./assets/ui/ui_camel_bell_stamina.png", label: "驼铃", amount: "+15" },
        { src: "./assets/ui/bonus_ruby_lv02.png", label: "红宝石", amount: "×3", kind: "ruby", level: 2 },
      ],
    },
    chapter3: {
      eyebrow: "第三章完成",
      title: "楼馆通途",
      description: "楼馆、双院、庭园与望楼相继修好，流沙驿终于能让远路旅人安心停脚。",
      items: [
        { src: "./assets/ui/order_gift_coffer_v1.png", label: "楼馆通途礼匣", amount: "×1" },
        { src: "./assets/ui/ui_camel_bell_stamina.png", label: "驼铃", amount: "+20" },
        { src: "./assets/ui/bonus_ruby_lv03.png", label: "红宝石", amount: "×8", kind: "ruby", level: 3 },
      ],
    },
    chapter4: {
      eyebrow: "第四章完成",
      title: "灯火连城",
      description: "货棚、长街、院落与巷灯连成一片，流沙驿成为商路上不会熄灭的一盏灯。",
      items: [
        { src: "./assets/ui/order_gift_coffer_v1.png", label: "灯火连城礼匣", amount: "×1" },
        { src: "./assets/ui/ui_camel_bell_stamina.png", label: "驼铃", amount: "+30" },
        { src: "./assets/ui/bonus_ruby_lv04.png", label: "红宝石", amount: "×25", kind: "ruby", level: 4 },
      ],
    },
  };

  const segments = {
    opening: {
      eyebrow: "第一章 · 开场",
      title: "第一缕炉烟",
      scene: "opening",
      steps: [
        ["掌柜", "流沙驿新任掌柜", portraits.keeper, "left", "风从门缝里灌进来，旧灶积着灰。阿爷走后，流沙驿已经两年没有亮过火了。"],
        ["掌柜", "流沙驿新任掌柜", portraits.keeper, "right", "灶台底下还压着他的旧火石。第一下只擦出冷光，第二下，火星终于落进干草里。"],
        ["掌柜", "流沙驿新任掌柜", portraits.keeper, "left", "《丝路食单》扉页上，是阿爷留下的那句话：“驿路不止，食火不灭。”阿爷，我先替你把这炉火续上。"],
      ],
    },
    "before:tutorial_complete": {
      eyebrow: "第一章 · 前厅客座",
      title: "门前真的有客",
      scene: "front-hall",
      steps: [
        ["周甲", "沙州驿卒", portraits.guard, "left", "屋顶一冒烟，我还当自己看错了。你阿爷在时，我每次换防，都来讨一张热饼。"],
        ["孟氏", "敦煌女店客", portraits.woman, "right", "这驿空了两年，我每日路过都看一眼。今日门里既有人，门外也该让人看见。"],
      ],
    },
    "after:tutorial_complete": {
      eyebrow: "修缮完成 · 1 / 3",
      title: "前厅客座",
      scene: "front-hall repaired-one",
      steps: [
        ["孟氏", "敦煌女店客", portraits.woman, "right", "方才还有人站在门外不敢进。如今第一张长凳坐热了，这地方才算真的醒了。"],
      ],
    },
    "before:kitchen_repair": {
      eyebrow: "第一章 · 小修后厨",
      title: "灶火渐旺",
      scene: "kitchen repaired-one",
      steps: [
        ["刘大", "城外粮户", portraits.farmer, "left", "你这烟色发闷，火苗还往外呛。旧灶不是添一把柴就能将就的，我陪你把它拆开看看。"],
      ],
    },
    "after:kitchen_repair": {
      eyebrow: "修缮完成 · 2 / 3",
      title: "小修后厨",
      scene: "kitchen repaired-two",
      steps: [
        ["周甲", "沙州驿卒", portraits.guard, "right", "还是这股麦香。只是这一回，火烧得比从前更稳。"],
      ],
    },
    "before:codex_first_phase": {
      eyebrow: "第一章 · 食单初成",
      title: "食单见人",
      scene: "codex repaired-two",
      steps: [
        ["周氏", "佛寺女施主", portraits.donor, "left", "你总把食单收进匣里，是怕人翻坏，还是怕自己续不好它？"],
        ["掌柜", "流沙驿新任掌柜", portraits.keeper, "right", "从前总觉得，少一笔都像辜负阿爷。如今我想明白了，这本食单，本就是许多人一路走出来的。"],
      ],
    },
    "after:codex_first_phase": {
      eyebrow: "修缮完成 · 3 / 3",
      title: "食单初成",
      scene: "codex repaired-three",
      reward: rewards.chapter1,
      steps: [
        ["求法僧人", "西行求法僧", portraits.monk, "left", "贫僧见过同一种胡饼，在不同路上有不同做法。把它们记在一起，后来的人便知道，路从未断过。"],
      ],
    },

    "chapter2-opening": {
      eyebrow: "第二章 · 开场",
      title: "西市风来",
      scene: "chapter-two west-market",
      steps: [
        ["粟特胡商", "西市行商", portraits.merchant, "left", "我把你那张胡麻饼带到西市，掰到最后一块，竟有三个人追着问流沙驿在何处。"],
        ["掌柜", "流沙驿新任掌柜", portraits.keeper, "right", "从前我只怕炉火灭；如今门外真来了人，我却怕自己接不住。"],
        ["粟特胡商", "西市行商", portraits.merchant, "left", "怕，才会把事情做稳。你只管开门，路上的人会自己把这里走热。"],
      ],
    },
    "before:lv2_front_feast": {
      eyebrow: "第二章 · 前厅开席",
      title: "乐声停在门外",
      scene: "chapter-two front-feast",
      steps: [
        ["粟特胡商", "西市行商", portraits.merchant, "left", "乐声一响，门外便围了人。可他们不只为一张饼来，也想找个能坐下听完一曲的地方。"],
      ],
    },
    "after:lv2_front_feast": {
      eyebrow: "修缮完成 · 1 / 6",
      title: "前厅开席",
      scene: "chapter-two front-feast completed",
      steps: [
        ["孟氏", "敦煌女店客", portraits.woman, "right", "你看，先前互不相识的人，已经替彼此斟上热浆。屋里有人情，席才算开了。"],
      ],
    },
    "before:lv2_west_market": {
      eyebrow: "第二章 · 西市开张",
      title: "货要摆到灯下",
      scene: "chapter-two west-market",
      steps: [
        ["长安使者", "东来使团", portraits.envoy, "left", "离长安越远，越记得东市黄昏那一排灯。若这里也亮起来，赶路的人远远便会安心。"],
        ["粟特胡商", "西市行商", portraits.merchant, "right", "我带果贩来，你把旧灯擦亮。今夜先让西市认得流沙驿。"],
      ],
    },
    "after:lv2_west_market": {
      eyebrow: "修缮完成 · 2 / 6",
      title: "西市开张",
      scene: "chapter-two west-market completed",
      steps: [
        ["粟特胡商", "西市行商", portraits.merchant, "left", "我说过会把人带来。瞧，灯才亮，西市的第一声吆喝已经到了门前。"],
      ],
    },
    "before:lv2_flower_rack": {
      eyebrow: "第二章 · 花架留客",
      title: "雨落西市",
      scene: "chapter-two flower-rack",
      steps: [
        ["孟氏", "敦煌女店客", portraits.woman, "left", "方才那阵雨来得急，一家赶路人抱着行囊缩在墙角。先给他们一处避雨，热汤可以慢慢等。"],
      ],
    },
    "after:lv2_flower_rack": {
      eyebrow: "修缮完成 · 3 / 6",
      title: "花架留客",
      scene: "chapter-two flower-rack completed",
      steps: [
        ["掌柜", "流沙驿新任掌柜", portraits.keeper, "right", "他们原说雨一停就走。如今孩子睡在檐下，大人也肯把明日的路留到明日了。"],
      ],
    },
    "before:lv2_north_shop": {
      eyebrow: "第二章 · 北铺开张",
      title: "让远客停脚",
      scene: "chapter-two north-shop",
      steps: [
        ["求法僧人", "西行求法僧", portraits.monk, "left", "贫僧错过宿处，本想借檐下一夜。若北边那间旧屋能挡风，往后的旅人便不必再向黑处赶。"],
      ],
    },
    "after:lv2_north_shop": {
      eyebrow: "修缮完成 · 4 / 6",
      title: "北铺开张",
      scene: "chapter-two north-shop completed",
      steps: [
        ["求法僧人", "西行求法僧", portraits.monk, "right", "今夜门内有火，檐下有灯。贫僧走了许多路，知道这两样有多难得。"],
      ],
    },
    "before:lv2_south_shop": {
      eyebrow: "第二章 · 南铺开张",
      title: "北道带来新味",
      scene: "chapter-two south-shop",
      steps: [
        ["回鹘牧民", "北道牧民", portraits.herder, "left", "这囊鲜乳在风里颠了一夜，还是好的。我不白占你的地方；你留我一张案，我先把最好的一囊留给流沙驿。"],
      ],
    },
    "after:lv2_south_shop": {
      eyebrow: "修缮完成 · 5 / 6",
      title: "南铺开张",
      scene: "chapter-two south-shop completed",
      steps: [
        ["掌柜", "流沙驿新任掌柜", portraits.keeper, "right", "从前我只顾得上守一炉火。如今有人从北道带着最好的鲜乳来，也愿意同我一起把日子做长。"],
      ],
    },
    "before:lv2_well": {
      eyebrow: "第二章 · 井台初成",
      title: "众人共用一井",
      scene: "chapter-two well",
      steps: [
        ["周甲", "沙州驿卒", portraits.guard, "left", "今早为半桶水，铺里人险些争起来。井若只算谁家的，流沙驿这点热闹长不了。"],
        ["掌柜", "流沙驿新任掌柜", portraits.keeper, "right", "那就把它清出来。水从一口井来，规矩也从今日立起：先来后到，人人有份。"],
      ],
    },
    "after:lv2_well": {
      eyebrow: "修缮完成 · 6 / 6",
      title: "井水映灯",
      scene: "chapter-two well completed",
      reward: rewards.chapter2,
      steps: [
        ["周甲", "沙州驿卒", portraits.guard, "left", "一根井绳，方才换了六双手。你看，这地方已经不只是你一个人在撑。"],
        ["粟特胡商", "西市行商", portraits.merchant, "right", "角落那位老胡商看了半日，临走只问我：“下回来，这井水还会这样清吗？”"],
      ],
    },

    "chapter3-opening": {
      eyebrow: "第三章 · 开场",
      title: "夜雨来客",
      scene: "chapter-three upper-hall",
      steps: [
        ["康十一", "远路商队首领", portraits.caravan, "left", "我在西市听了三回流沙驿的名字，才带人绕过来。三峰骆驼停下了，伙计却还站在雨里。"],
        ["求法僧人", "西行求法僧", portraits.monk, "right", "让人吃饱，是一顿善缘；让人安心闭眼，才是一处归宿。"],
        ["掌柜", "流沙驿新任掌柜", portraits.keeper, "left", "我从没接过整支商队。但既然他们循着灯来了，我就不能让这盏灯只照到门口。"],
      ],
    },
    "before:lv3_upper_hall": {
      eyebrow: "第三章 · 楼馆迎宾",
      title: "给商队一盏灯",
      scene: "chapter-three upper-hall",
      steps: [
        ["康十一", "远路商队首领", portraits.caravan, "left", "我的人能忍一夜雨，货不能，病着的脚夫也不能。楼上若真能住，我今日便把全队交给你。"],
        ["求法僧人", "西行求法僧", portraits.monk, "right", "掌柜，路上人肯卸下行囊，便是把一夜平安托给了这里。"],
      ],
    },
    "after:lv3_upper_hall": {
      eyebrow: "修缮完成 · 1 / 6",
      title: "楼馆迎宾",
      scene: "chapter-three upper-hall completed",
      steps: [
        ["掌柜", "流沙驿新任掌柜", portraits.keeper, "right", "第一盏房灯亮时，院里忽然安静了。原来被人信任，比把炉火点着更让人不敢松手。"],
      ],
    },
    "before:lv3_north_court": {
      eyebrow: "第三章 · 北院安居",
      title: "一碗乳糜之后",
      scene: "chapter-three north-court",
      steps: [
        ["求法僧人", "西行求法僧", portraits.monk, "left", "乳糜暖了身，经卷却被雨浸透。贫僧只求一处干地，明日太阳出来，便继续西行。"],
      ],
    },
    "after:lv3_north_court": {
      eyebrow: "修缮完成 · 2 / 6",
      title: "北院安居",
      scene: "chapter-three north-court completed",
      steps: [
        ["长安使者", "东来使团", portraits.envoy, "right", "我替他把经卷摊在窗边了。行旅各有去处，今夜却都能在这里睡稳。"],
      ],
    },
    "before:lv3_west_gate": {
      eyebrow: "第三章 · 西门整饬",
      title: "风沙堵在门外",
      scene: "chapter-three west-gate",
      steps: [
        ["长安使者", "东来使团", portraits.envoy, "left", "我带来的回信被风沙挡在西门外。有人在城里等了三个月，不能再让这一夜耽搁。"],
      ],
    },
    "after:lv3_west_gate": {
      eyebrow: "修缮完成 · 3 / 6",
      title: "西门整饬",
      scene: "chapter-three west-gate completed",
      steps: [
        ["康十一", "远路商队首领", portraits.caravan, "right", "门一开，你先让送信的人过去，才让我的货车进。这个次序，我记下了。"],
      ],
    },
    "before:lv3_east_court": {
      eyebrow: "第三章 · 东院留客",
      title: "等候也要有一席",
      scene: "chapter-three east-court",
      steps: [
        ["长安侍女", "东来使团侍女", portraits.maid, "left", "主人等回信，脚夫等换药。人人都说自己不急，手却一直攥着行囊。能不能给他们一处安静坐下？"],
      ],
    },
    "after:lv3_east_court": {
      eyebrow: "修缮完成 · 4 / 6",
      title: "东院留客",
      scene: "chapter-three east-court completed",
      steps: [
        ["孟氏", "敦煌女店客", portraits.woman, "right", "东来的信在这里拆，西来的路在这里说。坐在同一张桌边，异乡也没那么远了。"],
      ],
    },
    "before:lv3_garden": {
      eyebrow: "第三章 · 花影庭园",
      title: "给旅途留一页",
      scene: "chapter-three garden",
      steps: [
        ["周氏", "佛寺女施主", portraits.donor, "left", "人住下以后，总会说起来路。可话散在风里便没了；给他们一处能慢慢写完的地方吧。"],
      ],
    },
    "after:lv3_garden": {
      eyebrow: "修缮完成 · 5 / 6",
      title: "花影庭园",
      scene: "chapter-three garden completed",
      steps: [
        ["掌柜", "流沙驿新任掌柜", portraits.keeper, "right", "第一张札记写的不是菜名，而是“已平安到沙州”。我这才明白，食单旁还该记下人的归处。"],
      ],
    },
    "before:lv3_watchtower": {
      eyebrow: "第三章 · 望楼通途",
      title: "让远路重新相见",
      scene: "chapter-three watchtower",
      steps: [
        ["粟特胡商", "西市行商", portraits.merchant, "left", "昨夜一支商队错过了岔口，直到天亮才看见这里。你门内的灯再亮，也照不到那么远。"],
        ["周氏", "佛寺女施主", portraits.donor, "right", "你阿爷在时，望楼上总留一盏风灯。他说，先照见路，人才找得到饭香。"],
      ],
    },
    "after:lv3_watchtower": {
      eyebrow: "修缮完成 · 6 / 6",
      title: "望楼见远",
      scene: "chapter-three watchtower completed",
      reward: rewards.chapter3,
      steps: [
        ["康十一", "远路商队首领", portraits.caravan, "left", "灯亮了。西边尘烟里有人摇铃，他们看见流沙驿了。下回我带整队货来，照这盏灯回。"],
        ["掌柜", "流沙驿新任掌柜", portraits.keeper, "right", "阿爷写“驿路不止，食火不灭”。从前我只懂守住炉火，如今才知道，也要替远路的人守住方向。"],
      ],
    },

    "chapter4-opening": {
      eyebrow: "第四章 · 开场",
      title: "商队入城",
      scene: "chapter-four south-shed",
      steps: [
        ["康十一", "远路商队首领", portraits.caravan, "left", "我依约回来了。二十峰骆驼，三十多个伙计，还有一路追着风沙赶来的客人。今晚，流沙驿敢不敢全接下？"],
        ["粟特胡商", "西市行商", portraits.merchant, "right", "西边的尘墙已经起了。人若散在街外，天黑前便来不及了。"],
        ["掌柜", "流沙驿掌柜", portraits.keeper, "left", "敢。周甲去引路，孟氏照看住客，刘大守后厨。其余人跟我从南棚开始，先让所有人进灯下。"],
      ],
    },
    "before:lv4_south_shed": {
      eyebrow: "第四章 · 南棚聚货",
      title: "第一车货",
      scene: "chapter-four south-shed",
      steps: [
        ["康十一", "远路商队首领", portraits.caravan, "left", "风再起一阵，最外头那车货就保不住了。掌柜，你定先后，我让伙计都听你的。"],
      ],
    },
    "after:lv4_south_shed": {
      eyebrow: "修缮完成 · 1 / 7",
      title: "南棚聚货",
      scene: "chapter-four south-shed completed",
      steps: [
        ["康十一", "远路商队首领", portraits.caravan, "right", "最后一袋麦进棚，风沙才压到门口。没有一人走散，也没有一件货丢下。你接住的，不只是一车买卖。"],
      ],
    },
    "before:lv4_central_market": {
      eyebrow: "第四章 · 中市开席",
      title: "四方共坐一席",
      scene: "chapter-four central-market",
      steps: [
        ["康十一", "远路商队首领", portraits.caravan, "left", "风把三家摊主困在一处，他们为谁先卸货吵了半日。货能进棚，人心还没进来。"],
      ],
    },
    "after:lv4_central_market": {
      eyebrow: "修缮完成 · 2 / 7",
      title: "中市开席",
      scene: "chapter-four central-market completed",
      steps: [
        ["粟特胡商", "西市行商", portraits.merchant, "right", "一碗热浆还没凉，方才争得最凶的三个人已经互报了姓名。买卖未必从价钱开始，也会从同席开始。"],
      ],
    },
    "before:lv4_south_street": {
      eyebrow: "第四章 · 南市连街",
      title: "三铺同亮招牌",
      scene: "chapter-four south-street",
      steps: [
        ["粟特胡商", "西市行商", portraits.merchant, "left", "三家都肯留下，却都怕自家灯最后才亮。掌柜，你若开口，他们会不会愿意一同点灯？"],
      ],
    },
    "after:lv4_south_street": {
      eyebrow: "修缮完成 · 3 / 7",
      title: "南市连街",
      scene: "chapter-four south-street completed",
      steps: [
        ["孟氏", "敦煌女店客", portraits.woman, "right", "你刚回来时，门前只有一点火。今日三铺等着你一声招呼，一起亮了。"],
      ],
    },
    "before:lv4_lanes": {
      eyebrow: "第四章 · 巷路相接",
      title: "灯照不到的断处",
      scene: "chapter-four lanes",
      steps: [
        ["孟氏", "敦煌女店客", portraits.woman, "left", "昨夜替孩子取药的人在断巷里迷了路，举着灯绕了整整一刻。街再热闹，也不能把回家的人落在暗处。"],
        ["周甲", "沙州驿卒", portraits.guard, "right", "石料和人手我带来了。你说从哪一段铺，我们今晚把路接回去。"],
      ],
    },
    "after:lv4_lanes": {
      eyebrow: "修缮完成 · 4 / 7",
      title: "巷路相接",
      scene: "chapter-four lanes completed",
      steps: [
        ["周甲", "沙州驿卒", portraits.guard, "left", "第一盏灯刚挂稳，那送药的人便沿新路回来了。脚步没停，也没再问方向。"],
      ],
    },
    "before:lv4_east_shed": {
      eyebrow: "第四章 · 东棚盈市",
      title: "货从东路来",
      scene: "chapter-four east-shed",
      steps: [
        ["康十一", "远路商队首领", portraits.caravan, "left", "东路来的货签被风吹乱了。若这会儿图快开袋，明日谁也说不清货是谁的。"],
      ],
    },
    "after:lv4_east_shed": {
      eyebrow: "修缮完成 · 5 / 7",
      title: "东棚盈市",
      scene: "chapter-four east-shed completed",
      steps: [
        ["粟特胡商", "西市行商", portraits.merchant, "right", "角落那位老胡商看完你重写的货签，只问我：“她每日都这样记账？”我说，是。"],
      ],
    },
    "before:lv4_east_court": {
      eyebrow: "第四章 · 东院焕新",
      title: "让忙碌有处停下",
      scene: "chapter-four east-court",
      steps: [
        ["长安侍女", "东来使团侍女", portraits.maid, "left", "我带来一封回信。上回住过这里的客人说，他归程还要回流沙驿，只是不知那时可还有他的座位。"],
      ],
    },
    "after:lv4_east_court": {
      eyebrow: "修缮完成 · 6 / 7",
      title: "东院焕新",
      scene: "chapter-four east-court completed",
      steps: [
        ["掌柜", "流沙驿掌柜", portraits.keeper, "right", "我会留着。不是只给贵客，也给每一个曾在这里歇过、还愿意回来的人。"],
      ],
    },
    "before:lv4_lantern_city": {
      eyebrow: "第四章 · 灯火连城",
      title: "最后一段暗路",
      scene: "chapter-four lantern-city",
      steps: [
        ["康十一", "远路商队首领", portraits.caravan, "left", "人都安顿下了，却还有两峰骆驼没回来。东边最后一段路仍是黑的，他们若错过路口，便会迎着风走远。"],
        ["掌柜", "流沙驿掌柜", portraits.keeper, "right", "把最后几盏灯全挂上。今晚只要还有一个人在路上，流沙驿就不能先暗。"],
      ],
    },
    "after:lv4_lantern_city": {
      eyebrow: "修缮完成 · 7 / 7",
      title: "灯火连城",
      scene: "chapter-four lantern-city completed",
      reward: rewards.chapter4,
      steps: [
        ["粟特胡商", "西市行商", portraits.merchant, "left", "从西市望过来，一盏、十盏、百盏。如今谁再问流沙驿在何处，我只消指向这片灯。"],
        ["孟氏", "敦煌女店客", portraits.woman, "right", "我还记得你推门那日，门缝里只有一点火。如今整条街的人，都在替它添柴。"],
        ["康十一", "远路商队首领", portraits.caravan, "left", "西来的旧货里夹着半页食单，纸角有你阿爷的记号。送货人说，余下几页还在更西边。"],
        ["掌柜", "流沙驿掌柜", portraits.keeper, "right", "原来阿爷留下的路还没有走完。“驿路不止，食火不灭。”这一回，我知道该往哪里走了。"],
      ],
    },
  };

  const chapterSegments = {
    1: [
      "opening",
      "before:tutorial_complete",
      "after:tutorial_complete",
      "before:kitchen_repair",
      "after:kitchen_repair",
      "before:codex_first_phase",
      "after:codex_first_phase",
    ],
    2: [
      "chapter2-opening",
      "before:lv2_front_feast",
      "after:lv2_front_feast",
      "before:lv2_west_market",
      "after:lv2_west_market",
      "before:lv2_flower_rack",
      "after:lv2_flower_rack",
      "before:lv2_north_shop",
      "after:lv2_north_shop",
      "before:lv2_south_shop",
      "after:lv2_south_shop",
      "before:lv2_well",
      "after:lv2_well",
    ],
    3: [
      "chapter3-opening",
      "before:lv3_upper_hall",
      "after:lv3_upper_hall",
      "before:lv3_north_court",
      "after:lv3_north_court",
      "before:lv3_west_gate",
      "after:lv3_west_gate",
      "before:lv3_east_court",
      "after:lv3_east_court",
      "before:lv3_garden",
      "after:lv3_garden",
      "before:lv3_watchtower",
      "after:lv3_watchtower",
    ],
    4: [
      "chapter4-opening",
      "before:lv4_south_shed",
      "after:lv4_south_shed",
      "before:lv4_central_market",
      "after:lv4_central_market",
      "before:lv4_south_street",
      "after:lv4_south_street",
      "before:lv4_lanes",
      "after:lv4_lanes",
      "before:lv4_east_shed",
      "after:lv4_east_shed",
      "before:lv4_east_court",
      "after:lv4_east_court",
      "before:lv4_lantern_city",
      "after:lv4_lantern_city",
    ],
  };

  const archiveMoments = {
    1: [
      {
        id: "chapter1-first-fire",
        title: "第一缕炉烟",
        summary: "掌柜重启旧灶，也重新翻开阿爷留下的《丝路食单》。",
        segmentIds: ["opening"],
      },
      {
        id: "chapter1-first-guests",
        title: "门前真的有客",
        summary: "旧驿迎来第一批客人，冷了两年的长凳终于重新坐热。",
        segmentIds: ["before:tutorial_complete", "after:tutorial_complete"],
      },
      {
        id: "chapter1-steady-fire",
        title: "灶火渐旺",
        summary: "在众人的帮助下，旧灶有了稳稳的火，熟悉的麦香重新飘出门外。",
        segmentIds: ["before:kitchen_repair", "after:kitchen_repair"],
      },
      {
        id: "chapter1-shared-codex",
        title: "食单见人",
        summary: "掌柜不再把食单藏进匣中，决定把一路相遇的味道继续写下去。",
        segmentIds: ["before:codex_first_phase", "after:codex_first_phase"],
      },
    ],
    2: [
      {
        id: "chapter2-market-wind",
        title: "西市风来",
        summary: "一张胡麻饼把流沙驿的名字带进西市，也把更多旅人带到了门前。",
        segmentIds: ["chapter2-opening"],
      },
      {
        id: "chapter2-market-lights",
        title: "灯下成市",
        summary: "乐声、席面与新亮的灯火聚起人群，流沙驿第一次有了市井模样。",
        segmentIds: [
          "before:lv2_front_feast",
          "after:lv2_front_feast",
          "before:lv2_west_market",
          "after:lv2_west_market",
        ],
      },
      {
        id: "chapter2-shelter",
        title: "风雨留客",
        summary: "屋檐挡住急雨，北铺留住晚归人，驿站开始成为旅途中的落脚处。",
        segmentIds: [
          "before:lv2_flower_rack",
          "after:lv2_flower_rack",
          "before:lv2_north_shop",
          "after:lv2_north_shop",
        ],
      },
      {
        id: "chapter2-shared-well",
        title: "一井同心",
        summary: "北道带来新的滋味，众人也在同一口井边立下共同生活的规矩。",
        segmentIds: [
          "before:lv2_south_shop",
          "after:lv2_south_shop",
          "before:lv2_well",
          "after:lv2_well",
        ],
      },
    ],
    3: [
      {
        id: "chapter3-night-rain",
        title: "夜雨来客",
        summary: "整支商队循灯而来，掌柜第一次接下让远路人安心过夜的重任。",
        segmentIds: ["chapter3-opening"],
      },
      {
        id: "chapter3-room-lights",
        title: "一盏房灯",
        summary: "楼馆与北院先后亮灯，流沙驿从一处食肆变成了可以托付平安的驿站。",
        segmentIds: [
          "before:lv3_upper_hall",
          "after:lv3_upper_hall",
          "before:lv3_north_court",
          "after:lv3_north_court",
        ],
      },
      {
        id: "chapter3-roads-meet",
        title: "东西路相逢",
        summary: "西门送出久候的书信，东院安顿等待的人，不同方向的旅途在此相逢。",
        segmentIds: [
          "before:lv3_west_gate",
          "after:lv3_west_gate",
          "before:lv3_east_court",
          "after:lv3_east_court",
        ],
      },
      {
        id: "chapter3-distant-light",
        title: "替远路守灯",
        summary: "旅人的札记被留下，望楼的灯也重新亮起，流沙驿终于能替远路指引方向。",
        segmentIds: [
          "before:lv3_garden",
          "after:lv3_garden",
          "before:lv3_watchtower",
          "after:lv3_watchtower",
        ],
      },
    ],
    4: [
      {
        id: "chapter4-caravan-arrives",
        title: "商队入城",
        summary: "大队人马迎着尘墙抵达，掌柜第一次调度众人，一同守住整座驿站。",
        segmentIds: ["chapter4-opening"],
      },
      {
        id: "chapter4-shared-table",
        title: "风沙中的一席",
        summary: "货物赶在风沙前入棚，原本争执的商旅也在一碗热浆前坐到了一起。",
        segmentIds: [
          "before:lv4_south_shed",
          "after:lv4_south_shed",
          "before:lv4_central_market",
          "after:lv4_central_market",
        ],
      },
      {
        id: "chapter4-three-shops",
        title: "三铺同亮",
        summary: "三间店铺同时亮起招牌，断开的巷路也重新接回了归家的灯下。",
        segmentIds: [
          "before:lv4_south_street",
          "after:lv4_south_street",
          "before:lv4_lanes",
          "after:lv4_lanes",
        ],
      },
      {
        id: "chapter4-city-of-lights",
        title: "灯火连城",
        summary: "货棚、院落与长街连成灯海，阿爷留下的半页食单又把掌柜引向更远的路。",
        segmentIds: [
          "before:lv4_east_shed",
          "after:lv4_east_shed",
          "before:lv4_east_court",
          "after:lv4_east_court",
          "before:lv4_lantern_city",
          "after:lv4_lantern_city",
        ],
      },
    ],
  };

  let active;
  let activeId;
  let index = 0;
  let done;
  let progress;
  let qaState;
  let reviewMode = false;
  let ui;

  function elements() {
    if (ui) return ui;
    ui = {
      modal: document.querySelector("#chapterStoryModal"),
      stage: document.querySelector("#chapterStoryModal .chapter-story-stage"),
      scene: document.querySelector("#chapterStoryModal .chapter-story-scene"),
      eyebrow: document.querySelector("#chapterStoryEyebrow"),
      title: document.querySelector("#chapterStoryTitle"),
      skip: document.querySelector("#chapterStorySkip"),
      qaNav: document.querySelector("#chapterStoryQaNav"),
      qaPrev: document.querySelector("#chapterStoryQaPrev"),
      qaIndex: document.querySelector("#chapterStoryQaIndex"),
      qaNext: document.querySelector("#chapterStoryQaNext"),
      portraitFrame: document.querySelector("#chapterStoryPortraitFrame"),
      portrait: document.querySelector("#chapterStoryPortrait"),
      panel: document.querySelector("#chapterStoryModal .chapter-story-panel"),
      speaker: document.querySelector("#chapterStorySpeaker"),
      role: document.querySelector("#chapterStoryRole"),
      text: document.querySelector("#chapterStoryText"),
      dots: document.querySelector("#chapterStoryDots"),
      next: document.querySelector("#chapterStoryNext"),
      nextLabel: document.querySelector("#chapterStoryNext span"),
      reward: document.querySelector("#chapterStoryReward"),
      rewardEyebrow: document.querySelector("#chapterStoryRewardEyebrow"),
      rewardTitle: document.querySelector("#chapterStoryRewardTitle"),
      rewardDescription: document.querySelector("#chapterStoryRewardDescription"),
      rewardItems: document.querySelector("#chapterStoryRewardItems"),
      collect: document.querySelector("#chapterStoryCollect"),
    };
    ui.next.addEventListener("click", advance);
    ui.skip.addEventListener("click", skipSegment);
    ui.collect.addEventListener("click", finish);
    ui.dots.addEventListener("click", selectDialogueStep);
    ui.qaPrev.addEventListener("click", () => navigateQa(-1));
    ui.qaNext.addEventListener("click", () => navigateQa(1));
    ui.modal.addEventListener("cancel", (event) => {
      event.preventDefault();
      finish({ completed: !reviewMode });
    });
    return ui;
  }

  function notifyProgress(rewardVisible) {
    progress?.({ segmentId: activeId, index, rewardVisible });
  }

  function renderQaNavigation() {
    const view = elements();
    if (!qaState) {
      view.qaNav.hidden = true;
      return;
    }
    const ids = chapterSegments[qaState.chapter];
    view.qaNav.hidden = false;
    view.qaIndex.textContent = `第${qaState.chapter}章 · ${qaState.index + 1}/${ids.length}`;
    view.qaPrev.disabled = qaState.index === 0;
    view.qaNext.disabled = qaState.index === ids.length - 1;
  }

  function navigateQa(offset) {
    if (!qaState) return;
    const ids = chapterSegments[qaState.chapter];
    const nextIndex = Math.max(0, Math.min(ids.length - 1, qaState.index + offset));
    if (nextIndex === qaState.index) return;
    const params = new URLSearchParams(location.search);
    params.set("qa", "chapter-story-v1");
    params.set("chapter", String(qaState.chapter));
    params.set("scene", String(nextIndex));
    params.delete("story");
    history.replaceState(null, "", `${location.pathname}?${params.toString()}${location.hash}`);
    play(ids[nextIndex], { qa: { chapter: qaState.chapter, index: nextIndex } });
  }

  function advanceQaSegment() {
    if (!qaState) return false;
    const ids = chapterSegments[qaState.chapter];
    if (qaState.index >= ids.length - 1) return false;
    navigateQa(1);
    return true;
  }

  function skipSegment() {
    if (reviewMode) {
      finish({ completed: false });
      return;
    }
    if (!advanceQaSegment()) finish({ completed: true });
  }

  function selectDialogueStep(event) {
    const target = event.target.closest("button[data-step-index]");
    if (!target || !active) return;
    const selectedIndex = Number(target.dataset.stepIndex);
    if (!Number.isInteger(selectedIndex) || selectedIndex < 0 || selectedIndex >= active.steps.length || selectedIndex === index) return;
    index = selectedIndex;
    renderDialogue();
  }

  function renderDialogue() {
    const view = elements();
    const step = active.steps[index];
    view.reward.hidden = true;
    view.panel.hidden = false;
    view.stage.classList.remove("reward-visible");
    view.portraitFrame.classList.toggle("right", step[3] === "right");
    view.portrait.src = step[2];
    view.portrait.alt = step[0];
    view.speaker.textContent = step[0];
    view.role.textContent = step[1];
    view.text.textContent = step[4];
    view.dots.hidden = active.steps.length <= 1;
    view.dots.innerHTML = active.steps
      .map((_, stepIndex) => `<button type="button" class="${stepIndex === index ? "active" : ""}" data-step-index="${stepIndex}" aria-label="查看第 ${stepIndex + 1} 段对白"${stepIndex === index ? ' aria-current="step"' : ""}></button>`)
      .join("");
    const atLastStep = index === active.steps.length - 1;
    const hasNextQaSegment = Boolean(qaState && qaState.index < chapterSegments[qaState.chapter].length - 1);
    const nextActionLabel = atLastStep && reviewMode
      ? "结束回顾"
      : atLastStep && active.reward
      ? "查看奖励"
      : atLastStep && hasNextQaSegment
        ? "下一段"
        : "继续";
    view.nextLabel.textContent = nextActionLabel;
    view.next.setAttribute("aria-label", nextActionLabel);
    view.next.title = nextActionLabel;
    view.panel.classList.remove("entering");
    void view.panel.offsetWidth;
    view.panel.classList.add("entering");
    notifyProgress(false);
  }

  function createRewardItem(item) {
    const figure = document.createElement("figure");
    const image = document.createElement("img");
    const caption = document.createElement("figcaption");
    const label = document.createElement("strong");
    const amount = document.createElement("span");
    if (item.kind) figure.dataset.kind = item.kind;
    if (item.level) figure.dataset.level = String(item.level);
    image.src = item.src;
    image.alt = item.label;
    label.textContent = item.label;
    amount.textContent = item.amount;
    caption.append(label, amount);
    figure.append(image, caption);
    return figure;
  }

  function renderReward() {
    const view = elements();
    const reward = active.reward;
    view.panel.hidden = true;
    view.rewardEyebrow.textContent = reward.eyebrow;
    view.rewardTitle.textContent = reward.title;
    view.rewardDescription.textContent = reward.description;
    view.rewardItems.replaceChildren(...reward.items.map(createRewardItem));
    view.collect.textContent = reward.action ?? "收下奖励";
    view.reward.hidden = false;
    view.stage.classList.add("reward-visible");
    notifyProgress(true);
  }

  function advance() {
    if (index < active.steps.length - 1) {
      index += 1;
      renderDialogue();
      return;
    }
    if (active.reward && !reviewMode) {
      renderReward();
      return;
    }
    if (advanceQaSegment()) return;
    finish({ completed: true });
  }

  function finish(result = { completed: true }) {
    const callback = done;
    active = null;
    activeId = null;
    done = null;
    progress = null;
    qaState = null;
    const view = elements();
    reviewMode = false;
    view.stage.classList.remove("reward-visible", "review-mode");
    view.skip.textContent = "跳过";
    view.skip.setAttribute("aria-label", "跳过剧情");
    view.skip.title = "跳过剧情";
    view.qaNav.hidden = true;
    if (view.modal.open) view.modal.close();
    callback?.(result);
  }

  function play(id, options = {}) {
    const segment = segments[id];
    if (!segment) {
      options.onComplete?.();
      return false;
    }
    const view = elements();
    active = segment;
    activeId = id;
    index = Math.max(0, Math.min(segment.steps.length - 1, Number(options.startIndex) || 0));
    done = options.onComplete ?? null;
    progress = options.onProgress ?? null;
    qaState = options.qa ?? null;
    reviewMode = Boolean(options.review);
    view.eyebrow.textContent = segment.eyebrow;
    view.title.textContent = segment.title;
    view.modal.setAttribute("aria-label", `${reviewMode ? "剧情回顾 " : ""}${segment.eyebrow} ${segment.title}`);
    view.scene.className = `chapter-story-scene ${segment.scene || ""}`;
    view.stage.classList.remove("reward-visible", "review-mode");
    view.stage.classList.toggle("review-mode", reviewMode);
    view.skip.textContent = reviewMode ? "退出" : "跳过";
    view.skip.setAttribute("aria-label", reviewMode ? "退出剧情回顾" : "跳过剧情");
    view.skip.title = reviewMode ? "退出剧情回顾" : "跳过剧情";
    renderQaNavigation();
    if (options.startAtReward && segment.reward && !reviewMode) renderReward();
    else renderDialogue();
    if (!view.modal.open) view.modal.showModal();
    return true;
  }

  function playChapterQa(chapter, requestedIndex = 0) {
    const normalizedChapter = Math.max(1, Math.min(4, Number(chapter) || 1));
    const ids = chapterSegments[normalizedChapter];
    const normalizedIndex = Math.max(0, Math.min(ids.length - 1, Number(requestedIndex) || 0));
    return play(ids[normalizedIndex], { qa: { chapter: normalizedChapter, index: normalizedIndex } });
  }

  global.SilkRoadChapterStory = { play, playChapterQa, segments, chapterSegments, archiveMoments };
})(window);
