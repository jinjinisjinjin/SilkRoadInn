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
    mystery: "./assets/npc/npc_mystery_merchant.png",
    persian: "./assets/npc_standee/npc_persian_attendant.png",
    musician: "./assets/npc/npc_silkroad_musician.png",
    official: "./assets/npc_repair_portrait/npc_changan_envoy_v1.png",
  };

  const rewards = {
    chapter1: {
      eyebrow: "第一章完成",
      title: "流沙驿初明",
      description: "旧驿重新有了炉火、人声与一面能被看见的食单。",
      items: [
        { src: "./assets/ui/order_gift_coffer_v1.png", label: "初明礼匣", amount: "×1" },
      ],
    },
    chapter2: {
      eyebrow: "第二章完成",
      title: "西市烟火",
      description: "前厅、西市、南北铺与井台相继开张，流沙驿终于聚成一处真正的市井。",
      items: [
        { src: "./assets/ui/order_gift_coffer_v1.png", label: "西市烟火礼匣", amount: "×1" },
      ],
    },
    chapter3: {
      eyebrow: "第三章完成",
      title: "楼馆通途",
      description: "楼馆、双院、庭园与望楼相继修好，流沙驿终于能让远路旅人安心停脚。",
      items: [
        { src: "./assets/ui/order_gift_coffer_v1.png", label: "楼馆通途礼匣", amount: "×1" },
      ],
    },
    chapter4: {
      eyebrow: "第四章完成",
      title: "灯火连城",
      description: "货棚、长街、院落与巷灯连成一片，流沙驿成为商路上不会熄灭的一盏灯。",
      items: [
        { src: "./assets/ui/order_gift_coffer_v1.png", label: "灯火连城礼匣", amount: "×1" },
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
        ["掌柜", "流沙驿新任掌柜", portraits.keeper, "left", "《丝路食鉴》扉页上，是阿爷留下的那句话：“驿路不止，食火不灭。”阿爷，我先替你把这炉火续上。"],
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
        ["周氏", "佛寺女施主", portraits.donor, "left", "你总把食鉴收进匣里，是怕人翻坏，还是怕自己续不好它？"],
        ["掌柜", "流沙驿新任掌柜", portraits.keeper, "right", "从前总觉得，少一笔都像辜负阿爷。如今我想明白了，这本食鉴，本就是许多人一路走出来的。"],
      ],
    },
    "after:codex_first_phase": {
      eyebrow: "修缮完成 · 3 / 3",
      title: "食单初成",
      scene: "codex repaired-three",
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
      steps: [
        ["周甲", "沙州驿卒", portraits.guard, "left", "一根井绳，方才换了六双手。你看，这地方已经不只是你一个人在撑。"],
        ["粟特胡商", "西市行商", portraits.merchant, "right", "那位总坐在角落的老人，临走前问了我一句：下回来，这口井还能不能这样清。"],
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
        ["康十一", "远路商队首领", portraits.caravan, "left", "雨篷又漏了。最外头的货还能盖毡，可阿芒的脚伤泡了水，人已经烧得说不出话。"],
        ["掌柜", "流沙驿新任掌柜", portraits.keeper, "right", "楼上确实还有三间空屋。只是窗纸破了，横梁也松着，我不能拿一句“能住”哄你们上去。"],
        ["求法僧人", "西行求法僧", portraits.monk, "left", "贫僧方才替他换药。他一路都把干燥的铺位让给货袋，今夜若还睡在湿地上，明日便走不了了。"],
        ["康十一", "远路商队首领", portraits.caravan, "right", "货损了，我还能再做一趟买卖；人倒在路上，谁也赔不起。掌柜，你只说需要多少人手。"],
        ["掌柜", "流沙驿新任掌柜", portraits.keeper, "left", "我原以为先把货安顿好，才算接得住商队。如今看来，灯若只照着货，却照不到人，这楼馆修得再迟也没有意义。"],
        ["掌柜", "流沙驿新任掌柜", portraits.keeper, "right", "康十一先把伤者移到檐下，法师替我举灯。我上楼清点梁木——今夜，我们把第一间客房点亮。"],
      ],
    },
    "after:lv3_upper_hall": {
      eyebrow: "修缮完成 · 1 / 6",
      title: "楼馆迎宾",
      scene: "chapter-three upper-hall completed",
      steps: [
        ["康十一", "远路商队首领", portraits.caravan, "left", "阿芒已经睡熟了。他方才还惦记那几袋货，我告诉他：货有人守，今晚你只管养伤。"],
        ["求法僧人", "西行求法僧", portraits.monk, "right", "一间干燥的屋子看似平常，对走了太久的人，却是终于可以松开行囊的地方。"],
        ["掌柜", "流沙驿新任掌柜", portraits.keeper, "left", "第一盏房灯亮起时，院里忽然安静了。原来真正接住一支商队，先接住的不是货，而是他们肯交到我手里的这一夜。"],
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
        ["掌柜", "流沙驿新任掌柜", portraits.keeper, "right", "第一张札记写的不是菜名，而是“已平安到沙州”。我这才明白，食鉴旁还该记下人的归处。"],
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
        ["史三", "过路老胡商", portraits.mystery, "right", "货签写得清楚。下回来，我还按这套记法找货。"],
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
      steps: [
        ["粟特胡商", "西市行商", portraits.merchant, "left", "从西市望过来，一盏、十盏、百盏。如今谁再问流沙驿在何处，我只消指向这片灯。"],
        ["孟氏", "敦煌女店客", portraits.woman, "right", "我还记得你推门那日，门缝里只有一点火。如今整条街的人，都在替它添柴。"],
        ["康十一", "远路商队首领", portraits.caravan, "left", "西来的旧货里夹着半页食鉴，纸角有你阿爷的记号。送货人说，余下几页还在更西边。"],
        ["掌柜", "流沙驿掌柜", portraits.keeper, "right", "原来阿爷留下的路还没有走完。“驿路不止，食火不灭。”这一回，我知道该往哪里走了。"],
      ],
    },
  };

  // 每个修缮点由“修缮前 + 修缮后”组成一段完整的六页小剧情。
  // 原始台词保留，以下补充负责补齐人物反应、行动决定与修缮后的情绪回响。
  const densityAdditions = {
    "before:tutorial_complete": [
      ["掌柜", "流沙驿新任掌柜", portraits.keeper, "left", "门里只有一张还能用的桌，门外却已经站了两个人。若连第一批客人都接不住，这炉火亮着也只是给自己看。"],
    ],
    "after:tutorial_complete": [
      ["周甲", "沙州驿卒", portraits.guard, "left", "我把佩刀挪到凳下，给后来的人腾了半边。你看，有了能坐的地方，陌生人也肯挤在一处说话。"],
      ["掌柜", "流沙驿新任掌柜", portraits.keeper, "right", "那我先不急着添新桌。把这一席照顾好，让每个进门的人都知道，流沙驿真的重新开门了。"],
    ],
    "before:kitchen_repair": [
      ["掌柜", "流沙驿新任掌柜", portraits.keeper, "right", "方才第一炉饼边缘已经焦了，里面却还夹生。我若只顾着把食物端出去，迟早要让客人失望。"],
      ["刘大", "城外粮户", portraits.farmer, "left", "灶膛裂缝我来补，你把积灰清干净。火候不是运气，是一砖一泥都得稳。"],
    ],
    "after:kitchen_repair": [
      ["刘大", "城外粮户", portraits.farmer, "left", "新添的柴没有多烧一根，锅底却热得均匀。以后粮送到这里，我也放心你不会糟蹋。"],
      ["掌柜", "流沙驿新任掌柜", portraits.keeper, "right", "原来修好一座灶，不只是为了多做几张饼，也是让每一份来之不易的粮都有好归处。"],
    ],
    "before:codex_first_phase": [
      ["周甲", "沙州驿卒", portraits.guard, "left", "今日已经有三个人问我那张饼叫什么。若食单一直锁着，流沙驿的味道便只能靠人猜。"],
    ],
    "after:codex_first_phase": [
      ["掌柜", "流沙驿新任掌柜", portraits.keeper, "right", "我在旧页旁添了第一笔：谁带来原料、谁改了火候、谁在这里吃过。菜名之外，也该留下人的名字。"],
      ["周氏", "佛寺女施主", portraits.donor, "left", "那便继续写。食物会吃完，记下来的相遇却能替后来的人照亮一段路。"],
    ],

    "before:lv2_front_feast": [
      ["掌柜", "流沙驿新任掌柜", portraits.keeper, "right", "有人捧着碗站到了门槛外。我能让他们吃上热食，却还没有地方让他们从容坐下。"],
      ["孟氏", "敦煌女店客", portraits.woman, "left", "先把桌凳排开，给奏乐的人留一角。吃食留住脚步，能听完一曲，才会记住这里。"],
    ],
    "after:lv2_front_feast": [
      ["粟特胡商", "西市行商", portraits.merchant, "left", "那位果贩原只想歇半刻，如今已经同邻桌谈起明日的买卖。你添的是席位，留下的却是缘分。"],
      ["掌柜", "流沙驿新任掌柜", portraits.keeper, "right", "以后再忙，也给乐声和闲话留一席。驿站若只有赶路的匆忙，便称不上烟火。"],
    ],
    "before:lv2_west_market": [
      ["掌柜", "流沙驿新任掌柜", portraits.keeper, "left", "灯下若只是堆货，很快又会乱成一团。我要把摊位、行路和看货的位置先分清楚。"],
    ],
    "after:lv2_west_market": [
      ["长安使者", "东来使团", portraits.envoy, "right", "我在灯下认出了家乡的香料，也看见西来的果干。原来走得再远，熟悉的味道仍会在一张摊上相遇。"],
      ["掌柜", "流沙驿新任掌柜", portraits.keeper, "left", "明日起每家摊前都留一盏灯，也留出一条不被货箱堵住的路。让来客看得清，也走得稳。"],
    ],
    "before:lv2_flower_rack": [
      ["掌柜", "流沙驿新任掌柜", portraits.keeper, "right", "孩子的衣袖已经湿透，墙边的泥水还在往里漫。花架可以以后再好看，今日先得能挡雨。"],
      ["孟氏", "敦煌女店客", portraits.woman, "left", "我去找旧篷布，你把架脚扎稳。好看的地方让人停眼，可靠的地方才让人停脚。"],
    ],
    "after:lv2_flower_rack": [
      ["孟氏", "敦煌女店客", portraits.woman, "left", "雨珠顺着花叶落到檐外，里面的行囊一件也没湿。等天晴了，再让藤蔓慢慢爬满它。"],
      ["掌柜", "流沙驿新任掌柜", portraits.keeper, "right", "往后这里不只摆花，也备一卷干布、一盏热水。遇上急雨的人，不必先开口求助。"],
    ],
    "before:lv2_north_shop": [
      ["掌柜", "流沙驿新任掌柜", portraits.keeper, "right", "檐下的风正对着睡处，借住一夜也会冻醒。既然要留人，就不能只给一块屋顶。"],
      ["求法僧人", "西行求法僧", portraits.monk, "left", "补住窗缝，再垫高卧席便够了。旅人要的并非华屋，只是今夜不必继续赶路。"],
    ],
    "after:lv2_north_shop": [
      ["掌柜", "流沙驿新任掌柜", portraits.keeper, "left", "我在门后放了干毡和一盏小灯。后来的人即使深夜抵达，也能自己找到一处暖地。"],
      ["求法僧人", "西行求法僧", portraits.monk, "right", "施主留住的不是一个夜晚，是旅人明日还能继续上路的力气。"],
    ],
    "before:lv2_south_shop": [
      ["掌柜", "流沙驿新任掌柜", portraits.keeper, "right", "鲜乳怕热，也怕与香料混放。南边旧铺若清出来，北道带来的滋味才能真正留下。"],
      ["回鹘牧民", "北道牧民", portraits.herder, "left", "我教你辨乳香和酸味，你替我把木架垫高。今日不是借一张案，是一起开一间铺。"],
    ],
    "after:lv2_south_shop": [
      ["回鹘牧民", "北道牧民", portraits.herder, "left", "第一罐鲜乳已经安稳放好。下趟我带酥油来，也带两个会做乳糜的年轻人。"],
      ["掌柜", "流沙驿新任掌柜", portraits.keeper, "right", "南铺有了自己的气味，也有了等候下一趟商路的理由。流沙驿的食单，又能多写一页。"],
    ],
    "before:lv2_well": [
      ["周甲", "沙州驿卒", portraits.guard, "left", "我来刻下取水的次序，再备两只公用水桶。规矩若人人看得见，争执自然少一半。"],
    ],
    "after:lv2_well": [
      ["掌柜", "流沙驿新任掌柜", portraits.keeper, "left", "清井只能管一时。我把取水次序挂在井边，也备了公用水桶。大家照规矩用，这口井才能一直供得上。"],
    ],

    "before:lv3_north_court": [
      ["掌柜", "流沙驿新任掌柜", portraits.keeper, "right", "北院地势高，日照也足，只是门轴锈死、窗台积灰。把这里清出来，经卷和伤者都能避开潮气。"],
      ["求法僧人", "西行求法僧", portraits.monk, "left", "贫僧可以帮着抬席。经卷晒干还要上路，但下一位冒雨来的人，也该有同样的干地。"],
    ],
    "after:lv3_north_court": [
      ["求法僧人", "西行求法僧", portraits.monk, "left", "墨迹虽晕开几处，文字总算保住了。窗外还有人替陌生旅客翻晒衣物，这院子已有了善意。"],
      ["掌柜", "流沙驿新任掌柜", portraits.keeper, "right", "我会在北院常备晒绳与药箱。让每一个狼狈进门的人，都能体面地重新出发。"],
    ],
    "before:lv3_west_gate": [
      ["掌柜", "流沙驿新任掌柜", portraits.keeper, "right", "门轴被沙埋住，硬推只会折断。我先带人清沙，你把最急的信单独收好。"],
      ["长安使者", "东来使团", portraits.envoy, "left", "这封信报的是平安。收信的人等的不是纸，是一句家人仍在路上的消息。"],
    ],
    "after:lv3_west_gate": [
      ["长安使者", "东来使团", portraits.envoy, "left", "送信人已经出门，蹄声比货车轻，却比任何买卖都急。今日这扇门开得正是时候。"],
      ["掌柜", "流沙驿新任掌柜", portraits.keeper, "right", "往后西门留一条急路。救人的药、报平安的信，都不必在货队后面等。"],
    ],
    "before:lv3_east_court": [
      ["掌柜", "流沙驿新任掌柜", portraits.keeper, "right", "等候最磨人。若能让他们放下行囊、喝口热浆，时间便不只是空耗。"],
      ["长安侍女", "东来使团侍女", portraits.maid, "left", "我来分茶，也把谁在等什么记下来。消息到了，便不至于满院寻找。"],
    ],
    "after:lv3_east_court": [
      ["长安侍女", "东来使团侍女", portraits.maid, "left", "脚夫在角落睡着了，主人也终于松开手里的信。能安心等候，本身就是一种安顿。"],
      ["掌柜", "流沙驿新任掌柜", portraits.keeper, "right", "东院以后不催人消费，也不催人离开。等信、等药、等同伴，都可以在这里慢慢等。"],
    ],
    "before:lv3_garden": [
      ["掌柜", "流沙驿新任掌柜", portraits.keeper, "right", "后院还有一块背风地。我想摆下矮桌和笔墨，让不急着走的人把话留下。"],
      ["周氏", "佛寺女施主", portraits.donor, "left", "再种几株耐旱的花。人写到难处时抬头能见一点颜色，心也会缓下来。"],
    ],
    "after:lv3_garden": [
      ["周氏", "佛寺女施主", portraits.donor, "left", "有人写家书，有人只画了一峰骆驼。留下什么并不重要，重要的是他们终于有空回望来路。"],
      ["掌柜", "流沙驿新任掌柜", portraits.keeper, "right", "我会把无主的札记收进木匣。也许多年以后，有人回来，还能认出自己当年的字。"],
    ],
    "before:lv3_watchtower": [
      ["掌柜", "流沙驿新任掌柜", portraits.keeper, "left", "望楼的梯板已经朽了，风灯也只剩半面罩。先修到能让守夜人安全登楼，再谈照远。"],
    ],
    "after:lv3_watchtower": [
      ["粟特胡商", "西市行商", portraits.merchant, "left", "从今夜起，迟到的人先看见望楼，再闻见饭香。流沙驿终于把手伸到了路上。"],
    ],

    "before:lv4_south_shed": [
      ["掌柜", "流沙驿掌柜", portraits.keeper, "right", "先收药材和粮，再收怕潮的布，最后才是耐风的木器。货有轻重缓急，人也不能乱。"],
      ["粟特胡商", "西市行商", portraits.merchant, "left", "我去给每辆车挂号牌。进棚之后仍能找回自己的货，大家才肯按你的次序来。"],
    ],
    "after:lv4_south_shed": [
      ["掌柜", "流沙驿掌柜", portraits.keeper, "left", "号牌与货单都对上了，连最后入棚的木器也没有压坏粮袋。人多，规矩更要清楚。"],
      ["康十一", "远路商队首领", portraits.caravan, "right", "下一趟我会在路上先照你的次序分车。流沙驿的规矩，已经能护住更远的货。"],
    ],
    "before:lv4_central_market": [
      ["掌柜", "流沙驿掌柜", portraits.keeper, "right", "先不开价，也不抢摊位。把三家的食物摆到一张桌上，让他们先认清彼此带来的东西。"],
      ["粟特胡商", "西市行商", portraits.merchant, "left", "我来做中间人。能同桌尝一口，话就不必隔着货箱喊。"],
    ],
    "after:lv4_central_market": [
      ["康十一", "远路商队首领", portraits.caravan, "left", "一位拿香料换了果干，一位约好回程带乳酪。方才的争执，已经变成下一趟路。"],
      ["掌柜", "流沙驿掌柜", portraits.keeper, "right", "中市以后先留公席，再排货摊。让人先坐下来，买卖才有可能走得长。"],
    ],
    "before:lv4_south_street": [
      ["掌柜", "流沙驿掌柜", portraits.keeper, "right", "若三盏灯争着亮，街还是三截。我要把檐线、招牌和点灯时辰都连起来。"],
      ["粟特胡商", "西市行商", portraits.merchant, "left", "我去劝他们共用一面风挡。省下的灯油，正好留给街尾最暗的地方。"],
    ],
    "after:lv4_south_street": [
      ["粟特胡商", "西市行商", portraits.merchant, "left", "三家招牌各有模样，灯影却连成了一条线。客人沿着光走，自然会把每一家都看见。"],
      ["掌柜", "流沙驿掌柜", portraits.keeper, "right", "生意不必靠遮住别人。整条街亮起来，每一扇门才都有客人走到。"],
    ],
    "before:lv4_lanes": [
      ["掌柜", "流沙驿掌柜", portraits.keeper, "left", "先接药铺到住院的这一段，再补通水井。最常被人走的路，应当最先安全。"],
    ],
    "after:lv4_lanes": [
      ["孟氏", "敦煌女店客", portraits.woman, "right", "孩子抱着药回来时，还停在新灯下等了母亲。路不再只是穿过去的地方，也能让人安心停一下。"],
      ["掌柜", "流沙驿掌柜", portraits.keeper, "left", "我会让巡夜的人每天走一遍巷路。哪盏灯灭、哪块石松，都不能等出事才看见。"],
    ],
    "before:lv4_east_shed": [
      ["掌柜", "流沙驿掌柜", portraits.keeper, "right", "先按货主和来路重新编号，再开袋核对。慢这一刻，才能免去往后十日的争执。"],
      ["粟特胡商", "西市行商", portraits.merchant, "left", "我认得三种商号的旧印。你记新签，我来核旧记，谁的货都不会凭嗓门决定。"],
    ],
    "after:lv4_east_shed": [
      ["康十一", "远路商队首领", portraits.caravan, "left", "伙计按新货签一刻便找齐了整车。清楚的账不是束缚，是让所有人都能放心交货。"],
      ["掌柜", "流沙驿掌柜", portraits.keeper, "right", "东西两棚从今日用同一套记法。无论货从哪条路来，到了这里都不会失去名字。"],
    ],
    "before:lv4_east_court": [
      ["掌柜", "流沙驿掌柜", portraits.keeper, "right", "座位会有。只是院墙斑驳、旧席也经不起下一场雨，我想在他们回来前把这里真正安顿好。"],
      ["长安侍女", "东来使团侍女", portraits.maid, "left", "那我替回信的人写一句：旧座仍在，灯也比从前更亮。让他在归路上就先有一处盼望。"],
    ],
    "after:lv4_east_court": [
      ["长安侍女", "东来使团侍女", portraits.maid, "left", "我把信放在窗边的座位上拍了照样。等他看到，便知道这里记得他。"],
      ["掌柜", "流沙驿掌柜", portraits.keeper, "right", "驿站每日迎来许多人，但不能因为人多，就把每一次相逢都当成过客。"],
    ],
    "before:lv4_lantern_city": [
      ["周甲", "沙州驿卒", portraits.guard, "left", "我带两队人沿东路找，望楼负责传灯号。只要看见回应，就立刻引他们转向。"],
      ["粟特胡商", "西市行商", portraits.merchant, "right", "街上各铺都愿借出一盏灯。今夜不是哪一家照路，是整座流沙驿一起等人回来。"],
    ],
  };

  function narration(cue, text) {
    return { type: "narration", cue, text };
  }

  const narrationOpeners = {
    "after:tutorial_complete": narration("客座修好后", "第一张长凳刚擦干净，门外等候的人便依次坐下。冷了两年的前厅，第一次重新响起碗筷与谈笑声。"),
    "after:kitchen_repair": narration("灶火重新升起", "新泥封住裂缝，火焰沿锅底稳稳铺开。相同的一捆柴，这一次没有再冒出呛人的黑烟。"),
    "after:codex_first_phase": narration("食鉴摊开时", "旧食鉴不再锁在匣中。新写的一页压在桌角，来往客人停下来辨认熟悉的食材与名字。"),
    "after:lv2_front_feast": narration("入夜前", "新席面从门内一直排到窗边。乐声响起后，原本只想买一张饼的旅人也放下行囊，坐了下来。"),
    "after:lv2_west_market": narration("灯火初亮", "一盏、两盏，西市的灯沿着摊位依次亮起。货箱让出街心，第一批客人循着光走进来。"),
    "after:lv2_flower_rack": narration("雨声渐缓", "雨水顺着新篷布滑到檐外，花叶在灯下轻轻晃动。避雨的一家人终于把湿透的行囊放了下来。"),
    "after:lv2_north_shop": narration("夜深以后", "北铺的窗缝不再灌风，门后备好了干毡和小灯。迟到的旅人推门时，不必再惊动整座驿站。"),
    "after:lv2_south_shop": narration("南铺开门", "木架被垫高，鲜乳与香料分开放置。来自北道的气味第一次安稳留在流沙驿里。"),
    "after:lv2_well": narration("井绳落下", "六双手轮流拉起同一桶清水。井边新刻的取水次序还带着石粉，争吵声却已经停了。"),
    "after:lv3_upper_hall": narration("第一盏房灯", "楼上的窗纸透出暖光。受伤的伙计终于睡熟，守货的人也第一次把背靠在墙上。"),
    "after:lv3_north_court": narration("日光照进北院", "浸湿的经卷在窗边一页页摊开，衣物沿晒绳铺开。院里的人说话都不自觉放轻了声音。"),
    "after:lv3_west_gate": narration("门轴转动", "积沙被清出门槛，西门重新敞开。送信人的马蹄先于货车穿过门洞，直奔远处。"),
    "after:lv3_east_court": narration("等待有了座位", "热浆沿桌边传过去，攥紧行囊的手慢慢松开。有人闭目休息，也有人终于拆开久候的信。"),
    "after:lv3_garden": narration("花影落在纸上", "矮桌边留下了第一叠札记。有人写家书，有人只画下一峰骆驼，风经过时翻动纸角。"),
    "after:lv3_watchtower": narration("望楼点灯", "高处的风灯穿过夜色，在西边尘烟里映出一点回应。远路上的铜铃声正慢慢靠近。"),
    "after:lv4_south_shed": narration("尘墙抵达前", "最后一袋麦被抬进棚内，门帘随即落下。号牌、货单和车次全部对上，没有一件货被丢在风里。"),
    "after:lv4_central_market": narration("一碗热浆之后", "三家摊主围着同一张桌坐下。方才还隔着货箱争执的人，开始交换香料、果干和下一趟路的日期。"),
    "after:lv4_south_street": narration("三盏灯同时亮起", "不同样式的招牌各自展开，灯影却在檐下连成一线。客人沿着光走过，每一家铺面都被看见。"),
    "after:lv4_lanes": narration("新路接通", "取药的人沿着刚铺好的巷路返回，脚步没有再迟疑。孩子站在新灯下，安静等着母亲追上来。"),
    "after:lv4_east_shed": narration("货签重写完毕", "东路来的货物按商号与来路重新排好。伙计只用一刻便找齐整车，再没有人靠嗓门认领。"),
    "after:lv4_east_court": narration("旧座仍在", "窗边的座位换上新席，桌面留着一封尚未寄出的回信。归客还在路上，这里已经替他亮起灯。"),
    "after:lv4_lantern_city": narration("最后一段暗路亮起", "各铺借出的灯从东巷一路排到望楼。两峰迟归的骆驼循着灯号转向，整条街同时响起迎接的铃声。"),
  };

  Object.entries(narrationOpeners).forEach(([segmentId, opening]) => {
    if (segments[segmentId]?.steps.length) segments[segmentId].steps[0] = opening;
  });

  Object.entries(densityAdditions).forEach(([segmentId, extraSteps]) => {
    segments[segmentId]?.steps.push(...extraSteps);
  });

  // 第三、四卷恢复二十章母本中的风波线、验驿线与百味宴结局。
  // 这些段落按事件需要决定长度，不再为了统一页数补写说明性对白。
  const plotRewrites = {
    "after:lv2_well": [
      narration("井绳落下", "六双手轮流拉起同一桶清水。井边新刻的取水次序还带着石粉，争吵声却已经停了。"),
      narration("角落里的陌生老人", "一名总坐在角落、只点普通吃食的老胡商走到井边，俯身看了看井壁，又接过新打上来的水尝了一口。"),
      ["粟特胡商", "西市行商", portraits.merchant, "right", "他说上回来时，井底淤得厉害，打上来的水也是浑的。今日这一桶，总算能入口了。"],
      ["掌柜", "流沙驿新任掌柜", portraits.keeper, "left", "清井只能管一时。我把取水次序挂在井边，也备了公用水桶。大家照规矩用，这口井才能一直供得上。"],
    ],
    "chapter3-opening": [
      narration("一位不点菜的客人", "午后，一名河西驿管事走进流沙驿。他没有看食单，只看门、账册、货架，以及住客把行囊放在哪里。"),
      ["河西驿管事", "河西旧驿管事", portraits.official, "left", "原来这处旧驿真又开起来了。客多是好事，只是客多了，规矩也要跟得上。"],
      ["掌柜", "流沙驿掌柜", portraits.keeper, "right", "你看了半日，却一口水也没要。若流沙驿哪里做得不妥，不妨当面告诉我。"],
      ["河西驿管事", "河西旧驿管事", portraits.official, "left", "我只提醒一句：一两个人能歇脚，不等于整支商队能住下。等真出了差错，名声比屋梁塌得更快。"],
      ["康十一", "远路商队首领", portraits.caravan, "right", "他说得不中听，却不算错。我的人今夜就到，掌柜，你敢不敢让我把一队人的平安交给你？"],
      ["掌柜", "流沙驿掌柜", portraits.keeper, "left", "敢。但我不拿一句‘能住’哄你。先验楼梁、清出干屋，能接多少人，我便只接多少人。"],
    ],
    "before:lv3_upper_hall": [
      narration("商队抵达", "雨水打透了最外层毡布。一名脚夫发起高热，货袋却仍占着仅有的干地。"),
      ["康十一", "远路商队首领", portraits.caravan, "left", "货损了，我还能再做一趟买卖；人倒在路上，谁也赔不起。掌柜，你定先后。"],
      ["掌柜", "流沙驿掌柜", portraits.keeper, "right", "先把伤者移到檐下，货物加盖双层毡。今晚先修能住人的第一间房，不求好看，只求梁稳、窗严。"],
      ["河西驿管事", "河西旧驿管事", portraits.official, "left", "先顾人，出了货损可别后悔。"],
      ["掌柜", "流沙驿掌柜", portraits.keeper, "right", "账可以慢慢算。若连人都没接住，这间驿站往后也不值得谁再来。"],
    ],
    "after:lv3_upper_hall": [
      narration("第一盏房灯", "伤者终于睡熟。康十一把守货的人分成两班，院里第一次安静下来。"),
      ["康十一", "远路商队首领", portraits.caravan, "left", "阿芒醒来第一句还问货在不在。我告诉他，货有人守，他今晚只管活得像个住客。"],
      ["掌柜", "流沙驿掌柜", portraits.keeper, "right", "灯若只照着货，却照不到人，这楼馆修得再漂亮也没有意义。"],
      ["河西驿管事", "河西旧驿管事", portraits.official, "left", "一晚做得稳，不算本事。我会再来。"],
    ],
    "before:lv3_north_court": [
      narration("北道白灾", "巴图尔比约定晚了七日。他带来的鲜乳只有半囊，袍角还沾着未化的雪泥。"),
      ["巴图尔", "回鹘牧民", portraits.herder, "left", "雪压牧场，羊少了，奶也少。欠你的，我不躲。只是这个月，交不齐。"],
      ["掌柜", "流沙驿掌柜", portraits.keeper, "right", "我不免你的账，也不催你今天还清。分三个月还；羊群缓过来以后，流沙驿优先收你的鲜乳。"],
      ["巴图尔", "回鹘牧民", portraits.herder, "left", "你不怕我下一趟不来？"],
      ["掌柜", "流沙驿掌柜", portraits.keeper, "right", "怕。所以账写清楚，你签记，我也签。人情不是糊涂账，信任也不能只靠一句保证。"],
      ["孟氏", "敦煌女店客", portraits.woman, "left", "北院先腾出来吧。人能暖过来，账才有以后。"],
    ],
    "after:lv3_north_court": [
      narration("雪泥晒干", "北院架起晒绳，受潮的毡与奶囊分开放置。账册上第一次出现了分期偿还的三道短线。"),
      ["巴图尔", "回鹘牧民", portraits.herder, "left", "三道线，我记着。羊缓过来，我先还你。"],
      ["掌柜", "流沙驿掌柜", portraits.keeper, "right", "我等的不是这一囊奶，是你下一趟还愿意从这扇门进来。"],
      ["河西驿管事", "河西旧驿管事", portraits.official, "left", "敢赊账，也敢留凭据。至少不是只会做好人。"],
    ],
    "before:lv3_west_gate": [
      narration("盐袋下的字条", "清晨开门时，一张折得极小的纸压在盐袋下：‘明晨先验麦。别声张。’"),
      ["波斯艺人随从", "西来艺人队随从", portraits.persian, "left", "这话当面说，不合适。你先看新到的麦袋，最下面那一层。"],
      ["刘大", "城外粮户", portraits.farmer, "right", "粉色发灰，捻着硌手。掺了细砂和陈粉，不会害命，却能毁掉你整炉饼。"],
      ["掌柜", "流沙驿掌柜", portraits.keeper, "left", "先封住这批货，不端上桌，也不在街上喊。周甲守西门，我去找替代麦粉；货主回来，当面复验。"],
      ["刘大", "城外粮户", portraits.farmer, "right", "你若现在声张，人人都只记得流沙驿买过坏麦。先把今晚的炉火保住。"],
    ],
    "after:lv3_west_gate": [
      narration("新麦进门", "替代麦粉赶在开炉前送到。问题货袋被单独封存，货签上记下来源、时辰和验货人。"),
      ["波斯艺人随从", "西来艺人队随从", portraits.persian, "left", "那袋粉，你没下炉，好。下一次，我不用把话藏在盐袋下面。"],
      ["掌柜", "流沙驿掌柜", portraits.keeper, "right", "从今日起，新货不直接入缸。先看、再捻、后登记。谁送来的，谁验过，都留下名字。"],
      ["河西驿管事", "河西旧驿管事", portraits.official, "left", "一张字条就停一批货，你倒舍得。"],
      ["掌柜", "流沙驿掌柜", portraits.keeper, "right", "坏掉一批麦只是亏钱；让客人吃下去，亏的是这间驿站以后所有的路。"],
    ],
    "before:lv3_east_court": [
      narration("琵琶夜客", "宵禁前，一名与乐班走散的乐伎倒在门边。她没有求白食，只把琵琶紧紧护在怀里。"),
      ["胡姬乐伎", "西来乐班乐伎", portraits.musician, "left", "留我一夜，我以曲抵食。曲钱、食宿，都可以写进账里。"],
      ["孟氏", "敦煌女店客", portraits.woman, "right", "人可以留，规矩也得先说清。堂里有住客，不是谁想唱到几更便唱到几更。"],
      ["掌柜", "流沙驿掌柜", portraits.keeper, "left", "东院给你一席。每日只奏两场，明价、限时、不扰住客；曲钱你留七成，三成抵食宿。"],
      ["胡姬乐伎", "西来乐班乐伎", portraits.musician, "right", "说清楚便好。我靠手里的曲吃饭，不靠谁可怜。"],
    ],
    "after:lv3_east_court": [
      narration("第一支曲", "琵琶声停时，堂里没有喧闹。有人添了一壶茶，也有人把曲钱端端正正放在盘中。"),
      ["胡姬乐伎", "西来乐班乐伎", portraits.musician, "left", "曲声没扰灶火，客人也没误行程。明日若乐班寻来，我会把账结清再走。"],
      ["河西驿管事", "河西旧驿管事", portraits.official, "right", "街上已经有人说，你这里什么人都留。"],
      ["掌柜", "流沙驿掌柜", portraits.keeper, "left", "我留的是守规矩的旅人。她的名字、住处、曲钱都在账上；你若要看，我现在就翻给你。"],
    ],
    "before:lv3_garden": [
      narration("巡检入驿", "传言终于引来正式盘查。巡检要求查看住客记录、货主签记和近月供货账册。"),
      ["巡检", "沙州巡检", portraits.official, "left", "有人说这里私留胡商货物，也有人说住客来路不清。我不听传言，只看凭据。"],
      ["掌柜", "流沙驿掌柜", portraits.keeper, "right", "住客册、货签和食宿账都在。尚未归档的札记在庭园木匣，我现在取来。"],
      ["周氏", "佛寺女施主", portraits.donor, "left", "我可以为她保结。但保结不是替她遮掩；账若有错，也请照规矩指出。"],
    ],
    "after:lv3_garden": [
      narration("三册并案", "食宿、货物与住客记录第一次铺满同一张桌。每一个名字都能找到对应的时辰、签记和去处。"),
      ["巡检", "沙州巡检", portraits.official, "left", "账册记得清楚。还差最后一件：夜里若有商队错路，你如何证明这里能把人引回来？"],
      ["周甲", "沙州驿卒", portraits.guard, "right", "望楼若亮，我来替她守第一夜。风灯、换防、传号，都按驿路的规矩办。"],
    ],
    "before:lv3_watchtower": [
      ["掌柜", "流沙驿掌柜", portraits.keeper, "left", "账能证明昨天发生过什么，望楼要证明今晚谁都不会被丢在路上。先修梯板，再试灯号。"],
      ["康十一", "远路商队首领", portraits.caravan, "right", "我的货、我的人、我每次交的定钱，都有签记。我愿意作保：下趟整队仍停这里。"],
      ["巡检", "沙州巡检", portraits.official, "left", "那便点灯。我看它能不能真的照见远路。"],
    ],
    "after:lv3_watchtower": [
      narration("远处回灯", "望楼的第三次灯号发出后，西边尘烟里终于出现回应。驼铃声沿着正确的岔路靠近。"),
      ["巡检", "沙州巡检", portraits.official, "left", "往后商队过夜，照此登记。账照旧记，货照旧验，望楼照旧换防。"],
      ["河西驿管事", "河西旧驿管事", portraits.official, "right", "我看了这些日子，确实挑不出什么。流沙驿能不能长久，往后由你自己证明。"],
      ["掌柜", "流沙驿掌柜", portraits.keeper, "left", "阿爷写‘驿路不止，食火不灭’。如今我才懂，炉火要稳，规矩也要稳。"],
    ],
    "chapter4-opening": [
      narration("一纸租管约", "开春后，周氏带来一纸寺产租管约。不是赠地，也不是奖赏。"),
      ["周氏", "佛寺女施主", portraits.donor, "left", "南棚旁的闲地荒了多年。寺里可以交给流沙驿照管，租金不重，但有一个约定。"],
      ["掌柜", "流沙驿掌柜", portraits.keeper, "right", "请说。只要不是让我把账写成一笔糊涂人情。"],
      ["周氏", "佛寺女施主", portraits.donor, "left", "每年腊八，为城外贫苦人施粥三日。地给你经营，流沙驿也替这座城留三日热食。"],
      ["掌柜", "流沙驿掌柜", portraits.keeper, "right", "租金、期限、施粥所用粮数都写进约里。我答应，但要让这份善意也能长久。"],
      ["康十一", "远路商队首领", portraits.caravan, "left", "正好，我带来的第一车货已经到城外。先把南棚理出来，看这纸约定能不能接住真正的日子。"],
    ],
    "before:lv4_central_market": [
      narration("一个总点普通吃食的老人", "南棚启用后，那位在井边观察过众人的老胡商又来了。他不点稀奇菜，只要最普通的炉饼、乳糜与热浆。"),
      ["史三", "过路老胡商", portraits.mystery, "left", "今日不点贵的。平常吃食，经得住，才算可停。三家摊主也都坐下，我看看你怎么分这一席。"],
      ["粟特胡商", "西市行商", portraits.merchant, "right", "他半年里来过不止一次。每回都坐不同的位置，看不同的账。"],
      ["掌柜", "流沙驿掌柜", portraits.keeper, "left", "既然同来，便先同席。价钱稍后谈，先把各家的食物摆到一张桌上。"],
    ],
    "after:lv4_central_market": [
      narration("一席相识", "一碗热浆还未凉，原本争位的三家摊主已经互报姓名，开始交换下一趟路的日期。"),
      ["史三", "过路老胡商", portraits.mystery, "left", "你没有先问谁出的价高，只先让人坐稳。为什么？"],
      ["掌柜", "流沙驿掌柜", portraits.keeper, "right", "价高只能买一个位置。肯同席的人，才可能把下一趟生意也带回来。"],
      ["史三", "过路老胡商", portraits.mystery, "left", "我再看一程。"],
    ],
    "before:lv4_south_street": [
      ["史三", "过路老胡商", portraits.mystery, "left", "三铺都怕自己的灯最后才亮。若没有人肯让一步，这条街仍只是三间店。"],
      ["掌柜", "流沙驿掌柜", portraits.keeper, "right", "不让哪一家熄灯。共用风挡、统一点灯时辰，省下的灯油补到街尾。招牌各自保留，路却连成一条。"],
      ["粟特胡商", "西市行商", portraits.merchant, "left", "我去劝他们。若流沙驿真能让三家同时被看见，往后的商队也会愿意来。"],
    ],
    "after:lv4_south_street": [
      narration("三铺同亮", "三家招牌各有模样，灯影却沿檐线连成一条。客人顺着光走，每一家都被看见。"),
      ["史三", "丝路东段老把头", portraits.mystery, "left", "我来过六次。饼吃过，账看过，遇事也看过。商队在路上不怕店小，怕它一日好、一日坏。"],
      ["掌柜", "流沙驿掌柜", portraits.keeper, "right", "所以你一直不肯说姓名。"],
      ["史三", "丝路东段老把头", portraits.mystery, "left", "旁人叫我史三。我替几支熟识商队记可靠的食宿点。今日，我把这里写进册上：沙州城外，流沙驿，可停。"],
    ],
    "before:lv4_lanes": [
      narration("木牌之前", "史三的商路册带来了更多车马，巡检也再次来到流沙驿。这一次，他手里带着一块尚未落字的木牌。"),
      ["巡检", "沙州巡检", portraits.official, "left", "账册、签记、保结都清楚。但牌挂出去，夜归人便会认这里。最后问你一句：断巷和巡夜，谁负责？"],
      ["周甲", "沙州驿卒", portraits.guard, "right", "我带人接通药铺到住院这一段。今后每日换防前巡一遍，灯灭、石松，当日记下。"],
      ["掌柜", "流沙驿掌柜", portraits.keeper, "left", "牌不是赏，是承诺。先把人真正走的路接好，再挂。"],
    ],
    "after:lv4_east_shed": [
      narration("流沙木牌", "巷路接通，东西两棚也改用同一套货签。巡检逐页核过账册，终于在木牌上落字。"),
      ["巡检", "沙州巡检", portraits.official, "left", "账册清楚，商队签记也清楚。往后可挂‘流沙驿食点’木牌，照旧记账，照旧验货。"],
      ["史三", "丝路东段老把头", portraits.mystery, "right", "牌让初来的人放心，名声还得一趟一趟走出来。"],
      ["掌柜", "流沙驿掌柜", portraits.keeper, "left", "它挂在门外，规矩留在门内。两样都不能只做给人看。"],
    ],
    "before:lv4_east_court": [
      narration("远行前的枣苗", "求法僧人再度经过流沙驿。这一次，他没有求宿，只抱着一株一路带来的小枣苗。"),
      ["求法僧人", "西行求法僧", portraits.monk, "left", "贫僧要去的地方更远了。这株苗怕是带不到尽头，想把它留在这里。"],
      ["掌柜", "流沙驿掌柜", portraits.keeper, "right", "你第一次来时，只求檐下一夜。如今要把一株树留下，是打算回来吗？"],
      ["求法僧人", "西行求法僧", portraits.monk, "left", "树若活，便是此地与贫僧还有缘。若有归日，想再吃一碗乳糜，看它有没有结果。"],
      ["掌柜", "流沙驿掌柜", portraits.keeper, "right", "我把它种在东院窗边。你回来时，从门外就能看见。"],
    ],
    "after:lv4_east_court": [
      narration("一株树的位置", "枣苗栽在窗边，根旁压着僧人留下的小石。旧院第一次不是为了今日的客人，而是为了一个尚未确定的归期。"),
      ["孟氏", "敦煌女店客", portraits.woman, "left", "你刚回来时，什么都怕留不住。如今倒肯替一个不知何时回来的人养树了。"],
      ["掌柜", "流沙驿掌柜", portraits.keeper, "right", "驿站本来就是这样。有人今日离开，我们仍替他留一处能认出的地方。"],
    ],
    "before:lv4_lantern_city": [
      narration("除夕前最后一阵风", "百味宴的食材已经入棚，雪却压住东路。清点驼队时，康十一发现两峰骆驼和三名伙计仍未回来。"),
      ["康十一", "远路商队首领", portraits.caravan, "left", "他们带着宴席最后一车果干。若错过东边路口，便会迎着风越走越远。"],
      ["掌柜", "流沙驿掌柜", portraits.keeper, "right", "宴席可以少一道菜，人不能少一个。周甲沿东路找，望楼传灯号；各铺借灯，把最后一段暗路接起来。"],
      ["粟特胡商", "西市行商", portraits.merchant, "left", "果干丢了我再补。今晚不是哪一家照路，是整座流沙驿一起等人回来。"],
      ["周甲", "沙州驿卒", portraits.guard, "right", "灯号三短一长。看见回应，我就把他们带回来。炉火别灭。"],
    ],
    "after:lv4_lantern_city": [
      narration("灯号回应", "第三轮灯号发出后，风雪里终于响起驼铃。三名伙计牵着两峰骆驼，沿整条街借出的灯回到门前。"),
      ["康十一", "远路商队首领", portraits.caravan, "left", "人齐了。那车果干也一包不少。掌柜，今晚我们不是为赶路，是真来吃这一顿。"],
      narration("除夕百味宴", "炉饼、胡麻饼、乳糜、古楼子与热浆依次上桌。门外雪落，门内坐满了曾经从这里经过的人。"),
      ["周甲", "沙州驿卒", portraits.guard, "left", "第一枚炉饼我还记得。那时门口漏风，我把铜钱压在食单旁，还怕你第二日便走。"],
      ["孟氏", "敦煌女店客", portraits.woman, "right", "如今屋里人多了，倒比从前更像家。我带了腌菜，别嫌只是寻常东西。"],
      ["刘大", "城外粮户", portraits.farmer, "left", "灶好，柴也好。今晚这火，能烧到后半夜。"],
      ["巴图尔", "回鹘牧民", portraits.herder, "right", "欠账清了。今晚这囊奶酒，是另算的情。"],
      ["波斯艺人随从", "西来艺人队随从", portraits.persian, "left", "这回我不留字条。我当面谢你。"],
      ["胡姬乐伎", "西来乐班乐伎", portraits.musician, "right", "今夜这支曲不收钱，敬你这间驿。"],
      ["史三", "丝路东段老把头", portraits.mystery, "left", "名声不是喊出来的。你们这一桌人，便是流沙驿最清楚的商路册。"],
      ["周甲", "沙州驿卒", portraits.guard, "right", "敬流沙驿。"],
      narration("食单合卷", "众人举碗。掌柜翻开《丝路食鉴》，在祖父的旧字下面写下今日的日期与所有人的名字。"),
      ["掌柜", "流沙驿掌柜", portraits.keeper, "left", "阿爷，原来不是我一个人在守流沙驿。是他们一趟一趟，把这里走成了归处。驿路不止，食火不灭。"],
    ],
  };

  Object.entries(plotRewrites).forEach(([segmentId, steps]) => {
    if (segments[segmentId]) segments[segmentId].steps = steps;
  });
  if (segments["chapter3-opening"]) segments["chapter3-opening"].title = "河西驿的眼色";
  if (segments["chapter4-opening"]) segments["chapter4-opening"].title = "一纸租管约";

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
        summary: "掌柜重启旧灶，也重新翻开阿爷留下的《丝路食鉴》。",
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
        summary: "掌柜不再把食鉴藏进匣中，决定把一路相遇的味道继续写下去。",
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
        summary: "货棚、院落与长街连成灯海，阿爷留下的半页食鉴又把掌柜引向更远的路。",
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

  const storyChapters = [
    { number: 1, level: 1, volume: 1, title: "推门燃炉", summary: "掌柜回到废驿，用祖父留下的火石点起第一缕炉烟。", segmentIds: ["opening"] },
    { number: 2, level: 1, volume: 1, title: "第一枚炉饼", summary: "周甲成为第一位客人，祖父的旧驿与掌柜的新炉火重新接上。", segmentIds: ["before:tutorial_complete"] },
    { number: 3, level: 2, volume: 1, title: "门前有客", summary: "孟氏坐热第一张长凳，附近的人终于相信流沙驿真的重新开门。", segmentIds: ["after:tutorial_complete"] },
    { number: 4, level: 2, volume: 1, title: "菘菜与烟道", summary: "刘大从发闷的烟色里看出旧灶的问题，掌柜不能再靠将就经营。", segmentIds: ["before:kitchen_repair"] },
    { number: 5, level: 2, volume: 1, title: "炉灶重整", summary: "灶火稳住，食鉴也从祖传私物变成所有旅人都能续写的记录。", segmentIds: ["after:kitchen_repair", "before:codex_first_phase", "after:codex_first_phase"] },
    { number: 6, level: 3, volume: 2, title: "胡麻入饼", summary: "胡麻饼把流沙驿的名字带进西市，新客与新口味一同到来。", segmentIds: ["chapter2-opening", "before:lv2_front_feast", "after:lv2_front_feast", "before:lv2_west_market", "after:lv2_west_market"] },
    { number: 7, level: 3, volume: 2, title: "夜雨乳糜", summary: "急雨困住旅人，掌柜第一次要在生意之外接住陌生人的一夜。", segmentIds: ["before:lv2_flower_rack", "after:lv2_flower_rack"] },
    { number: 8, level: 4, volume: 2, title: "长安食抄", summary: "东来的食抄与西行的旅人相遇，流沙驿开始容纳不同方向的味道。", segmentIds: ["before:lv2_north_shop", "after:lv2_north_shop"] },
    { number: 9, level: 4, volume: 2, title: "食单续页", summary: "鲜乳、香料和旅人的名字被写入新页，食单真正成为公共记忆。", segmentIds: ["before:lv2_south_shop", "after:lv2_south_shop"] },
    { number: 10, level: 5, volume: 2, title: "驼铃入院", summary: "众人在井边立下共同的规矩，康十一决定让商队来此试停。", segmentIds: ["before:lv2_well", "after:lv2_well"] },
    { number: 11, level: 6, volume: 3, title: "河西驿的眼色", summary: "外部审视与商队托付同时到来，掌柜必须证明流沙驿不只是一间热闹小店。", segmentIds: ["chapter3-opening", "before:lv3_upper_hall", "after:lv3_upper_hall"] },
    { number: 12, level: 6, volume: 3, title: "白灾奶账", summary: "巴图尔遭遇白灾，掌柜用写清楚的人情账换取一段长期信用。", segmentIds: ["before:lv3_north_court", "after:lv3_north_court"] },
    { number: 13, level: 7, volume: 3, title: "盐袋下的字条", summary: "问题麦粉险些入炉，流沙驿第一次为守住口碑主动停货验货。", segmentIds: ["before:lv3_west_gate", "after:lv3_west_gate"] },
    { number: 14, level: 7, volume: 3, title: "琵琶夜客", summary: "失散乐伎以曲换宿，掌柜在善意与规矩之间立下清楚边界。", segmentIds: ["before:lv3_east_court", "after:lv3_east_court"] },
    { number: 15, level: 8, volume: 3, title: "行牒与保结", summary: "巡检盘查流沙驿，过去建立的账册、货签、住客记录和人情信用全部接受检验。", segmentIds: ["before:lv3_garden", "after:lv3_garden", "before:lv3_watchtower", "after:lv3_watchtower"] },
    { number: 16, level: 9, volume: 4, title: "南棚施粥约", summary: "周氏交出一纸租管约，掌柜以每年施粥换取长期经营南棚的责任。", segmentIds: ["chapter4-opening", "before:lv4_south_shed", "after:lv4_south_shed"] },
    { number: 17, level: 9, volume: 4, title: "史三验驿", summary: "老胡商半年六访，终于把经得住日常检验的流沙驿写进商路册。", segmentIds: ["before:lv4_central_market", "after:lv4_central_market", "before:lv4_south_street", "after:lv4_south_street"] },
    { number: 18, level: 10, volume: 4, title: "流沙木牌", summary: "巡检核过账册、签记和巷路，准许流沙驿挂起一块实用的食点木牌。", segmentIds: ["before:lv4_lanes", "after:lv4_lanes", "before:lv4_east_shed", "after:lv4_east_shed"] },
    { number: 19, level: 10, volume: 4, title: "枣树留院", summary: "求法僧人把带不到远方的枣苗留在东院，也留下一个尚未确定的归期。", segmentIds: ["before:lv4_east_court", "after:lv4_east_court"] },
    { number: 20, level: 10, volume: 4, title: "除夕百味宴", summary: "所有走过流沙驿的人重新坐到一桌，四卷旅程在人齐、灯明、炉火未灭中收束。", segmentIds: ["before:lv4_lantern_city", "after:lv4_lantern_city"] },
  ];

  const dialogueFootnotes = {
    "opening:2": {
      text: "唐代的“驿”首先是传递官文、接待官员与转运官物的官方交通设施，与面向普通旅人的客舍并不完全相同。本作将“流沙驿”设定为旧驿功能衰退后逐渐兼营民间食宿的地方。",
      source: "出处：《唐六典》卷五《尚书兵部》；《唐会要》卷六十一《馆驿》。",
    },
    "chapter2-opening:0": {
      text: "“胡麻”是芝麻的古称之一。至中古时期，胡麻已用于榨油和制作饼食；“胡麻饼”也体现了西来作物进入本地日常饮食的过程。",
      source: "出处：北魏·贾思勰《齐民要术》卷二《胡麻》；《本草纲目》卷二十二引中古本草旧说。",
    },
    "before:lv2_front_feast:0": {
      text: "粟特商人不仅贩运货物，也常凭借语言、信用与跨城关系充当翻译和交易中介。角色频繁为陌生人牵线，正取材于这种商贸网络。",
      source: "出处：荣新江《中古中国与粟特文明》；荣新江《中古中国与外来文明》。",
    },
    "before:lv2_south_shop:0": {
      text: "乳、酪、酥等乳制品是北方游牧与河西饮食交流的重要部分。",
      source: "出处：《旧唐书》卷一九五《回纥传》；北魏·贾思勰《齐民要术》卷六乳酪制作诸篇。",
    },
    "after:lv2_south_shop:1": {
      text: "酥是从牛、羊等动物乳中分离并煎炼得到的乳脂，接近今天的黄油或澄清黄油。北魏《齐民要术》已经记载“抨酥”、煎炼等制作方法，说明这项技术在唐代以前便已见于华北；唐代的丝路往来与佛教传播，又推动了酥在饮食、医药和宗教中的使用。",
      source: "出处：北魏·贾思勰《齐民要术》卷六；葛洪、陶弘景系统《肘后备急方》。",
    },
    "before:lv3_west_gate:1": {
      text: "唐代语境中的“波斯人”“胡人”有时是比较宽泛的称呼，人物也可能来自粟特、吐火罗等伊朗文化圈。",
      source: "出处：荣新江《中古中国与外来文明》；葛承雍《胡汉中国与外来文明》。",
    },
    "before:lv3_east_court:0": {
      text: "唐代城市夜间通行受城门、坊门和更鼓制度约束。错过闭门时辰，旅人可能无法继续进城或换坊，因此“宵禁前赶到门边”关系到当夜能否找到落脚处。",
      source: "出处：《唐律疏议》卷八《卫禁》；《唐会要》卷八十六《街巷》。",
    },
    "before:lv3_east_court:1": {
      text: "唐代所谓“胡乐”，泛指来自西域等地的音乐与舞蹈。龟兹、疏勒等地的乐舞既用于宫廷宴享，也随乐人往来进入城市生活；琵琶因此成为唐代广受欢迎的重要乐器。",
      source: "出处：《旧唐书》卷二十九《音乐志二》；《新唐书》卷二十二《礼乐志十二》。",
    },
    "before:lv3_garden:3": {
      text: "唐代远行与过关受到文书制度管理，过所等通行凭证会记录持有人及行程；保结则由他人为身份或行为作保，并非一句口头保证。",
      source: "出处：《唐律疏议》卷八《卫禁》；敦煌、吐鲁番出土唐代过所文书。",
    },
    "chapter4-opening:3": {
      text: "十二月初八与佛成道纪念的联系在中古佛教中已经存在；但寺院熬制“腊八粥”并广泛施粥成为成熟习俗，更多见于宋代以后。本剧情将它处理为个别寺院与流沙驿订立的地方约定，并非唐代普遍定制。",
      source: "出处：梁·宗懔《荆楚岁时记》十二月八日条；宋·孟元老《东京梦华录》卷十。",
    },
    "after:lv4_south_shed:1": {
      text: "丝路货物通常由不同商队在城市与绿洲之间接力转运，很少由同一批人从起点一直送到终点。分车、交接与重新编组，是长距离贸易能够持续的重要环节。",
      source: "出处：荣新江《丝绸之路与东西文化交流》；敦煌、吐鲁番出土商旅契约与往来文书。",
    },
    "before:lv4_east_shed:1": {
      text: "古代货物会借助封检、题记、印记和契约标明来源与归属。“统一货签”是本作对多种历史货物标识方式的游戏化简化，并非照搬某一种唐代固定格式。",
      source: "出处：《吐鲁番出土文书》所收唐代契约、标签与封检题记；《唐律疏议》卷十五《厩库》。",
    },
    "before:lv4_east_court:3": {
      text: "唐代佛教语境中，乳、酪、酥等乳制品并非肉食禁忌；佛教律典也明确记载乳粥、酥粥等食物。唐代佛教文献甚至有“乳糜为上”的说法。",
      source: "出处：《十诵律》卷六十一；唐·善无畏述、一行记《大毘卢遮那成佛经疏》卷七。",
    },
  };

  const segmentStoryChapter = new Map(
    storyChapters.flatMap((chapter) => chapter.segmentIds.map((segmentId) => [segmentId, chapter])),
  );
  const storyArchiveMoments = storyChapters.reduce((result, chapter) => {
    (result[chapter.volume] ??= []).push({
      id: `story-chapter-${String(chapter.number).padStart(2, "0")}`,
      title: `第${chapter.number}章 · ${chapter.title}`,
      summary: chapter.summary,
      segmentIds: chapter.segmentIds,
    });
    return result;
  }, { 1: [], 2: [], 3: [], 4: [] });

  let active;
  let activeId;
  let index = 0;
  let done;
  let progress;
  let qaState;
  let reviewMode = false;
  let ui;

  function syncStoryViewport() {
    const viewport = window.visualViewport;
    if (!viewport || !ui) return;
    ui.modal.style.setProperty("--chapter-story-viewport-height", `${Math.round(viewport.height)}px`);
    ui.modal.style.setProperty("--chapter-story-viewport-top", `${Math.round(viewport.offsetTop)}px`);
  }

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
      qaResume: document.querySelector("#chapterStoryQaResume"),
      portraitFrame: document.querySelector("#chapterStoryPortraitFrame"),
      portrait: document.querySelector("#chapterStoryPortrait"),
      panel: document.querySelector("#chapterStoryModal .chapter-story-panel"),
      speaker: document.querySelector("#chapterStorySpeaker"),
      role: document.querySelector("#chapterStoryRole"),
      text: document.querySelector("#chapterStoryText"),
      footnote: document.querySelector("#chapterStoryFootnote"),
      footnoteText: document.querySelector("#chapterStoryFootnoteText"),
      footnoteSource: document.querySelector("#chapterStoryFootnoteSource"),
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
    ui.qaResume.addEventListener("click", resumeQaFromLocation);
    ui.modal.addEventListener("cancel", (event) => {
      event.preventDefault();
      finish({ completed: !reviewMode });
    });
    window.visualViewport?.addEventListener("resize", syncStoryViewport);
    window.visualViewport?.addEventListener("scroll", syncStoryViewport);
    window.addEventListener("resize", syncStoryViewport);
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
    view.qaIndex.textContent = `第${qaState.chapter}卷 · ${qaState.index + 1}/${ids.length}`;
    view.qaPrev.disabled = qaState.chapter === 1 && qaState.index === 0;
    view.qaNext.disabled = qaState.chapter === 4 && qaState.index === ids.length - 1;
  }

  function navigateQa(offset) {
    if (!qaState) return;
    const currentIds = chapterSegments[qaState.chapter];
    let nextChapter = qaState.chapter;
    let nextIndex = qaState.index + offset;
    if (nextIndex >= currentIds.length && nextChapter < 4) {
      nextChapter += 1;
      nextIndex = 0;
    } else if (nextIndex < 0 && nextChapter > 1) {
      nextChapter -= 1;
      nextIndex = chapterSegments[nextChapter].length - 1;
    }
    const nextIds = chapterSegments[nextChapter];
    nextIndex = Math.max(0, Math.min(nextIds.length - 1, nextIndex));
    if (nextChapter === qaState.chapter && nextIndex === qaState.index) return;
    const params = new URLSearchParams(location.search);
    params.set("qa", "chapter-story-v1");
    params.set("chapter", String(nextChapter));
    params.set("scene", String(nextIndex));
    params.delete("story");
    history.replaceState(null, "", `${location.pathname}?${params.toString()}${location.hash}`);
    play(nextIds[nextIndex], { qa: { chapter: nextChapter, index: nextIndex } });
  }

  function advanceQaSegment() {
    if (!qaState) return false;
    const ids = chapterSegments[qaState.chapter];
    if (qaState.chapter === 4 && qaState.index >= ids.length - 1) return false;
    navigateQa(1);
    return true;
  }

  function skipSegment() {
    if (qaState) {
      finish({ completed: false, qaPaused: true });
      return;
    }
    if (reviewMode) {
      finish({ completed: false });
      return;
    }
    if (!advanceQaSegment()) finish({ completed: true });
  }

  function resumeQaFromLocation() {
    const params = new URLSearchParams(location.search);
    playChapterQa(Number(params.get("chapter")) || 1, Number(params.get("scene")) || 0);
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
    const isNarration = step?.type === "narration";
    const footnote = dialogueFootnotes[`${activeId}:${index}`];
    view.reward.hidden = true;
    view.panel.hidden = false;
    view.stage.classList.remove("reward-visible");
    view.panel.classList.toggle("narration", isNarration);
    view.portraitFrame.hidden = isNarration;
    if (isNarration) {
      view.speaker.textContent = step.cue || "";
      view.role.textContent = "";
      view.text.textContent = step.text;
    } else {
      view.portraitFrame.classList.toggle("right", step[3] === "right");
      view.portraitFrame.classList.toggle("standee", step[2].includes("/npc_standee/"));
      view.portraitFrame.classList.toggle("mystery-merchant", step[2].includes("npc_mystery_merchant"));
      view.portraitFrame.classList.toggle("persian-attendant", step[2].includes("npc_persian_attendant"));
      view.portrait.src = step[2];
      view.portrait.alt = step[0];
      view.speaker.textContent = step[0];
      view.role.textContent = step[1];
      view.text.textContent = step[4];
    }
    view.footnote.hidden = !footnote;
    if (footnote) {
      view.footnoteText.textContent = footnote.text;
      view.footnoteSource.textContent = footnote.source;
    }
    view.dots.hidden = active.steps.length <= 1;
    view.dots.innerHTML = active.steps
      .map((_, stepIndex) => `<button type="button" class="${stepIndex === index ? "active" : ""}" data-step-index="${stepIndex}" aria-label="查看第 ${stepIndex + 1} 段对白"${stepIndex === index ? ' aria-current="step"' : ""}></button>`)
      .join("");
    const atLastStep = index === active.steps.length - 1;
    const hasNextQaSegment = Boolean(qaState && (
      qaState.chapter < 4 || qaState.index < chapterSegments[qaState.chapter].length - 1
    ));
    const entersNextVolume = Boolean(qaState
      && qaState.index === chapterSegments[qaState.chapter].length - 1
      && qaState.chapter < 4);
    const nextActionLabel = atLastStep && reviewMode
      ? "结束回顾"
      : atLastStep && active.reward
      ? "查看奖励"
      : atLastStep && hasNextQaSegment
        ? entersNextVolume ? `进入第${qaState.chapter + 1}卷` : "下一段"
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
    view.rewardItems.dataset.visibleCount = String(reward.items.length);
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
    const pausedQa = Boolean(qaState && result.qaPaused);
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
    view.qaResume.hidden = !pausedQa;
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
    syncStoryViewport();
    active = segment;
    activeId = id;
    index = Math.max(0, Math.min(segment.steps.length - 1, Number(options.startIndex) || 0));
    done = options.onComplete ?? null;
    progress = options.onProgress ?? null;
    qaState = options.qa ?? null;
    reviewMode = Boolean(options.review);
    const storyChapter = segmentStoryChapter.get(id);
    view.eyebrow.textContent = storyChapter ? `第${storyChapter.number}章 · ${storyChapter.title}` : segment.eyebrow;
    view.title.textContent = segment.title;
    view.modal.setAttribute("aria-label", `${reviewMode ? "剧情回顾 " : ""}${view.eyebrow.textContent} ${segment.title}`);
    view.scene.className = `chapter-story-scene ${segment.scene || ""}`;
    view.stage.classList.remove("reward-visible", "review-mode");
    view.stage.classList.toggle("review-mode", reviewMode);
    view.qaResume.hidden = true;
    const skipLabel = qaState ? "去互动" : reviewMode ? "退出" : "跳过";
    view.skip.textContent = skipLabel;
    view.skip.setAttribute("aria-label", qaState ? "暂离剧情，体验棋盘交互" : reviewMode ? "退出剧情回顾" : "跳过剧情");
    view.skip.title = view.skip.getAttribute("aria-label");
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

  global.SilkRoadChapterStory = { play, playChapterQa, segments, chapterSegments, archiveMoments: storyArchiveMoments, storyChapters };
})(window);
