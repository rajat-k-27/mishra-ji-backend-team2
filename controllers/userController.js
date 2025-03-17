import User from '../models/userModel.js';
import { auth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from '../utils/firebaseService.js';

export const registerUser = async (req, res) => {
    const { email, password, displayName, photoURL } = req.body;

    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        const newUser = new User({
            uid: user.uid,
            email: user.email,
            displayName,
            photoURL
        });

        await newUser.save();

        res.status(201).json({ message: 'User registered successfully', user: newUser });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        const dbUser = await User.findOne({ uid: user.uid });

        if (!dbUser) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json({ message: 'User logged in successfully', user: dbUser });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};