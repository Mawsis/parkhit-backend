import { Request, Response } from 'express';
import prisma from '../config/prisma';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export const register = async (req: Request, res: Response) => {
  const { name, email, password, role } = req.body;

  try {
    console.log(req.body);
    
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        role,
      },
    });

    res.status(201).json({ message: 'User registered successfully', user });
  } catch (error:any) {
    res.status(400).json({ error: error.message });
  }
};

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const user = await prisma.user.findFirst({ where: { email } });
    
    if (!user) {
      res.status(404).json({ error: 'User not found' });
      return
    }
    
    const isMatch = await bcrypt.compare(password, user!.password);
    if (!isMatch){
      res.status(401).json({ error: 'Invalid credentials' }) ;
      return
    } 

    const token = jwt.sign({ id: user!.id, role: user!.role }, process.env.JWT_SECRET as string, {
      expiresIn: '1h',
    });
    res.status(200).json({ message: 'Login successful', token });
  } catch (error:any) {
    res.status(400).json({ error: error.message });
  }
};
