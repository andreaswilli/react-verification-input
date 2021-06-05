# react-verification-input

[![NPM version](https://badge.fury.io/js/react-verification-input.svg)](http://badge.fury.io/js/react-verification-input)
[![npm downloads](https://img.shields.io/npm/dm/react-verification-input.svg?style=flat)](https://www.npmjs.com/package/react-verification-input)
[![Lint and Test](https://github.com/andreaswilli/react-verification-input/actions/workflows/main.yml/badge.svg)](https://github.com/andreaswilli/react-verification-input/actions/workflows/main.yml)

`react-verification-input` is a customizable, masked input that can be used to enter all sorts of codes e.g. security codes when two-factor authenticating. Also I'm sure you can think of many more creative use cases.

![verification-input](https://user-images.githubusercontent.com/17298270/120872091-e821d200-c59d-11eb-87f5-729692c6b40a.gif)

## Installation

Install it by running

```bash
npm install react-verification-input --save
```

or

```bash
yarn add react-verification-input
```

in your terminal.

## Usage

Import the React component as follows:

```js
import VerificationInput from "react-verification-input";
```

Inside the `render` method write:

```js
<VerificationInput />
```

That´s it! You now have a basic verification input with default configuration rendered on your page. 🎉😃

Of course the input can be configured manually. For a complete API overview see [here](#api-documentation).

> **Note:** In order for it to work properly, make sure you have the `<meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no user-scalable=no">` tag in the head of your page. Otherwise, it might zoom in to the left side of the screen on mobile devices. This is the case because mobile devices zoom in on inputs and there is an input field outside of the viewport.

## API Documentation

All of these props are optional and some also come with a default value. However it's recommended to use at least the `length`, `validChars` and `placeholder` props.

| Option              | Type     | Default        | Description                                                                                                                                                                 |
| ------------------- | -------- | -------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| value               | String   | -              | The value of the verification input. Behaves the same way as the input's value prop.                                                                                        |
| length              | Number   | `6`            | Number of characters the input should allow.                                                                                                                                |
| validChars          | String   | `'A-Za-z0-9'`  | Set of characters the input should allow. The string is inserted into a regexp character set ( `/[]/` ) for input validation.                                               |
| placeholder         | String   | `'·'` (U+00B7) | The character to display in empty fields. In order to use the blank character as a placeholder, specify this option as `' '` or `''`.                                       |
| autoFocus           | Boolean  | `false`        | Focus the input automatically as soon as it is rendered.                                                                                                                    |
| removeDefaultStyles | Boolean  | `false`        | Completely remove any styles that are not required for the component to work properly. This is useful if you want to override the default styles.                           |
| debug               | Boolean  | `false`        | Reveal what is going on behind the scenes, which might come in handy when trying to better understand the component. Obviously you don't want to use this in production. 😄 |
| inputProps          | Object   | `{}`           | These props get forwarded to the input element.                                                                                                                             |
| classNames          | Object   | `{}`           | Classnames to add to the specified elements. For more details see [Custom Styling](#custom-styling).                                                                        |
| onChange            | Function | -              | Callback function that gets called with the value whenever it changes.                                                                                                      |
| onFocus             | Function | -              | Callback function that gets called when the component gets focus.                                                                                                           |
| onBlur              | Function | -              | Callback function that gets called when the component loses focus.                                                                                                          |

## Custom Styling

> **Note:** It's recommended to use the `removeDefaultStyles` option when applying custom styles, otherwise you may not be able to override the default styles.

Style the input by passing it your custom class names like so:

```js
<VerificationInput
  removeDefaultStyles
  classNames={{
    container: "container",
    character: "character",
    characterInactive: "character--inactive",
    characterSelected: "character--selected",
  }}
/>
```

Have a look at these two examples:

### Example 1

```css
.container {
  max-width: 350px;
}

.characters {
  height: 50px;
}

.character {
  line-height: 50px;
  font-size: 36px;
  background-color: rgba(255, 255, 255, 0.2);
  border: 1px solid transparent;
  border-radius: 8px;
  color: white;
  margin-left: 8px;
}

.character--inactive {
  background-color: rgba(255, 255, 255, 0.1);
  box-shadow: none;
}

.character--selected {
  border: 1px solid white;
}
```

![react-verification-input_style2](https://user-images.githubusercontent.com/17298270/34587466-c17fdf6a-f1a8-11e7-8b6d-51d28a8dcf4f.gif)

### Example 2

```css
.container {
  max-width: 350px;
}

.characters {
  height: 50px;
}

.character {
  line-height: 50px;
  font-size: 36px;
  background-color: rgba(255, 255, 255, 0.8);
  border: none;
  border-radius: 8px;
  color: black;
  margin-left: 8px;
  box-shadow: inset 0 0 2px black;

  &:nth-child(4) {
    margin-left: 24px;
  }
}

.character--inactive {
  background-color: rgba(0, 0, 0, 0.5);
  box-shadow: none;
}

.character--selected {
  color: black;
  outline: red 2px;
  background-color: white;
}
```

![react-verification-input_style1](https://user-images.githubusercontent.com/17298270/34587481-cab83e7e-f1a8-11e7-95fd-ab5ec10967fc.gif)

## Contributing

If you want to contribute, feel free to do so. I'd very much appreciate that. ❤️
