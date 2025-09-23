
import { useEffect } from 'react'

interface SEOHeadProps {
  title?: string
  description?: string
  keywords?: string[]
  canonicalUrl?: string
  ogImage?: string
  ogType?: string
  twitterCard?: string
  schemaData?: object
  noIndex?: boolean
}

export function SEOHead({
  title = 'Kodegrove - Digital Experiences That Mesmerize',
  description = 'Crafting hypnotic digital experiences that transform businesses. Professional web development, design, and digital marketing services.',
  keywords = ['web development', 'digital marketing', 'web design', 'seo', 'react', 'typescript'],
  canonicalUrl,
  ogImage = '/og-image.jpg',
  ogType = 'website',
  twitterCard = 'summary_large_image',
  schemaData,
  noIndex = false
}: SEOHeadProps) {
  
  useEffect(() => {
    // Set document title
    document.title = title

    // Helper function to update meta tags
    const updateMetaTag = (name: string, content: string, property = false) => {
      const attribute = property ? 'property' : 'name'
      let meta = document.querySelector(`meta[${attribute}="${name}"]`) as HTMLMetaElement
      
      if (!meta) {
        meta = document.createElement('meta')
        meta.setAttribute(attribute, name)
        document.head.appendChild(meta)
      }
      meta.content = content
    }

    // Basic meta tags
    updateMetaTag('description', description)
    updateMetaTag('keywords', keywords.join(', '))
    
    if (noIndex) {
      updateMetaTag('robots', 'noindex, nofollow')
    } else {
      updateMetaTag('robots', 'index, follow')
    }

    // Open Graph tags
    updateMetaTag('og:title', title, true)
    updateMetaTag('og:description', description, true)
    updateMetaTag('og:type', ogType, true)
    updateMetaTag('og:image', ogImage, true)
    
    if (canonicalUrl) {
      updateMetaTag('og:url', canonicalUrl, true)
    }

    // Twitter Card tags
    updateMetaTag('twitter:card', twitterCard)
    updateMetaTag('twitter:title', title)
    updateMetaTag('twitter:description', description)
    updateMetaTag('twitter:image', ogImage)

    // Canonical URL
    if (canonicalUrl) {
      let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement
      if (!canonical) {
        canonical = document.createElement('link')
        canonical.rel = 'canonical'
        document.head.appendChild(canonical)
      }
      canonical.href = canonicalUrl
    }

    // Schema.org structured data
    if (schemaData) {
      let script = document.querySelector('script[type="application/ld+json"]') as HTMLScriptElement
      if (!script) {
        script = document.createElement('script') as HTMLScriptElement
        script.type = 'application/ld+json'
        document.head.appendChild(script)
      }
      script.textContent = JSON.stringify(schemaData)
    }

  }, [title, description, keywords, canonicalUrl, ogImage, ogType, twitterCard, schemaData, noIndex])

  return null
}

// Schema.org data generators
export const generateWebsiteSchema = (siteConfig: any) => ({
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": siteConfig.name,
  "description": siteConfig.description,
  "url": siteConfig.url,
  "potentialAction": {
    "@type": "SearchAction",
    "target": `${siteConfig.url}/search?q={search_term_string}`,
    "query-input": "required name=search_term_string"
  }
})

export const generateOrganizationSchema = (siteConfig: any) => ({
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": siteConfig.name,
  "description": siteConfig.description,
  "url": siteConfig.url,
  "logo": `${siteConfig.url}/logo.png`,
  "contactPoint": {
    "@type": "ContactPoint",
    "telephone": siteConfig.contact.phone,
    "contactType": "customer service",
    "email": siteConfig.contact.email
  },
  "address": {
    "@type": "PostalAddress",
    "addressLocality": siteConfig.contact.address
  },
  "sameAs": [
    siteConfig.social.linkedin,
    siteConfig.social.twitter,
    siteConfig.social.github
  ]
})

export const generateBreadcrumbSchema = (breadcrumbs: Array<{ name: string, url: string }>) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": breadcrumbs.map((crumb, index) => ({
    "@type": "ListItem",
    "position": index + 1,
    "name": crumb.name,
    "item": crumb.url
  }))
})
