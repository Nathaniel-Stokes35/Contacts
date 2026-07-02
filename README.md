# Contacts API

## Introduction

This project provides a centralized, dynamic source for my personal contact information, so I can reuse it across web applications and services that I build. By exposing my contact data via an API, I can update it in one place and have those changes reflected everywhere that consumes this endpoint.

The API is built with Node.js and Express, backed by MongoDB for data storage, and hosted on Render. Sensitive data is stored in MongoDB and accessed via environment‑secured connection strings; only non‑sensitive contact fields are exposed through the public API.

## Tech Stack

- Node.js and Express for the HTTP API server  
- MongoDB (Atlas) as the data store  
- Render for deployment and hosting  
- dotenv for environment variable management

## API Overview

Base URL (example):

```text
https://your-render-app.onrender.com/api/contacts // Modify when launched
```

Typical response shape:

```json
{
  "name": "Nathaniel Stokes",
  "email": "Nathaniel.Stokes35@gmail.com",
  "phone": "+1-417-629-4776",
  "location": "Pineville, MO",
  "profiles": {
    "linkedin": "https://linkedin.com/in/nathan-stokes-11922170/",
    "github": "https://github.com/Nathaniel-Stokes35",
    "Resume": "https://docs.google.com/document/d/1MUFMGQA-nNiEikrfDgJxGUVsQPPZZiSi/edit?pli=1#heading=h.z24j8pz3k9tk"
  }
}
```

> Note: Only non‑sensitive fields are exposed; credentials and private data are never returned by this API.

## Usage

- Make a `GET` request to the contacts endpoint from your web app or service.  
- Parse the JSON response and display or use the contact fields as needed.  
- When my contact details change, you only need to consume the same endpoint; the API will return the updated information.

Example (JavaScript):

```js
fetch('https://your-render-app.onrender.com/api/contacts') // Modify when launched
  .then(res => res.json())
  .then(data => {
    console.log('Contact info:', data);
  });
```

## Contact

Thanks for taking the time to read about this API. If you’d like help setting up a similar contacts API for yourself, you can reach me using the contact information provided by this service.