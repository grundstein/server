## @magic/server

serves a local directory (process.cwd() is the default)

#### installation
```bash
npm i @magic/server
```

#### usage
```bash
// show full help
magic-server --help

// serve the current directory
magic-server

// serve specific directories
magic-server --dir local/directory/path /global/directory/path

// serve on specific port
magic-server --port 2323
```