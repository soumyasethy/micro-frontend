import { Auth } from "aws-amplify";
import {
  AuthenticationDetails,
  CognitoUser,
  CognitoUserPool,
  CognitoUserSession,
} from "amazon-cognito-identity-js";

const cognitoConfig = {
  userPoolId: "ap-south-1_SJsMBrpQV",
  arn: "arn:aws:cognito-idp:ap-south-1:560013782704:userpool/ap-south-1_SJsMBrpQV",
  clientID: "5let0kbcceb4h6sf8hppdic48c",
  region: "ap-south-1",
};
const userPool = new CognitoUserPool({
  UserPoolId: cognitoConfig.userPoolId,
  ClientId: cognitoConfig.clientID,
});
