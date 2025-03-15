import express from 'express';
import dotenv from 'dotenv';
dotenv.config();
import cookieParser from 'cookie-parser';
import cors from 'cors';
import http from 'http';

import connectDB from './db/index.js';

const app = express();
const server = http.createServer(app);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors());

app.get('/', (req, res) => {
    res.send('Hello World');
});

// Routes
import authRoutes from "./routes/authRoutes.js";
import sellerRoutes from "./routes/sellerRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import orderRoutes from './routes/orderRoutes.js';

app.use("/api/auth", authRoutes);
app.use("/api/seller", sellerRoutes);
app.use("/api/products", productRoutes);
app.use('/api/orders', orderRoutes)

// Start DB Connection and Server
connectDB()
    .then(() => {
        server.listen(3000, () => {
            console.log('Server is running on port 3000');
        });

        // Import socket AFTER server is initialized
        import("./socket/index.js").then(({ default: initSocket }) => {
            initSocket(server);  // Pass server to socket setup function
        });
    })
    .catch((err) => {
        console.log(err);
    });

export { server, app };
