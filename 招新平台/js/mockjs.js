$.mockjax({
    url: '/gly/quelist',
    status: 200,
    responseTime: 1000,
    responseText: {
        "code": 0,
        "msg": "成功",
        "data":
            [
                {
                    "qid": 16,
                    "qname": "XX",
                    "description": "xxx(((9",
                    "maxscore": "200",
                    "qgroup": "front",
                    "level": "hard"
                },
                {
                    "qid": 15,
                    "qname": "XdsdsdX",
                    "description": "XXXXsdsdsdsdsdXXX",
                    "maxscore": "200",
                    "qgroup": "front",
                    "level": "hard"
                },
                {
                    "qid": 16,
                    "qname": "小可爱",
                    "description": "还4可还4开荒3卡好4开黑3XXXXX",
                    "maxscore": "200",
                    "qgroup": "background",
                    "level": "hard"
                },
                {
                    "qid": 16,
                    "qname": "撒之",
                    "description": "我的小纱质X",
                    "maxscore": "200",
                    "qgroup": "ios",
                    "level": "hard"
                },
                {
                    "qid": 16,
                    "qname": "离",
                    "description": "的卡卡卡卡",
                    "maxscore": "200",
                    "qgroup": "ios",
                    "level": "hard"
                },
                {
                    "qid": 16,
                    "qname": "之",
                    "description": "还得瑟得瑟X",
                    "maxscore": "200",
                    "qgroup": "ios",
                    "level": "hard"
                }
            ]
    }

});//题目
$.mockjax({
    url: '/gly/getperm',
    status: 200,
    responseTime: 1000,
    responseText: {
        "code": 0,
        "msg": "成功",
        "data":
            [
                {
                    "uid": "51",
                    "name": "王XX",
                    "username": "cor1",
                    "roles":
                        [
                            "background",
                            "android"
                        ]
                },
                {
                    "uid": "13",
                    "name": "王XX",
                    "username": "cor2",
                    "roles":
                        [
                            "operation"
                        ]
                }
            ]
    }
});//批改人
$.mockjax({
    url: '/gly/list',
    status: 200,
    responseTime: 1000,
    responseText: {
        "code": 0,
        "msg": "成功",
        "data": [
            {
                "uid": 60,
                "name": "王XX",
                "usernmae": "958124587@qq.com",
                "studentid": "2018050402229",
                "phone": "13253364920",
                "detail": [
                    {
                        "id": "11", //批改号
                        "level": "easy",
                        "updatetime": "1570236548", //timestamp类型的时间返回
                        "times": "5",//提交了5次
                        "score": "97",//得分
                        "comment": "不错",//批改人评价
                        "qgroup": "background",
                        "status": 0,
                        "url": "close.ini",
                        "qid": 4
                    },
                    {
                        "id": "11",//批改号
                        "level": "common",
                        "updatetime": "1690236548",//timestamp类型的时间返回
                        "times": "7",//提交了5次
                        "score": "294",//得分
                        "comment": "还行",//批改人评价
                        "qgroup": "front",
                        "status": 1,
                        "url": "close.ini",
                        "qid": 4
                    }
                ]
            }
        ]
    }
});//新人