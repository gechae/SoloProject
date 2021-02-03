/*
    참조 : https://www.youtube.com/watch?v=toLDNN4FQv0
    Web 서버 구성
    express 사이트 참조
*/

const express = require('express');
const app = express();

// Success : Cannot Get /  : 포트 재대로 구동
const server = app.listen(3000, () => {
    console.log('Start Server : localhost:3000');
});

/* 라우팅: 서버와 어떤기능을 매핑 할지를 정하는 것 
    라우터 기능개발 : 어떻걸 처리할지 정하는 것
*/
app.set('views', __dirname + '/views');

/* 
    엔진 settting , embedded java scripts 
        -> java script 에서 html 을 사용할 수있게 하는 템플릿
*/
app.set('view enging', 'ejs');
app.engine('html', require('ejs').renderFile);

app.get('/', function(req, res) {
    res.render('index.html') // render 에서 html 을 불러올 때 사전 setting 필요 :: app.set()
})

app.get('/about', function(req, res) {
    //res.send('about page')
    res.render('about.html')
})

//DB 정보 입력
var mysql      = require('mysql');
// DB Pool 가져오기
var pool  = mysql.createPool({
    connectionLimit : 10,
    host            : 'localhost',
    user            : 'root',
    password        : '1111',
    database        : 'test'
  });
app.get('/db', function(req, res) {
    pool.getConnection(function(err, connection) {
        if (err) throw err; // not connected!
       
        // Use the connection
        connection.query('SELECT * from Test', function (error, results, fields) {
            res.send(JSON.stringify(results));
            console.log('results',results);
          // When done with the connection, release it.
          connection.release();
       
          // Handle error after the release.
          if (error) throw error;
       
          // Don't use the connection here, it has been returned to the pool.
        });
      });
})