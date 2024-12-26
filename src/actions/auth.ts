"use server";

import { signIn, signOut } from "auth";
import { db } from "db";
import { AuthError } from "next-auth";
import { revalidatePath } from "next/cache";

const getUserByEmail = async (email: string) => {
  try {
    const user = await db.user.findUnique({
      where: {
        email,
      },
    });
    return user;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const login = async (provider: string) => {
  await signIn(provider, { redirectTo: "/" });
  revalidatePath("/");
};

export const logout = async () => {
  await signOut({ redirectTo: "/" });
  revalidatePath("/");
};

export const loginWithCreds = async (formData: FormData): Promise<void> => {
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;
  
    if (!email || !password) {
      throw new Error("Please provide both email and password");
    }
  
    try {
      const result = await signIn("credentials", {
        email,
        password,
        redirect: true,
        redirectTo: "/dashboard"
      });
      
      revalidatePath("/");
    } catch (error) {
      throw error;
    }
  };
  