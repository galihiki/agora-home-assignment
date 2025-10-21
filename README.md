## 🏠 Agora Home Assignment

📖 Project Overview
This project is a frontend application built with **React + TypeScript + Vite**.  
It fetches data from a public REST API and displays it in a responsive UI with sorting, searching, and loading/error states.

**Main features:**

- Fetching data with `useQuery` from TanStack Query.
- Responsive grid layout using CSS modules.
- Search and sort functionality by name and population.
- Custom reusable components (CountryCard, countries, CountriesControls).
- Dockerfile included for easy setup and deployment.

## Notes for Reviewer

- This Dockerfile was developed and tested on Windows, but the build runs in a Linux container (Alpine).

## 🐳 Running the App with Docker

You can build and run this application using **Docker** without installing Node.js or dependencies locally.

### 1️⃣ Build the Docker Image

From the project root (where the `Dockerfile` is located), run:
docker build -t agora .

### 2️⃣ Run the Docker Container

After building the image, start a container:
docker run -p 3000:80 agora

### 3️⃣ Open your browser to view the app

-p 3000:80 — maps host port 3000 to container port 80.
Open your browser at 👉 http://localhost:3000 to view the app.

## ⚡ Running the React App (Vite)

This project uses **[Vite](https://vitejs.dev/)** as the build tool for a fast React development experience.

### 🧩 1️⃣ Prerequisites

Make sure you have the following installed:

- [Node.js](https://nodejs.org/)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)

### 🚀 2️⃣ Install Dependencies

From the project root, run:
npm install

# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default tseslint.config([
  globalIgnores(["dist"]),
  {
    files: ["**/*.{ts,tsx}"],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      ...tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      ...tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      ...tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ["./tsconfig.node.json", "./tsconfig.app.json"],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
]);
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from "eslint-plugin-react-x";
import reactDom from "eslint-plugin-react-dom";

export default tseslint.config([
  globalIgnores(["dist"]),
  {
    files: ["**/*.{ts,tsx}"],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs["recommended-typescript"],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ["./tsconfig.node.json", "./tsconfig.app.json"],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
]);
```
