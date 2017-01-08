# svelte-typescript-boilerplate

This is a [Svelte](https://svelte.technology/) Starter-Project based on [brakmic/Svelte-TypeScript-WebPack-Starter](https://github.com/brakmic/Svelte-TypeScript-WebPack-Starter) containing:

* **Svelte v2.9.9**
* TypeScript
* jQuery 3
* WebPack 4
* Bootstrap 3
* Font-Awesome
* Lodash
* whatwg-fetch

## Structure

The core of the app is located in [main.ts](./src/main.ts) which uses the [main Svelte component](./src/app/components/main.sve).

The definition of the component itself is located [here](./src/app/components/main/main.sve). It fetches JSON-data from a [remote server](http://northwind.servicestack.net/) and renders a simple table.

After a successful start the app will also provide a [reference](./src/main.ts#L17) to itself in a globally available object `window.app`, for dev purposes.

Styles can be added [here](./src/app/styling/index.scss).

## Installation

```
npm install
```

Then type

```
npm run start:server
```

to run the app on [http://localhost:3000](http://localhost:3000).

To create a development build type

```
npm run build:dev
```

Afterwards, either copy the newly created `dist` folder to your web server or type

```
npm run server:prod
```

to launch a local server on [http://localhost:8080](http://localhost:8080)

For productive builds use `build:prod`.

## License

[MIT](./LICENSE)
