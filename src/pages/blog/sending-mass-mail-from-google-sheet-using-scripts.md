---
templateKey: article-page
title: Sending Mass Mail from Google Sheet using Scripts
slug: sending-mass-mail-from-google-sheet-using-scripts
author: Vaibhav Sharma
authorLink: https://twitter.com/vaibhaved
date: '2018-06-04T11:22:05+05:30'
cover: /img/mass_mail_google_script.jpg
metaTitle: Sending Mass Mail from Google Sheet using Scripts
metaDescription: >-
  Leverage the power of Google Script to run email campaigns, right from your
  Google Sheet.
tags:
  - email
  - marketing
  - javascript
---
Ever find yourself with a big spreadsheet full of names and emails and you have to send personalized emails to all of them? We did. We had a spreadsheet full of candidates for hiring and: 

* We had to first send them a mail asking if they are interested.
* If they replied positively we had to send them an assignment.
* If they hadn't replied with the completed assignment, we had to send them reminder mail.

So what we did first was, add three columns:

* Send First Email
* Send Assignment
* Send Reminder

These columns containing the word "Send" if the candidate has to be mailed, and "Sent" once the mail has been sent. So basically our script goes through, the sheet, picks up the candidate name, and email, uses name variable to create a personalized message, send it to their email(if the Send First Email contains the keyword "Send") and after sending replaces the keyword with "Sent".

## Step One: Structure of Our Sheet

![google sheet sturcture](/img/sheet_structure.png)

This is our example table, for the customized message we'll pick up, the first name from `column B`, the last name from `column C`, etc. You can add more details accordingly.

## Step Two: Script for Mass Mail

Google Script uses plain JavaScript with some built-in APIs. First, we write the function that'll send the mail. To Write the Script click on `Tools > Script Editor`.

```javascript
function sendMassMail() {

  // Get Active Sheet
  var sheet = SpreadsheetApp.getActiveSheet(); 

  // Sender Name will Appear to the Recipient
  var senderName = "Vaibhav | The Leaky Cauldron Blog";

  // Get all Data.
  var dataRange = sheet.getDataRange(); 
  var data = dataRange.getValues(); 

  var count = 0;

  // Parse Through Data
  for (i in data) { 
    count += 1;
    var rowData = data[i]; 

    // Array Starts with 0, eg. - column B is 1
    var first_name = rowData[1]; 
    var last_name = rowData[2];
    var emailAddress = rowData[3]; 
    var confirmSend = rowData[4]; 

    // Set a Custom Subject
    var subject = first_name + ' | Graphic Designer Role at The Leaky Cauldron Blog';

    // Verify if the mail has to be sent
    if (confirmSend === "Send") { 
      try { 

        // Use MailApp API to send Email.
        MailApp.sendEmail({ 
          to: emailAddress, 
          subject: subject, 
          // Write Custom HTML Message
          htmlBody: '<div>Hi ' + first_name + last_name + '</div>', 
          name: senderName 
        }); 

        // Set the value of Mail Status to Sent if Sent.
        // getRange(row, column). column starts from 1.
        sheet.getRange(count, 5).setValue("Sent");

        // Log if the Mail was sent successfully
        Logger.log("Email: %s", emailAddress); 

      } catch(e) { 

        // Set the value of Mail Status to Failed if Failed.
        sheet.getRange(count, 5).setValue("Failed");

        // Log if there was some error
        Logger.log(e); 

      } 
    } else { 
      continue; 
    } 
  }
}
```

Don't forget to Save the Project.

## Step Three: Add the Function To Main Menu

Below the `sendMassMail()` write a function called `onOpen()`.

```javascript
function onOpen() {
  var sheet = SpreadsheetApp.getActiveSpreadsheet();
  var entries = [{

    // Set a Name for Function
    name : "Send Mass Mail",
    functionName : "sendMassMail"

  }];

  // Add a Menu and name it
  sheet.addMenu("Email", entries);

};
```

Save and reload the sheet, you'll see a menu called `Email`, and within it, an option called `Send Mass Mail`. 

That's it just click on the option to run the script and send mass mail. One more, thing you'll have to approve the script to use your Gmail.

Link to Example Sheet - [Mass Mail](https://docs.google.com/spreadsheets/d/1OeRL8bFaAYuwAQXdy_wV1WKmGap_gcQ3jFOzrbKVEuo/edit?usp=sharing)
