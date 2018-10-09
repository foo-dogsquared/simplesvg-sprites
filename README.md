# simplesvg-sprites
A Node app to create an SVG sprite sheet from SimpleIcons. It is based from the idea of my failed (but not completely failed, it's just in hiatus) app, [svg-stacker](https://github.com/foo-dogsquared/svg-stacker), an app who-knows-when-it-will-be-completed-as-I-figure-out-how-to-do-some-stuff-in-C that will convert SVGs in a directory to be compiled into one, using `<symbol>`s and the `id` and `viewBox` attributes and whatnot. 

## Documentation
Mainly, this is a front-end app that lets you select multiple SVGs from [simple-icons](https://github.com/simple-icons/simple-icons) to be combined into one SVG sprite sheet (as I used to call them since they're kind of similar to spritesheets, after all).

The front-end is composed of your usual web trifecta (HTML, CSS, and JavaScript) and Vue, enabling to be able to selectively divide the user interface into components for easier organization.

To be able to do its task done, there is also a back-end using Node v10.11 with Express 4.16.3. It also has the [simple-icons npm package](https://www.npmjs.com/package/simple-icons) installed to be able to somewhat dynamically list all of the available icons (except that it is installed in one version, 1.9.4). By now, it is probably located in the internet, somewhere... in Heroku where the back-end part is chilling there.

Despite that, all parts of the app are installed in one part which is in the Heroku server. Express enables it to deliver static files so there's no needed separation of front-end, I think (I also think those are separated, correct me if I'm wrong, please).

Anyway, how the front-end app (should) work is that it mainly serves as a GUI for sending POST requests with the required data to the server. Then, the server listens to the POST request and that's where it will do its thing to make an SVG out of its data. Luckily, the npm package of Simple Icons is simply an object with hundreds of data templates so it is easy to acquire the needed data accordingly. 

## API
I've also built an API using the [simple-icons npm package](https://www.npmjs.com/package/simple-icons), allowing you to fetch a JSON containing the data of the icons from it. Although, there are more solid alternatives [here](https://fontawesome.com/) and [there](http://api.thenounproject.com/).

Just take note that it is not suitable for a project that'll be used by a hundred or thousands of users since I'm using the free tier version of Heroku, which I think has its limitations or something.

The API endpoint for GET operation is located here:
`/simple-icons`

Leaving it with no query or anything lets you get all of the icons.

### `/simple-icons?icons=ICONS`

You can also request for one icon, as long as it is one of the valid values:
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
