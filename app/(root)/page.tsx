import { UserButton } from "@clerk/nextjs";

const SetupPage = () => {
  return (
    <div className="p-4">
        <UserButton afterSignOutUrl="/"/>
        <p className="mt-5 pt-2 border-t-2">Admin Page</p>
    </div>
  )
}

export default SetupPage;
