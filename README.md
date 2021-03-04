# Idiomatic Programmers Community Posts

If you want to write a post for idiomaticprogrammers.com, follow these instructions

### Clone the Repository
```bash
git clone https://github.com/Idiomatic-Programmers/idiomaticprogrammers_community_posts.git
cd idiomaticprogrammers_community_posts
```

### Create a new Post
```bash
npm run start
```
This command will go through a form where you can write the title and tags for the article. You can change these anytime you want.

#### Questions Asked
1. **What will be the title of your post?** - This will be the title of your post/article, check Blog Post Guidelines section on more information.
2. **Write comma-separated Categories for your Post** - Keep upto two one word categories
3. **Write comma-separated Tags for your Post** - Keep upto four tags
4. **What's your Author Name (Pen Name)?** - This is actually asking for your First Name or if you have any pen name then you can write that.

This program creates a folder with your Pen Name inside content/post directory. Inside which, you can find all your previous posts with names matching you article names.
You will also find a markdown file in that folder, there you can write all your information about you.

## Blog Post Guidelines

Every Idiomatic Programmers blog post must follow this formula to keep the posts uniform and also to keep the readers hooked.

1. **Title:** The title should be the exact phrase that someone might search on Google or any other search engine.

    For Example: If you are writing a post about "Bandwidth Throttling". Instead of writing "bandwidth Throttling" as title, write something that the reader might search like "How my ISP blocks VPN?" you can also include other keywords such as throttles in the title.

2. **Summary:** The summary is the piece of text that the user sees even before clicking the post both in Idiomatic Programmer site and in search engines. So this must support the title and as much relevant keyword as possible while keeping the text short around two to three lines would be enough.
3. **Body:** A simple rule for writing the body of the post is that for every fact you write provide at least one evidence. Write the body as if you are writing a script for a youtube video (conversational).

    The following is a general outline for a post body.

    ### Introduction

    Why would the reader read this post and not one of the thousands of other posts like this? The first three lines of the introduction should be dedicated to hooking the reader by setting up a relatable problem that you are going to solve through this post.

    ### Background

    This can be a part of Introduction or can be a separate header, but in this section, you have to talk about existing solutions or technologies available to solve this problem and list some of its issues that you will solve through this post.

    ### Prerequisites

    This is section you will talk other technologies, libraries or concepts that might be required to understand your solution. Spend some time writing at least 1 paragraph about each concept or tool. A formula you can use for this can be - What is that tool or concept? Why it is needed in this solution? and links to further read or reference to that tool. If we already have a post related to that tool then prefer linking to that post instead of third party sites.

    ### Solution

    In this section, you will talk in-depth about your solution, how you came up with that solution and why it is better than any existing solutions. Provide necessary code snippets, screenshots, diagrams or tables. Also, don't forget the rule - **for every fact, give at least one evidence.**

    ### Conclusion

    Write one paragraph concluding your post, this should include the results (if any) from your solution and provide links to references. If possible prefer the academic paper as reference and avoid any blog that might not have credibility (A blog has no credibility if there is no solid evidence backing up their content.)

4. **Tags:** This will be used for SEO of the post, so write all the keywords related to the post.