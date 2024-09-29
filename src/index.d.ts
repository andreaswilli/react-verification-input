export interface VerificationInputProps {
  value?: string;
  length?: number;
  validChars?: string;
  placeholder?: string;
  autoFocus?: boolean;
  passwordMode?: boolean;
  passwordChar?: string;
  inputProps?: React.ComponentPropsWithRef<"input">;
  containerProps?: React.ComponentPropsWithRef<"div">;
  classNames?: {
    container?: string;
    character?: string;
    characterInactive?: string;
    characterSelected?: string;
    characterFilled?: string;
  };
  onChange?: (value: string) => void;
  onFocus?: () => void;
  onBlur?: () => void;
  onComplete?: (value: string) => void;
}

declare const VerificationInput: React.ForwardRefExoticComponent<
  React.PropsWithoutRef<VerificationInputProps> &
    React.RefAttributes<HTMLInputElement>
>;
export default VerificationInput;
