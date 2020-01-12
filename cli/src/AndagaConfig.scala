package andaga.cli

case class AndagaConfig(
    command: String = "",
    amount: Option[Int] = None,
    category: String = "",
    entry: String = "",
    time: Int = 0,
    location: Option[String] = None,
    project: Option[String] = None,
    date: Option[String] = None,
    tags: Seq[String] = Seq()
)
