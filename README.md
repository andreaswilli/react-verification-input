# react-verification-input

[![npm](https://img.shields.io/npm/v/react-verification-input?color=orange)](https://www.npmjs.com/package/react-verification-input)
[![npm downloads](https://img.shields.io/npm/dm/react-verification-input.svg?style=flat)](https://www.npmjs.com/package/react-verification-input)
[![GitHub Workflow Status](https://img.shields.io/github/workflow/status/andreaswilli/react-verification-input/Lint%20and%20Test?logo=github)](https://github.com/andreaswilli/react-verification-input/actions?query=branch%3Amaster)
![npm bundle size](https://img.shields.io/bundlephobia/min/react-verification-input?color=cornflowerblue)

`react-verification-input` is a customizable, masked input that can be used to enter all sorts of codes e.g. security codes when two-factor authenticating. Also I'm sure you can think of many more creative use cases.

<img width="400px" alt="verification-input" src="https://user-images.githubusercontent.com/17298270/120872091-e821d200-c59d-11eb-87f5-729692c6b40a.gif" />

## Features

⚡ **Get Started Easily**: The component works out of the box without the need to pass it a single prop.

🛠 **Highly Configurable**: Change the behaviour of the component to fit your needs by passing [props](#api-documentation).

💅🏼 **Custom Styling**: [Customize](#custom-styling) the component's styling to match the look of your application.

👨🏼‍💻 **TypeScript Support**: The package contains TypeScript declarations so you can enjoy IntelliSense in your editor.

✅ **Compatibility**: Compatible with React 16 (>=16.8.0) and React 17. Support of new versions of React as they are released will be ensured.

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

> **Note:** In order for it to work properly, make sure you have the `<meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no user-scalable=no">` tag in the head of your page. Otherwise, it might zoom in to the left side of the screen on mobile devices. This is the case because mobile devices zoom in on inputs and there is an input field outside of the viewport.

## API Documentation

All of these props are optional and some also come with a default value. However, it's recommended to use at least the `length`, `validChars` and `onChange` props.

| Option              | Type     | Default        | Description                                                                                                                                                                                                                                                                                                              |
| ------------------- | -------- | -------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| value               | String   | -              | The value of the verification input. Behaves like the value prop of a regular input element. This is necessary if the value needs to be changed from the outside (e.g. clearing the value). If you pass this prop, you are responsible to manage the value state. Otherwise the state will be kept inside the component. |
| length              | Number   | `6`            | Number of characters the input should allow.                                                                                                                                                                                                                                                                             |
| validChars          | String   | `'A-Za-z0-9'`  | Set of characters the input should allow. The string is inserted into a regexp character set ( `/[]/` ) for input validation.                                                                                                                                                                                            |
| placeholder         | String   | `'·'` (U+00B7) | The character to display in empty fields. In order to use the blank character as a placeholder, specify this option as `' '` or `''`.                                                                                                                                                                                    |
| autoFocus           | Boolean  | `false`        | Focus the input automatically as soon as it is rendered.                                                                                                                                                                                                                                                                 |
| removeDefaultStyles | Boolean  | `false`        | Completely remove any styles that are not required for the component to work properly. This is useful if you want to override the default styles (see [Custom Styling](#custom-styling)).                                                                                                                                |
| debug               | Boolean  | `false`        | Reveal what is going on behind the scenes, which might come in handy when trying to better understand the component. Obviously you don't want to use this in production. 😄                                                                                                                                              |
| inputProps          | Object   | `{}`           | These props get forwarded to the input element.                                                                                                                                                                                                                                                                          |
| classNames          | Object   | `{}`           | CSS class names to add to the specified elements. For more details see [Custom Styling](#custom-styling).                                                                                                                                                                                                                |
| onChange            | Function | -              | Callback function that gets called with the string value whenever it changes.                                                                                                                                                                                                                                            |
| onFocus             | Function | -              | Callback function that gets called when the component obtains focus.                                                                                                                                                                                                                                                     |
| onBlur              | Function | -              | Callback function that gets called when the component loses focus.                                                                                                                                                                                                                                                       |
| (any other prop)    | Any      | -              | Any props not listed above will be directly forwarded to the `container` element.                                                                                                                                                                                                                                        |

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

### Component Structure

The following illustration shows the component structure.

<img width="500px" alt="elements" src="https://user-images.githubusercontent.com/17298270/120887724-d61f4e00-c5f4-11eb-9971-0fc2f4ff9982.png" />

### Example

Have a look at this example:

<img width="400px" alt="custom styles example" src="https://user-images.githubusercontent.com/17298270/120889453-8d1fc780-c5fd-11eb-9cc9-5cf463dec16c.png" />

```css
.container {
  height: 50px;
  width: 300px;
}

.character {
  line-height: 50px;
  font-size: 36px;
  color: white;
  background-color: rgba(255, 255, 255, 0.2);
  border: 1px solid transparent;
  border-radius: 8px;
  margin-left: 8px;
}

.character:first-child {
  margin-left: 0;
}

.character--inactive {
  background-color: rgba(255, 255, 255, 0.1);
}

.character--selected {
  border: 1px solid white;
}
```

## Migration Guide: `v0.1.x` --> `v2`

- **prop: `input`**

  The `input` prop has been renamed to `inputProps` in order to be more explicit about the props being forwarded to the input element. Also, the `onChange` callback is now available on the top level. This matches the interface of a regular input element more closely (there is also a new top-level prop `value`).

- **props: `container`, `inputField`, `characters`, `character`**

  These props have been removed. Your custom CSS classes can be passed to the new `classNames` prop. In order to simplify the component structure, the `characters` element has been removed, use `container` instead. For more details see [Custom Styling](#custom-styling). Additional props can no longer be forwarded to these elements.

- **prop: `getInputRef`**

  This callback has been removed. The new way to receive the input ref is to use the [standard `ref` prop](https://reactjs.org/docs/refs-and-the-dom.html). The result will be a ref to the actual (invisible) input element.

- **Additional props**

  Any additional props will now be forwarded to the container element. However, you probably don't need to change anything.

## Contributing

If you want to contribute, feel free to do so. I'd very much appreciate it. ❤️
