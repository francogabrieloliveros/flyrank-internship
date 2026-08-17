# The polite scraper

## General AI Fluency - Week 5

I will not reuse this code on another site without checking its rules and terms first.

## Installation & Run

```bash
# Installation
git clone https://github.com/francogabrieloliveros/flyrank-internship.git

# Go inside the directory
cd flyrank-internship

# Go to the right branch
git checkout backend-ai-engineering/week5/the-polite-scraper

# Install dependencies
npm i
```

```bash
# Running
npm run dev
```

## Target Classification

**Which**: https://books.toscrape.com

**Why**: To learn how to webscrape.

**How much**: The first 3 catalogue pages only

**What data**: Only the books and their info: Title, Author, Price, Ratings etc.

**Why appropriate**: It was stated in the website that it was made for the purpose of being webscraped. It basically contains dummy data that is structured like a real website. Perfect for learning webscraping.

## Robots Classification

No robots file found

## Politeness Rules

- Requesting with user agent **FlyRankInternshipA9/1.0 (+https://github.com/francogabrieloliveros/flyrank-internship/tree/backend-ai-engineering/week5/the-polite-scraper)**
- 500ms delay per fetch
- 5secs timeout if server does not respond
- Caching, to avoid repetitive requests
- Respecting 404, 403 and other codes
- Retrying after 4secs for server errors, and stopping after 5 attempts

## Records Schema

```ts
{
  title: string;
  product_url: url;
  price_text: string;
  price_gbp: number;
  availability_text: string;
  rating_text: enum(["One", "Two", "Three", "Four", "Five"]);
  description: string | null;
  source_page: url;
  fetched_at: DateTime;
});
```

## run-report.json Example

```json
{
  "startTime": "2026-08-17T15:46:33.514Z",
  "cacheHit": 63,
  "validRecords": 60,
  "invalidRecords": 1,
  "duration": 63
}
```

## One Honest Limitation

This scraper is extremely formulated for **bookstoscrape.com** and its schema. If I try to scrape another website, I would have to recode a lot of this. In short, each scraper is limited to the website it is scraping.

## Why the scraper needed no browser

All of the data to be scraped was in the html already. It did not have any data hidden behind javascript functionalities. Hence, using a browser for this would only slow down the scraping.

## Ethics Note

I will use official APIs when one exists. When resorting to scraping otherwise, I would never bypass logins, paywalls, or blocks. I would only collect what I need, ensure that the data is public, and read the website's own scraping policy.
