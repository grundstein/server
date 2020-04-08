#!/usr/bin/env node

import cli from '@magic/cli'

import run from './index.mjs'

const args = {
  options: [
    ['--help', '-help', 'help', '--h', '-h'],
    // ['--watch', '-w'],
    ['--dir', '--public', '--public-dir', '-p'],
    ['--host', '-h'],
    ['--port', '-p'],
  ],
  default: {
    '--dir': 'public',
    '--host': '127.0.0.1',
    '--port': 8080,
  },
  single: ['--dir', '--host', '--port'],
  help: {
    name: 'magic static server',
    header: 'serves static pages',
    commands: {
      start: 'starts server.',
    },
    options: {
      '--dir': 'root for both api and static directories',
      '--host': 'internal hostname to listen to, default grundstein',
      '--port': 'port, default 8080',
    },
    example: `
# serve files in ./public:
gs-server

# serve files using an absolute path:
gs-server serve --dir /public

# serve files and api
gs-server serve --dir /dir/to/public/ --host host.name --port 80
`,
  },
}

const res = cli(args)

run(res)
