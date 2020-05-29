const keys = require('../keys/index')

module.exports = function() {
    return {
        from: keys.EMAIL_FROM,
        to: "roma_tsakhlo@ukr.net",
        subject: "CroissantBoard registration",
        text: "CroissantBoard",
        html: `
          <h1>Welcome to CroissantBoard !</h1>
          <p>You succsessfully created account</p>
          <p>Please, add our telegram bot @Croissant_board_bot</p>
          `
    }
}