'use client'

import { LegalPageTemplate } from '../../components/LegalPageTemplate'
import { legalPolicies } from '../../data/legal'
import { CheckCircle } from 'lucide-react'

export function AcceptableUsePolicyPage() {
  return (
    <LegalPageTemplate 
      policy={legalPolicies.acceptableUse} 
      icon={<CheckCircle className="w-5 h-5 text-purple-400" />}
    />
  )
}
