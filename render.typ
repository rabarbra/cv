#let build_contacts(contacts) = {
  heading(level: 3, contacts.title)
  for (key, value) in contacts.content {
    value
  }
}

#let build_education(education) = {
  heading(level: 3, education.title)
}

#let build_skills(skills) = {
  heading(level: 3, skills.title)
  for el in skills.content {
    list(el)
  }
}

#let build_languages(languages) = {
  heading(level: 3, languages.title)
  for el in languages.content {
    list[#el.lang - #el.level]
  }
}

#let build_profile(profile) = {
  heading(level: 3, profile.title)
}

#let build_experience(experience) = {
  heading(level: 3, experience.title)
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
    size: 16pt
  )
  set page(
    paper: "a4",
    margin: (x: 1.8cm, y: 1.5cm),
  )
  set list(indent: 1em)

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
  build_contacts(contents.contact)
  build_education(contents.education)
  build_skills(contents.skills)
  build_languages(contents.languages)
  build_profile(contents.profile)
  build_experience(contents.experience)
}

#render(
  yaml("cv.en.yml")
)
