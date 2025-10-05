'use client';

import { motion } from 'framer-motion';
import {
  ResponsiveCard,
  ResponsiveCardHeader,
  ResponsiveCardContent,
  ResponsiveCardFooter,
  ResponsiveCardTitle,
  ResponsiveCardDescription,
} from './ui/responsive-card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Avatar } from './ui/avatar';
import { Clock, Eye, MessageCircle, BookOpen, ArrowUpRight, Share2, Bookmark } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import React from 'react';

interface BlogCardProps {
  post: {
    id: string;
    title: string;
    excerpt: string;
    content?: string;
    image: string;
    author: {
      name: string;
      avatar?: string;
      role?: string;
    };
    category: string;
    tags: string[];
    publishedAt: string;
    readTime: number;
    views?: number;
    comments?: number;
    featured?: boolean;
    gradient?: string;
  };
  index: number;
  variant?: 'default' | 'featured' | 'compact' | 'horizontal';
  onReadMore?: (postId: string) => void;
}

export function BlogCard({ post, index, variant = 'default', onReadMore }: BlogCardProps) {
  const isCompact = variant === 'compact';
  const isFeatured = variant === 'featured';
  const isHorizontal = variant === 'horizontal';

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  return (
    <ResponsiveCard
      variant={isFeatured ? 'gradient' : 'glass'}
      size={isCompact ? 'sm' : isFeatured ? 'xl' : 'md'}
      hover={true}
      animation={true}
      index={index}
      className={`group relative overflow-hidden ${isFeatured ? 'lg:col-span-2' : ''} ${isHorizontal ? 'sm:flex-row' : 'flex-col'}`}
    >
      {/* Featured Badge */}
      {isFeatured && (
        <div className="absolute top-4 right-4 z-20">
          <Badge className="gradient-electric text-white border-0 shadow-lg">
            <BookOpen className="w-3 h-3 mr-1" />
            Featured
          </Badge>
        </div>
      )}

      {/* Image Section */}
      <div
        className={`relative overflow-hidden ${
          isCompact
            ? 'h-32 sm:h-40'
            : isFeatured
              ? 'h-48 sm:h-64 lg:h-80'
              : isHorizontal
                ? 'w-full sm:w-1/3 h-48 sm:h-auto'
                : 'h-40 sm:h-48 lg:h-56'
        } ${isHorizontal ? 'sm:flex-shrink-0' : ''}`}
      >
        <ImageWithFallback
          src={post.image}
          alt={post.title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
        />

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

        {/* Category Badge */}
        <div className="absolute top-3 left-3">
          <Badge
            className={`${post.gradient ? `bg-gradient-to-r ${post.gradient}` : 'gradient-electric'} text-white border-0 shadow-lg text-xs`}
          >
            {post.category}
          </Badge>
        </div>

        {/* Actions */}
        <div className="absolute top-3 right-3 flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <button className="w-8 h-8 glass rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-colors duration-300">
            <Bookmark className="w-4 h-4" />
          </button>
          <button className="w-8 h-8 glass rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-colors duration-300">
            <Share2 className="w-4 h-4" />
          </button>
        </div>

        {/* Read Time */}
        <div className="absolute bottom-3 right-3">
          <div className="flex items-center space-x-1 glass rounded-full px-2 py-1 text-white text-xs">
            <Clock className="w-3 h-3" />
            <span>{post.readTime} min</span>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className={`flex flex-col flex-1 ${isHorizontal ? 'sm:p-6 sm:pl-8' : ''}`}>
        <ResponsiveCardHeader responsive={!isHorizontal}>
          <div className="space-y-2 sm:space-y-3">
            {/* Title */}
            <ResponsiveCardTitle
              size={isCompact ? 'sm' : isFeatured ? 'xl' : 'lg'}
              className="text-white group-hover:text-purple-300 transition-colors duration-300 line-clamp-2 sm:line-clamp-3"
            >
              {post.title}
            </ResponsiveCardTitle>

            {/* Meta Information */}
            <div className="flex flex-wrap items-center gap-2 sm:gap-3 text-xs sm:text-sm text-gray-400">
              <div className="flex items-center space-x-1">
                <span>{formatDate(post.publishedAt)}</span>
              </div>

              {post.views && (
                <div className="flex items-center space-x-1">
                  <Eye className="w-3 h-3 sm:w-4 sm:h-4" />
                  <span>{post.views.toLocaleString()}</span>
                </div>
              )}

              {post.comments && (
                <div className="flex items-center space-x-1">
                  <MessageCircle className="w-3 h-3 sm:w-4 sm:h-4" />
                  <span>{post.comments}</span>
                </div>
              )}
            </div>
          </div>
        </ResponsiveCardHeader>

        <ResponsiveCardContent spacing={isCompact ? 'sm' : 'md'}>
          {/* Excerpt */}
          <ResponsiveCardDescription
            className={`text-gray-300 group-hover:text-gray-200 transition-colors duration-300 ${
              isCompact
                ? 'line-clamp-2'
                : isFeatured
                  ? 'line-clamp-4 sm:line-clamp-6'
                  : 'line-clamp-3'
            }`}
          >
            {post.excerpt}
          </ResponsiveCardDescription>

          {/* Tags */}
          {!isCompact && post.tags.length > 0 && (
            <div className="flex flex-wrap gap-1 sm:gap-2 mt-3 sm:mt-4">
              {post.tags.slice(0, isFeatured ? 6 : 3).map((tag, i) => (
                <motion.span
                  key={tag}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, delay: 0.7 + i * 0.1 }}
                  className="px-2 py-1 text-xs bg-white/10 text-gray-300 rounded-full hover:bg-white/20 transition-colors duration-300 cursor-pointer"
                >
                  #{tag}
                </motion.span>
              ))}
              {post.tags.length > (isFeatured ? 6 : 3) && (
                <span className="px-2 py-1 text-xs bg-white/10 text-gray-400 rounded-full">
                  +{post.tags.length - (isFeatured ? 6 : 3)}
                </span>
              )}
            </div>
          )}
        </ResponsiveCardContent>

        <ResponsiveCardFooter direction="responsive">
          {/* Author */}
          <div className="flex items-center space-x-3 min-w-0 flex-1">
            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full overflow-hidden flex-shrink-0">
              {post.author.avatar ? (
                <ImageWithFallback
                  src={post.author.avatar}
                  alt={post.author.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-purple-500 to-cyan-500 flex items-center justify-center text-white font-bold text-xs">
                  {post.author.name
                    .split(' ')
                    .map(n => n[0])
                    .join('')}
                </div>
              )}
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-sm font-medium text-white truncate">{post.author.name}</p>
              {post.author.role && (
                <p className="text-xs text-gray-400 truncate">{post.author.role}</p>
              )}
            </div>
          </div>

          {/* Read More Button */}
          <Button
            onClick={() => onReadMore?.(post.id)}
            variant="outline"
            size="sm"
            className="border-white/20 text-white hover:bg-white/10 backdrop-blur-xl group/btn flex-shrink-0"
          >
            <span className="text-xs sm:text-sm">Read More</span>
            <ArrowUpRight className="w-3 h-3 sm:w-4 sm:h-4 ml-1 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform duration-300" />
          </Button>
        </ResponsiveCardFooter>
      </div>

      {/* Background Gradient */}
      {post.gradient && (
        <div
          className={`absolute inset-0 bg-gradient-to-br ${post.gradient} opacity-5 group-hover:opacity-10 transition-opacity duration-500`}
        />
      )}

      {/* Hover Effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 pointer-events-none" />
    </ResponsiveCard>
  );
}

// Blog Cards Grid Component
interface BlogCardsGridProps {
  posts: BlogCardProps['post'][];
  variant?: 'default' | 'masonry' | 'featured';
  columns?: 1 | 2 | 3 | 4;
  onReadMore?: (postId: string) => void;
}

export function BlogCardsGrid({
  posts,
  variant = 'default',
  columns = 3,
  onReadMore,
}: BlogCardsGridProps) {
  if (variant === 'masonry') {
    return (
      <div
        className={`columns-1 md:columns-2 ${columns >= 3 ? 'lg:columns-3' : ''} ${columns >= 4 ? 'xl:columns-4' : ''} gap-4 sm:gap-6 lg:gap-8 space-y-4 sm:space-y-6 lg:space-y-8`}
      >
        {posts.map((post, index) => (
          <div key={post.id} className="break-inside-avoid">
            <BlogCard
              post={post}
              index={index}
              variant={index % 4 === 0 ? 'featured' : 'default'}
              onReadMore={onReadMore}
            />
          </div>
        ))}
      </div>
    );
  }

  if (variant === 'featured') {
    const [featuredPost, ...otherPosts] = posts;
    return (
      <div className="space-y-8 lg:space-y-12">
        {/* Featured Post */}
        {featuredPost && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <BlogCard post={featuredPost} index={0} variant="featured" onReadMore={onReadMore} />
            </div>

            {/* Side Posts */}
            <div className="space-y-6">
              {otherPosts.slice(0, 3).map((post, index) => (
                <BlogCard
                  key={post.id}
                  post={post}
                  index={index + 1}
                  variant="compact"
                  onReadMore={onReadMore}
                />
              ))}
            </div>
          </div>
        )}

        {/* Remaining Posts */}
        {otherPosts.length > 3 && (
          <div
            className={`grid grid-cols-1 md:grid-cols-2 ${columns >= 3 ? 'lg:grid-cols-3' : ''} gap-6 lg:gap-8`}
          >
            {otherPosts.slice(3).map((post, index) => (
              <BlogCard
                key={post.id}
                post={post}
                index={index + 4}
                variant="default"
                onReadMore={onReadMore}
              />
            ))}
          </div>
        )}
      </div>
    );
  }

  return (
    <div
      className={`grid grid-cols-1 md:grid-cols-2 ${columns >= 3 ? 'lg:grid-cols-3' : ''} ${columns >= 4 ? 'xl:grid-cols-4' : ''} gap-4 sm:gap-6 lg:gap-8`}
    >
      {posts.map((post, index) => (
        <BlogCard
          key={post.id}
          post={post}
          index={index}
          variant="default"
          onReadMore={onReadMore}
        />
      ))}
    </div>
  );
}
