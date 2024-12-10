import { useFormStatus } from "react-dom";

const SubmitButton = () => {
  // this hook is ONLY available in nested components of <form></form> element.
  const { pending } = useFormStatus();

  return (
    <button type="submit" disabled={pending}>
      {pending ? "Loading" : "Submit"}
    </button>
  );
};

export default SubmitButton;
