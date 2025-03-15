import express from "express";
import http from "http";
import path from "path";
import dotenv from "dotenv";
import { fileURLToPath } from "url";
import connectDB from "./db/index.js";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const server = http.createServer(app);

app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

// Routes
import orderRoutes from './routes/orderRoutes.js';
import productRoutes from './routes/productRoutes.js';
import authRoutes from './routes/authRoutes.js';
import sellerRoutes from './routes/sellerRoutes.js';
import trackingRoutes from './routes/trackingRoutes.js';

app.use('/api/orders', orderRoutes);
app.use('/api/products', productRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/seller', sellerRoutes);
app.use('/api/tracking', trackingRoutes);

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
