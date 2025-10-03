'use client'

import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { BlogPost, getRelatedPosts } from '../data/blog'
import { 
  ArrowLeft, 
  Calendar, 
  Clock, 
  Share2, 
  Twitter, 
  Linkedin, 
  Link, 
  Heart,
  Bookmark,
  MessageCircle,
  ChevronUp
} from 'lucide-react'
import { ImageWithFallback } from './figma/ImageWithFallback'
import React from 'react'

interface BlogArticleProps {
  post: BlogPost
  onBack: () => void
}

export function BlogArticle({ post, onBack }: BlogArticleProps) {
  const [readingProgress, setReadingProgress] = useState(0)
  const [isShareOpen, setIsShareOpen] = useState(false)
  const [isLiked, setIsLiked] = useState(false)
  const [isBookmarked, setIsBookmarked] = useState(false)
  const [showScrollTop, setShowScrollTop] = useState(false)
  const contentRef = useRef<HTMLDivElement>(null)

  // Track reading progress
  useEffect(() => {
    const handleScroll = () => {
      if (!contentRef.current) return

      const totalHeight = contentRef.current.offsetHeight
      const windowHeight = window.innerHeight
      const scrolled = window.scrollY
      const headerHeight = 400 // Approximate hero height

      // Calculate progress based on content area
      const contentStart = headerHeight
      const contentHeight = totalHeight - headerHeight
      const progressHeight = Math.max(0, scrolled - contentStart)
      const progress = Math.min((progressHeight / (contentHeight - windowHeight)) * 100, 100)

      setReadingProgress(Math.max(0, progress))
      setShowScrollTop(scrolled > 500)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  const shareUrl = window.location.href
  const shareText = `Check out this article: ${post.title}`

  const handleShare = (platform: string) => {
    const urls = {
      twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`,
      copy: shareUrl
    }

    if (platform === 'copy') {
      navigator.clipboard.writeText(shareUrl)
      // You could add a toast notification here
    } else {
      window.open(urls[platform as keyof typeof urls], '_blank', 'width=600,height=400')
    }
  }

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const relatedPosts = getRelatedPosts(post.id, post.category, 3)

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      {/* Reading Progress Bar */}
      <div className="fixed top-0 left-0 w-full h-1 bg-slate-800 z-50">
        <motion.div
          className="h-full gradient-electric"
          style={{ width: `${readingProgress}%` }}
          initial={{ width: 0 }}
          animate={{ width: `${readingProgress}%` }}
          transition={{ duration: 0.1 }}
        />
      </div>

      {/* Floating Action Buttons */}
      <div className="fixed right-6 top-1/2 transform -translate-y-1/2 z-40 space-y-3">
        {/* Share Button */}
        <div className="relative">
          <button
            aria-label="Share this article"
            onClick={() => setIsShareOpen(!isShareOpen)}
            className="w-12 h-12 glass rounded-full flex items-center justify-center text-gray-300 hover:text-white hover:scale-110 transition-all duration-300"
          >
            <Share2 className="w-5 h-5" />
          </button>
          
          {isShareOpen && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8, x: 20 }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              className="absolute right-full mr-3 top-0 glass rounded-xl p-3 min-w-[150px]"
            >
              <div className="space-y-2">
                <button
                  aria-label="Share on Twitter"
                  onClick={() => handleShare('twitter')}
                  className="w-full flex items-center space-x-3 px-3 py-2 text-gray-300 hover:text-white hover:bg-white/10 rounded-lg transition-all duration-200"
                >
                  <Twitter className="w-4 h-4" />
                  <span className="text-sm">Twitter</span>
                </button>
                <button
                  aria-label="Share on LinkedIn"
                  onClick={() => handleShare('linkedin')}
                  className="w-full flex items-center space-x-3 px-3 py-2 text-gray-300 hover:text-white hover:bg-white/10 rounded-lg transition-all duration-200"
                >
                  <Linkedin className="w-4 h-4" />
                  <span className="text-sm">LinkedIn</span>
                </button>
                <button
                  aria-label="Copy link to clipboard"
                  onClick={() => handleShare('copy')}
                  className="w-full flex items-center space-x-3 px-3 py-2 text-gray-300 hover:text-white hover:bg-white/10 rounded-lg transition-all duration-200"
                >
                  <Link className="w-4 h-4" />
                  <span className="text-sm">Copy Link</span>
                </button>
              </div>
            </motion.div>
          )}
        </div>

        {/* Like Button */}
        <button
          aria-label="Like this article"
          onClick={() => setIsLiked(!isLiked)}
          className={`w-12 h-12 glass rounded-full flex items-center justify-center hover:scale-110 transition-all duration-300 ${
            isLiked ? 'text-red-400' : 'text-gray-300 hover:text-white'
          }`}
        >
          <Heart className={`w-5 h-5 ${isLiked ? 'fill-current' : ''}`} />
        </button>

        {/* Bookmark Button */}
        <button
          aria-label="Bookmark this article"
          onClick={() => setIsBookmarked(!isBookmarked)}
          className={`w-12 h-12 glass rounded-full flex items-center justify-center hover:scale-110 transition-all duration-300 ${
            isBookmarked ? 'text-yellow-400' : 'text-gray-300 hover:text-white'
          }`}
        >
          <Bookmark className={`w-5 h-5 ${isBookmarked ? 'fill-current' : ''}`} />
        </button>

        {/* Comments Button */}
        <button 
          aria-label="View comments"
          className="w-12 h-12 glass rounded-full flex items-center justify-center text-gray-300 hover:text-white hover:scale-110 transition-all duration-300">
          <MessageCircle className="w-5 h-5" />
        </button>
      </div>

      {/* Scroll to Top Button */}
      {showScrollTop && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 w-12 h-12 gradient-electric rounded-full flex items-center justify-center text-white hover:scale-110 transition-all duration-300 fab-pulse z-40"
        >
          <ChevronUp className="w-5 h-5" />
        </motion.button>
      )}

      {/* Article Content */}
      <div ref={contentRef}>
        {/* Hero Section */}
        <section className="relative py-20 pt-32 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-slate-900 to-cyan-900/20"></div>
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:50px_50px]"></div>
          
          <div className="relative z-10 max-w-4xl mx-auto px-6 lg:px-8">
            {/* Back Button */}
            <motion.button
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              onClick={onBack}
              className="flex items-center space-x-2 text-gray-300 hover:text-white mb-8 group transition-colors duration-300"
            >
              <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform duration-300" />
              <span>Back to Articles</span>
            </motion.button>

            {/* Article Meta */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="flex flex-wrap items-center gap-4 mb-8 text-sm text-gray-400"
            >
              <div className="flex items-center space-x-2">
                <Calendar className="w-4 h-4" />
                <span>{formatDate(post.publishedAt)}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Clock className="w-4 h-4" />
                <span>{post.readTime} min read</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <span key={tag} className="px-2 py-1 bg-white/10 rounded-md text-xs">
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>

            {/* Article Title */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="font-outfit text-4xl lg:text-6xl font-bold mb-8 leading-tight"
            >
              <span className="bg-gradient-to-r from-white via-purple-200 to-cyan-200 bg-clip-text text-transparent">
                {post.title}
              </span>
            </motion.h1>

            {/* Article Excerpt */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-xl text-gray-300 mb-12 leading-relaxed max-w-3xl"
            >
              {post.excerpt}
            </motion.p>

            {/* Author Info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="flex items-center space-x-4 mb-12"
            >
              <div className="w-16 h-16 rounded-full overflow-hidden ring-2 ring-purple-400/30">
                <ImageWithFallback
                  src={post.author.avatar}
                  alt={post.author.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <h3 className="font-outfit text-xl font-bold">{post.author.name}</h3>
                <p className="text-gray-400">{post.author.role}</p>
              </div>
            </motion.div>

            {/* Featured Image */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="relative rounded-2xl overflow-hidden mb-16 aspect-video"
            >
              <ImageWithFallback
                src={post.image}
                alt={post.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
            </motion.div>
          </div>
        </section>

        {/* Article Content */}
        <section className="relative py-16">
          <div className="max-w-3xl mx-auto px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="prose prose-lg prose-invert max-w-none"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />
          </div>
        </section>

        {/* Related Articles */}
        {relatedPosts.length > 0 && (
          <section className="relative py-20 border-t border-white/10">
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
              <motion.h2
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="font-outfit text-3xl font-bold mb-12 text-center"
              >
                <span className="bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
                  Related Articles
                </span>
              </motion.h2>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {relatedPosts.map((relatedPost, index) => (
                  <motion.article
                    key={relatedPost.id}
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="group glass rounded-2xl overflow-hidden hover:scale-105 hover-glow transition-all duration-500 cursor-pointer"
                  >
                    <div className="aspect-video relative overflow-hidden">
                      <ImageWithFallback
                        src={relatedPost.image}
                        alt={relatedPost.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                    </div>
                    
                    <div className="p-6">
                      <h3 className="font-outfit text-xl font-bold mb-3 group-hover:text-purple-300 transition-colors duration-300 line-clamp-2">
                        {relatedPost.title}
                      </h3>
                      <p className="text-gray-300 line-clamp-2 leading-relaxed">
                        {relatedPost.excerpt}
                      </p>
                    </div>
                  </motion.article>
                ))}
              </div>
            </div>
          </section>
        )}
      </div>
    </div>
  )
}