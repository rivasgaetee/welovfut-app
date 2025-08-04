# Welcome to your Expo app 👋

This is an [Expo](https://expo.dev) project created with [`create-expo-app`](https://www.npmjs.com/package/create-expo-app).

## Get started

1. Install dependencies

   ```bash
   npm install
   ```

2. Start the app

   ```bash
   npx expo start
   ```

In the output, you'll find options to open the app in a

- [development build](https://docs.expo.dev/develop/development-builds/introduction/)
- [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/)
- [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/)
- [Expo Go](https://expo.dev/go), a limited sandbox for trying out app development with Expo

You can start developing by editing the files inside the **app** directory. This project uses [file-based routing](https://docs.expo.dev/router/introduction).

## Get a fresh project

When you're ready, run:

```bash
npm run reset-project
```

This command will move the starter code to the **app-example** directory and create a blank **app** directory where you can start developing.

## Environment Variables

This project uses [react-native-dotenv](https://github.com/goatandsheep/react-native-dotenv) to load environment variables from a `.env` file.

### Setup

1. Create a `.env` file in the root of your project (a sample file is already provided)
2. Add your environment variables in the format `KEY=VALUE`

Example:
```
API_URL=https://api.example.com
FIREBASE_API_KEY=your_firebase_api_key
```

### Usage

To use environment variables in your code:

```typescript
import { API_URL, FIREBASE_API_KEY } from '@env';

console.log(API_URL); // https://api.example.com
```

### Configuration

The babel.config.js file is already configured to use react-native-dotenv with the following options:
- `moduleName`: '@env' - This is how you import environment variables
- `path`: '.env' - The file where environment variables are stored
- `allowUndefined`: true - Allows undefined variables without throwing errors

## Learn more

To learn more about developing your project with Expo, look at the following resources:

- [Expo documentation](https://docs.expo.dev/): Learn fundamentals, or go into advanced topics with our [guides](https://docs.expo.dev/guides).
- [Learn Expo tutorial](https://docs.expo.dev/tutorial/introduction/): Follow a step-by-step tutorial where you'll create a project that runs on Android, iOS, and the web.

## Join the community

Join our community of developers creating universal apps.

- [Expo on GitHub](https://github.com/expo/expo): View our open source platform and contribute.
- [Discord community](https://chat.expo.dev): Chat with Expo users and ask questions.
