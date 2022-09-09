import userEvent from "@testing-library/user-event";
import {
  renderWithProvider,
  cleanup,
  fireEvent,
} from "../../../../../utils/test-utils";
import SecondaryButton from "../SecondaryButton";

const AddParticipantButtonText = "Add Participant";
const UpdateParticipantButtonText = "Update Participant";

describe("button renders", () => {
  afterEach(() => cleanup());
  test("testing primary button on add participant", () => {
    const handleSubmit = jest.fn();
    const { getByRole } = renderWithProvider(
      <SecondaryButton text={AddParticipantButtonText} onClick={handleSubmit} />
    );
    const button = getByRole("button");
    expect(button).toHaveTextContent(AddParticipantButtonText);
    fireEvent.click(button);
    expect(handleSubmit).toHaveBeenCalledTimes(1);
  });

  test("testing primary button on update participant", () => {
    const handleSubmit = jest.fn();
    const { getByRole } = renderWithProvider(
      <SecondaryButton
        text={UpdateParticipantButtonText}
        onClick={handleSubmit}
      />
    );
    const button = getByRole("button");
    expect(button).toHaveTextContent(UpdateParticipantButtonText);
    fireEvent.click(button);
    expect(handleSubmit).toHaveBeenCalledTimes(1);
  });

  test("check if button has a css class", () => {
    const handleSubmit = jest.fn();
    const { getByRole } = renderWithProvider(
      <SecondaryButton
        text={UpdateParticipantButtonText}
        onClick={handleSubmit}
      />
    );
    const button = getByRole("button");
    expect(button).toHaveClass("secondaryButton");
  });

  test("renders secondary button  unchanged", () => {
    const handleSubmit = jest.fn();
    const { container } = renderWithProvider(
      <SecondaryButton text={AddParticipantButtonText} onClick={handleSubmit} />
    );
    expect(container).toMatchSnapshot();
  });

  test("check  button attributes", () => {
    const handleSubmit = jest.fn();
    const props = {
      type: "submit",
    };
    const { getByRole } = renderWithProvider(
      <SecondaryButton
        text={UpdateParticipantButtonText}
        onClick={handleSubmit}
        {...props}
      />
    );
    const button = getByRole("button");
    expect(button).not.toHaveAttribute("disabled");
    expect(button).toHaveAttribute("type", "submit");
    expect(button).not.toHaveAttribute("type", "button");
  });
});
