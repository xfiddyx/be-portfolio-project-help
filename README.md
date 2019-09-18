# Front End Morning Tasks

**Don't fork this repository - create your own!**

## Task 1 - Create a Static Server

- Create an [Express](https://expressjs.com/) server.

- To allow your app to [serve up static files](https://expressjs.com/en/starter/static-files.html), use the `express.static` built-in middleware function in Express.

```js
app.use(express.static('public'));
```

Here, `'public'` refers to a directory of files that will be made available to the client. It is important that this is not the root directory of the server, as _any_ files in the directory specified will be made available.

- Create a file in the `./public` directory: `index.html`.
- Create some [boilerplate](https://en.wikipedia.org/wiki/Boilerplate_code) HTML here. Try to use [emmet](https://code.visualstudio.com/docs/editor/emmet) to make writing HTML more efficient.
- Start up your server and make a request to it using your browser:

```bash
npm run dev # you will need to create this script!
```

```http
GET http://localhost:<YOUR_PORT>/
```

This should serve up the `index.html` as this is the conventional name for a [homepage](https://www.lifewire.com/index-html-page-3466505) (you may have noticed that this convention is borrowed by NodeJS too).

- Add some style! Create a css file in the `public` directory, and link to it from your HTML:

```html
<link rel="stylesheet" href="index.css" />
```

- You can add as many static pages to your server as you like. It might be a good idea to start off with the portfolio site you created as part of pre-course section 3.
- Link from each page to other pages using [anchor tags](https://www.w3schools.com/tags/tag_a.asp). As you don't yet know where the site will be hosted, use relative paths for the [href](https://www.w3schools.com/tags/att_a_href.asp) attribute:

```html
<a href="/index.html">Go Back Home</a>
```

## Task 2 - Add a Contact Page

### Create the Form

- Create a new file: `./public/contact.html`
- Add to it an [HTML form](https://developer.mozilla.org/en-US/docs/Learn/HTML/Forms/Your_first_HTML_form) with email, subject and message fields (plus any others that you want).
- Each field should have:
  - a label associated with it (they are linked by the `for` and `id` attributes)
  - a name attribute (this will be important when we want to receive the form data)
  - a `required` attribute if the field needs to have a value before the form can be submitted

```html
<form>
  <label for="name">Name: </label>
  <input id="name" type="text" name="name" required />

  <label for="email">Email: </label>
  <input id="email" type="email" name="email" required />

  <label for="subject">Subject: </label>
  <input id="subject" type="text" name="subject" required />

  <label for="message">Message: </label>
  <textarea id="message" type="email" name="message" required></textarea>

  <button type="submit">Submit</button>
</form>
```

- Visit `/contact.html` and try submitting the form. You should see the page refresh and the url change to something like:

```
/contact?name=form-info&email=form-info&subject=form-info&message=form-info
```

This is the default behaviour of HTML forms. It will cause the browser to make a new `GET` request to the endpoint / URL in its `action` attribute (if no action attribute is specified, it will default to the current page's URL). It also appends all of the form data to the URL as a query string. Each key corresponds to the `name` attribute of an input field and the value corresponds the user's input into that field.

Rather than sending all of the (possibly sensitive) form data as a query string on a `GET` request, add some additional attributes to the form to control how it sends data:

```html
<form
  action="/contact"
  method="POST"
  enctype="application/x-www-form-urlencoded"
>
  <!-- form fields -->
</form>
```

- `action` - URL / Endpoint: Specifies where to send the form-data when a form is submitted
- `method` - GET / POST: Specifies the HTTP method to use when sending form-data
- `enctype` - Encryption type has three options: "application/x-www-form-urlencoded", "multipart/form-data", "text/plain" (sadly "application/json" is not supported).

### Get the Form Data

- Set up an endpoint to receive the form data with a controller attached.
- Log the request body in the controller.
- Try submitting the form once more.

```js
app.route('/contact').post(contact);
```

```js
exports.contact = (req, res, next) => {
  console.log(req.body);
  res.send({ msg: 'hello' });
};
```

- You might find that the form information does not exist on the request body. It will need to be parsed and added as the information arrives. Use some more [built-in middleware](https://expressjs.com/en/4x/api.html#express.urlencoded) to do this:

```js
app.use(express.urlencoded({ extended: true }));
```

- Add some error handling to your endpoint:

```js
exports.contact = (req, res, next) => {
  const { name, email, subject, message } = req.body;
  if (!name || !email || !subject || !message) {
    next({ status: 400, msg: 'Bad Request' });
  } else {
    res.send({ msg: `Thanks for contacting me, ${name}` });
  }
};
```

## Task 3 - Use a Template Engine to Serve Dynamic Content

Template engines are a way to add dynamic data into HTML templates. There are lots of [template engines](https://expressjs.com/en/guide/using-template-engines.html) available that can be used with Express. This README will use [Embedded JavaScript / EJS](https://ejs.co/) as an example - but feel free to experiment with other options!

- Install your template engine:

```bash
npm install ejs
```

- Set the template engine in the express app. Notice that the template engine (`'ejs'` here) specified as a string, so there is no need to `require` the template engine module into our code.

```js
app.set('view engine', 'ejs');
```

Whatever your choice of view engine, the templates will need to be created in a new directory in the root of the server called `views`.

- Create a "view". The file extension and way that the template is written will depend on the view engine that you have chosen (e.g. `./views/contact.ejs`).

```html
<!-- some HTML -->
<h1>Thanks for contacting me!</h1>
<p>I will get back to you shortly.</p>
<!-- some more HTML -->
```

- Use the `.render` method on the request to serve up your template as HTML.

```js
exports.contact = (req, res, next) => {
  // rest of controller...
  res.render('contact');
};
```

> Express-compliant template engines such as Pug and EJS export a function named `__express(filePath, options, callback)`, which is called by the `res.render()` function to render the template code.

- Pass some data to the template as an object:

```js
// partial controller
const { name } = req.body;
res.render('contact', { name });
```

- Alter the template to interpolate the provided data with the HTML that will be served up (again, this will vary massively based on the template engine you chose). Here is an example using EJS:

```ejs
<!-- some HTML -->
<h1>Thanks for contacting me, <%= name %>!</h1>
<p>I will get back to you shortly.</p>
<!-- some more HTML -->
```

There are many more powerful ways to use template engines. It is possible to iterate over arrays to produce some HTML for each element, to have a model fetch some data from a database or other source before adding it to the template, using [partials](https://medium.com/@henslejoseph/ejs-partials-f6f102cb7433) to avoid code duplication etc.

- Experiment with the different ways you can use your template engine!
- You could adjust your error handling so that it is a bit more human friendly too:

```js
app.use('/*', (req, res, next) => {
  next({ status: 404, msg: 'Page Not Found' });
});

app.use((err, req, res, next) => {
  const { msg = 'Internal Server Error', status = 500 } = err;
  res.status(status).render('error', { status, msg });
});
```

## Task 4 - Add Functionality to the Contact Form

## Task 5 - Host Your Site
