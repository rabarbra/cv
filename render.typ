#let render(contents) = {
  set document(
      title: "Full Stack Developer",
      author: "Polina Simonenko",
      keywords: "Full Stack",
      date: auto,
  )

  set text(
    font: "Blinker",
    size: 16pt
  )

  set page(
    paper: "a4",
    margin: (x: 1.8cm, y: 1.5cm),
  )

  show heading: it => {
    set block(below: 10pt)
    set text(
      weight: "semibold",
      fill: rgb(100, 100, 100),
    )
    align(center, upper(it))
  }
  heading(level: 1)[#contents.title]
  heading(level: 3)[#contents.subtitle]
}
