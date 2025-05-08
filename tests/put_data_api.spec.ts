import { test, expect } from '@playwright/test';

var token;

test.describe('PUT API Test', () => {
  test('should be able to update the booking details', async ({ request }) => {

    // Create a Token which will be used in PUT request
    const authResponse = await request.post('/auth', {
      data: {
        username: 'admin',
        password: 'password123'
      }
    });

    expect(authResponse.ok()).toBeTruthy();
    const authBody = await authResponse.json();
    console.log('Auth response:', authBody);

    const token = authBody.token;
    if (!token) throw new Error('Token not found. Auth likely failed.');

    // PUT request to update booking
    const putResponse = await request.put('/booking/1', {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Cookie': `token=${token}`,
      },
      data: {
        firstname: 'Jim',
        lastname: 'Brown',
        totalprice: 111,
        depositpaid: true,
        bookingdates: {
          checkin: '2023-06-01',
          checkout: '2023-06-15'
        },
        additionalneeds: 'Breakfast'
      }
    });

    const contentType = putResponse.headers()['content-type'];
    if (contentType && contentType.includes('application/json')) {
      const body = await putResponse.json();
      console.log('Updated booking:', body);
    } else {
      const text = await putResponse.text();
      console.error('Unexpected response:', text);
      throw new Error(`Expected JSON, got: ${text}`);
    }

    const updatedResponseBody = await putResponse.json();
    expect(updatedResponseBody).toHaveProperty('firstname', 'Jim');
    expect(updatedResponseBody).toHaveProperty('lastname', 'Brown');
    expect(updatedResponseBody).toHaveProperty('totalprice', 111);
    expect(updatedResponseBody).toHaveProperty('depositpaid', true);
  });
});