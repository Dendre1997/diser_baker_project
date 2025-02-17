import PrivateRoute from "@/components/PrivatRoute"
import {auth} from  "@/utils/firebase"
export default function Document() {
  return (
    <PrivateRoute>
      <h1>Dashboard</h1>
      <button onClick={() => auth.signOut()}>Sign Out</button>
      </PrivateRoute>
  );
}
