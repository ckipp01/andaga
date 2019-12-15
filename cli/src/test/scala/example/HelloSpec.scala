package example

import org.scalatest._

class HelloSpec extends FlatSpec with Matchers {
  "hello" shouldEqual "hello"
}
