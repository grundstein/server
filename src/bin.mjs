#!/usr/bin/env node

import cli from '@magic/cli'

import { runCluster } from './index.mjs'

const args = {
  options: [
    ['--help', '-help', 'help', '--h', '-h'],
    // ['--watch', '-w'],
    ['--static-dir', '--static', '-s'],
    ['--api-dir', '--api', '-a'],
    ['--port', '-p'],
    ['--cpus', '-c'],
  ],
  default: {
    '--port': 8080,
    '--static-dir': 'public',
    '--cpus': 1,
  },
  single: ['--port', '--cpus', '--static-dir', '--api-dir'],
  help: {
    name: 'magic static server',
    header: 'serves static pages',
    commands: {
      start: 'starts server.',
    },
    options: {
      '--static-dir': 'directory to serve static files from',
      '--api-dir': 'directory the api lives in',
      '--port': 'port, default 8080',
      '--cpus': 'number of processes to start',
      // '--watch': 'watch for changes',
    },
    example: `
# serve files in current dir:
grundstein-server serve

# serve files relative to process.cwd():
grundstein-server serve --static-dir dir_to_serve dir2_to_serve

# serve files using an absolute path:
grundstein-server serve --static-dir /dir/to/serve

# serve files and api
grundstein-server serve --static-dir /dir/to/public/ --api-dir /dir/to/api/
`,
  },
}

const res = cli(args)

runCluster(res)
