# Setup

Preferably, install [NVM]() or alternatively install the correct version
of NodeJS specified in `.nvmrc`. Once nvm is installed:

```
nvm install && nvm use
```

This will install and link the correct version of NodeJS locally for 
the project. You should always ensure you are running the correct 
version when working on the project.

# Running the App

## For Development

```
npm start
```

This will start a development express server that will watch for changes and rebuild
as necessary. This has sever core features:

* Host statically compiled from "dist" directory (see build step later)
* Host dynamically compiled files on-demand from webpack (disabled if only running `npm install --production`)
* Watch client source files with Hot modules with force reload fallback via webpack
* Watch server source files with server restart via nodemon

## Running for production

### Prebuild statically compiled files

```
npm run build
```

This will compile all files to the `dist` directory optmized for production. You could now deploy 
the contents of this application to run on a remote server.

### Run the application

```
npm install --production
node server
```

This will install the minimal number of dependencies to run the 
express app and start the server without any of the watches.

# Testing the App

```
npm test
```

This will generate output to the console and artifacts to `test-artifacts`.