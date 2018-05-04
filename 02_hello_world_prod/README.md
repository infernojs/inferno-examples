# Inferno - Hello World Minimized

This sample achieve a production ready inferno application, this means the following point :

* Browser compatibilities : Firefox, Chrome, Edge, Safari...
* Minimized sized


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
Then compiling the application can be done with the command :

```npm run build```

The `build` command is described in `package.json`

You can just use the resulting `bundle.js` in your website, it will automatically hook in a HTML div with the id `root` (be careful to include the script tag after the `root` div).

### Start server
As a minimal html file and node server is included so you can test the result to run :

```npm run start```


## Note

The resulting `bundle.js` should be around 22KB (instead of 20KB + 2KB for the `es2015` preset) and `bundle.js.gz` 8.35KB.

The `production` mode in the `webpack.config.js` usually optimize the code but adding `optimization.minimize` configuration is one of the proper way to enforce the optimization
