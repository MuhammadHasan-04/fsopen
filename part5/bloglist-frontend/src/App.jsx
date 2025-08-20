import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import LoginForm from './components/loginForm'
import BlogForm from './components/BlogForm'
import Togglable from './components/Toggleable'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const blogFormRef = useRef()

  useEffect(() => {
    blogService.getAll().then(initialBlogs => {
      const sortedBlogs = initialBlogs.sort((a, b) => b.likes - a.likes)
      setBlogs(sortedBlogs)
    })
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (credentials) => {
    try {
      const user = await loginService.login(credentials)
      window.localStorage.setItem('loggedBlogAppUser', JSON.stringify(user))
      setUser(user)
      blogService.setToken(user.token)
    } catch (error) {
      alert('Wrong username or password')
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogAppUser')
    setUser(null)
  }

  const addBlog = async (newBlog) => {
    try {
      const returnedBlog = await blogService.create(newBlog)
      returnedBlog.user = {
        username: user.username,
        name: user.name,
        id: user.id,
      }
      setBlogs(prev => [...prev, returnedBlog].sort((a, b) => b.likes - a.likes))
      blogFormRef.current.toggleVisibility()
    } catch (error) {
      alert('Failed to add blog')
    }
  }

  const handleLike = async (id) => {
    const blog = blogs.find(b => b.id === id)
    const updatedBlog = {
      ...blog,
      user: blog.user.id, // Only user ID is sent in PUT request
      likes: blog.likes + 1,
    }

    try {
      const response = await blogService.update(id, updatedBlog)
      const fullUser = blog.user // keep full user info to fix 5.9
      setBlogs(blogs
        .map(b => (b.id !== id ? b : { ...response, user: fullUser }))
        .sort((a, b) => b.likes - a.likes))
    } catch (error) {
      alert('Error updating likes')
    }
  }

  const handleDelete = async (id) => {
    const blog = blogs.find(b => b.id === id)
    if (window.confirm(`Delete blog "${blog.title}" by ${blog.author}?`)) {
      try {
        await blogService.remove(id)
        setBlogs(blogs.filter(b => b.id !== id))
      } catch (error) {
        alert('Error deleting blog')
      }
    }
  }

  if (!user) {
    return <LoginForm onLogin={handleLogin} />
  }

  return (
    <div>
      <h2>blogs</h2>
      <p>{user.name} logged in <button onClick={handleLogout}>logout</button></p>

      <Togglable buttonLabel="new blog" ref={blogFormRef}>
        <BlogForm createBlog={addBlog} />
      </Togglable>

      {blogs.map(blog =>
        <Blog
          key={blog.id}
          blog={blog}
          onLike={() => handleLike(blog.id)}
          onDelete={() => handleDelete(blog.id)}
          canDelete={user.username === blog.user.username}
        />
      )}
    </div>
  )
}

export default App
