import mill._
import scalalib._
import scalafmt._

object cli extends ScalaModule with ScalafmtModule {
  def scalaVersion = "2.12.10"
  def artifactName = "andaga-cli"
  def publishVersion = "0.2.0"
  def ivyDeps = Agg(
    ivy"com.github.scopt::scopt:4.0.0-RC2",
    ivy"com.lihaoyi::requests:0.2.0",
    ivy"com.lihaoyi::ujson:0.7.1",
    ivy"com.typesafe:config:1.4.0"
  )
}
