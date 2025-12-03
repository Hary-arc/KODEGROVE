'use client'

import { LegalPageTemplate } from '../../components/LegalPageTemplate'
import { legalPolicies } from '../../data/legal'
import { Newspaper } from 'lucide-react'

export function ContentPolicyPage() {
  return (
    <LegalPageTemplate 
      policy={legalPolicies.content} 
      icon={<Newspaper className="w-5 h-5 text-purple-400" />}
    />
  )
}
