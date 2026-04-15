import { useActionState, use } from "react";
import { OpinionsContext } from "../store/opinions-context";

export function NewOpinion() {
  const { addOpinion } = use(OpinionsContext);
  const [formState, formAction] = useActionState(handleSubmitOpinion, {
    errors: null,
  });

  async function handleSubmitOpinion(prevFormState, formData) {
    const userName = formData.get("userName");
    const title = formData.get("title");
    const body = formData.get("body");

    const errors = [];

    if (userName === "") {
      errors.push("fill the name input");
    }

    if (title === "") {
      errors.push("fill the title input");
    }

    if (body === "") {
      errors.push("fill the your opinion text area");
    }

    if (errors.length > 0)
      return { errors, inputValues: { userName, title, body } };

    await addOpinion({ title, body, userName });
    return { errors: null };
  }

  return (
    <div id="new-opinion">
      <h2>Share your opinion!</h2>
      <form action={formAction}>
        <div className="control-row">
          <p className="control">
            <label htmlFor="userName">Your Name</label>
            <input
              type="text"
              id="userName"
              name="userName"
              defaultValue={formState.inputValues?.userName}
            />
          </p>

          <p className="control">
            <label htmlFor="title">Title</label>
            <input
              type="text"
              id="title"
              name="title"
              defaultValue={formState.inputValues?.title}
            />
          </p>
        </div>
        <p className="control">
          <label htmlFor="body">Your Opinion</label>
          <textarea
            id="body"
            name="body"
            rows={5}
            defaultValue={formState.inputValues?.body}
          ></textarea>
        </p>

        <p className="actions">
          <button type="submit">Submit</button>
        </p>

        {formState.errors && (
          <ul>
            {formState.errors.map((error) => (
              <li>{error}</li>
            ))}
          </ul>
        )}
      </form>
    </div>
  );
}
