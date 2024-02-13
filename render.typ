#let imgs = (
  tel: "img/tel.svg",
  github: "img/github.svg",
  linkedin: "img/linkedin.svg",
  location: "img/location.svg",
  email: "img/email.svg",
)

#let icon(name, shift: 1.5pt) = {
  box(
    baseline: shift,
    height: 10pt,
    image(imgs.at(name))
  )
  h(3pt)
}

#let build_contacts(contacts) = {
  heading(level: 3, contacts.title)
  v(8pt)
  for (key, value) in contacts.content {
    text[#icon(key) #value]
    [\ ]
  }
}

#let build_education(education) = {
  heading(level: 3, education.title)
  v(8pt)
  for item in education.content {
    item.organization
    [\ ]
    item.discipline
    [\ ]
    [#item.from - #item.to]
    [\ ]
  }
}

#let build_skills(skills) = {
  heading(level: 3, skills.title)
  v(8pt)
  for el in skills.content {
    list(el)
  }
}

#let build_languages(languages) = {
  heading(level: 3, languages.title)
  v(8pt)
  for el in languages.content {
    list[#el.lang - #el.level]
  }
}

#let build_profile(profile) = {
  heading(level: 3, profile.title)
  v(8pt)
  for el in profile.content {
    el
    [\ ]
  }
}

#let build_experience(experience) = {
  heading(level: 3, experience.title)
  v(8pt)
  for el in experience.content {
    el.organization
    [\ ]
    el.position
    [\ ]
    [#el.from - #el.to]
    for it in el.description {
      list(text(size: 9pt, it))
    }
  }
}

#let render(contents) = {
  set document(
      title: "Full Stack Developer",
      author: "Polina Simonenko",
      keywords: "Full Stack",
      date: auto,
  )
  set text(
    font: "Blinker",
    size: 10pt
  )
  set page(
    paper: "a4",
    margin: (x: 1.5cm, y: 1.5cm),
  )
  set list(indent: 1em)

  show heading: it => {
    set block(below: 8pt)
    set text(
      weight: "semibold",
      fill: rgb(100, 100, 100),
    )
    upper(it)
  }

  heading(level: 1, text(size: 26pt)[#contents.title])
  heading(level: 2)[#contents.subtitle]
  v(30pt)
  grid(
    columns: (1fr, 2fr),
    gutter: 3pt,
    stack(
      spacing: 1fr,
      build_contacts(contents.contact),
      build_education(contents.education),
      build_skills(contents.skills),
      build_languages(contents.languages),
    ),
    stack(
      spacing: 1fr,
      build_profile(contents.profile),
      build_experience(contents.experience)
    )
  )
}
