package andaga.cli

import projects.Commands

object Main {

  def main(args: Array[String]): Unit = {
    import scopt.OParser
    val builder = OParser.builder[AndagaConfig]
    val parser1 = {
      import builder._
      OParser.sequence(
        programName("andaga"),
        head("ándaga", "0.1"),
        cmd("projects")
          .action((_, config) => config.copy(command = "projects"))
          .text("List all projects"),
        cmd("categories")
          .action((_, config) => config.copy(command = "categories"))
          .text("List recent categories"),
        cmd("tags")
          .action((_, config) => config.copy(command = "tags"))
          .text("List recent categories"),
        cmd("recall")
          .action((_, config) => config.copy(command = "recall"))
          .text("Recall recent entries")
          .children(
            arg[Int]("amount")
              .action((amount, config) => config.copy(amount = Some(amount)))
              .optional()
          ),
        cmd("log")
          .action((_, config) => config.copy(command = "log"))
          .text("Log an entry")
          .children(
            arg[String]("category")
              .text("Category that the entry belongs to")
              .action((category, config) => config.copy(category = category)),
            arg[String]("entry")
              .text("The entry that you'd like to be logged")
              .action((entry, config) => config.copy(entry = entry)),
            arg[Int]("time")
              .text("Time spent on activity being logged")
              .action((time, config) => config.copy(time = time)),
            opt[String]('l', "location")
              .text("Location that this activity took place")
              .action((location, config) =>
                config.copy(location = Some(location))
              ),
            opt[String]('p', "project")
              .text("Project that this activity belongs to")
              .action((project, config) => config.copy(project = Some(project))),
            opt[String]('d', "date")
              .text("Date that this activity took place on")
              .action((date, config) => config.copy(date = Some(date))),
            opt[Seq[String]]('t', "tags")
              .text("Tags relating to this activity")
              .action((tags, config) => config.copy(tags = tags))
          ),
        help("help")
      )
    }

    OParser.parse(parser1, args, AndagaConfig()) match {
      case Some(andaga) =>
        andaga.command match {
          case "projects"   => Commands.requestAll("projects")
          case "categories" => Commands.requestAll("categories")
          case "tags"       => Commands.requestAll("tags")
          case "recall"     => Commands.recall(andaga.amount)
          case "log" =>
            Commands.log(
              andaga.category,
              andaga.entry,
              andaga.time,
              andaga.location,
              andaga.project,
              andaga.date,
              andaga.tags
            )
          case _ => print("no")
        }
      case _ =>
        println("nope again")
      // arguments are bad, error message will have been displayed
    }
  }

}
