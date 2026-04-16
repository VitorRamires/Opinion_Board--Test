import { useFormStatus } from "react-dom";

export function Submit() {
  const { pending } = useFormStatus();

  return (
    <p className="actions">
      <button disabled={pending} type="submit">
        {pending ? "Submitting..." : "Submit"}
      </button>
    </p>
  );
}
