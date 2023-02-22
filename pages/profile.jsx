import { useUser } from "@auth0/nextjs-auth0/client";
import Image from "next/image";

function Profile() {
    const { user, error, isLoading } = useUser();

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>{error.message}</div>;
    return (
      user && (
        <div className="text-white">
          <Image unoptimized height={100} width={100} src={user.picture} alt={user.name} />
          <h2>{user.name}</h2>
          <p>{user.email}</p>
        </div>
      )
    );
}

export default Profile;