import React, { useRef, useState, useEffect } from "react";
import classNames from "classnames";
import PropTypes from "prop-types";

import { KEY_CODE } from "./constants";

import style from "./styles.scss";

const VerificationInput = (props) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [tan, setTan] = useState("");
  const [isActive, setActive] = useState(false);

  const inputRef = useRef(null);

  useEffect(() => {
    if (props.autoFocus) {
      inputRef.current.focus();
    }
  }, []);

  const getPlaceholder = () => {
    return props.placeholder.trim() === ""
      ? "\xa0" // \xa0 = non-breaking space
      : props.placeholder;
  };

  const setSelection = (index) => {
    if (index > props.length - 1) {
      index = props.length - 1;
    } else if (index < 0) {
      index = 0;
    }
    inputRef.current.setSelectionRange(index, index + 1);
    setSelectedIndex(index);
  };

  // positive offset = move to the right
  // negative offset = move to the left
  const moveSelectionBy = (offset) => {
    setSelection(selectedIndex + offset);
  };

  // TODO: forwardRef
  // const saveInputRef = (ref) => {
  //   this.input = ref;
  //   props.getInputRef(ref);
  // };

  const deleteCharacterAt = (index, string) => {
    // replace with placeholder
    const head = string.substring(0, index);
    const tail = string.substring(index + 1);
    return `${head}${getPlaceholder()}${tail}`;
  };

  const handleChange = (tan, selectedIndex) => {
    const previousTan = tan;
    let newTan = tan.replace(RegExp(`${getPlaceholder()}+$`), "");

    if (newTan !== tan) {
      selectedIndex = newTan.length;
    }
    if (
      !RegExp(
        `^[${props.validChars}${getPlaceholder()}]{0,${props.length}}$`
      ).test(newTan)
    ) {
      inputRef.current.value = previousTan;
      moveSelectionBy(0); // set to where it was before
      return;
    }
    inputRef.current.value = newTan;
    setSelection(selectedIndex);
    setTan(newTan);
    props.input?.onChange?.(newTan);
  };

  const handleKeyUp = (event) => {
    const { keyCode } = event;

    if (keyCode === KEY_CODE.ARROW_LEFT) {
      moveSelectionBy(-1);
      return;
    }

    if (keyCode === KEY_CODE.ARROW_RIGHT) {
      if (selectedIndex >= tan.length) {
        // don't move selection to disabled fields
        moveSelectionBy(0);
        return;
      }
      moveSelectionBy(1);
      return;
    }

    let newSelectedIndex = inputRef.current.selectionStart;
    let newTan = inputRef.current.value;
    // if value not changed (and no arrow key pressed)
    if (newTan === tan) {
      if (event.key === "Tab") {
        setSelection(newTan.length);
      } else {
        setSelection(selectedIndex);
      }
      return;
    }

    if (keyCode === KEY_CODE.BACKSPACE) {
      newSelectedIndex = selectedIndex;
      // if selection is empty
      if (
        tan[newSelectedIndex] === getPlaceholder() ||
        tan[newSelectedIndex] === undefined
      ) {
        // move selection to the left
        newSelectedIndex -= 1;
      }
      newTan = deleteCharacterAt(newSelectedIndex, tan);
      handleChange(newTan, newSelectedIndex);
      return;
    }

    if (keyCode === KEY_CODE.DELETE) {
      newSelectedIndex = selectedIndex;

      // if selection is empty
      if (tan[newSelectedIndex] === getPlaceholder()) {
        // move selection to the right
        newSelectedIndex += 1;
      }
      newTan = deleteCharacterAt(newSelectedIndex, tan);
      handleChange(newTan, newSelectedIndex);
      return;
    }

    // some character key (valid or invalid) was pressed
    handleChange(newTan, newSelectedIndex);
  };

  const handleClick = (event) => {
    let index = parseInt(event.target.id.replace("field-", ""));
    index = Math.min(index, inputRef.current.value.length);
    inputRef.current.focus();
    setSelection(index);
  };

  const handlePaste = (event) => {
    const pastedData = event.clipboardData;
    const pastedText = pastedData?.getData("Text")?.replace(/\s/g, "");

    // this will only work for environments that properly support
    // the clipboard api
    if (pastedText != null) {
      event.preventDefault();
      handleChange(pastedText, pastedText.length);
    }
  };

  const {
    length,
    removeDefaultStyles,
    debug,
    container,
    inputField,
    characters,
    character,
    input,
  } = props;

  const { className: containerClassName, ...containerProps } = container;
  const { className: inputClassName, ...inputProps } = inputField;
  const { className: charactersClassName, ...charactersProps } = characters;

  const {
    className: characterClassName,
    classNameInactive: characterClassNameInactive,
    classNameSelected: characterClassNameSelected,
    ...characterProps
  } = character;

  return (
    <div
      className={classNames(
        "verification-input__container",
        containerClassName,
        {
          "verification-input__container--default": !removeDefaultStyles,
        }
      )}
      {...containerProps}
    >
      <input
        ref={inputRef}
        className={classNames("verification-input", inputClassName, {
          "verification-input--debug": debug,
        })}
        onKeyUp={handleKeyUp}
        onFocus={() => {
          setActive(true);
          input?.onFocus?.();
        }}
        onBlur={() => {
          setActive(false);
          input?.onBlur?.();
        }}
        onPaste={handlePaste}
        {...inputProps}
      />
      <div
        data-testid="characters"
        className={classNames(
          "verification-input__characters",
          charactersClassName,
          {
            "verification-input__characters--default": !removeDefaultStyles,
          }
        )}
        onClick={() => inputRef.current.focus()}
        {...charactersProps}
      >
        {[...Array(length)].map((_, i) => (
          <div
            className={classNames(
              "verification-input__character",
              characterClassName,
              {
                "verification-input__character--default": !removeDefaultStyles,
                "verification-input__character--selected--default":
                  !removeDefaultStyles && selectedIndex === i && isActive,
                [characterClassNameSelected]: selectedIndex === i && isActive,
                "verification-input__character--inactive--default":
                  !removeDefaultStyles && tan.length < i,
                [characterClassNameInactive]: tan.length < i,
              }
            )}
            onClick={handleClick}
            id={`field-${i}`}
            data-testid={`character-${i}`}
            key={i}
            onPaste={handlePaste}
            {...characterProps}
          >
            {tan[i] || getPlaceholder()}
          </div>
        ))}
      </div>
      <style dangerouslySetInnerHTML={{ __html: style }} />
    </div>
  );
};

VerificationInput.propTypes = {
  length: PropTypes.number,
  validChars: PropTypes.string,
  placeholder: PropTypes.string,
  autoFocus: PropTypes.bool,
  removeDefaultStyles: PropTypes.bool,
  debug: PropTypes.bool,
  getInputRef: PropTypes.func,
  container: PropTypes.shape({
    className: PropTypes.string,
  }),
  inputField: PropTypes.shape({
    className: PropTypes.string,
  }),
  characters: PropTypes.shape({
    className: PropTypes.string,
  }),
  character: PropTypes.shape({
    className: PropTypes.string,
  }),
};

VerificationInput.defaultProps = {
  length: 6,
  validChars: "A-Za-z0-9",
  placeholder: "·",
  autoFocus: false,
  removeDefaultStyles: false,
  debug: false,
  container: {},
  inputField: {},
  characters: {},
  character: {},
  getInputRef: () => {},
};

export default VerificationInput;
