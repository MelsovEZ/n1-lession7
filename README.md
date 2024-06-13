# README

## Project Overview

This project is a web scraping service that collects article data from the news website and stores it in a MongoDB database. The service is built using Node.js with the Express framework and uses Axios for making HTTP requests, Cheerio for parsing HTML, and Node-Cron for scheduling tasks.

## Prerequisites

Before running the project, ensure you have the Node.js (v20.x) installed.

## Installation

1. Clone the repository to your local machine:
    ```sh
    git clone https://github.com/MelsovEZ/n1-lession7.git
    cd n1-lession7
    ```

2. Install the required npm packages:
    ```sh
    npm install
    ```

## Usage

1. Start the service:
    ```sh
    node server.js
    ```

2. You should see the message `Server is running on port 3000` in your terminal.

3. Visit `http://localhost:3000` to perform a health check. You should see the message `Service is running`.
