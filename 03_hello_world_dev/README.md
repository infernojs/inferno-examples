# Inferno - Hello World Minimized

This sample shows how to make 2 different configurations for development and production builds.


## Dependencies

Before being able to run this sample you will need to have :

* `Node`
* `npm` (npm is shipped usually with Node)

Optionally :

* `yarn` : meant to be used exactly like npm, run faster with less bugs

## Usage

You can use `yarn` instead of `npm` for any of the following usage commands.


### Package install
First you will need to install all the package described in `package.json`. To do so just :

```npm install```

### Compilation
Compiling the application can be done with the commands :

```npm run dev```

or 

```npm run build```


### Start server
As a minimal html file and node server is included so you can test the result to run :

```npm run start```

For development build instead of `npm run dev` and `npm run start` in an other window (as the dev build never stop) you can use the `webpack-dev-server` with :

```npm run start-dev```


## Note

Because of the use of gzip a separate index file is used in development mode, this is not working well with `webpack-dev-server` (apache or nginx would have no problem changing the index file and/or redirect) a `bypass` configuration is used even though this is not very elegant. If you find a better solution feel free to write a solution in the issues or directly create a pull request.

Some uses `alias: { inferno: path.resolve(require.resolve('inferno/dist/index.dev.esm.js')) }` instead of `alias: { inferno: require.resolve('inferno/dist/index.dev.esm.js') }`, this might be due to OS/environment needs (path separator), the issue has not been verified so the sample keeps the minimal way.

The `webpack-dev-server` uses automatically some options for webpack so the result is different from the simple dev options used here. `webpack-dev-server` is very handy but you might have to run manually a dev build if you already have a server or using `electron` for instance, this is why this sample shows both ways.
