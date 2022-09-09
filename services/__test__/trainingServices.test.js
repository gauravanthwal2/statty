import axios from "axios";
import MockAdapter from "axios-mock-adapter";

const mock = new MockAdapter(axios);

const mockedData = [
  {
    trainingCode: "REACT301",
    trainingName: "React XT  401",
    startDate: "2022-09-01",
    phase: "",
    type: "Instructor led",
    endDate: "2022-09-20",
    status: "In Progress",
    PPC_OracleID: "pawankum",
    PPC_FirstName: "Pawan",
    PPC_LastName: "Kumar",
    PPC_Email: "pawan.kumar@publicissapient.com",
    SPC_oracleID: "arindamdat",
    SPC_FirstName: "Arindam",
    SPC_LastName: "Dutta",
    SPC_Email: "arindam.dutta@publicissapient.com",
    oracleID: "pawankum ,arindamdat ",
    docs: [],
    id: "594ca5e4-5613-46e1-a80e-931b26e58945",
  },
];

const trainingCode = "REACT301";

describe("axios runs", () => {
  test("should allow mocked api calls", async () => {
    //Get All Trainings
    mock.onGet("/trainings").reply(200, mockedData);
    const { data } = await axios.get("/trainings");
    expect(data).toEqual(mockedData);
  });

  test("get a training by id ", async () => {
    //Get Training By Id
    mock
      .onGet("/trainings", { params: { trainingCode } })
      .reply(200, mockedData);
    await axios
      .get("/trainings", {
        params: { trainingCode },
      })
      .then(function (response) {
        console.log(response.data);
      });
  });

  test("add a new training", async () => {
    //Add New Training
    mock
      .onPost("/trainings", { params: { data: mockedData } })
      .reply(201, mockedData);
    await axios
      .get("/trainings", {
        params: { data: mockedData },
      })
      .then(function (response) {
        console.log(response.data);
      });
  });

  test("update a new training", async () => {
    //Update Training
    mock
      .onPut("/trainings", { params: { id: trainingCode, data: mockedData } })
      .reply(200, mockedData);
    await axios
      .get("/trainings", {
        params: { id: trainingCode, data: mockedData },
      })
      .then(function (response) {
        console.log(response.data);
      });
  });

  test("delete a training by id ", async () => {
    //Delete Training
    mock
      .onDelete("/trainings", { params: { id: trainingCode } })
      .reply(200, mockedData);
    await axios
      .get("/trainings", { params: { id: trainingCode } })
      .then(function (response) {
        console.log(response.data);
      });
  });
});
