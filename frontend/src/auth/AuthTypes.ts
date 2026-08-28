export type User = {
  id: string;
  email: string;
  username: string;
  displayName: string;
  profilePicture: string | null;
  bio: string | null;
};

export type AuthState =
  | { status: "unknown" }
  | { status: "loggedOut" }
  | { status: "loggedIn"; user: User };
