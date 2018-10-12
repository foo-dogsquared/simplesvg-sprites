# simplesvg-sprites
A Node app to create an SVG sprite sheet from SimpleIcons. It is based from the idea of my failed (but not completely failed, it's just in hiatus) app, [svg-stacker](https://github.com/foo-dogsquared/svg-stacker), an app who-knows-when-it-will-be-completed-as-I-figure-out-how-to-do-some-stuff-in-C that will convert SVGs in a directory to be compiled into one, using `<symbol>`s and the `id` and `viewBox` attributes and whatnot. 

## Installation
If you want to see it from the ground-up in your machine simply clone the repo:
```bash
git clone https://github.com/foo-dogsquared/simplesvg-sprites
```

Assuming you have Node installed which should be packaged with npm, just go to the local directory where the repo is located, then:
```bash
npm install
```

After all of the dependencies have been installed, just run it with:
```bash
npm run watch
```

And the server should be up and ready to go, serving up the files at `localhost:3000`, by default (or if not, could have something to do with the environment or something).

For future reference, here are the version of Node and npm that I've installed whilst developing and eventually, built this app:
- Node v10.11.0
- npm 6.4.1

## Documentation
Mainly, this is a front-end app that lets you select multiple SVGs from [simple-icons](https://github.com/simple-icons/simple-icons) to be combined into one SVG sprite sheet (as I used to call them since they're kind of similar to spritesheets, after all).

The front-end is composed of your usual web trifecta (HTML, CSS, and JavaScript) and Vue, enabling to be able to selectively divide the user interface into components for easier organization.

To be able to do its task done, there is also a back-end using Node v10.11 with Express 4.16.3. It also has the [simple-icons npm package](https://www.npmjs.com/package/simple-icons) installed to be able to somewhat dynamically list all of the available icons (except that it is installed in one version, 1.9.4). By now, it is probably located in the internet, somewhere... in Heroku where the back-end part is chilling there.

Despite that, all parts of the app are installed in one part which is in the Heroku server. Express enables it to deliver static files so there's no needed separation of front-end, I think (I also think those are separated, correct me if I'm wrong, please).

## The front-end app
How to use the front-end app in the 3 steps:
1. Choose the icons to be included in the SVG
2. If you're sure of the icons you'll want to include, press the "Compile to SVG"
3. Wait for the server to respond with the SVG sheet

The resulting SVG should be something that looks like this:
```xml
<svg xmlns="http://www.w3.org/2000/svg">
	<symbol id="adobe_creative_cloud" viewBox="0 0 24 24">
		<path d="M24 11.599v.803c-.008.044-.017.087-.022.13-.04.35-.067.701-.124 1.048a8.663 8.663 0 0 1-1.176 3.144 8.848 8.848 0 0 1-3.645 3.36 8.422 8.422 0 0 1-2.812.843c-.217.026-.435.049-.652.073H7.138c-.043-.008-.085-.02-.128-.024a7.092 7.092 0 0 1-2.448-.598c-1.697-.755-2.963-1.98-3.791-3.664a7.298 7.298 0 0 1-.7-2.37L0 13.742v-.78c.008-.043.02-.086.023-.13a7.286 7.286 0 0 1 .461-2.175C1.2 8.777 2.45 7.381 4.222 6.478a7.227 7.227 0 0 1 2.928-.77 7.998 7.998 0 0 1 1.503.071.188.188 0 0 0 .142-.047 8.898 8.898 0 0 1 2.458-1.81 8.493 8.493 0 0 1 2.825-.848c.234-.027.467-.05.7-.074h.72c.046.007.094.016.14.021.357.043.715.07 1.068.13a8.37 8.37 0 0 1 3.073 1.186 8.89 8.89 0 0 1 3.319 3.713 8.76 8.76 0 0 1 .83 2.862c.026.229.048.458.072.687m-13.42-5.2c.015.02.019.029.025.032.493.247.965.538 1.41.867.028.02.098.012.132-.01 1.222-.787 2.547-1.059 3.97-.802 1.395.251 2.53.96 3.397 2.092.982 1.28 1.357 2.73 1.086 4.34-.182 1.08-.608 2.05-1.33 2.861-1.32 1.48-2.973 2.092-4.918 1.833-1.197-.16-2.23-.685-3.086-1.564-1.098-1.128-2.204-2.248-3.305-3.373-.147-.15-.31-.27-.521-.297a.826.826 0 0 0-.864.48c-.142.3-.124.64.185.948 1.227 1.226 2.444 2.462 3.67 3.69.21.21.435.405.674.582.896.661 1.906 1.027 3 1.174.858.116 1.71.09 2.555-.102 1.612-.369 2.948-1.205 4-2.497a7.213 7.213 0 0 0 1.576-3.67 7.313 7.313 0 0 0-.065-2.36c-.244-1.27-.773-2.408-1.62-3.377-1.618-1.846-3.653-2.67-6.074-2.487a6.664 6.664 0 0 0-2.641.79 6.962 6.962 0 0 0-1.255.85M9.988 19.29a15.79 15.79 0 0 1-.1-.094c-.501-.482-1.006-.96-1.502-1.449a.403.403 0 0 0-.32-.137c-.502.012-1.005.014-1.5-.1-2.461-.565-3.89-3.286-2.983-5.68.715-1.889 2.696-3.038 4.649-2.684.875.159 1.644.536 2.274 1.197.77.808 1.562 1.592 2.34 2.391.176.182.38.265.625.23.316-.046.569-.2.683-.516.112-.31.058-.605-.173-.844-.816-.84-1.613-1.702-2.462-2.507-1.647-1.561-3.588-2.026-5.736-1.362-2.888.893-4.579 3.926-3.919 6.919.602 2.727 2.947 4.64 5.691 4.643h2.299c.038 0 .076-.004.134-.007" />
	</symbol>

	<symbol id="adobe_acrobat_reader" viewBox="0 0 24 24">
		<path d="M23.598 15.368c-.71-.76-2.164-1.197-4.224-1.197-1.1 0-2.375.11-3.76.37-.782-.77-1.562-1.67-2.307-2.72-.53-.74-.993-1.52-1.42-2.29.813-2.54 1.206-4.61 1.206-6.1 0-1.672-.603-3.416-2.34-3.416-.533 0-1.066.325-1.35.8-.783 1.408-.43 4.493.917 7.54-.503 1.52-1.035 2.973-1.7 4.605-.578 1.376-1.244 2.794-1.923 4.096C2.793 18.64.267 20.49.03 21.94c-.104.547.074 1.05.457 1.45.133.11.636.545 1.48.545 2.59 0 5.32-4.28 6.707-6.86 1.065-.36 2.13-.687 3.193-1.015 1.168-.323 2.34-.583 3.405-.765 2.735 2.504 5.146 2.9 6.358 2.9 1.492 0 2.024-.617 2.203-1.122.28-.65.07-1.37-.252-1.74l.02.04zm-1.385 1.054c-.104.544-.638.906-1.386.906-.21 0-.39-.037-.603-.072-1.36-.325-2.633-1.016-3.903-2.106 1.25-.214 2.31-.25 2.98-.25.74 0 1.38.032 1.81.144.49.106 1.27.435 1.095 1.38h.02zm-7.523-1.707c-.92.19-1.914.414-2.944.693-.816.223-1.666.474-2.52.77.463-.902.854-1.774 1.208-2.603.428-1.02.78-2.07 1.135-3.046.35.61.74 1.23 1.13 1.78.64.87 1.31 1.7 1.98 2.42v-.02zM10.04 1.23c.145-.29.43-.436.678-.436.745 0 .887.868.887 1.56 0 1.168-.354 2.942-.96 4.967-1.062-2.82-1.135-5.18-.603-6.09zM6.138 18.127C4.328 21.17 2.59 23.06 1.525 23.06c-.21 0-.387-.075-.53-.183-.214-.216-.32-.472-.248-.76.213-1.09 2.236-2.613 5.392-3.99z"/>
	</symbol>

	<symbol id="adobe_after_effects" viewBox="0 0 24 24">
		<path d="M0 .3v23.4h24V.3H0zm1 1h22v21.4H1V1.3zm5.784 12.25l-.792 2.986c-.017.083-.05.113-.148.113H4.376c-.1 0-.116-.035-.1-.15l2.84-9.933c.05-.18.082-.325.098-.82 0-.066.033-.1.083-.1h2.096c.066 0 .1.018.116.1l3.183 10.77c.016.082 0 .13-.083.13h-1.65c-.082 0-.13-.03-.147-.096l-.825-3.002h-3.2zm2.806-1.624c-.28-1.106-.96-3.53-1.206-4.7h-.016c-.214 1.17-.756 3.148-1.17 4.7H9.59zm5.36 1.024c.017 1.353.66 2.26 2.178 2.26.594 0 1.103-.078 1.63-.31.067-.032.117-.015.117.067v1.254c0 .1-.033.15-.1.2-.527.264-1.184.38-2.01.38-2.64 0-3.63-1.947-3.63-4.125 0-2.36 1.222-4.29 3.367-4.29 2.178 0 2.937 1.833 2.937 3.317 0 .48-.035.876-.085 1.057-.017.082-.05.11-.132.127-.198.033-.792.066-1.667.066H14.95zm2.03-1.375c.512 0 .693 0 .742-.016 0-.068.017-.125.017-.174 0-.545-.266-1.544-1.306-1.544-.957 0-1.37.842-1.468 1.732h2.013z"/>
	</symbol>

	<symbol id="archive_of_our_own" viewBox="0 0 24 24">
		<path d="M18.417 9.883c-.687 1.116-1.823 1.722-2.99 1.855-4.227.484-6.047-4.149-3.469-6.728 2.31-2.31 7.082-.9 7.005 2.899-.011.611-.166 1.357-.546 1.974zm-6.459-2.029c.142 3.596 4.764 3.682 5.687 1.054.815-2.324-1.12-4.199-3.19-3.897-1.523.221-2.553 1.411-2.497 2.843z"/><path d="M23.123 6.003c.284-.131.697-.412.837-.246.211.251-.459.475-.748.664-.918.6-1.731 1.227-2.477 2.049-.959 1.059-1.944 2.376-2.55 3.818.618.032 3.021.157 3.6 1.481.464 1.062-.387 2.156-1.32 2.627.663.414 1.81.945 1.745 1.898-.158 2.343-3.696 2.241-5.178.695-.244-.289-.358-.482-.25-.578.151-.134.326.186.676.476.225.187.377.251.572.354 1.301.683 3.339.403 3.478-.792.064-.554-.664-.955-1.217-1.204-.498-.224-1.514-.386-1.494-.952.02-.554.524-.45 1.03-.65.55-.217 1.004-.901 1.003-1.116-.005-.905-2.062-.888-3.221-.92-.275.606-.471 1.226-.692 2.158-.139.583-.151 1.897-.748 2.029-.737.164-1.014-.477-1.455-.991-.594-.69-1.436-1.637-1.942-2.223-3.033 1.002-5.392 2.091-8.256 3.712-1.311.742-2.063 1.59-2.545 1.354-.396-.194-.339-.633-.147-.887.393-.521.927-1.225 1.396-1.888.6-.849 1.054-1.667 1.373-2.445.692-1.688 1.23-4.72 1.475-5.859.088-.412.309-.348.322-.148.027.419-.237 2.047-.29 2.383-.436 2.781-.772 4.41-2.009 6.349 2.196-1.358 4.805-3.019 7.592-3.955C8.846 9.936 5.847 6.85 1.676 4.905 1.037 4.542 0 4.464 0 4.22c0-.271.781-.06 1.043.007 2.383.596 4.817 2.141 6.601 3.444 2.145 1.567 4.714 3.967 5.679 5.081.657-.226 2.286-.457 3.696-.496.752-1.58 2.55-4.018 4.788-5.442.413-.263.842-.594 1.316-.811zm-8.594 8.071c.423.428.742.934 1.11 1.398.174-.59.405-1.216.643-1.758-.619.082-1.281.203-1.753.36z"/>
	</symbol>

</svg>
```

**All IDs embedded into the `<symbol>` tag will be in lowercase and in case the name of the icon (as indicated from the database) has *non-alphanumerical characters, it will be entirely omitted* and *whitespace characters are replaced with underscores*.** 

Examples:
- Twitter - `twitter`
- CodePen - `codepen`
- GitHub - `github`
- Adobe Creative Cloud - `adobe_creative_cloud`
- Macy's - `macys`
- Yahoo! - `yahoo`

Anyway, how the front-end app (should) work is that it mainly serves as a GUI for sending POST requests with the required data to the server. Then, the server listens to the POST request and that's where it will do its thing to make an SVG out of its data. Luckily, the npm package of Simple Icons is simply an object with hundreds of data templates so it is easy to acquire the needed data accordingly. 

## `<symbol>` 101
Feel free to skip this part if you know how to use the SVG file with those `<symbol>`s.

As you can see, the SVG now holds a bunch of `<symbol>` tags. If you're entirely unfamiliar to those, basically, they are a way to hold 
multiple shapes in one file with their own `viewBox` and `preserveAspectRatio` attributes, `<path>`s, and more of those stuff. 

You can use an SVG `<symbol>` with and only with `<use>` (may change in the future, who knows). When the entire SVG that's full of `<symbol>` is shown, a blank canvas is shown. Before you can use those, the `<symbol>` tags in the SVG should have an `id` attribute.

### Examples
Say that we have a directory containing the SVG spritesheet (IDK the official term but I just want to call it that, 'K?) and we want to use it in an HTML file. When using the spritesheet, all you have to do is (assuming that you're using it in the same directory as the SVG file):
```xml
    <svg class="icon">
        <use xlink:href="./simplesvg-sprites.svg#NAME_OF_ICON">
    </svg>
```

Ta-dah! Hopefully that helps. If not, then you can refer to [SVG `<symbol>` from CSS Tricks](https://css-tricks.com/svg-symbol-good-choice-icons/), [SVG `<symbol>` element from Jenkov](http://tutorials.jenkov.com/svg/symbol-element.html), and [another page from Jenkov which is about the SVG `<use>` element (from Jenkov)](http://tutorials.jenkov.com/svg/use-element.html).

## API
I've also built an API using the [simple-icons npm package](https://www.npmjs.com/package/simple-icons), allowing you to fetch a JSON containing the data of the icons from it. Although, there are more solid alternatives [here](https://fontawesome.com/) and [there](http://api.thenounproject.com/).

Just take note that it is not suitable for a project that'll be used by a hundred or thousands of users since I'm using the free tier version of Heroku, which I think has its limitations or something.

### `GET /simple-icons`
You can request for one icon, as long as it is one of the valid values:

`/simple-icons?icons=Windows`

*The result will be a JSON with a single object.*

How about multiple icons? As long as it is separated by a comma, it is possible.

`/simple-icons?icons=Adobe+Creative+Cloud,Windows,Xing`

*The result will be a JSON with an object with the valid values as the keys.* 

This is the resulting JSON from the example request above:
```json
{
    "Windows": {
        "title": "Windows",
        "hex": "0078D6",
        "source": "https://commons.wikimedia.org/wiki/File:Windows_10_Logo.svg",
        "svg": "<svg aria-labelledby=\"simpleicons-windows-icon\" role=\"img\" viewBox=\"0 0 24 24\" xmlns=\"http://www.w3.org/2000/svg\"><title id=\"simpleicons-windows-icon\">Windows icon</title><path d=\"M0 3.449L9.75 2.1v9.451H0m10.949-9.602L24 0v11.4H10.949M0 12.6h9.75v9.451L0 20.699M10.949 12.6H24V24l-12.9-1.801\"/></svg>"
    },
    "Adobe Creative Cloud": {
        "title": "Adobe Creative Cloud",
        "hex": "D41818",
        "source": "https://www.adobe.io/apis/creativecloud/creativesdk/docs/websdk/adobe-creative-sdk-for-web_master/branding-guidelines.html",
        "svg": "<svg aria-labelledby=\"simpleicons-adobe-creativecloud-icon\" role=\"img\" viewBox=\"0 0 24 24\" xmlns=\"http://www.w3.org/2000/svg\"><title id=\"simpleicons-adobe-creativecloud-icon\">Adobe Creative Cloud</title><path d=\"M24 11.599v.803c-.008.044-.017.087-.022.13-.04.35-.067.701-.124 1.048a8.663 8.663 0 0 1-1.176 3.144 8.848 8.848 0 0 1-3.645 3.36 8.422 8.422 0 0 1-2.812.843c-.217.026-.435.049-.652.073H7.138c-.043-.008-.085-.02-.128-.024a7.092 7.092 0 0 1-2.448-.598c-1.697-.755-2.963-1.98-3.791-3.664a7.298 7.298 0 0 1-.7-2.37L0 13.742v-.78c.008-.043.02-.086.023-.13a7.286 7.286 0 0 1 .461-2.175C1.2 8.777 2.45 7.381 4.222 6.478a7.227 7.227 0 0 1 2.928-.77 7.998 7.998 0 0 1 1.503.071.188.188 0 0 0 .142-.047 8.898 8.898 0 0 1 2.458-1.81 8.493 8.493 0 0 1 2.825-.848c.234-.027.467-.05.7-.074h.72c.046.007.094.016.14.021.357.043.715.07 1.068.13a8.37 8.37 0 0 1 3.073 1.186 8.89 8.89 0 0 1 3.319 3.713 8.76 8.76 0 0 1 .83 2.862c.026.229.048.458.072.687m-13.42-5.2c.015.02.019.029.025.032.493.247.965.538 1.41.867.028.02.098.012.132-.01 1.222-.787 2.547-1.059 3.97-.802 1.395.251 2.53.96 3.397 2.092.982 1.28 1.357 2.73 1.086 4.34-.182 1.08-.608 2.05-1.33 2.861-1.32 1.48-2.973 2.092-4.918 1.833-1.197-.16-2.23-.685-3.086-1.564-1.098-1.128-2.204-2.248-3.305-3.373-.147-.15-.31-.27-.521-.297a.826.826 0 0 0-.864.48c-.142.3-.124.64.185.948 1.227 1.226 2.444 2.462 3.67 3.69.21.21.435.405.674.582.896.661 1.906 1.027 3 1.174.858.116 1.71.09 2.555-.102 1.612-.369 2.948-1.205 4-2.497a7.213 7.213 0 0 0 1.576-3.67 7.313 7.313 0 0 0-.065-2.36c-.244-1.27-.773-2.408-1.62-3.377-1.618-1.846-3.653-2.67-6.074-2.487a6.664 6.664 0 0 0-2.641.79 6.962 6.962 0 0 0-1.255.85M9.988 19.29a15.79 15.79 0 0 1-.1-.094c-.501-.482-1.006-.96-1.502-1.449a.403.403 0 0 0-.32-.137c-.502.012-1.005.014-1.5-.1-2.461-.565-3.89-3.286-2.983-5.68.715-1.889 2.696-3.038 4.649-2.684.875.159 1.644.536 2.274 1.197.77.808 1.562 1.592 2.34 2.391.176.182.38.265.625.23.316-.046.569-.2.683-.516.112-.31.058-.605-.173-.844-.816-.84-1.613-1.702-2.462-2.507-1.647-1.561-3.588-2.026-5.736-1.362-2.888.893-4.579 3.926-3.919 6.919.602 2.727 2.947 4.64 5.691 4.643h2.299c.038 0 .076-.004.134-.007\" /></svg>"
    },
    "Xing": {
        "title": "Xing",
        "hex": "006567",
        "source": "https://dev.xing.com/logo_rules",
        "svg": "<svg aria-labelledby=\"simpleicons-xing-icon\" role=\"img\" viewBox=\"0 0 24 24\" xmlns=\"http://www.w3.org/2000/svg\"><title id=\"simpleicons-xing-icon\">Xing icon</title><path d=\"M18.188 0c-.517 0-.741.325-.927.66 0 0-7.455 13.224-7.702 13.657.015.024 4.919 9.023 4.919 9.023.17.308.436.66.967.66h3.454c.211 0 .375-.078.463-.22.089-.151.089-.346-.009-.536l-4.879-8.916c-.004-.006-.004-.016 0-.022L22.139.756c.095-.191.097-.387.006-.535C22.056.078 21.894 0 21.686 0h-3.498zM3.648 4.74c-.211 0-.385.074-.473.216-.09.149-.078.339.02.531l2.34 4.05c.004.01.004.016 0 .021L1.86 16.051c-.099.188-.093.381 0 .529.085.142.239.234.45.234h3.461c.518 0 .766-.348.945-.667l3.734-6.609-2.378-4.155c-.172-.315-.434-.659-.962-.659H3.648v.016z\"/></svg>"
    }
}
```

So when you want to access the SVG code of say, Windows, from the resulted JSON, you can access it by `JSON.Windows.svg`. Any invalid values are just being discarded. Thus, when you get the JSON, it is still fine.

Most of the time, you'll probably want the SVG only so there's also the `svg` query to get only the SVG drawing path of the icons (`/simple-icons?svg=true`) but make sure to have a request for at least one icon.

`/simple-icons?svg=true` will result to this:
```JSON
{
    "message": "400: undefined",
    "documentation": "https://github.com/foo-dogsquared/simplesvg-sprites"
}
```

### `GET /database`
You can get the entire catalog of icons offered by Simple Icons here. The server will send a JSON containing an array of those values.

You can also request for the database in reverse by adding a query `reverse` with `true` as its value (`/database?reverse=true`).

### `POST /compile`
What if you don't want to use the app and just want to be using the CLI or anything other than the app? If so, then this is for you!

The needed data for the server to be able to do its compiling function of the SVG spritesheet is the following:
- the `Content-Type` of the request header needs to be in `application/x-www-form-urlencoded` form, similar to what the HTML forms are made requesting with by default, I think.
- the body should contain the `icons` key with a comma-delimited list of icon, similar to the `icons` query

Aaaaaand that is it. For now. Wait for the server to respond and ta-da? ~~Let me know if it is working, please. 🙃 IDK how to back-end development yet properly and cleanly.~~
