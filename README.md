# Firebase Studio

This is a NextJS starter in Firebase Studio.

To get started, take a look at src/app/page.tsx.

## Running the Application

To run this application, you'll need to start two separate development servers:

1.  **Next.js Frontend:** This server handles the user interface and client-side interactions.
2.  **Genkit AI Flows:** This server runs your Genkit AI flows, making them available to the frontend.

### 1. Start the Next.js Development Server

In your terminal, navigate to the project root directory and run:

```bash
npm run dev
```

This will typically start the Next.js app on `http://localhost:9002`.

### 2. Start the Genkit Development Server

In a **new terminal window or tab**, navigate to the project root directory and run:

```bash
npm run genkit:dev
```

Alternatively, if you want Genkit to automatically restart when you make changes to your AI flow files, use:

```bash
npm run genkit:watch
```

This will start the Genkit development server, usually on `http://localhost:3400` (the Genkit developer UI) and make your flows available for your Next.js app to call.

Once both servers are running, you can access your application by opening `http://localhost:9002` in your web browser.
