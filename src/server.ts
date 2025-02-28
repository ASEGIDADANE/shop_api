import express from 'express'
import dotenv from 'dotenv'
import connectDB from './config/db'
import authroute from './routes/authRoute'
import productRoute from './routes/productRoute'
import cartRoute from './routes/cartRoute'
import orderRoute from './routes/orderRoute'
import reviewRoute from './routes/reviewRoute'

const app = express()
dotenv.config()
// database connection
connectDB();
// app.use(json)


// middleware

app.use(express.json())

// routes
app.use('/api/auth', authroute);
app.use('/api/products', productRoute);
app.use('/api/cart', cartRoute);
app.use('/api/orders', orderRoute);
app.use('/api/reviews', reviewRoute);






const port = process.env.PORT || 3000

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

