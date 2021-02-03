// mailtrap으로 테스트
const nodemailer = require("nodemailer"); // 설치된 모듈 불러오기
const email = {
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "03bd3bb993eab3",
      pass: "7604814d3d9329"
   }
};

// option : email 제목 이름 
// => collbach 함수
const send = async(option) => { 
    let transporter = nodemailer.createTransport(email).sendMail(option, (error,info) => {
        if(error) {
            console.log(error);
        }else {
            console.log(info);
            return info.response;
        }
    });
};

let emailData = {
    from: "secondchae91@gmail.com",
    to: "secondchae91@gmail.com",
    subject: "테스트 메일 입니다",
    text: "nodejs 한시간 만에 끝내보자."
}

send(emailData)