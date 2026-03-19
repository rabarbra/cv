export type Lang = 'en' | 'de'

export interface CVContact {
  tel: string
  email: string
  github: string
  linkedin: string
  location: { city: string; country: string }
}

export interface CVEducation {
  organization: string
  discipline: string
  from: string
  to: string
}

export interface CVLanguage {
  lang: string
  level: string
}

export interface CVJob {
  position: string
  organization: string
  from: string
  to: string
  description: string[]
}

export interface CVData {
  title: string
  subtitle: string
  contact: { title: string; content: CVContact }
  education: { title: string; content: CVEducation[] }
  skills: { title: string; content: string[] }
  languages: { title: string; content: CVLanguage[] }
  profile: { title: string; content: string[] }
  experience: { title: string; content: CVJob[] }
}

export interface GHUser {
  login: string
  avatar_url: string
  name: string
  bio: string
  public_repos: number
  followers: number
  html_url: string
}

export interface GHRepo {
  id: number
  name: string
  description: string | null
  html_url: string
  stargazers_count: number
  language: string | null
  fork: boolean
  topics: string[]
}

export interface GHAsset {
  name: string
  browser_download_url: string
}

export interface GHRelease {
  tag_name: string
  assets: GHAsset[]
}
