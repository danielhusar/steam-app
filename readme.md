# Steam market app

> This is a node webkit app for the steam market for easier buy process. Its just basically me playing around with node webkit so I'm not going to support this when steam change their apis, use rather their official site to buy stuff. Its a single page node webkit desktop app powered by angular.

## Installation

You will have to compile the app by yourself, I'm not going to add here compiled app for any platform.
On real os all you need is [node.js](http://nodejs.org/), or windows follow the [node-gyp](https://github.com/TooTallNate/node-gyp#installation) requirements. 

Install all the dependencies
```bash
npm install
```

Run the app with node webkit, there is a [gulp](https://github.com/gulpjs/gulp) task that can do it for you.

## Documentation

First you need to log in to the steam iframe on settings page, and make sure you are logged in.
Then on the newly listed page you can filter items according to any game and items. You can separate multiple items by comma.
You can set up autobuy by specifieng item, maximum price and quantity, and it will autobuy this items when they pop in.
All the items that it tried to buy should show in basket page.


## License

MIT © [Daniel Husar](https://github.com/danielhusar)
