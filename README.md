# Markdown syntax guide

## Headers

# This is a Heading h1

## This is a Heading h2

###### This is a Heading h6

## Emphasis

_This text will be italic_  
_This will also be italic_

**This text will be bold**  
**This will also be bold**

_You **can** combine them_

## Lists

### Unordered

- Item 1
- Item 2
- Item 2a
- Item 2b

### Ordered

1. Item 1
1. Item 2
1. Item 3
1. Item 3a
1. Item 3b

## Images

![This is an alt text.](/image/sample.png "This is a sample image.")

## Links

You may be using [Markdown Live Preview](https://markdownlivepreview.com/).

## Blockquotes

> Markdown is a lightweight markup language with plain-text-formatting syntax, created in 2004 by John Gruber with Aaron Swartz.
>
> > Markdown is often used to format readme files, for writing messages in online discussion forums, and to create rich text using a plain text editor.

## Tables

| Left columns | Right columns |
| ------------ | :-----------: |
| left foo     |   right foo   |
| left bar     |   right bar   |
| left baz     |   right baz   |

## Blocks of code

```
let message = 'Hello world';
alert(message);
```

## Inline code

This web site is using `markedjs/marked`.

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
