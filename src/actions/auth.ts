"use server";

import { signIn, signOut } from "auth";
import { db } from "db";
import { AuthError } from "next-auth";
import { revalidatePath } from "next/cache";
import { hash } from "bcryptjs";


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

  interface UserInfo {
    level: string
    expertise: string
    learningStyle: string
    goals: string[]
  }

  export const registerWithCreds = async (formData: FormData): Promise<void> => {
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;
    const name = formData.get('name') as string;
    // const level = (formData.get('level') as string) || "beginner"; 
    // const expertise = formData.get('expertise') as string || "general"; 
    // const learningStyle = formData.get('learningStyle') as string || "visual"; 
    // const goals = formData.getAll('goals') as string[];

    try {
      const existingUser = await getUserByEmail(email);
    
      if (existingUser) {
        throw new Error("Email already exists");
      }

      const user = await db.user.create({
        data: {
          name,
          email,
          hashedPassword: await hash(password, 10),
        },
      });

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