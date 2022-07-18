module.exports = class Command {
  constructor (options, client) {
    this.client = client

    this.name = options.name
  }

  async executeCommand (context) {
    try {
      await this.execute(context)
    } catch (error) {
      console.error(error)
    }
  }
}
