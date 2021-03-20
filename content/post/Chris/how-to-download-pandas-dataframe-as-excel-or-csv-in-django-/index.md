---
title: How to download Pandas Dataframe as Excel or CSV in Django?
date: 2021-03-20T07:00:00.000+05:30
summary: Implementation of downloading a file using Django and Pandas with information about HTTP Response.
draft: true
featured: false
author: Chris
tags:
- python
- django
- pandas

categories:
- Django

image: ""
---

# How to download Pandas Dataframe as Excel or CSV in Django

I created an Analytics platform for my company, and one of the features was to be able to download the aggregated data in form of Excel. Basically, in the frontend, the user turns some filters based on that I will process the data in the backend and provide the data as an excel file. I this post, I will show you exactly that. Assuming you have already written the code for Django and data analysis using Pandas.

I will be using Pandas v1.2.3 which uses openpyxl engine to read and write excel files. So we will begin by installing that.

## Openpyxl

Openpyxl is a tool that allows to read and write Open Office XML formats such as Excel 2010 xlsx/xlsm/xltx/xltm files.

```bash
pip install openpyxl
```

Once installed, you can create Excel files natively from Python using a simple code like this.

```bash
from openpyxl import Workbook

workbook = Workbook()
sheet = workbook.active

sheet["A1"] = "ID"
sheet["B1"] = "Key"

sheet["A2"] = 1
sheet["B2"] = "Test Key"

workbook.save(filename="test.xlsx")
```

This will create a file called **"test.xlsx".** Try it out yourself.

## HTTPS Response

As you know, Django uses HTTP Request and Response to communicate with the client. Therefore all data must be converted to Byte String before sending it over to the client.

A Typical HTTP Response looks something like this.

![https://res.cloudinary.com/tanseersaji/image/upload/v1616226497/httpmsgstructure2_htshjp.png](https://res.cloudinary.com/tanseersaji/image/upload/v1616226497/httpmsgstructure2_htshjp.png)

For more information, checkout this amazing article by Mozilla about [HTTP Messages](https://developer.mozilla.org/en-US/docs/Web/HTTP/Messages).

As you can see in the above picture, every HTTP response has a body section which is a Byte Array and a Header called **Content-Type** specifies what type of content it is and which Charecter set the browser should use in order to decode the bytes. In the above case, the server is sending a text/html data and the browser need to use iso-8859-1 charset.

In our case, we are sending bytes that are related to Excel spreadsheets. So googling for a bit I found the content-type header for that is this. Source: Mozilla article about [Common MIME Types](https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/MIME_types/Common_types)

```
application/vnd.openxmlformats-officedocument.spreadsheetml.sheet
```

### **What are MIME Types?**

MIME is short for **Multipurpose Internet Mail Extensions** which is a standard that indicates the nature and format of a document sent via the Internet.

> **Important**: Browsers use the MIME type, not the file extension, to determine how to process a URL, so it's important that web servers send the correct MIME type in the response's [Content-Type header](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Content-Type). If this is not correctly configured, browsers are likely to misinterpret the contents of files and sites will not work correctly, and downloaded files may be mishandled.

Source: [https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/MIME_types](https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/MIME_types)

The structure of a MIME Type is according to [IANA (Internet Assigned Numbers Authority)](https://www.iana.org/) is like this.

```
type/subtype
```

Therefore, in the MIME Type for Excel files, the type is "**application",** which belongs to any kind of binary data that cannot be directly decoded to a human-readable form (text, HTML, etc.). Files with type application require some sort of external or third party software to decode and read such as PDFs, Zip files, Excel files, etc.

## Download Excel Files using Django and Pandas

Finally, we will see how we can send the Pandas dataframe to client as an excel file.

I am assuming that you already have the code for pandas so I will do some abstraction in a variable called data.

First we will import to the inbuilt library, BytesIO so that we can write the excel file as a Byte array.

```python
from io import BytesIO
```

Then we will use Python context manager to open a Byte buffer on which we can write the excel file.

```python
with BytesIO() as b
        with pd.ExcelWriter(b) as writer:
						# You can add multiple Dataframes to an excel file
						# Using the sheet_name attribute
            data1.to_excel(writer, sheet_name="DATA 1", index=False)
						data2.to_excel(writer, sheet_name="DATA 2", index=False)

        filename = "analytics_data.xlsx"

				# imported from django.http
        res = HttpResponse(
            b.getvalue(), # Gives the Byte string of the Byte Buffer object
            content_type='application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
        )
        res['Content-Disposition'] = f'attachment; filename={filename}'
        return res
```

Inside the Byte buffer context manager, we will create another context manager to open a Pandas ExcelWriter object and pass the byte buffer to it. Inside that, you can write any number of data frames as sheets.

Outside the pandas ExcelWriter manager but inside the Byte buffer manager, we will create the Django HTTPResponse object and as the first parameter, we will pass the Byte string of the buffer which we can get from getvalue() method and second paramater will be the content_type as discussed above.

In addition to the Content_Type header, we also need to provide another header called **[Content-Disposition](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Content-Disposition)** that tells the browser if we want to show the data in the browser download and save it as a local file as an attachment. We can also pass a filename with this header.

That is all, you just have to create a Django URL for this function and you can download any flie you want just convert that file to a Byte string and use correct Content_Type header.