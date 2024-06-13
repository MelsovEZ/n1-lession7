// Set up packages
const express = require('express');
const axios = require('axios'); // For making HTTP requests
const cheerio = require('cheerio'); // For parsing HTML
const cron = require('node-cron'); // For scheduling tasks
const mongoose = require('mongoose'); // For database

// Set up Express
const app = express();
const port = process.env.PORT || 3000;

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/articles',
    {useNewUrlParser: true, useUnifiedTopology: true}).then(() => {
    console.log('Connected to MongoDB.');
}).catch((error) => {
    console.log('Error while connecting to MongoDB: ', error)
});

// Define schema of article
const ArticleSchema = new mongoose.Schema({
    title: String,
    url: String,
});

// Define model of article
const Article = mongoose.model('Article', ArticleSchema);

// Define route for health check
app.get('/', (req, res) => {
    res.send('Service is running');
});

// Initialising
var data = [];

// Create a function to fetch data by scraping a website
async function fetchData() {
    try {
        // Get request to TengriNews
        const response = await axios.get('https://tengrinews.kz/article/');
        const html = response.data;

        // Load the HTML into cheerio
        const $ = cheerio.load(html);

        // Extract data using cheerio
        $('.content_main_item_title a').each((index, element) => {
            const title = $(element).text().trim();
            const url = 'https://tengrinews.kz' + $(element).attr('href');

            data.push({title, url});
        });

        // Remove duplicates from data
        const uniqueData = Array.from(new Set(data.map(item => JSON.stringify(item))))
            .map(item => JSON.parse(item));

        // Inserting all scraped data into MongoDB
        await Article.insertMany(uniqueData);

        console.log('Data scraped.');
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

// Call the scraping function once after the code starts
fetchData().then();

// Set up a cron job to run every hour
cron.schedule('* /5 * * *', () => {
    console.log('Running cron job - fetching and analyzing data');
    fetchData().then();
});

// Start the Express server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});