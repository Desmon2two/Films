import { Link } from "react-router-dom";

export default function SettingsPage() {
  return (
    <div className="settings-page">
      <Link
        to="/settings/change-user-data-page"
        className="link"
      >
        Change profile details
      </Link>
    </div>
  );
}
