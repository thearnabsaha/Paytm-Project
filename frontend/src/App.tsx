import axios from "axios"
import { Button } from "./components/ui/button"
import { useEffect } from "react"

const App = () => {
  useEffect(() => {
    axios.get("/api").then((e)=>console.log(e))
  }, [])
  
  return (
    <div>
      <Button>Click Me</Button>
    </div>
  )
}

export default App