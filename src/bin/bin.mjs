#!/usr/bin/env node

import cli from '@magic/cli'

import { runCluster } from '../run/index.mjs'

const args = {
  options: [
    ['--help', '-help', 'help', '--h', '-h'],
    // ['--watch', '-w'],
    ['--dir', '-d'],
    ['--port', '-p'],
    ['--cpus', '-c'],
  ],
  default: {
    '--port': 8080,
    '--dir': ['public'],
    '--cpus': 1,
  },
  single: ['--port', '--cpus'],
  help: {
    name: 'magic static server',
    header: 'serves static pages',
    commands: {
      start: 'starts server.',
    },
    options: {
      '--dir': 'directories to serve from',
      '--port': 'port, default 8080',
      '--cpus': 'number of processes to start',
      // '--watch': 'watch for changes',
    },
    example: `
serve files in current dir:
magic-server serve

serve files relative to process.cwd():
magic-server serve --dir dir_to_serve dir2_to_serve

serve files using an absolute path:
magic-server serve --dir /dir/to/serve
`,
  },
}

const res = cli(args)

runCluster(res)
