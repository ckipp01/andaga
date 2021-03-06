set -l andaga_commands "log recall categories tags projects start clear current end"

complete -c andaga -f
complete -c andaga -n "not __fish_seen_subcommand_from $andaga_commands" -a $andaga_commands

# log flags
complete -c andaga -n "__fish_seen_subcommand_from log" \
  -s c \
  -d "Category to store the log in"

complete -c andaga -n "__fish_seen_subcommand_from log" \
  -s n \
  -d "Notes to be stored with the log"

complete -c andaga -n "__fish_seen_subcommand_from log" \
  -s d \
  -d "Duration of the action to be stored"

complete -c andaga -n "__fish_seen_subcommand_from log" \
  -s l \
  -d "Location of the action to be stored"

complete -c andaga -n "__fish_seen_subcommand_from log" \
  -s p \
  -d "Project that the log belongs to"

complete -c andaga -n "__fish_seen_subcommand_from log" \
  -s t \
  -d "Tags that belong to the log"

# recall flag
complete -c andaga -n "__fish_seen_subcommand_from recall" \
  -s a \
  -d "Amount of entries to recall"

# start flags
complete -c andaga -n "__fish_seen_subcommand_from start" \
  -s c \
  -d "Category to store the log in"

complete -c andaga -n "__fish_seen_subcommand_from start" \
  -s n \
  -d "Notes to be stored with the log"

complete -c andaga -n "__fish_seen_subcommand_from start" \
  -s l \
  -d "Location of the action to be stored"

complete -c andaga -n "__fish_seen_subcommand_from start" \
  -s p \
  -d "Project that the log belongs to"

complete -c andaga -n "__fish_seen_subcommand_from start" \
  -s t \
  -d "Tags that belong to the log"
