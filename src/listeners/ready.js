const { Listener } = require('../structures')

module.exports = class Ready extends Listener {
  constructor (client) {
    super(client)
  }

  onReady () {
    console.log(this.client.user)
  }
}
