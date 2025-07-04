import express from 'express'
import cors from 'cors';
import {PrismaClient} from './generated/prisma/index.js'
import bcrypt from 'bcryptjs'


const app = express();
const prisma = new PrismaClient();

app.use(cors({
    credentials: true,
    methods: ['*'],
    allowedHeaders: ['*'],
    origin: 'localhost:3000',
}));
app.use(express.json());

app.post('/login', async (req, res) => {
    console.log('/login');
    const { username, password } = req.body;

    // Check user 
    const user = await prisma.user.findUnique({
        where: {
            username: username
        }
    })

    if (!user) {
        return res.status(400).json({error: 'User tidak terdaftar'}); 
    }

    // Check Password
    if (!(await bcrypt.compare(password, user.password))) {
        return res.status(400).json({error: 'Password Salah'}); 
    }

    return res.json(user);
})

app.post('/register', async (req, res) => {
    console.log('/register');
    const { username, password } = req.body;
 

    // Check user 
    const checkUser = await prisma.user.findUnique({
        where: {
            username: username
        }
    })

    if (checkUser) {
        return res.status(400).json({error: 'User sudah terdaftar'}); 
    }

    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = await prisma.user.create({
        username, 
        password: hashedPassword
    })

    return res.json(newUser);
})

app.listen(5000, () => {
    console.log('Server running.')
})