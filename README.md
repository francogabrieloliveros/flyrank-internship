# Empty but Live: Ship a Blank Page

## General AI Fluency - Week 4

## Workflow

<img width="1270" height="688" alt="Image" src="https://github.com/user-attachments/assets/ae8b9d12-4543-44ec-a007-7d02572d6ee6" />

### Overview

This automation workflow utilizes your resume to score it against job search results of the position your looking for. Good matches are then added to a google sheets document. Sadly, I am not able to share the workflow itself since I ran it locally.


**Schedule Trigger**: It is scheduled to run the workflow every 8am in the morning.

**Config**: You can set the adzuna job api details (country, page, app_id, app_key, results_per_page, what_end) and your resume details here.

**HTTP Request**: Utilizes adzuna job api to fetch jobs based on the config.

**Split Out and Jobs**: Fetches and splits the results from the request. Then, it returns the jobs as json and string format (for LLM).

#### Loop

**AI Agent**: I used openrouter with Laguna 2.1 free model for this one. It scores your resume details against the job details.

**Edit Fields**: Pareses the agent response into a JSON.

**If**: Returns true if the score of is greater than 50.

**Append row in sheet**: Appends score, job url, job title, and company in a google sheet.

## Config

country: au

page: 1

app_id: secret

app_key: secret

results_per_page: 3

what_and: <role_details>

resume_details: [my resume](https://docs.google.com/document/d/1G2GXFNm6qHIa0vHiGjSDWS9Tx-2MzIKfzlE7qChG1xI/edit?usp=sharing)

## Scorer Prompt

Hi, you are a helpful job matcher, you read my resume then analyze the given resume and job description and provide a job matching score.output must be parse in json without error.

for example your response should be like: {"score": 80 }

job_data: {{}}

my_resume: {{}}

## Runs

1. what_and:"AI Engineer Intern"

<img width="1449" height="275" alt="Image" src="https://github.com/user-attachments/assets/ec4f5219-d0b9-4b8a-8dd4-85c556c4bbb2" />

2. what_and:"Frontend Engineer Intern"

<img width="1655" height="276" alt="Image" src="https://github.com/user-attachments/assets/4a8cc40b-1dc6-4a1d-a1ba-02ffac298be8" />

3. what_and:"Junior DevOps Intern"

<img width="1650" height="215" alt="Image" src="https://github.com/user-attachments/assets/a07dd27c-e656-4481-bda3-dbb1a945dbc5" />

4. what_and:"FullStack Software Engineer"

<img width="1654" height="214" alt="Image" src="https://github.com/user-attachments/assets/1a14c45e-1bfe-4407-9093-b56dbfe45f0b" />

5. what_and:"Marketing Intern"

<img width="1655" height="212" alt="Image" src="https://github.com/user-attachments/assets/17b39a14-7b40-4e78-99d4-5201a1bcd3cf" />

## Time Saved Estimate

Manually finding jobs and comparing them to my resume before considering application usually takes around 5 minutes per job.

It took me 3 hours to learn n8n and setup the workflow. However, the automation workflow took less than 5 minutes for all the runs I did.

Overall, it saves me a lot of time. Approximately, **4.9 minutes per job**. Which considerably despite the long one time setup, it can be easily reused in the future.

## Known Failure Points

The **data from the API**, especially the job description, need to be extremely descriptive. Otherwise, the LLM might hallucinate and base its scoring judgment from its training data.

Moreover, the **resume details** must also be complete or good enough at least. If not, there will not be at least one job added to the sheets.

Also, the **LLM** used itself can also be a point failure. Good models are often expensive, but the model used will determine the quality of the scoring judgement.
