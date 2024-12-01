![logo](https://user-images.githubusercontent.com/17298270/184383285-616eaa7c-d911-4203-ad0a-9ddfa32e4e4b.png)

[![npm](https://img.shields.io/npm/v/react-verification-input?color=orange)](https://www.npmjs.com/package/react-verification-input)
[![npm downloads](https://img.shields.io/npm/dm/react-verification-input.svg?style=flat)](https://www.npmjs.com/package/react-verification-input)
[![Lint and Test](https://github.com/andreaswilli/react-verification-input/actions/workflows/lint-and-test.yml/badge.svg?branch=master)](https://github.com/andreaswilli/react-verification-input/actions/workflows/lint-and-test.yml)
![npm bundle size](https://img.shields.io/bundlephobia/min/react-verification-input?color=cornflowerblue)

`react-verification-input` is a customizable, masked input that can be used to enter all sorts of codes e.g. security codes when two-factor authenticating. Also I'm sure you can think of many more creative use cases.

## Demo

🔴 [**Try it out yourself!**](https://andreaswilli.github.io/react-verification-input)

<img width="400px" alt="verification-input" src="https://user-images.githubusercontent.com/17298270/120872091-e821d200-c59d-11eb-87f5-729692c6b40a.gif" />

## Features

⚡ **Get Started Easily**: The component works out of the box without the need to pass it a single prop.

🛠 **Highly Configurable**: Change the behaviour of the component to fit your needs by passing [props](#api-documentation).

💅🏼 **Custom Styling**: [Customize](#custom-styling) the component's styling to match the look of your application.

👨🏼‍💻 **TypeScript Support**: The package contains TypeScript declarations so you can enjoy IntelliSense in your editor.

✅ **Compatibility**: Compatible with React 16 (>=16.8.0) up to React 19. Support of new versions of React as they are released will be ensured.

## Getting Started

First, install the package using [npm](https://docs.npmjs.com/cli/v7/commands/npm-install) or [yarn](https://classic.yarnpkg.com/en/docs/cli/add).

Now, import the React component like this:

```js
import VerificationInput from "react-verification-input";
```

And in your JSX write:

```js
<VerificationInput />
```

That's it! You now have a basic verification input with default configuration rendered on your page. 🎉😃

The component accepts a variety of props, which allow to configure the component according to your needs. For a complete API overview see [here](#api-documentation).

## API Documentation

All of these props are optional and some also come with a default value. However, it's recommended to use at least the `length`, `validChars` and `onChange`/`onComplete` props.

| Option         | Type     | Default        | Description                                                                                                                                                                                                                                                                                                              |
| -------------- | -------- | -------------- |--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| value          | String   | -              | The value of the verification input. Behaves like the value prop of a regular input element. This is necessary if the value needs to be changed from the outside (e.g. clearing the value). If you pass this prop, you are responsible to manage the value state. Otherwise the state will be kept inside the component. |
| length         | Number   | `6`            | Number of characters the input should allow.                                                                                                                                                                                                                                                                             |
| validChars     | String   | `'A-Za-z0-9'`  | Set of characters the input should allow. The string is inserted into a regexp character set ( `/[]/` ) for input validation.                                                                                                                                                                                            |
| placeholder    | String   | `'·'` (U+00B7) | The character to display in empty fields. In order to use the blank character as a placeholder, specify this option as `' '` or `''`.                                                                                                                                                                                    |
| autoFocus      | Boolean  | `false`        | Focus the input automatically as soon as it is rendered.                                                                                                                                                                                                                                                                 |
| passwordMode   | Boolean  | `false`        | Hide the input value by displaying `*` instead.                                                                                                                                                                                                                                                                          |
| passwordChar   | String   | `'*'`          | Custom character to be displayed when `passwordMode` is `true`                                                                                                                                                                                                                                                           |
| inputProps     | Object   | `{}`           | The properties of this object get forwarded as props to the input element. In particular, you can use this prop to assign an `id` attribute to the input field to connect it to a `label` element. Use `aria-label` for internationalization of the input field.                                                         |
| containerProps | Object   | `{}`           | The properties of this object get forwarded as props to the container element.                                                                                                                                                                                                                                           |
| classNames     | Object   | `{}`           | Object with CSS class names to add to the specified elements. Supported elements (= object-keys) are `container`, `character`, `characterInactive`, `characterSelected`, `characterFilled`                                                                                                                               |
| onChange       | Function | -              | Callback function that gets called with the string value whenever it changes.                                                                                                                                                                                                                                            |
| onComplete     | Function | -              | Callback function that gets called with the string value when the input is fully filled.                                                                                                                                                                                                                                 |
| onFocus        | Function | -              | Callback function that gets called when the component obtains focus.                                                                                                                                                                                                                                                     |
| onBlur         | Function | -              | Callback function that gets called when the component loses focus.                                                                                                                                                                                                                                                       |

## Custom Styling

Style the input by passing it your custom class names like so:

```js
<VerificationInput
  classNames={{
    container: "container",
    character: "character",
    characterInactive: "character--inactive",
    characterSelected: "character--selected",
    characterFilled: "character--filled",
  }}
/>
```

### Example

🔴 [**View live example!**](https://andreaswilli.github.io/react-verification-input/styling)

### Component Structure

The following illustration shows the component structure.

<img width="500px" alt="elements" src="https://github.com/andreaswilli/react-verification-input/assets/17298270/e0af9092-56e8-4791-a224-e964f9ddd775" />

## Contributing

Contributions welcome ❤️. If you want to contribute, feel free to have a look at the [contribution guide](/CONTRIBUTING.md).
