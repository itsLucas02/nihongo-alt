import { ProgressProvider } from "./lib/progress";
import { useRoute } from "./lib/hash";
import { Shell } from "./components/Shell";
import { Landing } from "./screens/Landing";
import { Welcome } from "./screens/Welcome";
import { Learn } from "./screens/Learn";
import { Topics } from "./screens/Topics";
import { Quiz } from "./screens/Quiz";
import { Practice } from "./screens/Practice";
import { Leaderboard } from "./screens/Leaderboard";
import { Profile } from "./screens/Profile";
import { Guidebook } from "./screens/Guidebook";
import { Certificate } from "./screens/Certificate";
import { Host } from "./screens/Host";
import { Play } from "./screens/Play";

export default function App() {
  return (
    <ProgressProvider>
      <Router />
    </ProgressProvider>
  );
}

function Router() {
  const { path, parts } = useRoute();

  if (path === "/" || path === "") return <Landing />;
  if (path === "/welcome") return <Welcome />;
  if (path.startsWith("/lesson/") && parts[1]) return <Quiz slug={parts[1]} />;
  if (path.startsWith("/quiz/") && parts[1]) return <Quiz slug={parts[1].toLowerCase()} />;
  if (path === "/host" || path.startsWith("/admin")) return <Host />;
  if (path === "/play") return <Play />;
  if (path === "/certificate") return <Certificate />;

  let active = "learn";
  let body = <Learn />;
  if (path === "/learn") {
    active = "learn";
    body = <Learn />;
  } else if (path === "/topics") {
    active = "learn";
    body = <Topics />;
  } else if (path === "/practice") {
    active = "practice";
    body = <Practice />;
  } else if (path === "/leaderboard" || path === "/scoreboard") {
    active = "leagues";
    body = <Leaderboard />;
  } else if (path === "/profile") {
    active = "profile";
    body = <Profile />;
  } else if (path.startsWith("/guidebook")) {
    active = "learn";
    const q = new URLSearchParams(path.split("?")[1] || window.location.hash.split("?")[1] || "");
    body = <Guidebook unitId={parts[1]?.split("?")[0]} catSlug={q.get("cat") || undefined} />;
  } else {
    body = <Learn />;
  }

  return <Shell active={active}>{body}</Shell>;
}
