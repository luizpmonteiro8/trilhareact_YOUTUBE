import { useState } from "react";

interface User {
  id: number;
  name: string;
}

export default function HomeTsx() {
  const [user, setUser] = useState<User>({ id: 0, name: "John Doe" });

  function setNewUser() {
    setUser({ id: 0, name: "John Doe" });
  }

  return <div></div>;
}
