import { IUser } from "../types/user";
import { db } from "../config/firebaseConfig";
import { UserWithoutPassword } from "../types";
import { ApiError } from "../entities/ApiError";
import { HttpStatusCode } from "../enums";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const userCollections = "users";

const updateUser = async (docId: string, user: UserWithoutPassword) => {
  try {
    await db
      .collection(userCollections)
      .doc(docId)
      .update({ ...user });

    return user;
  } catch (error) {
    throw error;
  }
};

const getListUser = async () => {
  try {
    const users: UserWithoutPassword[] = [];
    const snapshot = await db.collection(userCollections).get();
    snapshot.forEach((doc) => {
      const userWithPass = doc.data();
      const { password, ...userWithoutPass } = userWithPass;
      users.push(userWithoutPass as UserWithoutPassword);
    });
    return users;
  } catch (error) {
    throw error;
  }
};

const authentication = async (username: string, password: string) => {
  try {
    let docId = "";
    const users: IUser[] = [];
    const getUser = await db
      .collection(userCollections)
      .where("username", "==", username)
      .get();
    getUser.forEach((doc) => {
      const userWithPass = doc.data();
      users.push(userWithPass as IUser);
      docId = doc.id;
    });
    if (!users.length) {
      throw new ApiError(HttpStatusCode.NOT_FOUND, "Can not find user");
    }

    const user = users?.[0];
    const checkPassword = bcrypt.compareSync(password, user.password);

    if (!checkPassword) {
      throw new ApiError(HttpStatusCode.NOT_FOUND, "Wrong password");
    }

    const accessToken = jwt.sign(
      {
        id: docId,
      },
      process.env.TOKEN_SECRET || "",
      { expiresIn: process.env.TOKEN_EXPIRATION }
    );
    const { password: userPassword, ...userWithoutPassword } = user;
    return {
      user: userWithoutPassword,
      token: accessToken,
    };
  } catch (error) {
    throw error;
  }
};

const getUserDetail = async (docid: string) => {
  try {
    const user = await db.collection("users").doc(docid).get();
    const userWithPass = user.data() as IUser;
    const { password, ...userWithoutPass } = userWithPass;

    return userWithoutPass;
  } catch (error) {
    throw error;
  }
};

export { updateUser, getListUser, authentication, getUserDetail };
