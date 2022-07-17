const { Loader } = require('../structures')

module.exports = class ListenerLoader extends Loader {
  constructor (client) {
    super(client)
  }

  load () {
    return this.loadFiles('src/listeners')
  }

  loadFile (Listener, event) {
    const listener = new Listener(this.client)
    const capitalize = (value) => value.charAt(0).toUpperCase() + value.slice(1)
    const prepareEvent = (event) =>
      this.client.on(event, (...v) => listener['on' + capitalize(event)](...v))

    if (listener.unifiedEvents) {
      listener.events.forEach(prepareEvent)
    } else {
      prepareEvent(event)
    }
  }
}
