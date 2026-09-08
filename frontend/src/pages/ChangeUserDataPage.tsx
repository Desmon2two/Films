import useAuth from "../auth/useAuth";
import ChangeUserForm from "../components/ChangeUserForm";

export default function ChangeUserDataPage() {
  const { state } = useAuth();
  
  if (state.status === "unknown") return <p>Loading...</p>;
  if (state.status === "loggedOut") return <>User is not logged in</>;
  if (state.status === "loggedIn")
    return (
      <div className="change-user-data">
         <ChangeUserForm user={state.user} />;
        
      </div>
    );
}
