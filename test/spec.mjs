import { is } from '@magic/test'

import defaultRunCluster, { runCluster } from '../src/index.mjs'

export default [
  { fn: () => runCluster, expect: is.fn, info: 'runCluster is a function' },
  { fn: () => defaultRunCluster, expect: is.fn, info: 'runCluster default export is a function' },
  {
    fn: is.deep.eq(runCluster, defaultRunCluster),
    expect: true,
    info: 'both runCluster exports are equal',
  },
]
