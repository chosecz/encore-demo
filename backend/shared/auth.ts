import { APIError, Gateway, Header } from "encore.dev/api";
import { authHandler } from "encore.dev/auth";
import { user } from "~encore/clients";

interface AuthParams {
  authorization: Header<"SessionToken">;
}

interface AuthData {
  userID: string;
}

export const auth = authHandler<AuthParams, AuthData>(async (params) => {
  const sessionId = params.authorization;
  try {
    const session = await user.getSession({ id: sessionId });
    return { userID: session.userId };
  } catch (error) {
    throw APIError.unauthenticated("Invalid session token");
  }
});

// Define the API Gateway that will execute the auth handler:
export const gateway = new Gateway({
  authHandler: auth,
});
