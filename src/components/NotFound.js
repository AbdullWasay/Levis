import { Link } from "react-router-dom"
import { Button } from "./ui/Button"

const NotFound = () => {
  return (
    <div className="not-found-container text-center py-12">
      <h1 className="text-4xl font-bold mb-4">404</h1>
      <h2 className="text-2xl font-semibold mb-6">Page Not Found</h2>
      <p className="mb-8">The page you are looking for doesn't exist or has been moved.</p>
      <Link to="/">
        <Button>Back to Home</Button>
      </Link>
    </div>
  )
}

export default NotFound

