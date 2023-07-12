import Link from "next/link";

export default function SettingsPage() {
    // This page is protected
    return (
        <div>
            <header>
                <Link style={{ color: "red", backgroundColor: "black" }} href="/dashboard">Dashboard</Link> <br />
            </header>
            <h1>Super Secret Settings</h1>
        </div>
    );
}
