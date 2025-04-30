import { UserProvider } from "./Context/shoppingContext";
import SignIn from "./login/page";

export default function Home() {
  return (
    <div className=" h-screen">
      <UserProvider>
        <SignIn />
      </UserProvider>
    </div>
  );
}
