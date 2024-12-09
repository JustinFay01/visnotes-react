# Axios

## Installation

```bash
pnpm add axios
```

## Configuration

Well need to start by creating two new files. The first is in `src/lib` called `axios.ts`. The second, if not already made, is a `.env` file in the root of the project.

The `axios.ts` file will serve as the default configuration of our *static* axios instance. This will allow us to import the instance into any file and make requests without having to reconfigure the instance each time.

While the `.env` [file](https://vite.dev/guide/env-and-mode) will store our base URL for the API. This will allow us to change the base URL without having to change the URL in every file that uses axios. This file is crucial for React applications as it allows us to change development configurations based on environment needs.

### .env

```env
VITE_API_URL=https://api.example.com
```

### src/lib/axios.ts

```ts
import axios from 'axios';

export const api = Axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}/api`,
});

api.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    const message = error.response?.data?.message || error.message;
    if (error.response?.status === 401) {
      // Redirect to login page
      console.error("Unauthorized", message);
    }

    return Promise.reject(error);
  }
);
```

Here, we do two key things. The first is create the statically defined axios instance like previously stated. The second is to create an interceptor that will handle the response of the axios instance. This will allow us to handle errors and responses in a consistent manner.

Here, we show an example of how to handle a 401 error. In this case, we log the error and redirect the user to the login page. 

While to is good for demonstration purposes, in practice you would create a function (or use an authentication library) to handle the redirect.