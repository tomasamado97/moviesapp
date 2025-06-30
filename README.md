### Project requirements

- Ruby and Cocoapods (for iOS)
- Android Studio, Android SDK and Gradle (Comes all together with Android Studio)
- Java JDK (for Android)
- Git
- .env file (Provided in the email sent by me)
- xCode (for iOS)
- Node and npm (Project was built using Node v20.17.0, recommended you use the same.)

# Getting the App running

> **Note**: Make sure you have completed the [Set Up Your Environment](https://reactnative.dev/docs/set-up-your-environment) guide before proceeding.

## Step 1: Install dependencies

First we need to install all the dependencies needed by the project.

```sh
# Using npm
npm install

# OR using Yarn
yarn install
```

## Step 2: Start Metro

First, you will need to run **Metro**, the JavaScript build tool for React Native.

To start the Metro dev server, run the following command from the root of your React Native project:

```sh
# Using npm
npm start

# OR using Yarn
yarn start
```

## Step 3: Build and run your app

With Metro running, open a new terminal window/pane from the root of your React Native project, and use one of the following commands to build and run your Android or iOS app:

### Android

```sh
# Using npm
npm run android

# OR using Yarn
yarn android
```

### iOS

For iOS, remember to install CocoaPods dependencies (this only needs to be run on first clone or after updating native deps).

The first time you create a new project, run the Ruby bundler to install CocoaPods itself:

```sh
bundle install
```

Then, and every time you update your native dependencies, run:

```sh
bundle exec pod install
```

For more information, please visit [CocoaPods Getting Started guide](https://guides.cocoapods.org/using/getting-started.html).

```sh
# Using npm
npm run ios

# OR using Yarn
yarn ios
```

If everything is set up correctly, you should see your new app running in the Android Emulator, iOS Simulator, or your connected device.

This is one way to run your app — you can also build it directly from Android Studio or Xcode.

# Features built

- Home page with upcoming and popular movies
- Infinite scroll with "Load more" button to keep getting more movies.
- Movie detail screen with information about the movie and rating.
- Bookmark movie and remove bookmarked movie
- Search screen, allows users to search for specific Movie by title and original title.

# Layout of the app

The application contains several screens so to get a better understanding of the navigation and how it works I'll provide a low fidelity diagram.

![Navigation diagram](./assets/navigation-diagram.png 'Navigation Diagram')

Given this diagram we can see that we have 3 tabs and also we have 2 screens inside one of the tabs, `Home`.

From `Search` and `Bookmarks` we can navigate to `Movie-Detail`. This allows users to see the detailed view of a Movie when searching or for a particular Movie they saved previously.

Of course we can also navigate to `Movie-Detail` from the `Home-Movies` screen, which is the screen that holds both lists.

This was done this way to allow the user to use the 3 functionalities easily and make them easy to access, since they are the key features that we want the user to use, so having them in the bottom tab navigation makes sense.

# Testing

Given the time and context of the work to do, I could not make a lot of tests but I did not want to leave the project without any test. So the approach that I took was to test the main components that I used to make sure they are safe to use if any other engineer continues with the repo. Given more time I would continue the testing and test the main screens to give more confidence to the project.

All of the tests, test each functionality of the component, mocking features when needed. I also added regression tests so if the component is changed the test must be fixed to follow the changes on the component.

For all of the tests I used `@testing-library/react-native` and `jest`.

## Tests done

- `ThemedView.test.tsx`
- `ThemedText.test.tsx`
- `RatingStars.test.tsx`
- `MovieCard.test.tsx`

![Tests results](./assets/tests-results.png 'Tests results')

# Architecture & Technologies

In terms of architecture I tried following industry standards for the folder structure. Given that I used plain `React-Native` and not `Expo` the navigation was built with `@react-navigation` so I needed to keep the file `App.tsx` and I could not implement file-based navigation.

### Folder Structure

- `android` (holds the files for the project for Android)
- `ios` (holds the files for the project for iOS)
- `__tests__` (contains test files and snapshots)
- `app` (Main screens of the application, new screens should go here)
- `assets` (Folder for anything that is needed by the project, like local images or fonts)
- `components` (Reusable components)
- `constants` (Constants like colors or could also add text if the app is too big and we might use internationalization)
- `hooks` (Reusable hooks, any hook that could be reused should go here)
- `utils` (Configuration and utilities like reusable functions)
- `.eslintrc.js` (Configuration file for ESLint linter)
- `.gitignore` (Configuration file for Git, to avoid pushing files that we want to avoid pushing)
- `.prettierrc.js` (Configuration file for Prettier linter and formatter)
- `.watchmanconfig` (Configuration file for Watchman)
- `app.json` (Configuration file for the applications name)
- `App.tsx` (Main file where we define the routes and some contexts providers that we use)
- `index.js` (Entry point of the application)
- `metroconfig.js` (Configuration file for Metro)
- `jest.config.js` (Configuration file for jest)
- `package-lock.json` (Lockfile for the dependencies of the project)
- `package.json` (Package file that holds all the dependencies (with versions) and information of the project)
- `tsconfig.json` (Configuration for Typescript)

### Dependencies

Packages used on the project and why they were used.

#### Dependencies

    - @react-native-async-storage/async-storage - Package to handle storing information on the device
    - @react-native/new-app-screen - Placeholder app screen from React Native (This could be deleted)
    - @react-navigation/bottom-tabs - React Native navigation package for tabs
    - @react-navigation/native - React Native navigation package
    - @react-navigation/native-stack - React Native navigation package for stack
    - @tanstack/react-query - Global state package, used together with axios to make API requests
    - axios - Package to make API requests
    - lodash.debounce - Needed by the hooks that use debounce
    - react - React
    - react-native - React Native
    - react-native-config - Used to handle environment variables
    - react-native-feather - Holds Feather icons
    - react-native-linear-gradient - Used to implement gradients
    - react-native-safe-area-context - Needed to show correctly content on iOS devices
    - react-native-screens - Dependency needed by React Navigation
    - react-native-svg - Dependency to show SVG Icons

#### Development Dependencies

    - @babel/core - JS compiler, installed by default with React Native
    - @babel/preset-env - JS compiler, installed by default with React Native
    - @babel/runtime - JS compiler, installed by default with React Native
    - @react-native-community/cli - Command Line needed to start the project and run some scripts
    - @react-native-community/cli-platform-android - CLI for android commands
    - @react-native-community/cli-platform-ios - CLI for ios commands
    - @react-native/babel-preset - Preset for Babel with React Native
    - @react-native/eslint-config - Configuration for ESLint for React Native
    - @react-native/metro-config - Configuration for Metro for React Native
    - @react-native/typescript-config - Configuration for Typescript for React Native
    - @testing-library/react-native - Unit testing library for React Native
    - @types/jest - Types from Jest
    - @types/lodash.debounce - Types from Lodash Debounce
    - @types/react - Types from React
    - @types/react-test-renderer - Types from React test renderer
    - eslint - ESLint Linter
    - jest - Jest package for testing
    - prettier - Prettier Formatter and Linter
    - react-test-renderer - Used to test rendering components
    - typescript - Adds types to JS
