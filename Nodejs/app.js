// 2강 API server 구축
// 우리 시스템에서 특정 데이터 혹은 특정 기능을 사용하고 싶은
// 다른 시스템에게 코드와 데이터베이스 를 직접 연결할 수 없이 데이터를 제공할 때
// API server 제공

const express = require('express');
const app = express();


const server = app.listen(3001, () => {
    console.log("Start Server : localhost:3001");

});
// postman : localhost:3001/api/users/1
// :[Name] => 콜론이 있는 패스에는 어떤 값이든 들어올 수 있다.
app.get("/api/users/:type", async (req, res) => {
    // type 이름으로 파라미터를 받을수 있다.
    let {
        type
    } = req.params;

    console.log(type);
    if(type == 'seoul') {
        let data = [
            {name:"홍길동", city:"seoul"},
            {name:"김철수", city:"seoul"},
        ];
        res.send(data);
    }else if(type == 'jeju') {
        let data = [
            {name:"박지성", city:"jeju"},
            {name:"손흥민", city:"jeju"},
        ];
        res.send(data);
    }else {
        res.send('Type is not correct.');
    }
    // 중복처리 에러 발생 : Cannot set headers after they are sent to the client
    //res.send('ok');
});
app.get("/api/sales/:year", async (req, res) => {
    // type 이름으로 파라미터를 받을수 있다.
    let {
        year
    } = req.params;

    console.log(year);
    if(year == '2019') {
        let data = [
            {product:"반도체", amount:100001},
            {product:"냉장고", amount:100001},
        ];
        res.send(data);
    }else if(year == '2020') {
        let data = [
            {product:"반도체", amount:90001},
            {product:"냉장고", amount:90002},
        ];
        res.send(data);
    }else {
        res.send('Type is not correct.');
    }
    // 중복처리 에러 발생 : Cannot set headers after they are sent to the client
    //res.send('ok');
});

// 키 인증수 API 접근 방법
// uuid-apikey : API 키를 생성해주는 모듈 
const uuidAPIKey = require('uuid-apikey');

// console.log(uuidAPIKey.create());
const key = {
        apiKey: 'JSYGTB3-1VQ4D6K-JWR923H-5K7MZJN',
        uuid: '967d0d2c-0eee-469a-9730-910e2ccf4fca'
}
app.get("/api/menu/:apikey/:year", async (req, res) => {
    // type 이름으로 파라미터를 받을수 있다.
    let {
        apikey,
        year
    } = req.params;

    // uuid check
    if ( !uuidAPIKey.isAPIKey(apikey) ) {
        res.send('api is not Context.');
    } else if ( !uuidAPIKey.check(apikey,key.uuid) ){
        res.send('api is not Valid.');
    } else {
        console.log(year);
        if(year == '2019') {
            let data = [
                {product:"반도체", amount:100001},
                {product:"냉장고", amount:100001},
            ];
            res.send(data);
        }else if(year == '2020') {
            let data = [
                {product:"반도체", amount:90001},
                {product:"냉장고", amount:90002},
            ];
            res.send(data);
        }else {
            res.send('Type is not correct.');
        }
    }
    
    // 중복처리 에러 발생 : Cannot set headers after they are sent to the client
    //res.send('ok');
});