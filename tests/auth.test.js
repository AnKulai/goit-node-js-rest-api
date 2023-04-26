import test from "ava";
import axios from "axios";
import { nanoid } from "nanoid";

const unicPrefix = nanoid();
const testmail = `${unicPrefix}test@gmail.com`;
// const host = "https://rest-api-node-js.onrender.com";    // remote server host
const host = "http://localhost:3000"; // local server host

test.serial(`Register random user`, async (t) => {
  const registerResponse = await axios.post(`${host}/api/auth/register`, {
    email: testmail,
    password: "123456",
  });
  t.is(registerResponse.status, 201);
  t.true(registerResponse.data.email === testmail);
  t.true(registerResponse.data.subscription === "starter");
});

test.serial("User can login", async (t) => {
  const loginResponse = await axios.post(`${host}/api/auth/login`, {
    email: testmail,
    password: "123456",
  });

  t.is(loginResponse.status, 200);
  t.true(
    loginResponse.data.token !== undefined && loginResponse.data.token !== ""
  );
});

test.serial(`User was removed`, async (t) => {
  const removedResponse = await axios.delete(`${host}/api/users/testclear`, {
    data: {
      email: testmail,
    },
  });

  t.is(removedResponse.status, 204);
});
