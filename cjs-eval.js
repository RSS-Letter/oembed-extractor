// cjs-eval.js
// to quickly test with a single url or file

const { extract } = require('./dist/cjs/oembed-parser')

const run = async (url) => {
  try {
    const art = await extract(url)
    console.log(art)
  } catch (err) {
    console.trace(err)
  }
}

const init = (argv) => {
  if (argv.length === 3) {
    const url = argv[2]
    return run(url)
  }
  return 'Nothing to do!'
}

init(process.argv)
