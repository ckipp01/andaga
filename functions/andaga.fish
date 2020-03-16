function __andaga_make_inner_list
  set -l _split (string split , $argv)
  set -l wrapped (for i in $_split; echo \"$i\"; end)
  string join , $wrapped
end

function log
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

function __andaga_recall
  argparse --max-args 1 'a/amount=!_validate_int' -- $argv
  set --query _flag_amount; or set --local _flag_amount 1
  http -b $ANDAGA_HOST$ANDAGA_LOG_PATH Authorization:$ANDAGA_AUTH amount==$_flag_amount
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
  printf "  categories         Get a list of all categories used so far\n"
end

function andaga -a cmd -d "ándaga cli"
  switch $cmd[1]
    case -h --help
      __andaga_show_usage
    case log
      log $cmd
    case recall
      __andaga_recall $cmd
    case tags
      __andaga_get_tags
    case projects
      __andaga_get_projects
    case categories
      __andaga_get_categories
  end
end
