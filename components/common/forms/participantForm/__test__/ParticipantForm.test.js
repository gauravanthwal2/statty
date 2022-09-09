import userEvent from "@testing-library/user-event";
import {
  renderWithProvider,
  cleanup,
  screen,
  waitFor,
  fireEvent,
} from "../../../../../utils/test-utils";
import ParticipantForm from "../ParticipantForm";

function renderProvider(component) {
  return renderWithProvider(component);
}

describe("participant form renders", () => {
  afterEach(() => cleanup());
  test("testing labels in the form", () => {
    const selected = jest.fn();
    const { getByText, getAllByLabelText} = renderWithProvider(
      <ParticipantForm isEditable={true} selected={selected}  />
    );
     expect(getByText(/Oracle ID */i)).toBeInTheDocument();
     expect(getByText(/First Name */i)).toBeInTheDocument();
     expect(getByText(/Last Name */i)).toBeInTheDocument();
     screen.debug();
  });

  test("add participant text shows up on add button click", () => {
    const selected = jest.fn();
    const { getByRole } = renderWithProvider(
      <ParticipantForm isEditable={false} selected={selected} />
    );
    expect(getByRole("button")).toHaveTextContent(/Add Participant/i);
  });

  test("add participant text shows up on update button click", () => {
    const selected = jest.fn();
    const { getByRole } = renderWithProvider(
      <ParticipantForm isEditable={true}  />
    );
    expect(getByRole("button")).toHaveTextContent(/Update Participant/i);
  });

  test("testing select boxes for update participant", async () => {
    const selected = jest.fn();
    const { getByTestId, getByRole, getAllByTestId } = renderProvider(
      <ParticipantForm isEditable={true}  />
    );
    const phase = [
      "Upcoming",
      "Sessions in progress",
      "Capstone Phase",
      "Assessment Phase",
      "Finished",
    ];
    const select = getByTestId("select-participant");
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
    expect(getAllByTestId("select-option-participant").length).toBe(5);
  });

  // test("renders particpant page unchanged", () => {
  //   const selected = jest.fn();
  //   const { container } = renderProvider(
  //     <ParticipantForm isEditable={true}  selected={selected} />
  //   );
  //   expect(container).toMatchSnapshot();
  // });

});
