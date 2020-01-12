# ándaga - My personal time tracker

In the beginning of 2018 I set out to log all of my time for a year. In that first year I logged a total of 36,880 minutes across 578 logs. It was an attempt to noticed trends, keep track of what I was working on, and to gain insights into my productivity. You can read more about the project [here](https://wiki.chronica.xyz/#andaga) on my [wiki](https://wiki.chronica.xyz).

After a full year of logging everything locally, I decided to split ándaga into two parts: [ándaga-core](https://github.com/ckipp01/andaga-core) which serves as the api and the ándaga-cli. Ironically, after another full year of logging, I'm in the process of unifying the project back into one repo and re-writing in in Scala.

Currently, ándaga-cli has 5 commands:

  - `andaga categories` used for displaying a list of used categories
  - `andaga log`  used for logging new entries
  - `andaga recall` used for recalling old log entries
  - `andaga projects` used for getting a list of projects that have been logged
  - `andaga tags` used for getting a list of tags that have been used
