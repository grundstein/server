#!/usr/bin/env node

import cli from '@magic/cli'

import run from './index.mjs'

const args = {
  options: [
    ['--help', '-help', 'help', '--h', '-h'],
    // ['--watch', '-w'],
    ['--dir', '--public', '--public-dir', '-p'],
  ],
  default: {
    '--dir': 'api',
  },
  single: ['--dir', '--host', '--port'],
  help: {
    name: 'magic api server',
    header: 'serves magic apis',
    options: {
      '--dir': 'api root directory',
    },
    example: `
# serve files in ./api:
gas

# serve files using an absolute path.
gas --dir /api
`,
  },
}

const res = cli(args)

run(res)
