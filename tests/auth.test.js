import test from "ava";
import axios from "axios";
import { nanoid } from "nanoid";

const unicPrefix = nanoid();
const testmail = `${unicPrefix}test@gmail.com`;

test.serial("User can register", async (t) => {
  const registerResponse = await axios.post(
    "http://localhost:3000/api/auth/register",
    {
      email: testmail,
      password: "123456",
    }
  );

  t.is(registerResponse.status, 201);
  t.true(registerResponse.data.email === testmail);
  t.true(registerResponse.data.subscription === "starter");
});

test.serial("User can login", async (t) => {
  const loginResponse = await axios.post(
    "http://localhost:3000/api/auth/login",
    {
      email: testmail,
      password: "123456",
    }
  );

  t.is(loginResponse.status, 200);
  t.true(
    loginResponse.data.token !== undefined && loginResponse.data.token !== ""
  );

});

test.serial("User can be removed", async (t) => {
  const removedResponse = await axios.delete(
    "http://localhost:3000/api/users/testclear",
    {
      data: {
        email: testmail,
      },
    }
  );

  t.is(removedResponse.status, 200);
  t.true(removedResponse.data.message === "test user removed successfully");
});
