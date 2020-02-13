import { is } from '@magic/test'

import { runCluster } from '../src/index.mjs'

console.log(runCluster)

export default [
  { fn: () => runCluster, expect: is.fn, info: 'runCluster is a function' },
]
