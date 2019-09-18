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

## Task 3 - Use a Template Engine to Serve Dynamic Content

## Task 4 - Add Functionality to the Contact Form

## Task 5 - Host Your Site
