const sgMail = require('@sendgrid/mail');

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const sendEmail = async (req, res) => {
    try{
        const {email, subject, text,} = req.body;

        const msg = {  
            to: email,  
            from: "malcolm_payao@dlsu.edu.ph",
            subject: subject,
            text: text,
        }
        const sent = await sgMail.send(msg);
        res.status(200).json(sent);
    }   
    catch(err){
        res.status(400).json({error:err.message});
    }
}

module.exports = {
    sendEmail
};
