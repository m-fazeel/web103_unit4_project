import express from 'express'
import path from 'path'
import favicon from 'serve-favicon'
import dotenv from 'dotenv'
import customItemsRoutes from './routes/customItemsRoutes.js'; 
import cors from 'cors';
import componentOptionsRoutes from './routes/componentOptionsRoutes.js';

dotenv.config()

const PORT = process.env.PORT || 5173;

const app = express()

app.use(express.json())
app.use(cors());

// app.get('/api/test', (req, res) => res.send('Test route works!'));
if (process.env.NODE_ENV === 'development') {
    app.use(favicon(path.resolve('../', 'client', 'public', 'lightning.png')))
}
else if (process.env.NODE_ENV === 'production') {
    app.use(favicon(path.resolve('public', 'lightning.png')))
    app.use(express.static('public'))
}

app.use('/api', customItemsRoutes);
app.use('/api', componentOptionsRoutes);

console.log(`server listening on http://localhost:${PORT}`)


if (process.env.NODE_ENV === 'production') {
    app.get('/*', (_, res) =>
        res.sendFile(path.resolve('public', 'index.html'))
    )
}

app.listen(PORT, () => {
    console.log(`server listening on http://localhost:${PORT}`)
})