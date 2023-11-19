declare global {
  export interface FormProps {
    id?: number | string;
    onSuccessfulSubmit?: () => void;
  }
}

export {};
