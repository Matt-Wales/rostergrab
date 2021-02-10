# <a href="https://rostergrab.netlify.app">MLB RosterGrab</a>
![RosterGrab demo GIF](https://i.imgur.com/0WxEZeV.gif)

### What is RosterGrab?

RosterGrab is my first React application. It is a web application that consumes the MLB.com API to display stats and graphs of any Major League Baseball player's 2020 season data. If the player is currently on any MLB team's active roster, you can view their 2020 stats on the app.

### Is the app responsive for viewing across desktop, tablet, and mobile?

Yes, the app is responsive for viewing across all screen sizes, although it is best viewed on desktop because the graphs with synchronized tooltip functionality on the pitcher pages were designed to be viewed side by side.

### Why is the pitch type data and slump/streak data on the bottom of a player's page not showing up for me?

The retrieval of the pitch type data and slump/streak data can be a little spotty because I had to use a workaround to bypass the API's CORS protocol for that specfic HTTP GET request, so it's probably not your Internet connection's fault if it doesn't load within a few seconds. All other data in the app will load pretty much instantly if your Internet connection is stable.
