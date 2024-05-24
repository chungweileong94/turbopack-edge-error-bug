import { auth } from "../server/lib/auth/index";

/** Add your relevant code here for the issue to reproduce */
export default async function Home() {
  const session = await auth();
  return (
    <div>
      {JSON.stringify(session, null, 2)}
      <h1>Turbopack with Edge runtime</h1>
    </div>
  );
}
