# Environment Variables

[Environment Variables](https://en.wikipedia.org/wiki/Environment_variable) are a useful tool we can use to pass information to some code that we are running from the outside, so that we can change its behaviour.

## Global Variables

Usually when we try to access a variable that we have not created, it will cause a reference error:

```js
console.log(banana);
// ReferenceError: banana is not defined
```

However, certain variables are made available when running JavaScript with Node. An example that you have seen before is `console`. Variables that are accessible anywhere are called [globals](https://nodejs.org/api/globals.html#globals_process). One example is the [process object](https://nodejs.org/api/process.html#process_process).

> The `process` object is a `global` that provides information about, and control over, the current Node.js process. As a global, it is always available to Node.js applications without using `require()`:

```js
console.log(process);
```

## The Environment

On the process object, there is a key `env` which will contain lots of information about the user running this Node process. This object can be mutated by adding key-value-pairs:

```js
console.log(process.env);

process.env.FRUIT = 'banana';

console.log(process.env);
```

This is generally a terrible idea.

## Set An Environment Variable

Run a file which logs a variable on the `process.env` object. You should see that that variable is `undefined`:

```bash
node path-to-file.js
```

```js
console.log(process.env.MY_VARIABLE);
// undefined
```

Now, run the same file again - this time setting an environment variable as a key-value-pair in the terminal.

```bash
MY_VARIABLE=hello-from-the-terminal node path-to-file.js
```

```js
console.log(process.env.MY_VARIABLE);
// "hello-from-the-terminal"
```
