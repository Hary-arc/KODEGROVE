'use client'

import { LegalPageTemplate } from '../../components/LegalPageTemplate'
import { legalPolicies } from '../../data/legal'
import { Shield } from 'lucide-react'

export function PrivacyPolicyPage() {
  return (
    <LegalPageTemplate 
      policy={legalPolicies.privacy} 
      icon={<Shield className="w-5 h-5 text-purple-400" />}
    />
  )
}
