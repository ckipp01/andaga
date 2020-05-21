function __andaga_make_inner_list
  set -l _split (string split , $argv)
  set -l wrapped (for i in $_split; echo \"$i\"; end)
  string join , $wrapped
end

function __andaga_log
  set --local options \
    'c/category=' \
    'n/notes=' \
    'd/duration=!_validate_int' \
    'l/location=' \
    'p/project=' \
    't/tags='

  argparse --min-args 1 --max-args 1 $options -- $argv

  if set --query _flag_category; or return 1; end
  if set --query _flag_notes; or return 1; end
  if set --query _flag_duration; or return 1; end
  if set --query _flag_project; or return 1; end

  set -l tags (__andaga_make_inner_list $_flag_tags)

  http -b POST $ANDAGA_HOST$ANDAGA_LOG_PATH Authorization:$ANDAGA_AUTH \
    date=(date +%Y-%m-%d) \
    category=$_flag_category \
    time:=$_flag_duration \
    notes=$_flag_notes \
    location=$_flag_location \
    project=$_flag_project \
    tags:="[$tags]"
end

function __andaga_add_entry
  set --local options \
    'c/category=' \
    'n/notes=' \
    'l/location=' \
    'p/project=' \
    't/tags='

  argparse --min-args 1 --max-args 1 $options -- $argv

  if not set --query _flag_category
    echo You need a category
    return 1
  end

  if not set --query _flag_notes
    echo You need notes
    return 1
  end

  if not set --query _flag_project
    echo You need a project
    eturn 1
  end

  echo (date +%s) -c $_flag_category -n \"$_flag_notes\" -p $_flag_project -t $_flag_tags > ~/.andaga.txt
end

function __andaga_start
  if test -e ~/.andaga.txt
    if test -s ~/.andaga.txt
      echo You need to end the current log before starting another.
    else
      __andaga_add_entry $argv
    end
  else
    touch ~/.andaga.txt
    __andaga_add_entry $argv
  end
end

function __andaga_recall
  argparse --max-args 1 'a/amount=!_validate_int' -- $argv
  set --query _flag_amount; or set --local _flag_amount 1
  http -b $ANDAGA_HOST$ANDAGA_LOG_PATH Authorization:$ANDAGA_AUTH amount==$_flag_amount
end

function __andaga_current
  if test -s ~/.andaga.txt
    read --local --tokenize --list current_task < ~/.andaga.txt

    set --local _duration (math 'round(' (math (date +%s) - $current_task[1]) / 60 ')')

    echo $_duration minutes spent so far on the following log:\n $current_task[2..-1]
  else
    echo There is no current task being tracked.
  end
end

function __andaga_clear
  if test -e ~/.andaga.txt
    : > ~/.andaga.txt
  else
    echo There is no file to clear.
  end
end

function __andaga_end
  if test -e ~/.andaga.txt
    read --local --tokenize --list current_task < ~/.andaga.txt

    set --local _duration (math 'round(' (math (date +%s) - $current_task[1]) / 60 ')')

    __andaga_log log $current_task[2..-1] -d $_duration
  else
    echo There is no current task being tracked.
  end
end

function __andaga_get_tags
  http -b $ANDAGA_HOST$ANDAGA_TAGS_PATH Authorization:$ANDAGA_AUTH
end

function __andaga_get_projects
  http -b $ANDAGA_HOST$ANDAGA_PROJECTS_PATH Authorization:$ANDAGA_AUTH
end

function __andaga_get_categories
  http -b $ANDAGA_HOST$ANDAGA_CATEGORIES_PATH Authorization:$ANDAGA_AUTH
end

function __andaga_show_usage
  printf "Usage: andaga <command> [options]\n\n"
  printf " Options:\n\n"
  printf "  -h/--help          Prints help\n\n"
  printf " Commands:\n\n"
  printf "  log                Log a new entry\n\n"
  printf "   Options:\n"
  printf "    -c, --category   Category to store the log in\n"
  printf "    -n, --notes      Notes to be stored with the log\n"
  printf "    -d, --duration   Duration of the action to be stored\n"
  printf "    -l, --location   Location of the action to be stored\n"
  printf "    -p, --project    Project that the log belongs to\n"
  printf "    -t, --tags       Tags that belong to the log\n\n"
  printf "  recall             Recall n amount of log entries\n\n"
  printf "   Options:\n"
  printf "    -a, --amount     Amount of entries to recall (defaults to 1 if none given)\n\n"
  printf "  tags               Get a list of all used tags\n"
  printf "  projects           Get a list of all projects logged so far\n"
  printf "  categories         Get a list of all categories used so far\n\n"
  printf "  start              Start tracking a task\n"
  printf "   Options:\n"
  printf "    -c, --category   Category to store the log in\n"
  printf "    -n, --notes      Notes to be stored with the log\n"
  printf "    -l, --location   Location of the action to be stored\n"
  printf "    -p, --project    Project that the log belongs to\n"
  printf "    -t, --tags       Tags that belong to the log\n\n"
  printf "  clear              Clear an existing task that has been started\n"
  printf "  current            Show the current task being tracked\n"
  printf "  end                Stop tracking and store the current task\n"
end

function andaga -d "ándaga cli"
  switch $argv[1]
    case -h --help
      __andaga_show_usage
    case log
      __andaga_log $argv
    case recall
      __andaga_recall $argv
    case tags
      __andaga_get_tags
    case projects
      __andaga_get_projects
    case categories
      __andaga_get_categories
    case start
      __andaga_start $argv
    case clear
      __andaga_clear
    case current
      __andaga_current
    case "end"
      __andaga_end
  end
end
