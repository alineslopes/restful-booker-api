import { test, expect } from '@playwright/test';

var token;

test.describe('DELETE API Test', () => {
    test('should be able to delete the booking details', async ({ request }) => {
    // Create a Token which will be used in DELETE request
    const response = await request.post('/auth', {
        data: {
        username: 'admin',
        password: 'password123'
        }
    });

    console.log(await response.json());
    expect(response.ok()).toBeTruthy();
    expect(response.status()).toBe(200);

    const responseBody = await response.json();
    token = responseBody.token;
    console.log('New Token is: ' + token);

    // DELETE booking
    const deleteRequest = await request.delete('/booking/1', {
        headers: {
        'Content-Type': 'application/json',
        'Cookie': `token=${token}`  // Fixed: use backticks for string interpolation
        }
    });

    expect(deleteRequest.status()).toEqual(201);
    expect(deleteRequest.statusText()).toBe('Created');
    });
});    