'use client'
import React from 'react'
import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { blogPosts, featuredPosts, blogCategories, BlogPost, BlogCategory, getPostBySlug } from '../data/blog'
import { Search, Calendar, Clock, ArrowRight, Filter, X } from 'lucide-react'
import { ImageWithFallback } from '../components/figma/ImageWithFallback'
import { BlogArticle } from '../components/BlogArticle'

export function BlogPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [filteredPosts, setFilteredPosts] = useState<BlogPost[]>(blogPosts)
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [visiblePosts, setVisiblePosts] = useState<Set<string>>(new Set())
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null)
  const observerRef = useRef<IntersectionObserver | null>(null)

  // Filter posts based on category and search
  useEffect(() => {
    let filtered = blogPosts

    if (selectedCategory !== 'all') {
      filtered = filtered.filter(post => post.category === selectedCategory)
    }

    if (searchQuery) {
      filtered = filtered.filter(post => 
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
      )
    }

    setFilteredPosts(filtered)
  }, [selectedCategory, searchQuery])

  // Intersection observer for scroll animations
  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisiblePosts(prev => new Set([...prev, entry.target.id]))
          }
        })
      },
      { threshold: 0.1 }
    )

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect()
      }
    }
  }, [])

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
  }

  const handlePostClick = (post: BlogPost) => {
    setSelectedPost(post)
  }

  const handleBackToList = () => {
    setSelectedPost(null)
  }

  // If a post is selected, show the article view
  if (selectedPost) {
    return <BlogArticle post={selectedPost} onBack={handleBackToList} />
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white pt-20">
      {/* Hero Section with Featured Posts */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-slate-900 to-cyan-900/20"></div>
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:50px_50px]"></div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
          {/* Hero Header */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-20"
          >
            <h1 className="font-outfit text-6xl lg:text-7xl font-bold mb-8">
              <span className="bg-gradient-to-r from-white via-purple-200 to-cyan-200 bg-clip-text text-transparent">
                Insights & 
              </span>
              <br />
              <span className="bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent animate-pulse-glow">
                Innovation
              </span>
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Explore the latest trends, insights, and innovations in technology, design, and development. 
              Stay ahead of the curve with our expert perspectives.
            </p>
          </motion.div>

          {/* Featured Posts Grid */}
          <div className="grid lg:grid-cols-2 gap-8 mb-20">
            {featuredPosts.map((post, index) => (
              <motion.article
                key={post.id}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                onClick={() => handlePostClick(post)}
                className="group relative glass rounded-2xl overflow-hidden hover-glow cursor-pointer"
                style={{
                  background: 'rgba(255, 255, 255, 0.05)',
                  backdropFilter: 'blur(20px)',
                }}
              >
                <div className="aspect-video relative overflow-hidden">
                  <ImageWithFallback
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 bg-purple-500/80 backdrop-blur-sm rounded-full text-sm font-medium">
                      Featured
                    </span>
                  </div>
                </div>
                
                <div className="p-8">
                  <div className="flex items-center space-x-4 mb-4 text-sm text-gray-400">
                    <div className="flex items-center space-x-2">
                      <Calendar className="w-4 h-4" />
                      <span>{formatDate(post.publishedAt)}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Clock className="w-4 h-4" />
                      <span>{post.readTime} min read</span>
                    </div>
                  </div>
                  
                  <h2 className="font-outfit text-2xl font-bold mb-4 group-hover:text-purple-300 transition-colors duration-300">
                    {post.title}
                  </h2>
                  
                  <p className="text-gray-300 mb-6 leading-relaxed">
                    {post.excerpt}
                  </p>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 rounded-full overflow-hidden">
                        <ImageWithFallback
                          src={post.author.avatar}
                          alt={post.author.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <p className="font-medium">{post.author.name}</p>
                        <p className="text-sm text-gray-400">{post.author.role}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-2 text-purple-400 hover:text-white transition-colors duration-300 group">
                      <span>Read More</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                    </div>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* Filter and Search Section */}
      <section className="relative py-12 border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-6 lg:space-y-0">
            {/* Category Filters */}
            <div className="flex flex-wrap gap-3">
              <button
                onClick={() => setSelectedCategory('all')}
                className={`px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
                  selectedCategory === 'all'
                    ? 'gradient-electric text-white'
                    : 'glass text-gray-300 hover:text-white'
                }`}
              >
                All Articles
              </button>
              {blogCategories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
                    selectedCategory === category.id
                      ? 'gradient-electric text-white'
                      : 'glass text-gray-300 hover:text-white'
                  }`}
                >
                  {category.name}
                </button>
              ))}
            </div>

            {/* Search */}
            <div className="relative">
              <button
                onClick={() => setIsSearchOpen(!isSearchOpen)}
                className="flex items-center space-x-2 glass px-6 py-3 rounded-xl text-gray-300 hover:text-white transition-all duration-300"
              >
                <Search className="w-5 h-5" />
                <span>Search Articles</span>
              </button>
              
              {isSearchOpen && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="absolute top-full right-0 mt-2 w-80 glass rounded-xl p-4 z-20"
                >
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Search articles, tags..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-10 pr-10 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-purple-400 transition-colors duration-300"
                      autoFocus
                    />
                    <button
                    onClick={() => {
                      setSearchQuery('');
                      setIsSearchOpen(false);
                    }}
                    aria-label="Clear search"
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors duration-300"
                  >
                    <X className="w-5 h-5" />
                  </button>
                  </div>
                </motion.div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Articles Grid */}
      <section className="relative py-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          {filteredPosts.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-20"
            >
              <div className="w-20 h-20 mx-auto mb-6 glass rounded-2xl flex items-center justify-center">
                <Search className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="font-outfit text-2xl font-bold mb-4">No articles found</h3>
              <p className="text-gray-400 mb-8">Try adjusting your search or filter criteria.</p>
              <button
                onClick={() => {
                  setSearchQuery('')
                  setSelectedCategory('all')
                }}
                className="px-6 py-3 gradient-electric rounded-xl font-medium hover:scale-105 transition-transform duration-300"
              >
                Reset Filters
              </button>
            </motion.div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredPosts.map((post, index) => (
                <motion.article
                  key={post.id}
                  id={`post-${post.id}`}
                  ref={(el) => {
                    if (el && observerRef.current) {
                      observerRef.current.observe(el)
                    }
                  }}
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ 
                    opacity: visiblePosts.has(`post-${post.id}`) ? 1 : 0,
                    y: visiblePosts.has(`post-${post.id}`) ? 0 : 50
                  }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="group glass rounded-2xl overflow-hidden hover:scale-105 hover-glow transition-all duration-500 cursor-pointer"
                  onClick={() => handlePostClick(post)}
                >
                  <div className="aspect-video relative overflow-hidden">
                    <ImageWithFallback
                      src={post.image}
                      alt={post.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                    <div className="absolute top-4 left-4">
                      <span className={`px-3 py-1 bg-gradient-to-r ${
                        blogCategories.find(cat => cat.id === post.category)?.color || 'from-purple-500 to-pink-500'
                      } rounded-full text-xs font-medium`}>
                        {blogCategories.find(cat => cat.id === post.category)?.name}
                      </span>
                    </div>
                  </div>
                  
                  <div className="p-6">
                    <div className="flex items-center space-x-4 mb-3 text-sm text-gray-400">
                      <div className="flex items-center space-x-1">
                        <Calendar className="w-4 h-4" />
                        <span>{formatDate(post.publishedAt)}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Clock className="w-4 h-4" />
                        <span>{post.readTime}m</span>
                      </div>
                    </div>
                    
                    <h3 className="font-outfit text-xl font-bold mb-3 group-hover:text-purple-300 transition-colors duration-300 line-clamp-2">
                      {post.title}
                    </h3>
                    
                    <p className="text-gray-300 mb-4 line-clamp-3 leading-relaxed">
                      {post.excerpt}
                    </p>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <div className="w-8 h-8 rounded-full overflow-hidden">
                          <ImageWithFallback
                            src={post.author.avatar}
                            alt={post.author.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <span className="text-sm text-gray-400">{post.author.name}</span>
                      </div>
                      
                      <ArrowRight className="w-5 h-5 text-purple-400 group-hover:translate-x-1 transition-transform duration-300" />
                    </div>
                  </div>
                </motion.article>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Newsletter Subscription */}
      <section className="relative py-20 border-t border-white/10">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/10 to-cyan-900/10"></div>
        <div className="relative z-10 max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="font-outfit text-4xl lg:text-5xl font-bold mb-6">
              <span className="bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
                Stay in the Loop
              </span>
            </h2>
            <p className="text-xl text-gray-300 mb-10 leading-relaxed">
              Get the latest insights, trends, and best practices delivered directly to your inbox. 
              Join thousands of developers and designers who trust our content.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-6 py-4 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-purple-400 transition-colors duration-300"
              />
              <button className="px-8 py-4 gradient-electric rounded-xl font-medium hover:scale-105 transition-transform duration-300 whitespace-nowrap">
                Subscribe
              </button>
            </div>
            
            <p className="text-sm text-gray-400 mt-4">
              No spam, unsubscribe at any time. We respect your privacy.
            </p>
          </motion.div>
        </div>
      </section>
    </div>
  )
}