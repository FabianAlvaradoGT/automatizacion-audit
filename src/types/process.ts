import type { IDateValue, ISocialLink } from './common'

// ----------------------------------------------------------------------

export type IProcessTableFilters = {
  name: string
  status: string
}

export type IProcessProfileCover = {
  name: string
  role: string
  coverUrl: string
  avatarUrl: string
}

export type IProcessProfile = {
  id: string
  role: string
  quote: string
  email: string
  school: string
  country: string
  company: string
  totalFollowers: number
  totalFollowing: number
  socialLinks: ISocialLink
}

export type IProcessProfileFollower = {
  id: string
  name: string
  country: string
  avatarUrl: string
}

export type IProcessProfileGallery = {
  id: string
  title: string
  imageUrl: string
  postedAt: IDateValue
}

export type IProcessProfileFriend = {
  id: string
  name: string
  role: string
  avatarUrl: string
}

export type IProcessProfilePost = {
  id: string
  media: string
  message: string
  createdAt: IDateValue
  personLikes: { name: string; avatarUrl: string }[]
  comments: {
    id: string
    message: string
    createdAt: IDateValue
    author: { id: string; name: string; avatarUrl: string }
  }[]
}

export type IProcessCard = {
  id: string
  name: string
  role: string
  coverUrl: string
  avatarUrl: string
  totalPosts: number
  totalFollowers: number
  totalFollowing: number
}

export type IProcessItem = {
  id: string
  year: string
  type_upload: string
  type_process: string
  code: string
  name_code: string
  description: string
  status: string
}

export type IProcessAccount = {
  city: string
  email: string
  state: string
  about: string
  address: string
  zipCode: string
  isPublic: boolean
  displayName: string
  phoneNumber: string
  country: string | null
  photoURL: File | string | null
}

export type IProcessAccountBillingHistory = {
  id: string
  price: number
  invoiceNumber: string
  createdAt: IDateValue
}
