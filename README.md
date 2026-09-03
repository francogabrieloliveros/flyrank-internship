# PDF report generator

## Backend AI Engineering - Week 7

This is a small pipeline that turns an SQLite database into a downloadable PDF report through a REST API. For the dataset, I chose the scraped **books.json** file from the polite-scraper assignment.

## Installation & Running

```bash
# INSTALLATION
# clone the repo and go to the generated folder
git clone https://github.com/francogabrieloliveros/flyrank-internship.git && cd flyrank-internship

# access the right branch
git checkout backend-ai-engineering/week7/pdf-report-generator
```

```bash
# RUNNING
# install packages first
npm i

# seed the database
npm run seed

# run
npm run dev
```

Server runs on `http://localhost:3000`.

## Aggregation SQL

Used in `getReportData()` to build the four report sections:

```sql
-- Total books
SELECT COUNT(*) AS count FROM books;

-- Average price
SELECT ROUND(AVG(price), 2) AS avg FROM books;

-- Top 5 most expensive books
SELECT title, price FROM books ORDER BY price DESC LIMIT 5;

-- Books per star rating
SELECT rating, COUNT(*) AS count FROM books GROUP BY rating ORDER BY rating;
```

## POST → download proof

Generate a report:

```bash
$ curl -i -X POST http://localhost:3000/reports

HTTP/1.1 201 Created
X-Powered-By: Express
Content-Type: application/json; charset=utf-8
Content-Length: 33
ETag: W/"21-YZ8meBaxBiOq5MbmzrHWzic1LyU"
Date: Thu, 03 Sep 2026 13:50:40 GMT
Connection: keep-alive
Keep-Alive: timeout=5

{"id":1,"file":"/reports/1/file"}
```

Download the PDF it points to:

```bash
$ curl -o my-report.pdf http://localhost:3000/reports/1/file
% Total    % Received % Xferd  Average Speed  Time    Time    Time   Current
                               Dload  Upload  Total   Spent   Left   Speed
100  30822 100  30822   0      0  7.83M      0                              0
```

## Stage 4: When would this move to a background job?

I'll move the report generation out of the request once it takes more than 3secs or is used by multiple users since it blocks the server and the client from doing other things.

## Stage 5: What your check protects against?

The check protects against duplicate report generation which wastes server resources. A good example is a banking app that creates credit/debit reports at a specific time of the day so their data would not overlap.

## Sample output

Page 1 of a generated report:

<img width="798" height="952" alt="Image" src="https://github.com/user-attachments/assets/7fd8b319-efd2-4a3e-abe7-df3ab434babb" />
