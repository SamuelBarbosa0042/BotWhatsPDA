const nodemailer = require('nodemailer');

class enviaEmail{
    
    
    constructor(){
        this.mailer = nodemailer.createTransport({
            host: 'smtp.office365.com',
            port: 587,
            secure: false, // true for 465, false for other ports
            auth: {
              user: 'sbarbosa@pdasolucoes.com.br', // generated ethereal user
              pass: 'PDA@2020', // generated ethereal password
            },           
          })
        };

    async enviaIsso(remetente,destinatario,assunto,filename){
        
        const mailOptions = {
            from: remetente,
            to: [destinatario],
            subject: assunto,
            text: "Plaintext version of the message",
            html:'<p>aaaaaaaaaaaaaaaaaaaaaaaaaaaaaA</p>',
            attachments: [
                {
                    filename : filename.name,
                    path : filename.path,
                    contentType: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
                },
            ],
        };
          this.mailer.sendMail(mailOptions, function(error, info){
            if (error) {
              console.log(error);
            } else {
              console.log('Email enviado: ' + info.response);
            }
          });
    }

          
}  
module.exports = { enviaEmail }

