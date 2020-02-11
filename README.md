## @grundstein/server

serves a local directory (process.cwd() is the default)

#### installation
```bash
npm i @grundstein/server
```

#### usage
```bash
// show full help
grundstein-server --help

// serve the current directory
grundstein-server

// serve specific directories
grundstein-server --dir local/directory/path /global/directory/path

// serve on specific port
grundstein-server --port 2323
```
