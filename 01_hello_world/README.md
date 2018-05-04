# Inferno - Hello World

This sample achieve a minimal code/dependencies to compile and run a inferno application


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

The resulting `bundle.js` should be around 20KB, there is no special optimization in this minimal version.
