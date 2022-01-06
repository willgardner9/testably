## Introduction

Testably is a lightweight A/B testing tool designed for use on landing pages and other marketing pages. I built Testably because I was frustrated by the lack of an easy-to-use, affordable A/B testing tool that didn't rely on Google Analytics.

## About
This is a Version 2 rebuild of Testably. Version 1 was built in JavaScript with Express on the back end and Vue.js on the front end, using MongoDB as the database. It was deployed on DigitalOcean and Vercel. Payment was handled by Stripe and transactional emails with Nodemailer.

Version 2 is built with an emphasis on being 1) easily maintainable, 2) easy-to-read code, and 3) much easier for users. I'm focusing on maintainability and being an easy codebase to pick up as I am planning on selling the project when it's completed.

The tech stack is:

 - Front end
	 - NextJS (TypeScript)
	 - Tailwind CSS
- Back end
	- AdonisJS (TypeScript)
	- PostgreSQL
	- Services:
		- Stripe
		- Mailgun

Version 2 will either be deployed on AWS using IAC or a PaaS.
