import userEvent from "@testing-library/user-event";
import {
  renderWithProvider,
  cleanup,
  screen,
  fireEvent,
} from "../../../../../utils/test-utils";
import TrainingForm from "../TrainingForm";

function renderProvider(component) {
  return renderWithProvider(component);
}

describe("training form renders", () => {
  afterEach(() => cleanup());
  test("testing labels in the form", () => {
    const { getByText } = renderWithProvider(
      <TrainingForm isEditMode={false} isEditable={true} />
    );
    expect(getByText(/Training Code */i)).toBeInTheDocument();
    expect(getByText(/Training Name */i)).toBeInTheDocument();
    screen.debug();
  });

  test("add training text shows up on add button click", () => {
    const { getByRole } = renderWithProvider(
      <TrainingForm isEditMode={false} isEditable={true} />
    );
    expect(getByRole("button")).toHaveTextContent(/Add New Training/i);
  });

  test("update training text shows up on update button click ", () => {
    const { getByRole } = renderWithProvider(
      <TrainingForm isEditMode={true} isEditable={true} />
    );
    expect(getByRole("button")).toHaveTextContent(/Update Training/i);
  });

  test("check values on onChange handler", async () => {
    const { getByLabelText } = renderProvider(
      <TrainingForm isEditMode={false} isEditable={true} />
    );
    const trainingCode = getByLabelText(/Training Code */i);
    expect(trainingCode).toHaveProperty("required", true);
    await userEvent.type(trainingCode, "React101");
    expect(trainingCode).toHaveValue("React101");
  });

  test("testing select boxes", async () => {
    const { getByTestId, getByRole, getAllByTestId } = renderProvider(
      <TrainingForm isEditMode={true} isEditable={true} />
    );

    const phase = [
      "Upcoming",
      "Sessions in progress",
      "Capstone phase",
      "Assessment phase",
      "Finished",
    ];

    const select = getByTestId("select");
    await userEvent.selectOptions(select, phase[0]);
    expect(getByRole("option", { name: phase[0] }).selected).toBeTruthy();
    expect(getByRole("option", { name: phase[0] })).toHaveTextContent(
      "Upcoming"
    );
    await userEvent.selectOptions(select, phase[1]);
    expect(getByRole("option", { name: phase[1] }).selected).toBeTruthy();
    expect(getByRole("option", { name: phase[1] })).toHaveTextContent(
      "Sessions in progress"
    );
    await userEvent.selectOptions(select, phase[2]);
    expect(getByRole("option", { name: phase[2] }).selected).toBeTruthy();
    expect(getAllByTestId("select-option").length).toBe(5);
    // await userEvent.deselectOptions(select, phase[2]); //for non multiple elements
    // expect(getByRole("option", { name: phase[2] }).selected).toBe(false);
  });

  test("upload multiple files", async () => {
    const handleFiles = jest.fn();
    const { getByTestId, getByLabelText } = renderProvider(
      <>
        <label htmlFor="attachments">Documents</label>
        <input
          type="file"
          id="attachments"
          data-testid="fileInput"
          onChange={handleFiles}
          accept=".jpg, .jpeg, .pdf"
          multiple={true}
        />
      </>
    );

    //Mock files for the test
    const files = [
      new File(["logo"], "logo.jpeg", { type: "image/jpeg" }),
      new File(["background"], "background.jpg", { type: "image/jpg" }),
      new File(["resume"], "resume.pdf", { type: "application/pdf" }),
      new File(["statty"], "statty.pptx.", {
        type: "application/vnd.openxmlformats-officedocument.presentationml.presentation",
      }),
    ];

    const inputField = getByTestId("fileInput");
    const input = getByLabelText(/Documents/i);
    // await userEvent.upload(input, files);
    fireEvent.change(inputField, { target: { files } });

    expect(handleFiles).toHaveBeenCalledTimes(1);

    expect(input.files).toHaveLength(4);
    expect(input.files[0]).toBe(files[0]);
    expect(input.files[1]).toBe(files[1]);

    //Checking file names
    expect(inputField.files[0].name).toBe("logo.jpeg");
    expect(inputField.files[1].name).toBe("background.jpg");
    expect(inputField.files[2].name).toBe("resume.pdf");

    //Checking file types
    expect(inputField.files[0].type).toBe("image/jpeg");
    expect(inputField.files[1].type).toBe("image/jpg");
    expect(inputField.files[2].type).toBe("application/pdf");
  });

  test("renders Training page unchanged", () => {
    const { container } = renderProvider(
      <TrainingForm isEditMode={true} isEditable={true} />
    );
    expect(container).toMatchSnapshot();
  });
});
