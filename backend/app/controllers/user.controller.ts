import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import { User } from "../models/UserModel";
import { Request, Response } from "express";
import { z } from 'zod';
import mongoose from "mongoose";
import { Transaction } from "../models/TransactionModel";
const SignUpschema = z.object({
  email: z.string().email({ message: 'Invalid email address' }),
  username: z.string().min(3, { message: 'Username must be at least 3 characters long' }),
  firstname: z.string().min(3, { message: 'firstname must be at least 3 characters long' }),
  lastname: z.string().min(2, { message: 'lastname must be at least 2 characters long' }),
  password: z
    .string()
    .min(8, { message: 'Password must be at least 8 characters long' })
    .regex(/[A-Z]/, { message: 'Password must contain at least one uppercase letter' })
    .regex(/[a-z]/, { message: 'Password must contain at least one lowercase letter' })
    .regex(/[0-9]/, { message: 'Password must contain at least one number' })
    .regex(/[@$!%*?&]/, { message: 'Password must contain at least one special character' }),
});
const SignInschema = z.object({
  username: z.string().min(3, { message: 'Username must be at least 3 characters long' }),
  password: z
    .string()
    .min(8, { message: 'Password must be at least 8 characters long' })
    .regex(/[A-Z]/, { message: 'Password must contain at least one uppercase letter' })
    .regex(/[a-z]/, { message: 'Password must contain at least one lowercase letter' })
    .regex(/[0-9]/, { message: 'Password must contain at least one number' })
    .regex(/[@$!%*?&]/, { message: 'Password must contain at least one special character' }),
});
export const UserSignup = async (req: Request, res: Response) => {
  try {
    const result = SignUpschema.safeParse(req.body);
    if (!result.success) {
      res.status(400).send(result.error.format());
    } else {
      const user = await User.findOne({ username: req.body.username })
      if (user) {
        res.status(409).json({ message: 'User Already Exists' })
      } else {
        const hashedPassword = await bcrypt.hash(req.body.password, 10)
        const amount = Math.floor(Math.random() * 1000) * 10
        await User.create({
          username: req.body.username,
          email: req.body.email,
          firstname: req.body.firstname,
          lastname: req.body.lastname,
          password: hashedPassword,
          balance: amount
        })
        res.status(201).json({ message: "User Registered Successfully!" })
      }
    }
  } catch (error) {
    console.error(error)
    res.status(500).send(error)
  }
};
export const UserSignin = async (req: Request, res: Response) => {
  try {
    const result = SignInschema.safeParse(req.body);
    if (!result.success) {
      res.status(400).send(result.error.format());
    } else {
      const user = await User.findOne({ username: req.body.username })
      if (!user) {
        res.status(404).send("User Doesn't Exists")
      } else {
        const matched = await bcrypt.compare(req.body.password, user.password)
        if (matched) {
          const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET_KEY as string, { expiresIn: "1h" })
          res.status(200).json({ token: token })
        } else {
          res.status(401).send("Invalid Credentials")
        }
      }
    }
  } catch (error) {
    console.log(error)
    res.status(500).send(error)
  }
};
export const userValue = async (req: Request, res: Response) => {
  try {
    const user = await User.findOne({ _id: req.id })
    res.status(200).json({
      data: {
        id:user?._id,
        username: user?.username,
        firstname: user?.firstname,
        lastname: user?.lastname,
        email: user?.email,
        balance: user?.balance
      }
    })
  } catch (error) {
    console.log(error)
    res.status(500).send(error)
  }
};
export const OtherUserValue = async (req: Request, res: Response) => {
  try {
    const user = await User.findOne({ username: req.params.username })
    if (!user) {
      res.status(200).json({ message: "The User Doesn't Exists!" })
    } else {
      res.status(200).json({
        data: {
          username: user?.username,
          firstname: user?.firstname,
          lastname: user?.lastname,
          email: user?.email,
        }
      })
    }
  } catch (error) {
    console.log(error)
    res.status(500).send(error)
  }
};
export const FilterUsers = async (req: Request, res: Response) => {
  try {
    const { name } = req.query
    const query = name
      ? {
        $or: [
          { username: { $regex: name, $options: 'i' } },
          { firstname: { $regex: name, $options: 'i' } },
          { lastname: { $regex: name, $options: 'i' } },
          { email: { $regex: name, $options: 'i' } },
          {
            $expr: {
              $regexMatch: {
                input: { $concat: ['$firstname', ' ', '$lastname'] },
                regex: name,
                options: 'i',
              }
            }
          },
          {
            $expr: {
              $regexMatch: {
                input: { $concat: ['$lastname', ' ', '$firstname'] },
                regex: name,
                options: 'i',
              }
            }
          }
        ],
      }
      : {};
    const users = await User.find(query)
    res.status(200).json({
      users: users.map((e) => ({
        username: e.username,
        firstname: e.firstname,
        lastname: e.lastname,
        email: e.email
      }))
    })
  } catch (error) {
    console.log(error)
    res.status(500).send(error)
  }
};
export const sendMoney = async (req: Request, res: Response) => {
  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    const to = await User.findOne({ username: req.params.username }).session(session)
    const from = await User.findOne({ _id: req.id }).session(session)
    const amount = Number(req.query.amount)
    if (!to || isNaN(amount) || !from) {
      await session.abortTransaction();
      res.status(400).json({ message: "Invalid Transaction!" })
      return;
    }
    if (to.balance < Number(amount)) {
      await session.abortTransaction();
      res.status(400).json({ message: "Insufficient Amount" })
      return;
    }
    if (Number(amount) > 10000) {
      await session.abortTransaction();
      res.status(400).json({ message: "You Can't Send More Than 10000 INR In One Go" })
      return;
    }
    if (Number(amount) < 0) {
      await session.abortTransaction();
      res.status(400).json({ message: "You Can't Send Negetive Amount" })
      return;
    }
    from.balance -= amount;
    await from.save({ session })
    to.balance += amount;
    await to.save({ session })
    await session.commitTransaction();
    Transaction.create({ to: to.id, from: from.id, amount: amount })
    res.status(200).json({ message: "Transaction Successful!" })
  } catch (error) {
    console.log(error)
    res.status(500).send(error)
    await session.abortTransaction();
  } finally {
    session.endSession();
  }
};
export const showTransaction = async (req: Request, res: Response) => {
  try {
    const user = await User.findOne({ username: req.params.username })
    if (!user) {
      res.status(404).json({ message: "Transaction Successful!" })
      return;
    }
    const transactions = await Transaction.find({$or:[{ from: user?._id },{to:user?._id}]})
    .populate('from')
    .populate('to')
    if (!transactions) {
      res.status(404).json({ message: "Transaction Successful!" })
      return;
    }
    res.status(200).json({ transactions: transactions })
  } catch (error) {
    console.log(error)
    res.status(500).send(error)
  }
}