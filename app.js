const express = require('express');
const bodyParser = require('body-parser');
const gardensRouter = require('./routes/gardens');
const cropPlanRoutes = require('./routes/cropPlanRoutes');
const guideRoutes = require('./routes/guideRoutes');
const resourceRoutes = require('./routes/resourceRoutes');
const VolunteerRoutes = require('./routes/VolunteerRoutes');
const localPartnershipRoutes = require('./routes/localPartnershipRoutes');
<<<<<<< HEAD
const weatherRoutes = require('./routes/weatherRoutes');
const soilPestRoutes = require('./routes/soilPestRoutes');
const UserRoute = require('./routes/UserRoute');


const app = express();

=======

const weatherRoutes = require('./routes/weather');
const soilRoutes = require('./routes/soil');
//const authRoutes = require('./routes/auth');


require('dotenv').config();



// Middlewares
>>>>>>> origin/AishaBranch
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Database connection
const db = require('./database');

// Test database connection
db.connect(err => {
    if (err) {
        console.error('Error connecting to the database: ' + err.stack);
        return;
    }
    console.log('Connected to database with thread ID: ' + db.threadId);
});

// Routes

//app.use('/api/auth', authRoutes);


app.use("/api/gardens", gardensRouter);
app.use("/api/crop-plans", cropPlanRoutes);
app.use("/api/guides", guideRoutes); 
app.use("/api/resource",resourceRoutes);
app.use("/api/volunteers", VolunteerRoutes); 
app.use('/api/local-partners', localPartnershipRoutes);
<<<<<<< HEAD
app.use('/api/weather', weatherRoutes);
app.use('/api/soil_pest', soilPestRoutes);
app.use('/api/user', UserRoute);
=======

app.use('/weather', weatherRoutes);
app.use('/soil', soilRoutes);
>>>>>>> origin/AishaBranch

// Running the server Port 4040
const PORT = process.env.PORT || 4052;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
