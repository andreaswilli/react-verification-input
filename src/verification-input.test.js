import React, { useState } from "react";
import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import VerificationInput from "./index";

describe("VerificationInput", () => {
  it("should render 6 empty fields with placeholder", () => {
    render(<VerificationInput />);

    expect(screen.getByTestId("container")).toHaveTextContent(/^······$/);
  });

  it("should change the number of fields", () => {
    render(<VerificationInput length={4} />);

    expect(screen.getByTestId("container")).toHaveTextContent(/^····$/);
  });

  it("should change the placeholder", () => {
    render(<VerificationInput placeholder="_" />);

    expect(screen.getByTestId("container")).toHaveTextContent(/^______$/);
  });

  it("should allow digits as well as upper- and lowercase letters", () => {
    render(<VerificationInput />);

    userEvent.type(screen.getByRole("textbox"), "0aA1bB");

    expect(screen.getByTestId("container")).toHaveTextContent(/^0aA1bB$/);
  });

  it("should not allow special characters", () => {
    render(<VerificationInput />);

    userEvent.type(screen.getByRole("textbox"), "abc$+!?def");

    expect(screen.getByTestId("container")).toHaveTextContent(/^abcdef$/);
  });

  it("should only allow digits", () => {
    render(<VerificationInput validChars="0-9" />);

    userEvent.type(screen.getByRole("textbox"), "0a1B2$3?4*5_");

    expect(screen.getByTestId("container")).toHaveTextContent(/^012345$/);
  });

  it("should not allow placeholder character", () => {
    render(<VerificationInput />);

    userEvent.type(screen.getByRole("textbox"), "·0·1·2");

    expect(screen.getByTestId("container")).toHaveTextContent(/^012···$/);
  });

  it("should insert valid code on paste", () => {
    render(<VerificationInput />);

    userEvent.paste(screen.getByRole("textbox"), "012345");

    expect(screen.getByTestId("container")).toHaveTextContent("012345");
  });

  it("should keep previous value if invalid code is pasted", () => {
    render(<VerificationInput />);
    userEvent.type(screen.getByRole("textbox"), "012345");

    userEvent.paste(screen.getByRole("textbox"), "abcdefg");

    expect(screen.getByTestId("container")).toHaveTextContent("012345");
  });

  it("should allow the code to have blanks when pasting", () => {
    render(<VerificationInput />);

    userEvent.paste(screen.getByRole("textbox"), "012 345");

    expect(screen.getByTestId("container")).toHaveTextContent("012345");
  });

  it("should auto focus the input if specified", async () => {
    render(<VerificationInput autoFocus />);

    await waitFor(() => {
      expect(screen.getByRole("textbox")).toHaveFocus();
    });
  });

  it("should select the rightmost active field", () => {
    render(<VerificationInput />);
    userEvent.type(screen.getByRole("textbox"), "01");
    const rightmostActiveField = screen.getByTestId("character-2");
    const inactiveField = screen.getByTestId("character-3");

    userEvent.click(inactiveField);

    expect(rightmostActiveField).toHaveClass(
      "vi__character--selected--default"
    );
  });

  it("should select the first field if empty", () => {
    render(<VerificationInput />);
    const rightmostField = screen.getByTestId("character-0");

    userEvent.click(screen.getByTestId("container"));

    expect(rightmostField).toHaveClass("vi__character--selected--default");
  });

  it("should select the next field", () => {
    render(<VerificationInput />);
    const nextField = screen.getByTestId("character-3");

    userEvent.type(screen.getByRole("textbox"), "012");

    expect(nextField).toHaveClass("vi__character--selected--default");
  });

  it("should select the last field if full", () => {
    render(<VerificationInput />);
    const lastField = screen.getByTestId("character-5");

    userEvent.type(screen.getByRole("textbox"), "012345");

    expect(lastField).toHaveClass("vi__character--selected--default");
  });

  it("should only activate one empty field to the right", () => {
    render(<VerificationInput />);

    userEvent.type(screen.getByRole("textbox"), "012");

    const emptyFields = screen.getAllByText("·");
    expect(emptyFields[0]).not.toHaveClass("vi__character--inactive--default");
    expect(emptyFields[1]).toHaveClass("vi__character--inactive--default");
    expect(emptyFields[2]).toHaveClass("vi__character--inactive--default");
  });

  it("should delete characters to the left (backspace)", () => {
    render(<VerificationInput />);
    userEvent.type(screen.getByRole("textbox"), "012345");

    userEvent.type(screen.getByRole("textbox"), "{backspace}");

    expect(screen.getByTestId("container")).toHaveTextContent(/^01234·$/);

    userEvent.type(screen.getByRole("textbox"), "{backspace}");

    expect(screen.getByTestId("container")).toHaveTextContent(/^0123··$/);
  });

  it("should not do anything when delete is pressed", () => {
    render(<VerificationInput />);
    userEvent.type(screen.getByRole("textbox"), "0123");

    expect(screen.getByTestId("container")).toHaveTextContent(/^0123··$/);

    userEvent.type(screen.getByRole("textbox"), "{del}");

    expect(screen.getByTestId("container")).toHaveTextContent(/^0123··$/);
  });

  it("should allow to delete all the characters", () => {
    render(<VerificationInput />);
    userEvent.type(screen.getByRole("textbox"), "01");

    userEvent.type(screen.getByRole("textbox"), "{backspace}{backspace}");

    expect(screen.getByTestId("container")).toHaveTextContent(/^······$/);
  });

  it("should not move the cursor position with arrow keys", () => {
    render(<VerificationInput />);
    const input = screen.getByRole("textbox");

    userEvent.type(input, "0{arrowleft}1{arrowright}2{arrowup}3{arrowdown}45");

    expect(screen.getByTestId("container")).toHaveTextContent("012345");
  });

  it("should not move the selection to an inactive field", () => {
    render(<VerificationInput />);
    const input = screen.getByRole("textbox");
    userEvent.type(input, "012");

    fireEvent.keyUp(input, {
      key: "ArrowRight",
      code: "ArrowRight",
      keyCode: 39,
    });

    expect(screen.getByTestId("character-3")).toHaveClass(
      "vi__character--selected--default"
    );
  });

  it("should select the first empty field when focused by tab key", () => {
    render(
      <>
        <button>other element</button>
        <VerificationInput />
      </>
    );
    userEvent.type(screen.getByRole("textbox"), "012");

    const otherElement = screen.getByText("other element");
    userEvent.click(otherElement);
    userEvent.tab(otherElement);

    expect(screen.getByTestId("character-3")).toHaveClass(
      "vi__character--selected--default"
    );
    expect(screen.getByTestId("container")).toHaveTextContent(/^012···$/);
    // TODO: by default this is behaving differently in a real browser (whole
    //       value gets selected), how to test?
    expect(screen.getByRole("textbox").selectionStart).toBe(3);

    userEvent.type(screen.getByRole("textbox"), "34");
    userEvent.click(otherElement);
    userEvent.tab(otherElement);

    expect(screen.getByTestId("character-5")).toHaveClass(
      "vi__character--selected--default"
    );
    expect(screen.getByTestId("container")).toHaveTextContent(/^01234·$/);
    expect(screen.getByRole("textbox").selectionStart).toBe(5);
  });

  it("should trigger onChange callback", () => {
    const spyHandleChange = jest.fn();

    const Wrapper = () => {
      const [value, _setValue] = useState("");

      const setValue = (v) => {
        spyHandleChange(v);
        _setValue(v);
      };

      return <VerificationInput value={value} onChange={setValue} />;
    };
    render(<Wrapper />);

    userEvent.type(screen.getByRole("textbox"), "01");

    expect(spyHandleChange).toHaveBeenCalledTimes(2);
    expect(spyHandleChange).toHaveBeenCalledWith("0");
    expect(spyHandleChange).toHaveBeenCalledWith("01");
  });

  it("should trigger onChange callback even if value is not provided", () => {
    const spyHandleChange = jest.fn();

    render(<VerificationInput onChange={spyHandleChange} />);

    userEvent.type(screen.getByRole("textbox"), "01");

    expect(spyHandleChange).toHaveBeenCalledTimes(2);
    expect(spyHandleChange).toHaveBeenCalledWith("0");
    expect(spyHandleChange).toHaveBeenCalledWith("01");
  });

  it("should trigger onFocus and onBlur callbacks", () => {
    const spyHandleFocus = jest.fn();
    const spyHandleBlur = jest.fn();
    render(
      <>
        <VerificationInput onFocus={spyHandleFocus} onBlur={spyHandleBlur} />
        <div>other element</div>
      </>
    );

    userEvent.click(screen.getByTestId("container"));
    userEvent.click(screen.getByText("other element"));

    expect(spyHandleFocus).toHaveBeenCalledTimes(1);
    expect(spyHandleBlur).toHaveBeenCalledTimes(1);
  });

  it("should provide ref as object", () => {
    const inputRef = React.createRef();
    render(<VerificationInput ref={inputRef} />);

    userEvent.type(screen.getByRole("textbox"), "123456");

    expect(inputRef.current).toHaveValue("123456");
  });

  it("should provide ref as function", () => {
    const inputRef = React.createRef();
    render(
      <VerificationInput
        ref={(node) => {
          inputRef.current = node;
        }}
      />
    );

    userEvent.type(screen.getByRole("textbox"), "123456");

    expect(inputRef.current).toHaveValue("123456");
  });

  it("should apply custom class names", () => {
    render(
      <VerificationInput
        classNames={{
          container: "custom-container",
          character: "custom-character",
          characterInactive: "custom-character-inactive",
          characterSelected: "custom-character-selected",
        }}
        autoFocus
      />
    );

    expect(screen.getByTestId("container")).toHaveClass("custom-container");
    expect(screen.getByTestId("character-0")).toHaveClass(
      "custom-character",
      "custom-character-selected"
    );
    expect(screen.getByTestId("character-1")).toHaveClass(
      "custom-character",
      "custom-character-inactive"
    );
    expect(screen.getByTestId("character-2")).toHaveClass(
      "custom-character",
      "custom-character-inactive"
    );
    expect(screen.getByTestId("character-3")).toHaveClass(
      "custom-character",
      "custom-character-inactive"
    );
    expect(screen.getByTestId("character-4")).toHaveClass(
      "custom-character",
      "custom-character-inactive"
    );
    expect(screen.getByTestId("character-5")).toHaveClass(
      "custom-character",
      "custom-character-inactive"
    );
  });

  it("should forward inputProps to input element", () => {
    render(<VerificationInput inputProps={{ type: "tel" }} />);

    expect(screen.getByRole("textbox")).toHaveAttribute("type", "tel");
  });

  it("should forward containerProps to container element", () => {
    render(<VerificationInput containerProps={{ prop: "value" }} />);

    expect(screen.getByTestId("container")).toHaveAttribute("prop", "value");
  });

  it("should apply default styles by default", () => {
    render(<VerificationInput autoFocus />);

    expect(screen.getByTestId("container")).toHaveClass(
      "vi__container--default"
    );
    expect(screen.getByTestId("character-0")).toHaveClass(
      "vi__character--default",
      "vi__character--selected--default"
    );
    expect(screen.getByTestId("character-1")).toHaveClass(
      "vi__character--default",
      "vi__character--inactive--default"
    );
  });

  it("should remove default styles if removeDefaultStyles is true", () => {
    render(<VerificationInput autoFocus removeDefaultStyles />);

    expect(screen.getByTestId("container")).not.toHaveClass(
      "vi__container--default"
    );
    expect(screen.getByTestId("character-0")).not.toHaveClass(
      "vi__character--default",
      "vi__character--selected--default"
    );
    expect(screen.getByTestId("character-1")).not.toHaveClass(
      "vi__character--default",
      "vi__character--inactive--default"
    );
  });
});
