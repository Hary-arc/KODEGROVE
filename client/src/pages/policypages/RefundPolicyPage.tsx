'use client'

import { LegalPageTemplate } from '../../components/LegalPageTemplate'
import { legalPolicies } from '../../data/legal'
import { DollarSign } from 'lucide-react'

export function RefundPolicyPage() {
  return (
    <LegalPageTemplate 
      policy={legalPolicies.refund} 
      icon={<DollarSign className="w-5 h-5 text-purple-400" />}
    />
  )
}
