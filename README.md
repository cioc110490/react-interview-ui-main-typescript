# TalentReef React UI Interview Template

# Updated

## How to run

```bash
npm install
```

```bash
npm start
```

## Summary

The UI includes a sidebar menu with the following options:

* `List`: Display all available widgets
* `Create`: Create a new widget
* `Update`: Update an existing widget
* `Find`: Display the details of a widget by name
* `Delete`: Delete a widget by name

The first time you open the application it will display a message since there are no widgets yet:

![image](https://github.com/user-attachments/assets/d2926c7c-11fb-4834-9e5e-bf2c4ec4985c)

# Create Widget

Both the APIs and the UI have validations to enforce the fields requirements, in the following example, the `Name` field does not meet the requirements (must be a string between 3 and 100 characters), in this case the `Create` button is disabled.

![image](https://github.com/user-attachments/assets/7ec779c9-ccad-4941-b19f-8fdf1d7d693d)

The button is only enabled when all the requirements are met, this also applies to the other operations:

![image](https://github.com/user-attachments/assets/117ac6f0-739a-4a5a-a9e4-aabf6d734de3)

When the button is enabled and clik on `Create`, if successful or if there was an error, a notification will be displayed:

![image](https://github.com/user-attachments/assets/550f6891-5e15-43da-a37f-10aed9e282f9)

It also prevents the creation of duplicated widgets:

![image](https://github.com/user-attachments/assets/b06a7a1a-838f-49e3-b7af-39d891bf8a9c)


# List Widgets

Once the widget is created, if you navigate to the `List` page, you will see the new widget:

![image](https://github.com/user-attachments/assets/752c8b5d-860d-40dd-aeb8-0a2d9ada0256)

# Update Widget

This page also validates the field requirements for `Name`, `Description` and `Price` to enable or disable the `Update` button.

It also implements an internal search feature that searchs for the widget as you type the name, it uses a debouncing mechanism to prevent API calls on each keystroke, instead it waits for the user to finish typing and then makes the API call. The `Update` button is also only enabled when a valid widget name is entered.

In the following case, the button is disabled because a widget with name `hello` doesn't exists, even though the description and price are correct:

![image](https://github.com/user-attachments/assets/e989cec1-69d4-446a-9903-b64d93374a12)

When you enter a correct widget name, you will see a message `Widget found` and then the button is enabled:

![image](https://github.com/user-attachments/assets/fd36a59e-00cd-4c82-8b97-67ed5df9f975)

# Find Widget

Enter the name of the widget and click `Find`

![image](https://github.com/user-attachments/assets/988bbf7f-a4f8-43fb-a5b7-55784004c943)

If the widget with that name doesn't exists, a notification will be displayed:

![image](https://github.com/user-attachments/assets/c99983f5-640b-4eca-8a8d-991454f94b4c)

# Delete Widget

This page also implements the internal search with the debouncing mechanism to check if the widget exists, the button will only be enabled in this case:

![image](https://github.com/user-attachments/assets/58c4f5cf-0f97-42ca-826c-888c08a2795a)

A notification will be displayed with the result of the operation:

![image](https://github.com/user-attachments/assets/155ad004-82dd-430d-8acc-4160aba41499)

# Loading States

Each page displays a loading state when the operation is running, but since both the backend and the frontend are runnign locally, this are executed quickly so it is not always visible, but it is still there in case the connection is slow:

![image](https://github.com/user-attachments/assets/2870c438-00b7-4a3c-87cc-2b8df9d04546)

# Network Error Handling

In case there server is not running or there is a problem with the connection, a custom message will be displayed:

![image](https://github.com/user-attachments/assets/27ba2727-b2d7-4408-b305-c81b8f6f26b5)

# Unit Tests

Unit tests were added for all the new components

-------------------------------------

This [Create React App](https://github.com/facebook/create-react-app) project is provided as a starting template for the TalentReef take-home interview. Feel free to make whatever modifications are necessary to complete the exercise.

## Requirements

Node 20 -- Node can be acquired using [Node Version Manager](https://github.com/nvm-sh/nvm)

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)

## Additional Information

TalentReef will provide you the contact information of a person who can answer questions about the exercise.
