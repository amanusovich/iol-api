## IOL API Fetcher

This script is designed to fetch stock quotes using the Invertir Online (IOL) API (https://api.invertironline.com) and upload them into a Google Sheet using Google Apps Script.

### Usage

#### 1. Setting up the Google Sheets Script

1. Open a Google Sheet where you want to import the stock quotes.
2. Navigate to `Extensions` > `Apps Script` to open the Google Apps Script editor.

3. Replace the existing code with the provided code in the `cotizaciones.js` file.

#### 2. Configuring Triggers

1. In the Apps Script editor, navigate to `Edit` > `Current project's triggers`.
2. Click on the `+ Add Trigger` button.
3. Set up a new time-driven trigger with the following settings:
   - Choose the function `cotizacionesTrigger`.
   - Select `Time-driven` as the type.
   - Choose `Minutes timer` and set it to `Every minute`.

4. Save the trigger.

### Notes

- Ensure the Google Sheet has a sheet named "cotizaciones" where the data will be inserted.
- Adjust the triggers and parameters in the `cotizacionesTrigger` function to fetch data for specific instruments or panels.
