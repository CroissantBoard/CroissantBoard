const regEmail = require('../emails/auth')


module.exports.testEmail = async (req, res) => {
    try{
        await transporter.sendMail(regEmail(to))
    } catch(e) {
        console.log(e)
    }
    
}