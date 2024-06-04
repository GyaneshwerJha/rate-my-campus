const express = require('express');
const cors = require('cors');
const path = require('path');
const dotenv = require('dotenv').config();
const port = process.env.PORT || 5000;
const connectDatabase = require('./config/database');
const errorHandler = require('./middleware/errorMiddleware');
const campusRoutes = require('./routes/campusRoutes');
const userRoutes = require('./routes/userRoutes');
const reviewRoutes = require('./routes/reviewRoutes');

connectDatabase();
const app = express();

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api/campuses/:id/reviews', reviewRoutes);

app.use('/api/campuses', campusRoutes);
app.use('/api/users', userRoutes);

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../frontend/dist')));
  app.get('*', (req, res) =>
    res.sendFile(
      path.resolve(__dirname, '../', 'frontend', 'dist', 'index.html')
    )
  );
}

app.use(errorHandler);

app.listen(port, () => console.log(`Server started on port ${port}`));
