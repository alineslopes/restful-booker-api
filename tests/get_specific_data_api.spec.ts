import { test, expect } from '@playwright/test';

test.describe('GET All Data Test', () => {
    test('should get the booking details', async ({ request }) => {
    const response = await request.get('/booking/1');

    if (!response.ok()) {
        const text = await response.text();
        console.error('Error response:', text);
        throw new Error(`Request failed with status ${response.status()}`);
    }

    const data = await response.json();
    console.log(data);

    expect(response.status()).toBe(200);
    expect(data).toHaveProperty('firstname', 'Eric');
    expect(data).toHaveProperty('lastname', 'Jones');
    expect(data).toHaveProperty('totalprice', 695);
    });
});
