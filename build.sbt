ThisBuild / name := "andaga"
ThisBuild / scalaVersion := "2.12.10"
ThisBuild / version := "0.1.0"
ThisBuild / organization := "xyz.chronica"

lazy val cli = project
  .settings(
    name := "andaga-cli",
    addCompilerPlugin(scalafixSemanticdb),
    scalacOptions ++= Seq(
      "-Yrangepos",          // required by SemanticDB compiler plugin
      "-Ywarn-unused-import" // required by `RemoveUnused` rule
    ),
    libraryDependencies ++= Seq(
      "com.github.scopt" %% "scopt" % "4.0.0-RC2",
      "com.lihaoyi" %% "requests" % "0.2.0",
      "com.lihaoyi" %% "ujson" % "0.7.1",
      "com.typesafe" % "config" % "1.4.0",
      "org.scalatest" %% "scalatest" % "3.0.8"
    )
  )
  .enablePlugins(JavaAppPackaging)

addCommandAlias(
  "cleanup",
  "; scalafmtAll; scalafix RemoveUnused"
)

addCommandAlias(
  "check-and-package",
  "; scalafmtCheckAll; dist"
)
