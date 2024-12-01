import React, { useState } from "react";
import {
  act,
  render,
  screen,
  waitFor,
  fireEvent,
} from "@testing-library/react";
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

  it("should allow digits as well as upper- and lowercase letters", async () => {
    render(<VerificationInput />);

    await userEvent.type(screen.getByRole("textbox"), "0aA1bB");

    expect(screen.getByTestId("container")).toHaveTextContent(/^0aA1bB$/);
  });

  it("should not allow special characters", async () => {
    render(<VerificationInput />);

    await userEvent.type(screen.getByRole("textbox"), "abc$+!?def");

    expect(screen.getByTestId("container")).toHaveTextContent(/^abcdef$/);
  });

  it("should only allow digits", async () => {
    render(<VerificationInput validChars="0-9" />);

    await userEvent.type(screen.getByRole("textbox"), "0a1B2$3?4*5_");

    expect(screen.getByTestId("container")).toHaveTextContent(/^012345$/);
  });

  it("Should show only (*) in password mode", async () => {
    render(<VerificationInput passwordMode={true} />);

    await userEvent.type(screen.getByLabelText("verification input"), "012345");

    expect(screen.getByTestId("container")).toHaveTextContent(/^\*\*\*\*\*\*$/);
  });

  it("Should show only custom password character (e.g., '!') in password mode", async () => {
    render(<VerificationInput passwordMode={true} passwordChar="!" />);

    await userEvent.type(screen.getByLabelText("verification input"), "012345");

    expect(screen.getByTestId("container")).toHaveTextContent(/^!!!!!!$/);
  });

  it("should not allow placeholder character", async () => {
    render(<VerificationInput />);

    await userEvent.type(screen.getByRole("textbox"), "·0·1·2");

    expect(screen.getByTestId("container")).toHaveTextContent(/^012···$/);
  });

  it("should insert valid code on paste", async () => {
    render(<VerificationInput />);

    act(() => screen.getByRole("textbox").focus());
    await userEvent.paste("012345");

    expect(screen.getByTestId("container")).toHaveTextContent("012345");
  });

  it("should keep previous value if invalid code is pasted", async () => {
    render(<VerificationInput />);
    await userEvent.type(screen.getByRole("textbox"), "012345");

    act(() => screen.getByRole("textbox").focus());
    await userEvent.paste("abcdefg");

    expect(screen.getByTestId("container")).toHaveTextContent("012345");
  });

  it("should allow the code to have blanks when pasting", async () => {
    render(<VerificationInput />);

    act(() => screen.getByRole("textbox").focus());
    await userEvent.paste("012 345");

    expect(screen.getByTestId("container")).toHaveTextContent("012345");
  });

  it("should auto focus the input if specified", async () => {
    render(<VerificationInput autoFocus />);

    await waitFor(() => {
      expect(screen.getByRole("textbox")).toHaveFocus();
    });
  });

  it("should select the rightmost active field", async () => {
    render(<VerificationInput />);
    await userEvent.type(screen.getByRole("textbox"), "01");
    const rightmostActiveField = screen.getByTestId("character-2");
    const inactiveField = screen.getByTestId("character-3");

    await userEvent.click(inactiveField);

    expect(rightmostActiveField).toHaveClass("vi__character--selected");
  });

  it("should select the first field if empty", async () => {
    render(<VerificationInput />);
    const rightmostField = screen.getByTestId("character-0");

    await userEvent.click(screen.getByTestId("container"));

    expect(rightmostField).toHaveClass("vi__character--selected");
  });

  it("should select the next field", async () => {
    render(<VerificationInput />);
    const nextField = screen.getByTestId("character-3");

    await userEvent.type(screen.getByRole("textbox"), "012");

    expect(nextField).toHaveClass("vi__character--selected");
  });

  it("should select the last field if full", async () => {
    render(<VerificationInput />);
    const lastField = screen.getByTestId("character-5");

    await userEvent.type(screen.getByRole("textbox"), "012345");

    expect(lastField).toHaveClass("vi__character--selected");
  });

  it("should only activate one empty field to the right", async () => {
    render(<VerificationInput />);

    await userEvent.type(screen.getByRole("textbox"), "012");

    const emptyFields = screen.getAllByText("·");
    expect(emptyFields[0]).not.toHaveClass("vi__character--inactive");
    expect(emptyFields[1]).toHaveClass("vi__character--inactive");
    expect(emptyFields[2]).toHaveClass("vi__character--inactive");
  });

  it("should delete characters to the left (backspace)", async () => {
    render(<VerificationInput />);
    await userEvent.type(screen.getByRole("textbox"), "012345");

    await userEvent.type(screen.getByRole("textbox"), "{backspace}");

    expect(screen.getByTestId("container")).toHaveTextContent(/^01234·$/);

    await userEvent.type(screen.getByRole("textbox"), "{backspace}");

    expect(screen.getByTestId("container")).toHaveTextContent(/^0123··$/);
  });

  it("should not do anything when delete is pressed", async () => {
    render(<VerificationInput />);
    await userEvent.type(screen.getByRole("textbox"), "0123");

    expect(screen.getByTestId("container")).toHaveTextContent(/^0123··$/);

    await userEvent.type(screen.getByRole("textbox"), "{Delete}");

    expect(screen.getByTestId("container")).toHaveTextContent(/^0123··$/);
  });

  it("should allow to delete all the characters", async () => {
    render(<VerificationInput />);
    await userEvent.type(screen.getByRole("textbox"), "01");

    await userEvent.type(screen.getByRole("textbox"), "{backspace}{backspace}");

    expect(screen.getByTestId("container")).toHaveTextContent(/^······$/);
  });

  it("should not move the cursor position with arrow keys", async () => {
    render(<VerificationInput />);
    const input = screen.getByRole("textbox");

    await userEvent.type(
      input,
      "0{arrowleft}1{arrowright}2{arrowup}3{arrowdown}45"
    );

    expect(screen.getByTestId("container")).toHaveTextContent("012345");
  });

  it("should not move the selection to an inactive field", async () => {
    render(<VerificationInput />);
    const input = screen.getByRole("textbox");
    await userEvent.type(input, "012");

    fireEvent.keyUp(input, { key: "ArrowRight", code: "ArrowRight" });

    expect(screen.getByTestId("character-3")).toHaveClass(
      "vi__character--selected"
    );
  });

  it("should select the first empty field when focused by tab key", async () => {
    render(
      <>
        <button>other element</button>
        <VerificationInput />
      </>
    );
    await userEvent.type(screen.getByRole("textbox"), "012");

    const otherElement = screen.getByText("other element");
    await userEvent.click(otherElement);
    await userEvent.tab(otherElement);

    expect(screen.getByTestId("character-3")).toHaveClass(
      "vi__character--selected"
    );
    expect(screen.getByTestId("container")).toHaveTextContent(/^012···$/);
    // selectionStart is still 0 (but in the browser it works correctly)
    expect(screen.getByRole("textbox").selectionEnd).toBe(3);

    await userEvent.type(screen.getByRole("textbox"), "34");
    await userEvent.click(otherElement);
    await userEvent.tab(otherElement);

    expect(screen.getByTestId("character-5")).toHaveClass(
      "vi__character--selected"
    );
    expect(screen.getByTestId("container")).toHaveTextContent(/^01234·$/);
    act(() => screen.getByRole("textbox").focus());
    // selectionStart is still 0 (but in the browser it works correctly)
    expect(screen.getByRole("textbox").selectionEnd).toBe(5);
  });

  it("should trigger onChange callback", async () => {
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

    await userEvent.type(screen.getByRole("textbox"), "01");

    expect(spyHandleChange).toHaveBeenCalledTimes(2);
    expect(spyHandleChange).toHaveBeenCalledWith("0");
    expect(spyHandleChange).toHaveBeenCalledWith("01");
  });

  it("should trigger onChange callback even if value is not provided", async () => {
    const spyHandleChange = jest.fn();

    render(<VerificationInput onChange={spyHandleChange} />);

    await userEvent.type(screen.getByRole("textbox"), "01");

    expect(spyHandleChange).toHaveBeenCalledTimes(2);
    expect(spyHandleChange).toHaveBeenCalledWith("0");
    expect(spyHandleChange).toHaveBeenCalledWith("01");
  });

  it("should trigger onComplete callback when value.length is equal to length", async () => {
    const spyOnComplete = jest.fn();

    render(<VerificationInput onComplete={spyOnComplete} />);

    await userEvent.type(screen.getByRole("textbox"), "012345");

    expect(spyOnComplete).toHaveBeenCalledTimes(1);
    expect(spyOnComplete).toHaveBeenCalledWith("012345");
  });

  it("should trigger onFocus and onBlur callbacks", async () => {
    const spyHandleFocus = jest.fn();
    const spyHandleBlur = jest.fn();
    render(
      <>
        <VerificationInput onFocus={spyHandleFocus} onBlur={spyHandleBlur} />
        <div>other element</div>
      </>
    );

    await userEvent.click(screen.getByTestId("container"));
    await userEvent.click(screen.getByText("other element"));

    expect(spyHandleFocus).toHaveBeenCalledTimes(1);
    expect(spyHandleBlur).toHaveBeenCalledTimes(1);
  });

  it("should provide ref as object", async () => {
    const inputRef = React.createRef();
    render(<VerificationInput ref={inputRef} />);

    await userEvent.type(screen.getByRole("textbox"), "123456");

    expect(inputRef.current).toHaveValue("123456");
  });

  it("should provide ref as function", async () => {
    const inputRef = React.createRef();
    render(
      <VerificationInput
        ref={(node) => {
          inputRef.current = node;
        }}
      />
    );

    await userEvent.type(screen.getByRole("textbox"), "123456");

    expect(inputRef.current).toHaveValue("123456");
  });

  it("should apply class names", async () => {
    render(<VerificationInput value="22" autoFocus />);

    expect(screen.getByTestId("character-0")).toHaveClass(
      "vi__character",
      "vi__character--filled"
    );
    expect(screen.getByTestId("character-1")).toHaveClass(
      "vi__character",
      "vi__character--filled"
    );
    expect(screen.getByTestId("character-2")).toHaveClass(
      "vi__character",
      "vi__character--selected"
    );
    expect(screen.getByTestId("character-3")).toHaveClass(
      "vi__character",
      "vi__character--inactive"
    );
    expect(screen.getByTestId("character-4")).toHaveClass(
      "vi__character",
      "vi__character--inactive"
    );
    expect(screen.getByTestId("character-5")).toHaveClass(
      "vi__character",
      "vi__character--inactive"
    );
  });

  it("should apply selected and filled to last character if value is complete", () => {
    render(<VerificationInput value="123456" autoFocus />);

    expect(screen.getByTestId("character-4")).toHaveClass(
      "vi__character--filled"
    );
    expect(screen.getByTestId("character-5")).toHaveClass(
      "vi__character--filled",
      "vi__character--selected"
    );
  });

  it("should apply custom class names", () => {
    render(
      <VerificationInput
        value="22"
        classNames={{
          container: "custom-container",
          character: "custom-character",
          characterInactive: "custom-character-inactive",
          characterSelected: "custom-character-selected",
          characterFilled: "custom-character-filled",
        }}
        autoFocus
      />
    );

    expect(screen.getByTestId("container")).toHaveClass("custom-container");
    expect(screen.getByTestId("character-0")).toHaveClass(
      "custom-character",
      "custom-character-filled"
    );
    expect(screen.getByTestId("character-1")).toHaveClass(
      "custom-character",
      "custom-character-filled"
    );
    expect(screen.getByTestId("character-2")).toHaveClass(
      "custom-character",
      "custom-character-selected"
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

  it("should not have undefined class name", () => {
    render(<VerificationInput />);

    expect(screen.getByTestId("container")).not.toHaveClass("undefined");
    expect(screen.getByTestId("character-0")).not.toHaveClass("undefined");
    expect(screen.getByTestId("character-1")).not.toHaveClass("undefined");
    expect(screen.getByTestId("character-2")).not.toHaveClass("undefined");
    expect(screen.getByTestId("character-3")).not.toHaveClass("undefined");
    expect(screen.getByTestId("character-4")).not.toHaveClass("undefined");
    expect(screen.getByTestId("character-5")).not.toHaveClass("undefined");
  });

  it("should forward inputProps to input element", () => {
    render(<VerificationInput inputProps={{ type: "tel" }} />);

    expect(screen.getByRole("textbox")).toHaveAttribute("type", "tel");
  });

  it("should combine default and custom class names on input", () => {
    render(<VerificationInput inputProps={{ className: "custom" }} />);

    expect(screen.getByRole("textbox")).toHaveClass("vi custom");
  });

  it("should combine default and custom class names on container", () => {
    render(
      <VerificationInput
        classNames={{ container: "custom-1" }}
        containerProps={{ className: "custom-2" }}
      />
    );

    expect(screen.getByTestId("container")).toHaveClass(
      "vi__container custom-1 custom-2"
    );
  });

  it("should forward containerProps to container element", () => {
    render(<VerificationInput containerProps={{ prop: "value" }} />);

    expect(screen.getByTestId("container")).toHaveAttribute("prop", "value");
  });

  it("should disable spell check", () => {
    render(<VerificationInput />);

    expect(screen.getByRole("textbox")).toHaveAttribute("spellcheck", "false");
  });

  it("should remove selection after disabling input", () => {
    const { rerender } = render(
      <VerificationInput
        value={"1"}
        length={3}
        autoFocus={true}
        inputProps={{ disabled: false }}
      />
    );

    expect(screen.getByTestId("character-0")).toHaveClass(
      "vi__character",
      "vi__character--filled"
    );
    expect(screen.getByTestId("character-1")).toHaveClass(
      "vi__character",
      "vi__character--selected"
    );
    expect(screen.getByTestId("character-2")).toHaveClass(
      "vi__character",
      "vi__character--inactive"
    );

    rerender(
      <VerificationInput
        value={"1"}
        length={3}
        autoFocus={true}
        inputProps={{ disabled: true }}
      />
    );

    expect(screen.getByTestId("character-0")).toHaveClass(
      "vi__character",
      "vi__character--filled"
    );
    expect(screen.getByTestId("character-1")).toHaveClass("vi__character");
    expect(screen.getByTestId("character-2")).toHaveClass(
      "vi__character",
      "vi__character--inactive"
    );
  });
});
