import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar"

const Navbar = () => {
  return (
<div>
  <h1>Payments App</h1>
  <div>
    <p>Hello, User</p>
    <Avatar>
      <AvatarImage src="https://github.com/shadcn.png" />
      <AvatarFallback>CN</AvatarFallback>
    </Avatar>
  </div>
</div>
  )
}

export default Navbar