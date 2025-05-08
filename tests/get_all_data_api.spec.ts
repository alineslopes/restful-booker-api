import { test, expect } from '@playwright/test';

test.describe('GET All Data Test', () => {
    test('should be get all the booking details', async ({ request }) => {
        const response = await request.get("/booking");
        console.log(await response.json());
        expect(response.ok()).toBeTruthy();
        expect(response.status()).toBe(200);
    });
});    