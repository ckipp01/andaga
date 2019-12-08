package andaga.cli.projects

import com.typesafe.config.ConfigFactory

object Commands {

  def requestAll(key: String) = {
    val reqeustPath = conf.getString(s"andaga.${key}Path")
    val response = requests.get(
      host + reqeustPath,
      headers = headers
    )

    val parsed = ujson.read(response.text).arr
    parsed.foreach(item => println(Console.BLUE + item))
  }

  def recall(amount: Option[Int]) = {
    val recallPath = conf.getString("andaga.logPath")
    val r = requests.get(
      host + recallPath,
      headers = headers,
      params = Map("amount" -> amount.getOrElse(1).toString())
    )

    val prettyRecall = ujson.read(r.text).arr

    prettyRecall.foreach(
      // TODO figure out a nice way to pretty print these
      log => {
        log.obj.foreach {
          // TODO take out _id, we don't need item
          // TODO make tags display nicer
          // TODO figure out a way to add spaces and align the -
          case (s, v) => println(Console.BLUE + s"$s - $v")
        }
        println("\n")
      })
  }

  def log(
      category: String,
      log: String,
      time: Int,
      location: Option[String],
      project: Option[String],
      date: Option[String],
      tags: Seq[String]
  ) = {
    val reqeustPath = conf.getString("andaga.logPath")

    val dateToStore = date.getOrElse {
      val dateFormat = new java.text.SimpleDateFormat("yyyy-MM-dd")
      dateFormat.format(new java.util.Date())
    }

    val logEntry = ujson.Obj(
      "date" -> dateToStore,
      "category" -> category,
      "time" -> ujson.Num(time),
      "notes" -> log
    )

    location.foreach(logEntry.update("location", _))
    project.foreach(logEntry.update("project", _))

    if (tags.nonEmpty) {
      logEntry.update("tags", tags)
    }

    val response = requests.post(
      host + reqeustPath,
      headers = headers,
      data = ujson.write(logEntry)
    )

    response.statusMessage match {
      case "200" => println(Console.GREEN + "Successfully stored log")
      case _     => println(Console.RED + response.statusMessage)
    }
  }

  private val conf = ConfigFactory.load()
  private val host = conf.getString("andaga.host")
  private val auth = conf.getString("andaga.auth")
  private val headers = Map(
    "Authorization" -> auth
  )

}
