# ándaga - My personal time tracker

In the beginning of 2018 I set out to log all of my time for a year. In that
first year I logged a total of 36,880 minutes across 578 logs. It was an attempt
to notice trends, keep track of what I was working on, and to gain insights into
my productivity. You can read more about the project
[here](https://chris-kipp.io/andaga) on my [wiki](https://chris-kipp.io/wiki).

After a full year of logging everything locally, I decided to split ándaga into
two parts: [ándaga-core](https://github.com/ckipp01/andaga-core) which serves as
the api and the ándaga-cli. Ironically, after another full year of logging, I
decided to unify the project again into a single repo. After re-writing the cli
portion in Scala, I realized it was completely unnecessary and just replaced the
cli portion of the application with a small fish package, which works
fantastically.

This app probably isn't useful to anyone else out there, but hopefully it may serve as an
example of how someone can easily track what they work on, and be inspired to create
their own.

I manage the installation of this with
[`fisher`](https://github.com/jorgebucaran/fisher), which allows me to do the
following to install both the main function, `andaga` and also the completions.

```fish
fisher add ckipp01/andaga
```

Below you can see what is all available.

```text
❯ andaga -h
Usage: andaga <command> [options]

 Options:

  -h/--help          Prints help

 Commands:

  log                Log a new entry

   Options:
    -c, --category   Category to store the log in
    -n, --notes      Notes to be stored with the log
    -d, --duration   Duration of the action to be stored
    -l, --location   Location of the action to be stored
    -p, --project    Project that the log belongs to
    -t, --tags       Tags that belong to the log

  recall             Recall n amount of log entries

   Options:
    -a, --amount     Amount of entries to recall (defaults to 1 if none given)

  tags               Get a list of all used tags
  projects           Get a list of all projects logged so far
  categories         Get a list of all categories used so far

  start              Start tracking a task
   Options:
    -c, --category   Category to store the log in
    -n, --notes      Notes to be stored with the log
    -l, --location   Location of the action to be stored
    -p, --project    Project that the log belongs to
    -t, --tags       Tags that belong to the log

  clear              Clear an existing task that has been started
  current            Show the current task being tracked
  end                Stop tracking and store the current task
```
