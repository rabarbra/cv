#let header_v_sp = v(8pt)
#let gmaps = "https://www.google.com/maps/place/"

#let imgs = (
  tel:      "img/tel.svg",
  github:   "img/github.svg",
  linkedin: "img/linkedin.svg",
  location: "img/location.svg",
  email:    "img/email.svg",
)

#let icon(name, shift: 1.5pt) = {
  box(
    baseline: shift,
    height: 10pt,
    image(imgs.at(name))
  )
  h(3pt)
}

#let maybe_link(key, value) = {
  if key == "tel" {
    link("tel:" + value)
  } else if key == "email" {
    link("mailto:" + value)
  } else if key == "github" {
    link("https://" + value)[#value]
  } else if key == "linkedin" {
    link("https://" + value)[#value]
  } else if key == "location" {
    link(gmaps + value.city)[#value.city, #value.country]
  } else {
    value
  }
}

#let build_contacts(contacts) = {
  heading(level: 3, contacts.title)
  header_v_sp
  for (key, value) in contacts.content {
    text[#icon(key) #maybe_link(key, value)]
    [\ ]
  }
}

#let build_education(education) = {
  heading(level: 3, education.title)
  header_v_sp
  for item in education.content {
    text(size: 9pt)[#item.from - #item.to]
    [\ ]
    text(size: 11pt, weight: "regular")[#item.organization]
    [\ ]
    text(size: 10pt, weight: "light")[#item.discipline]
    v(2pt)
  }
}

#let build_skills(skills) = {
  heading(level: 3, skills.title)
  header_v_sp
  for el in skills.content {
    list(el)
  }
}

#let build_languages(languages) = {
  heading(level: 3, languages.title)
  header_v_sp
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
  header_v_sp
  for el in experience.content {
    [#text(size: 11pt)[#el.position] #h(1fr) #text(size: 9pt)[#el.from - #el.to]]
    [\ ]
    text(size: 10pt, weight: "light")[#el.organization]
    v(2pt)
    for it in el.description {
      list(text(size: 9pt, it))
    }
    v(3pt)
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
    margin: (x: 1.3cm, y: 1.5cm),
  )
  set list(indent: 1em)

  show heading: it => {
    set block(below: 8pt)
    set text(
      weight: "semibold",
      fill: rgb(100, 100, 100),
      tracking: 1.2pt,
      spacing: 150%
    )
    upper(it)
  }

  text(size: 20pt, fill: rgb(10, 10, 10))[#heading(level: 1)[#contents.title]]
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
      spacing: 30pt,
      build_profile(contents.profile),
      build_experience(contents.experience)
    )
  )
}
