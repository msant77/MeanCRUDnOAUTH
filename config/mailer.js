var nodemailer = require('nodemailer');
var smtpTransport = require('nodemailer-smtp-transport');

exports.sendConfirmationEmail = function(email, password, user, callback) {

    var transporter = nodemailer.createTransport(smtpTransport({
        host: 'mail.acnmoda.com.br',
        port: 587,
        auth: {
            user: 'atendimento@acnmoda.com.br',
            pass: 'acn1235'
        },
        tls: {
            rejectUnauthorized:false
        }
    }));

    // NB! No need to recreate the transporter object. You can use
    // the same transporter object for all e-mails

    // setup e-mail data with unicode symbols
    var mailOptions = {
        from: 'Atendimento ACNModa ✔ <atendimento@acnmoda.com.br>', // sender address
        to: email, // list of receivers
        subject: 'Seu cadastro ACNModa foi realizado com sucesso ✔', // Subject line
        text: 'Você acaba de se cadastrar no Sistema para Cadastro de Clientes dos consultores da ACNModa. Estes são seus dadas: ' + email + ' senha: ' + password + '. É importante guardar esse email!', // plaintext body
        html:  getHTMLBody(email, password, user)
    };

    // send mail with defined transport object
    transporter.sendMail(mailOptions, function(error, info){

        if(error){
            console.log(error);
        }else{
            console.log('Message sent: ' + info.response);
        }
        if (callback) callback (error, info); 
    });
}

function getHTMLBody (email, password, user) {

    var html = ''; 

    html += '<p><h1>Parabéns, você acabou de realizar com sucesso o seu registro no cadastro de clientes dos consultores da ACNModa</h1></p>'; 
    html += '<br>'; 
    html += '<h2><p>É importante que este email seja guardado, pois nele há o lembrete da sua senha. </p></h2>'; 
    html += '<br>'; 
    html += '<h4><p>Confira seus dados abaixo</h4></p>'; 

    html += '<table>';

    html += '<tr>';
    html += '<td>';
    html += '<b>Nome</b>';
    html += '</td>';
    html += '<td>';
    html += user.name;
    html += '</td>';
    html += '</tr>';

    html += '<tr>';
    html += '<td>';
    html += '<b>CPF</b>';
    html += '</td>';
    html += '<td>';
    html += user.cpf;
    html += '</td>';
    html += '</tr>';


    html += '<tr>';
    html += '<td>';
    html += '<b>E-mail</b>';
    html += '</td>';
    html += '<td>';
    html += email;
    html += '</td>';
    html += '</tr>';

    html += '<tr>';
    html += '<td>';
    html += '<b>Senha</b>';
    html += '</td>';
    html += '<td>';
    html += password;
    html += '</td>';
    html += '</tr>';

    html += '</table>';
    
    html += '<br>'; 
    html += '<br>'; 

    html += '<p><h5>Para acessar e cadastrar seus clientes basta entrar no seguinte endereço <a href="http://cadastro.acnmoda.com.br">http://cadastro.acnmoda.com.br</a> de qualquer smartphone, tablet ou PC.</p></h5>'; 

    return html; 
}

