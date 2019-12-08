ThisBuild / scalaVersion := "2.12.10"
ThisBuild / version := "0.1.0-SNAPSHOT"
ThisBuild / organization := "xyz.chronica"

lazy val cli = (project in file("cli"))
  .settings(
    name := "andaga-cli",
    libraryDependencies ++= Seq(
      "com.github.scopt" %% "scopt" % "4.0.0-RC2",
      "com.lihaoyi" %% "requests" % "0.2.0",
      "com.lihaoyi" %% "ujson" % "0.7.1",
      "com.typesafe" % "config" % "1.4.0",
      "org.scalatest" %% "scalatest" % "3.0.8"
    )
  )
