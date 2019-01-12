# ándaga - a personal time tracker

This is a WIP of what the cli portion of ándaga will be.

## Usage
 ```
❯ andaga

 -|-|-|-|-|-  log and ándaga will remember  -|-|-|-|-|-
 |-|-|-|-|-  ask me to list and I will show  -|-|-|-|-|
 -|-|-|-  ask me to tell and I will do the math  |-|-|-
 |-|-|-|-  ask for help and it will be given  |-|-|-|-|
```

ándaga has 6 main commands

1) `andaga log` used for logging new entries
2) `andaga list` for listing your entries
3) `andaga tell` for telling you totals
4) `andaga populate` for populating your SQLite database from a json file
5) `andaga backup` backs up your database to a backup json file
6) `andaga show` to bring up a dashboard with statistics on your entries

You can bring up a help menu with `andaga --help` or `andaga -h`
```
❯ andaga -h

  Usage: andaga [options] [command]


  Options:

    -V, --version  output the version number
    -h, --help     output usage information


  Commands:

    log [options] <entry> <time>      logs your entries
    list [options] <amount> [number]  lists your entries
    tell [options]                    tells you stats on your entries
    populate                          runs through the json and populates the db
    backup                            backs up your json file
    show                              dashboard time
```

You can also call help on each of those commands to show further details and options for each. For example, `andaga log -h` would bring up the below options signifying the usage with optional options and required entry and time arguments.
```
❯ andaga log -h

  Usage: log [options] <entry> <time>

  logs your entries


  Options:

    -l | --learn          signifies learning
    -a | --act            signifies action
    -r | --rest           signifies rest
    -s | --social         signifies social
    -d | --date <date>    specifies the date if it was not today
    -p | --place <place>  location activity was done
    -h, --help            output usage information
```

