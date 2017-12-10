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

## API documentation

All of these props are optional and thus come with a default value. However it's recommended to use at least the `length`, `validChars` and `placeholder` props.

Option | Type | Default | Description
--- | --- | --- | ---
length | Number | `6` | Define, how many characters the input should allow.
validChars | String | `'A-Za-z0-9'` | Define, which characters should be allowed. The string is inserted into a regexp character set ( `/[]/` ) for input validating.
placeholder | String | `'·'` (U+00B7) | Define, which character should be displayed as placeholder in empty fields. Note: Currently the blank character can´t be used as placeholder, this will be possible in a later version.
container | Object | `null` | Define the props of the container `div`. All props except for `className` are passed directly to the `div` element. Use `{ className: 'your-class' }` to style the input. These options are available on every element. For more details on how to apply your custom styling see [here](#custom-styling).
inputField | Object | `null` | Define the props of the `input` element. See `container` for more details.
characters | Object | `null` | Define the props of the characters `div`. See `container` for more details.
character | Object | `null` | Define the props of the character `div`s. See `container` for more details.

## Custom styling

TODO

## Work in progress

This project is still work in progress.

Things, that need to be done:

- [ ] Fix order of style sheets
  - When specifiying custom style classes, the custom styles are getting overwritten by the default styles because of the wrong order
- [ ] Configure production build
  - Minify etc.
- [x] Make compatible with Redux Form
- [ ] Add ability to use `' '` (blank) as placeholder
  - Update doc when done
- [ ] Make everything stylable
