# 🌦️ Weather App

A responsive, interactive web application that allows users to search for a city and view current weather conditions, including temperature, weather description, wind speed, precipitation, and icons representing the weather. Built for an internship project to demonstrate proficiency in HTML, CSS, JavaScript, and API integration.

---

## Table of Contents

- [Project Overview](#project-overview)
- [Technologies](#technologies)
- [Features](#features)
- [Skills Practiced](#skills-practiced)
- [Installation & Usage](#installation--usage)
- [Project Structure](#project-structure)
- [API Used](#api-used)
- [Error Handling](#error-handling)
- [Author](#author)

---

## Project Overview

**Objective:**
Create a web-based weather application where users can enter a location to retrieve current weather conditions. The app displays temperature, weather description, icons, and additional details such as wind speed, precipitation, and “feels like” temperature.

**Project Difficulty:** Hard

**Additional Notes:**
The app is fully responsive and user-friendly, ensuring accessibility with proper ARIA attributes.

**Live Demo:** [View the Weather App Online](https://weather-nine-beryl.vercel.app)

---

## Technologies

- HTML for structure
- CSS for styling and responsive layout
- JavaScript for interactivity and API requests
- [Vite](https://vite.dev/) for development and bundling
- Open-Meteo API for weather data

---

## Features

- **City Search:** Text input to enter city or location
- **Weather Display:** Current weather with temperature, description, and icon
- **Hourly Forecast:** Hourly weather information with dynamic updates
- **Daily Forecast:** 7-day weather forecast
- **Unit Selector:** Switch between metric/imperial units for temperature, wind speed, and precipitation
- **Error Handling:** Handles invalid input and API errors gracefully
- **Local Storage:** Saves recently searched cities for quick access
- **Responsive & Accessible:** Works on mobile, tablet, and desktop; ARIA attributes included

---

## Skills Practiced

- Structuring content and forms with **HTML**
- Styling layouts, components, and dropdowns with **CSS** (including responsive design)
- Handling user interactions and API requests with **JavaScript**
- Asynchronous programming using `async/await`
- Manipulating the DOM and templates for dynamic content
- Integrating a public API and processing JSON data
- Error handling and UX-friendly messages

---

## Installation & Usage

1. **Clone the repository**

```bash
git clone https://github.com/Bilalben23/weather-app.git
cd weather-app
```

2. **Install dependencies**

```bash
npm install
```

3. **Start the development server**

```bash
npm run dev
```

4. Open your browser at `http://localhost:5173/`
5. Enter a city name and click **Search** to view current weather and forecasts.

---

## Project Structure

```
public/
    /assets      # Images & icons
/src
  /css         # CSS modules
  /js
    /helpers   # Utility functions (loadWeather, fetchWeather, localStorage helpers)
    /ui        # UI modules (dropdowns, applying preferences, updating DOM)
index.html
```

---

## API Used

- **Open-Meteo API** – Free and public weather API
- Provides: Current weather, hourly forecast, daily forecast, temperature units, wind speed, precipitation

API Documentation: [https://open-meteo.com/](https://open-meteo.com/)

---

## Error Handling

- **City Not Found:** Displays a clear error message if the user enters an invalid city
- **API Errors:** Shows a general error section if the API request fails
- **User Guidance:** Users are prompted to retry or enter a different city

---

## Author

**Bilal Ben Youssef** – Full-Stack Developer
[GitHub](https://github.com/Bilalben23) | [Portfolio](https://bilalbenyoussef.vercel.app)

---

## License

MIT © 2025 Bilal Ben Youssef

## Project Screenshot

![Weather App Screenshot](public/assets/images/weather-app-screenshot.jpg)
