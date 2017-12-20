# react-verification-input

[![NPM version](https://badge.fury.io/js/react-verification-input.svg)](http://badge.fury.io/js/react-verification-input)
[![HitCount](http://hits.dwyl.io/andreaswilli/react-verification-input.svg)](http://hits.dwyl.io/andreaswilli/react-verification-input)

`react-verification-input` is a customizable, masked input, which can be used to enter all sorts of codes e.g. security codes when two-factor authenticating. It is compatible with [Redux Form](https://github.com/erikras/redux-form) 🎉

![react-verification-input](https://user-images.githubusercontent.com/17298270/33804469-04e0bd2c-dda6-11e7-8f97-eb2879270a71.gif)

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
import VerificationInput from 'react-verification-input'
```

Inside the `render` method write:

```js
<VerificationInput />
```

That´s it! You now have a basic verification input with default configuration rendered on your page. 🎉😃

Of course the input can be configured manually. For a complete API overview see [here](#api-documentation).

> **Note:** In order for it to work properly, make sure you have the `<meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no user-scalable=no">` tag in the head of you page. Otherwise it might zoom in to the left side of the screen on mobile devices. This is the case because mobile devices zoom in on inputs and there is an input field outside of the viewport.

## API documentation

All of these props are optional and thus come with a default value. However it's recommended to use at least the `length`, `validChars` and `placeholder` props.

Option | Type | Default | Description
--- | --- | --- | ---
length | Number | `6` | Define, how many characters the input should allow.
validChars | String | `'A-Za-z0-9'` | Define, which characters should be allowed. The string is inserted into a regexp character set ( `/[]/` ) for input validating.
placeholder | String | `'·'` (U+00B7) | Define, which character should be displayed as placeholder in empty fields. In order to use the blank character as placeholder specify this option as `' '` or `''`.
autoFocus | Boolean | `false` | This will make the input focus automatically as soon as it rendered.
container | Object | `null` | Define the props of the container `div`. All props except for `className` are passed directly to the `div` element. Use `{ className: 'your-class' }` to style the input. These options are available on every element. For more details on how to apply your custom styling see [here](#custom-styling).
inputField | Object | `null` | Define the props of the `input` element. See `container` for more details.
characters | Object | `null` | Define the props of the characters `div`. See `container` for more details.
character | Object | `null` | Define the props of the character `div`s. See `container` for more details.

## Custom styling

Style the input by passing it your custom class names like so:
```js
<VerificationInput
  container={{
    className: 'container',
  }}
  characters={{
    className: 'characters',
  }}
  character={{
    className: 'character',
    classNameInactive: 'character--inactive',
    classNameSelected: 'character--selected',
  }}
/>
```

There is also the `input` prop, which will attach styles to the actual input element, but you probably don't want to use this as it's outside the viewport and thus not visible.

Have a look at these two examples:

### Example 1

```css
.container {
  max-width: 350px;
}

.character {
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

![react-verification-input_style2](https://user-images.githubusercontent.com/17298270/34184361-9254ea72-e51f-11e7-96a8-30ebfc1398da.gif)


### Example 2

```css
.container {
  max-width: 350px;
}

.character {
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

![react-verification-input_style1](https://user-images.githubusercontent.com/17298270/34184356-8e346e7c-e51f-11e7-86c7-9f90ed341c13.gif)
