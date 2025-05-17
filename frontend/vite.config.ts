
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import * as dotenv from "dotenv";


dotenv.config();

export default defineConfig({
    plugins: [react()],
    server: {
        port: process.env.VITE_FRONTEND_PORT ?
            parseInt(process.env.VITE_FRONTEND_PORT) : 5173,
    },
});
