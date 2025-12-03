'use client'

import { LegalPageTemplate } from '../../components/LegalPageTemplate'
import { legalPolicies } from '../../data/legal'
import { Cookie } from 'lucide-react'

export function CookiePolicyPage() {
  return (
    <LegalPageTemplate 
      policy={legalPolicies.cookies} 
      icon={<Cookie className="w-5 h-5 text-purple-400" />}
    />
  )
}
