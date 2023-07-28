# AngularWeatherApp

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 16.1.4.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Application Overview

I've created a weather application using Angular framework.
The Application uses Accuweather API to fetch data for a location.

**I used 4 endpoints from the accuweather API:**

1. **geoposition**: to get the user location. I used **Geolocation** api to get the user lat and lon and use these coords to get the data based on this position.

2. If user denied using Geolocation, I use Tel Aviv city as default city and fetch its data using
   **current-conditions** endpoint to show the current weather.

3. immediately after using another endpoint, the user gets the weather for the **next five days**.

4. The user can also search in top of the page for a specific location using english letters only. This feature also uses another endpoint - **autocomplete** that gives suggestions locations based on the user query.

### Additional Features

- Added a toggle on the header to switch between Celsius and Fahrenheit degrees.
- Added a notification service based on toastr package - [ngx-toastr](https://www.npmjs.com/package/ngx-toastr) - to show error toasts when handling errors.
- Application is responsive.
- I added some animations:
  1. When page loads the current weather pops.
  2. When hovering on each day's card, it flips and show more info regarding that day.
  3. On mobile devices, when hovering on favorite item in the favorites page, it reveals a delete item.
