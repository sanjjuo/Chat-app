interface UsernameType {
  username: string;
  avatar: string;
  description: string;
}

interface LoginTypes {
  name?: string;
  email: string;
  password: string;
}

interface RegisterTypes extends LoginTypes, UsernameType {}

interface UserMessagesList {
  uid: string;
  email: string;
  displayName: string;
  photoURL: string;
  createdAt: string;
}

interface MessagesTypes {
  image: string;
  user: string;
  message: string;
  timestamp: Date;
  senderId?: string;
  receiverId?: string;
}

interface UserData {
  displayName: string;
  photoURL: string;
  description: string;
  createdAt: Date;
  email: string;
  uid: string;
}
