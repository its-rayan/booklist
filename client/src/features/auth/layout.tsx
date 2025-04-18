import { PropsWithChildren } from "react";

const AuthLayout = ({ children }: PropsWithChildren) => (
  <main className="bg-orange-50 h-screen">
    <div className=" flex justify-center font-light antialiased">
      <div className="flex flex-col py-28 w-full max-w-xs">{children}</div>
    </div>
  </main>
);

export default AuthLayout;
