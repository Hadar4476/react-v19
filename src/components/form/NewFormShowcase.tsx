import { use, useActionState, useOptimistic, useState } from "react";

import { SampleContext } from "@/context/SampleContext";

import SubmitButton from "./SubmitButton";

const NewFormShowcase = () => {
  // "use" is a special hook in v19.
  const { executeRequest } = use(SampleContext) ?? {};

  const [counter, setCounter] = useState(0);

  const loginAction = async (prevState: any, formData: FormData) => {
    console.log({ formData });
    console.log({ prevState });

    const email = formData.get("email");
    const password = formData.get("password");

    console.log({ email });
    console.log({ password });

    const isEmailValid = `${email}`.includes("@");
    const isPasswordValid = `${password}`.length >= 6;

    let errors = [];

    if (!isEmailValid) {
      errors.push("Please enter a valid email");
    }

    if (!isPasswordValid) {
      errors.push("Please enter a valid password");
    }

    if (errors.length) {
      return {
        errors,
        enteredValues: {
          email: `${email}`,
          password: `${password}`,
        },
      };
    }

    await executeRequest?.();

    console.log("hello");

    return { errors: null };
  };

  const [formState, formAction, isPending] = useActionState(loginAction, null);

  // "useOptimistic" usage is for executing logic while the form is submitting.
  // in the case, I want to update counter regardless of the outcome(response from server).
  // during the submission, the counter will get update depends on the "operation" parameter.
  // if I just use "setOptimisticCounter" without "setCounter" then the counter will update but will get rolled back to the original state.
  const [optimisticCounter, setOptimisticCounter] = useOptimistic(
    counter,
    // "operation" is either "increase" or "decrease"
    (prevState, operation) =>
      operation === "increase" ? prevState + 1 : prevState - 1
  );

  const increaseAction = async (prevState: any, formData: FormData) => {
    console.log({ formData });

    setOptimisticCounter("increase");
    await new Promise((resolve) => setTimeout(resolve, 2000));

    // try commenting this out
    setCounter((prevState) => prevState + 1);
  };

  const decreaseAction = async (prevState: any, formData: FormData) => {
    console.log({ formData });

    setOptimisticCounter("decrease");
    await new Promise((resolve) => setTimeout(resolve, 2000));

    // try commenting this out
    setCounter((prevState) => prevState - 1);
  };

  const [increaseState, increaseCounterAction, isIncreasePending] =
    useActionState(increaseAction, null);
  const [decreaseState, decreaseCounterAction, isDecreasePending] =
    useActionState(decreaseAction, null);

  const errorElements = formState?.errors?.map((error, index) => {
    return <li key={index}>{error}</li>;
  });

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
      {/* this is a new feature in v19 called action. // as long as you have a
      button of type "submit" you can bind the action property to a async/sync
      function. // when submitting the form this function will be executed. //
      by default it already handles the "event.preventDefault()" behind the
      scenes. // it also provide the "FormData" value as an argument. */}
      <form action={formAction}>
        <div>
          <label htmlFor="email">Email</label>
          <input
            name="email"
            type="email"
            defaultValue={formState?.enteredValues?.email}
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            name="password"
            type="password"
            defaultValue={formState?.enteredValues?.password}
          />
        </div>

        {errorElements?.length! >= 0 && <ul>{errorElements}</ul>}

        <SubmitButton />
      </form>

      <form style={{ display: "flex", alignItems: "center", gap: "12px" }}>
        <button
          formAction={increaseCounterAction}
          disabled={isIncreasePending || isDecreasePending}
        >
          Increase
        </button>
        <h2>{optimisticCounter}</h2>
        <button
          formAction={decreaseCounterAction}
          disabled={isDecreasePending || isIncreasePending}
        >
          Decrease
        </button>
      </form>
    </div>
  );
};

export default NewFormShowcase;
