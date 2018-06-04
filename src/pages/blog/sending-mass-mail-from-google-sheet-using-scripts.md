---
templateKey: article-page
title: Sending Mass Mail from Google Sheet using Scripts
date: '2018-06-04T11:22:05+05:30'
cover: /img/google_sheet_mass_mail.png
tags:
  - GoogleSheet
  - GoogleScript
  - Email
meta_title: Sending Mass Mail from Google Sheet using Scripts
meta_description: >-
  Leverage the power of Google Script to run email campaigns, right from your
  Google Sheet.
---
Ever find yourself with a big spreadsheet full of names and emails and you have to send personalised mails to all of them? We did. We had a spreadsheet full of candidates for hiring and: 

* We had to first send them mail asking if they are interested.
* If they replied positively we had to send them assignment.
* If they hadn't replied with the completed assignment, we had to send them reminder mail.

So what we did first was, add three columns:

* Send First Email
* Send Assignment
* Send Reminder

These columns containing the word "Send" if the candidate has to be mailed, and "Sent" once the mail has been sent. So basically our script goes through, the sheet, picks up the candidate name, and email, uses name variable to create a personalised message, send it to their email(if the Send First Email contains the keyword Send) and after sending replaces the keyword with Sent.
