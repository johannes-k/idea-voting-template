# Setup

The following steps are also descriped at https://docs.amplify.aws/start/getting-started/installation/q/integration/react/

## AMPLIFY CLI

Install the AWS Amplify CLI if you dont have it already installed:
`npm install -g @aws-amplify/cli`

Connect the Amplify CLI to your AWS Account. (if you dont already have an Account, create one first ;) )
`amplify configure`

After you have successfully logged in, the CLI asks you to choose an AWS region. Choose "eu-central-1" since this is probably the closest location for you.
Following, choose an IAM user name which Amplify will use to create resources in your account. Just confirm every step of the creation wizard without changing anything until you see the accessKeyId and secretAccessKey for your IAM user. You will have to paste this info to the Amplify CLI. Remember that you won't be able to see these credetials again.

After the CLI is successfully authenticated, you can enter a profile name. You can have multiple AWS Accounts configured simultaniously on your machine, so just choose a name that identifies the user you just configured.

## Create a new React App

Let's bootstrap our app by creating a new single-page application using Create React App (https://github.com/facebook/create-react-app)
`npx create-react-app idea-voting`

and start it via
`npm start`

## Add Amplify to our project

Initialize Amplify in the current project by running
`amplify init`

The default options should be fine for our usecase, so just confirm them. Afterwards, you have to choose AWS profile as authentication method and select the AWS profile we just created using "amplify configure"

Afterwards, install the Amplify libraries used in this project
`npm install aws-amplify @aws-amplify/ui-react`

and import them in our src/index.js

## Add Amplify capabilities

### Auth using Cognito

Add an Auth by typing
`amplify add auth`
and choosing the following options:

-> Defaut configuration
-> Email
-> Yes, I want to make some additional changes
-> Email, Name
-> Add User to Group

### GraphQL API and database

Add an API by typing
`amplify add api`

Dont use the default settings, but instead choose Amazon Cognito User Pool as an authorization type.
Also, enable conflict detection so we can use Amplify DataStore.

Finally, define your API in "amplify/backend/api/{app-name}/schema.graphql"

### Edit the post confirmation function created by cognito

At first, we have to assign the required resource access permissions. Therefore, we are going to edit the function:
`amplify update function`

-> Choose the post confirmation function
-> Resource access permissions
-> API
-> Mutation

Now we can edit the functions code at "amplify/backend/function/{function-name}/src/index.js"

Install the necessary dependencies:
`npm add @apollo/client @aws-sdk/credential-provider-node aws-appsync-auth-link graphql isomorphic-fetch`

_Tipp:_
You can test your function by mocking it with an event:
`amplify mock function ideavoting97e368b8PostConfirmation --event "src/event.json"`

In order for IAM as Auth method to work locally and in the AWS AppSync Console, you have to add your IAM user to a custom-roles.json.
For example, paste the following in "amplify/backend/api/{app-name}/custom-roles.json" and replace the users with your IAM users.

```
{
  "adminRoleNames": ["amplify-cli-user", "Johannes"]
}
```

### Add a text translation feature

Start by running `amplify add predictions`
--> Convert
--> Convert text into a different language
--> Choose source langugage
--> Choose target language

Add the following to your index.js:

```
import { AmazonAIPredictionsProvider } from '@aws-amplify/predictions'
import { Amplify } from 'aws-amplify'
import awsExports from './aws-exports'
Amplify.configure(awsExports)
Amplify.addPluggable(new AmazonAIPredictionsProvider())
```

And you are ready to go

## Push everything to the cloud

First, you can check the changes that will be pushed to AWS by running
`amplify status`

You will notice that we are creating three artifacts in three different categories, namely Function, Auth and Apu.

Push the changes to the cloud by running
`amplify push`

# Publish the app

In order to publish the app, we have to add the amplify hosting resources to our backend by typeing `amplify add hosting` and choosing the following:
-> Hosting with Amplify Console

Following, choose wether you want to configure CI/CD by connecting the Amplify Console to your Git Reqpository, or if you just want to publish your app one time.
