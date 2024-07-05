import { test, expect } from "@playwright/test";
import creds from "../../data/credentials.json";
import payloadData from "../../data/jsonData.json";
import updatedPayloadData from "../../data/updatedData.json";

test.describe("Testing API with Playwright Automation", () => {
  let accessToken;
  let bookingId = 1;
  let firstName;
  let lastName;
  let checkin = "2013-02-23";
  let checkout = "2014-10-23";
  let Id;
  test.beforeAll("Get specific Employee", async ({ request }) => {
    const response = await request.post(
      `https://restful-booker.herokuapp.com/auth`,
      {
        data: creds,
      }
    );
    await expect(response).toBeOK();
    let responseBody = await response.json();
    accessToken = responseBody.token;
  });
  test("Get All Bookings", async ({ request }) => {
    const response = await request.get(
      "https://restful-booker.herokuapp.com/booking",
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    await expect(response).toBeOK();
    console.log(await response.json());
  });
  test("Get Booking By ID", async ({ request }) => {
    const response = await request.get(
      `https://restful-booker.herokuapp.com/booking/${bookingId}`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    await expect(response).toBeOK();
    const responseBody = await response.json();
    firstName = responseBody.firstname;
    lastName = responseBody.lastname;
  });
  test("Get Booking by names", async ({ request }) => {
    const response = await request.get(
      `https://restful-booker.herokuapp.com/booking?firstname=${firstName}&lastname=${lastName}`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    await expect(response).toBeOK();
    console.log(await response.json());
  });

  test("Get Booking by Booking Dates", async ({ request }) => {
    const response = await request.get(
      `https://restful-booker.herokuapp.com/booking?checkin=${checkin}&checkout=${checkout}`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    await expect(response).toBeOK();
    console.log(await response.json());
  });

  test("Create a New Booking", async ({ request }) => {
    const response = await request.post(
      "https://restful-booker.herokuapp.com/booking",
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        data: payloadData,
      }
    );
    await expect(response).toBeOK();
    const responseBody = await response.json();
    Id = responseBody.bookingid;
  });

  test("Update a New Booking", async ({ request }) => {
    console.log(Id);
    const response = await request.put(
      `https://restful-booker.herokuapp.com/booking/${Id}`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        data: updatedPayloadData,
      }
    );
  });

  test("Update a Booking Partially", async ({ request }) => {
    console.log(Id);
    const response = await request.patch(
      `https://restful-booker.herokuapp.com/booking/${Id}`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        data: {
          firstname: "James",
          lastname: "Brown",
        },
      }
    );
  });
  test("Delete Booking", async ({ request }) => {
    console.log(Id);
    const response = await request.delete(
      `https://restful-booker.herokuapp.com/booking/${Id}`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
  });
});
