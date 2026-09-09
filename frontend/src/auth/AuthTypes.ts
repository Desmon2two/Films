export type User = {
  id: string;
  email: string;
  username: string;
  displayName: string;
  profilePic: string;
  bio: string;
};

export type AuthState =
  | { status: "unknown" }
  | { status: "loggedOut" }
  | { status: "loggedIn"; user: User };
