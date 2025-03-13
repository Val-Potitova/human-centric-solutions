import { BrowserRouter, Routes, Route } from 'react-router';
import { useState } from 'react';
import Feed from './components/Feed.tsx';
import Header from './components/Header.tsx';
import Post from './components/Post.tsx';
import CreatePost from './components/CreatePost.tsx';
import { ThemeProvider} from './components/ThemeContext.tsx';
import ThemeButton from './components/ThemeButton.tsx';
import { Provider } from 'react-redux';
import store from './store/store.tsx';

function App() {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <Provider store={store}>
      <ThemeProvider>
        <BrowserRouter>
          <Header onSearch={setSearchQuery} />
          <Routes>
            <Route path="/" element={<Feed searchQuery={searchQuery} />} />
            <Route path="/post/:id" element={<Post />} />
            <Route path="/create_post" element={<CreatePost />} />
            <Route path="*" element={<div>404: Page Not Found</div>} />
          </Routes>
          <ThemeButton />
        </BrowserRouter>
      </ThemeProvider>
    </Provider>
  )
}

export default App
