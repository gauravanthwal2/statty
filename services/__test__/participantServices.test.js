import axios from "axios";
import MockAdapter from "axios-mock-adapter";

const mock = new MockAdapter(axios);
const mockedData = [
  {
    FirstName: "Gaurav",
    LastName: "Anthwal",
    Email: "gaurav.anthwal@publicissapient.com",
    CareerStage: "Associate Technology L2",
    TrainingName: "Core XT Training",
    StartDate: "2022-09-01",
    EndDate: "2022-09-05",
    Phase: "Sessions in progress",
    Status: "Open",
    OracleId: "gauravanth",
    TrainingCode: "1110",
    id: "17adc87a-4608-43e7-85cf-10ce03d4ec60",
  },
];

const OracleId = "gauravanth";

describe("axios runs", () => {
  test("should allow mocked api calls", async () => {
    //Get All Participants
    mock.onGet("/participants").reply(200, mockedData);
    const { data } = await axios.get("/participants");
    expect(data).toEqual(mockedData);
  });

  test("get participat by id", async () => {
    //Get Participant By Id
    mock
      .onGet("/participants", { params: { OracleId } })
      .reply(200, mockedData);
    await axios
      .get("/participants", {
        params: { OracleId },
      })
      .then(function (response) {
        console.log(response.data);
      });
  });

  test("add a new training", async () => {
    //Add New Participant
    mock
      .onPost("/participants", { params: { data: mockedData } })
      .reply(200, mockedData);
    await axios
      .get("/participants", {
        params: { data: mockedData },
      })
      .then(function (response) {
        console.log(response.data);
      });
  });

  test("update a training", async () => {
    //Update Participant
    mock
      .onPut("/participants", { params: { id: OracleId, data: mockedData } })
      .reply(200, mockedData);
    await axios
      .get("/participants", {
        params: { id: OracleId, data: mockedData },
      })
      .then(function (response) {
        console.log(response.data);
      });
  });

  test("delete a training", async () => {
    //Delete Participant
    mock
      .onDelete("/participants", { params: { id: OracleId } })
      .reply(200, mockedData);
    await axios
      .get("/participants", { params: { id: OracleId } })
      .then(function (response) {
        console.log(response.data);
      });
  });
});
