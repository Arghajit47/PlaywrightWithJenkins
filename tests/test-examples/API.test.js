import { test, expect } from "@playwright/test";

test("Get All Contacts", async ({ request }) => {
  const response = await request.get(
    "https://thinking-tester-contact-list.herokuapp.com/contacts",
    {
      headers: {
        "Content-Type": "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjQ0ZjFmN2IwYmUzNjAwMTNiYzNiYjEiLCJpYXQiOjE3MTU4NDU0Njh9.TiUGLfwWF67stgVF-4SewEg88z3WkpeGQTE2z6Qp-1s",
      },
    }
  );
  console.log(await response.json());
  expect(response.ok()).toBeTruthy();
  expect(response.status()).toBe(200);
  const responseBody = await response.json();
  console.log(responseBody.token);
});

test.describe("Performing API testing", () => {
  let employeeId = 0;

  test("Get All Employees", async ({ request }) => {
    const response = await request.get(
      "https://dummy.restapiexample.com/api/v1/employees",
      {}
    );
    console.log(await response.json());
  });

  test("Create new employee", async ({ request }) => {
    const response = await request.post(
      "https://dummy.restapiexample.com/api/v1/create",
      {
        data: {
          name: "tester GPT",
          salary: "800000",
          age: "25",
        },
      }
    );
    const responseBody = await response.json();
    await expect(responseBody.status).toHaveText("success");
    console.log(await response.json());
    employeeId = responseBody.data.id;
  });
  test("Get specific Employee", async ({ request }) => {
    const response = await request.get(
      `https://dummy.restapiexample.com/api/v1/employee/${employeeId}`,
      {}
    );
    console.log(await response.json());
  });
});
