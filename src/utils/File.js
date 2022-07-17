const {
  promises: { readdir, stat }
} = require('fs')
const { resolve } = require('path')

module.exports = class File {
  static async requireDirectory (
    directory,
    success,
    error,
    { extensions = ['js'], recursive = true } = {}
  ) {
    const files = await readdir(directory)
    const filesObject = {}

    return Promise.all(
      files.map(async (file) => {
        const path = resolve(directory, file)
        extensions =
          Array.isArray(extensions) && extensions.length
            ? extensions.join('|')
            : extensions

        if (file.match(new RegExp(`\\.(${extensions})$`))) {
          try {
            const required = require(path)
            const filename = file.match(/^\w+/)[0]

            if (success) {
              await success(required, filename)
            }

            filesObject[filename] = {
              required,
              filename
            }

            return required
          } catch (_error) {
            error(_error)
          }
        } else if (recursive) {
          const isDirectory = await stat(path).then((file) =>
            file.isDirectory()
          )

          if (isDirectory) {
            return File.requireDirectory(path, success, error)
          }
        }
      })
    ).then(() => filesObject)
  }
}
