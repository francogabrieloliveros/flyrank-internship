# Explain it Like You Built It

## General AI Fluency - Week 5

## The Build

https://flyrank-internship-ugly-one.vercel.app/

## Explanation of the Proof of Work Page Structure

To access the domain/proof-of-work page, NextJS does not require an external library. Instead, it does this through folder structuring. The folders in src/app folder are considered a page route when they have a page.tsx inside them.

In the src/app/proof-of-work/page.tsx, the code of the tsx file is short but it displays a lot of projects. How does it do this? Well after NextJS comes its React functionality; since NextJS is a React framework.

In the src/components there is a ProjectCard.tsx and ProjectThumb.tsx. These two are abstractions and reusable components that represent what each card will look like. It is then imported in the proof-of-work/page.tsx to be used. Through secondaryProjects.map, javascript is able to loop through each project, insert the data to the ProjectCard layout, and return a list of cards with the same layout applied.

With this, it is easier for the developers to work with the html rather than typing each card one-by-one.
