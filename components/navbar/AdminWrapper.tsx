import { auth } from "@clerk/nextjs/server";
import React, { ReactNode } from "react";

interface AdminWrapperProps {
  children: ReactNode;
}

const AdminWrapper = async ({ children }: AdminWrapperProps) => {
  const session = await auth(); // obținem session-ul logat pe server
  const userId = session.userId;
  const adminId = process.env.ADMIN_USER_ID;

  if (!userId || userId !== adminId) return null;

  return <>{children}</>;
};

export default AdminWrapper;
