const fs = require('fs')
const path = require('path')
const packageConfig = require('../package.json')
const rm = require('rimraf')
const archiver = require('archiver')
const ora = require('ora')
const chalk = require('chalk')

const excludes = [
  '.git',
  '.idea',
  'node_modules',
  '.DS_Store',
  `${packageConfig.name}.zip`
]

function resolve(dir) {
  return path.join(__dirname, '..', dir)
}

rm(resolve(`${packageConfig.name}.zip`), err => {
  if (err) throw err

  const spinner = ora('compressing ...')
  spinner.start()

  const output = fs.createWriteStream(resolve(`${packageConfig.name}.zip`))
  const archive = archiver('zip')

  output.on('close', () => {
    spinner.stop()
    console.log('Package name: ' + chalk.bold(packageConfig.name))
    console.log('Package version: ' + chalk.bold(packageConfig.version) + '\n')

    console.log(chalk.cyan(`  Compress ${packageConfig.name}.zip complete.\n`))
  })

  archive.on('error', () => {
    throw err
  })

  archive.pipe(output)

  const files = fs.readdirSync(resolve(''))
  for (let filename of files) {
    if (excludes.includes(filename)) continue

    const fullname = path.join(resolve(''), filename)
    const stats = fs.statSync(fullname)
    if (stats.isDirectory()) {
      archive.directory(resolve(filename), `${packageConfig.name}/${filename}`)
    } else {
      archive.file(filename, {
        name: `${packageConfig.name}/${filename}`
      })
    }
  }

  archive.finalize()
})
