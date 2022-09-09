import userEvent from "@testing-library/user-event";
import {
  renderWithProvider,
  cleanup,
  fireEvent,
} from "../../../../../utils/test-utils";
import PrimaryButton from "../PrimaryButton";

const AddParticipantButtonText = "Add Participant";
const UpdateParticipantButtonText = "Update Participant";
const AddTrainingButtonText = "Add New Training";
const UpdateTrainingButtonText = "Update Training";

describe("button renders", () => {
  afterEach(() => cleanup());
  test("testing primary button on Add training", () => {
    const handleSubmit = jest.fn();
    const { getByRole } = renderWithProvider(
      <PrimaryButton text={AddTrainingButtonText} onClick={handleSubmit} />
    );
    const button = getByRole("button");
    expect(button).toHaveTextContent(AddTrainingButtonText);
    fireEvent.click(button);
    expect(handleSubmit).toHaveBeenCalledTimes(1);
  });

  test("testing primary button on update training", () => {
    const handleSubmit = jest.fn();
    const { getByRole } = renderWithProvider(
      <PrimaryButton text={UpdateTrainingButtonText} onClick={handleSubmit} />
    );
    const button = getByRole("button");
    expect(button).toHaveTextContent(UpdateTrainingButtonText);
    fireEvent.click(button);
    expect(handleSubmit).toHaveBeenCalledTimes(1);
  });

  test("testing primary button on add participant", () => {
    const handleSubmit = jest.fn();
    const { getByRole } = renderWithProvider(
      <PrimaryButton text={AddParticipantButtonText} onClick={handleSubmit} />
    );
    const button = getByRole("button");
    expect(button).toHaveTextContent(AddParticipantButtonText);
    fireEvent.click(button);
    expect(handleSubmit).toHaveBeenCalledTimes(1);
  });

  test("testing primary button on update participant", () => {
    const handleSubmit = jest.fn();
    const { getByRole } = renderWithProvider(
      <PrimaryButton
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
      <PrimaryButton
        text={UpdateParticipantButtonText}
        onClick={handleSubmit}
      />
    );
    const button = getByRole("button");
    expect(button).toHaveClass("primaryButton");
  });

  test("renders secondary button  unchanged", () => {
    const handleSubmit = jest.fn();
    const { container } = renderWithProvider(
      <PrimaryButton text={AddParticipantButtonText} onClick={handleSubmit} />
    );
    expect(container).toMatchSnapshot();
  });

  test("check  button attributes", () => {
    const handleSubmit = jest.fn();
    const props = {
      type: "submit",
    };
    const { getByRole } = renderWithProvider(
      <PrimaryButton
        text={AddTrainingButtonText}
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
