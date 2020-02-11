## @grundstein/server

serves a local directory (process.cwd() + 'public' is the default)

it is recommended to install [@grundstein/cli](https://github.com/grundstein/cli/) instead,
which includes both this package,
as well as [@grundstein/builder](https://github.com/grundstein/builder)
in one cli.


#### installation
```bash
npm i @grundstein/server
```

#### usage
```bash
// show full help
grundstein-server --help

// serve the ./public directory
grundstein-server

// serve specific directories
grundstein-server --dir local/directory/path /global/directory/path

// serve on specific port
grundstein-server --port 2323
```
