// Legal and Policy Content

export interface PolicySection {
  title: string
  content: string
  subsections?: {
    title: string
    content: string
  }[]
}

export interface PolicyPage {
  title: string
  description: string
  lastUpdated: string
  sections: PolicySection[]
}

export const privacyPolicy: PolicyPage = {
  title: "Privacy Policy",
  description: "Your privacy is paramount. Learn how we collect, use, and protect your personal information.",
  lastUpdated: "December 2, 2024",
  sections: [
    {
      title: "Information We Collect",
      content: "We collect information that you provide directly to us, information we obtain automatically when you use our services, and information from third-party sources.",
      subsections: [
        {
          title: "Personal Information",
          content: "When you create an account, contact us, or use our services, we may collect your name, email address, phone number, company name, billing information, and project requirements."
        },
        {
          title: "Usage Data",
          content: "We automatically collect information about your device, browser type, IP address, pages visited, time spent on pages, and interactions with our website and services."
        },
        {
          title: "Cookies and Tracking",
          content: "We use cookies, web beacons, and similar technologies to enhance your experience, analyze usage patterns, and deliver personalized content."
        }
      ]
    },
    {
      title: "How We Use Your Information",
      content: "We use the information we collect to provide, maintain, and improve our services, communicate with you, process transactions, and ensure security.",
      subsections: [
        {
          title: "Service Delivery",
          content: "To provide our website and software solutions, process your requests, manage your account, and deliver customer support."
        },
        {
          title: "Communication",
          content: "To send you updates, newsletters, marketing materials, and important information about our services. You can opt-out at any time."
        },
        {
          title: "Analytics and Improvement",
          content: "To understand how our services are used, identify trends, measure effectiveness, and continuously improve user experience."
        },
        {
          title: "Security and Fraud Prevention",
          content: "To protect against unauthorized access, detect and prevent fraud, and ensure the security of our platform and users."
        }
      ]
    },
    {
      title: "Information Sharing and Disclosure",
      content: "We do not sell your personal information. We may share your information only in specific circumstances:",
      subsections: [
        {
          title: "Service Providers",
          content: "We work with trusted third-party service providers who assist us in operating our business, such as hosting providers, payment processors, and analytics services."
        },
        {
          title: "Business Transfers",
          content: "If CodeFlow is involved in a merger, acquisition, or sale of assets, your information may be transferred as part of that transaction."
        },
        {
          title: "Legal Requirements",
          content: "We may disclose information if required by law, court order, or governmental request, or to protect our rights and safety."
        }
      ]
    },
    {
      title: "Data Security",
      content: "We implement industry-standard security measures to protect your information from unauthorized access, disclosure, alteration, or destruction. This includes encryption, secure servers, regular security audits, and strict access controls."
    },
    {
      title: "Your Rights and Choices",
      content: "You have control over your personal information and can exercise various rights:",
      subsections: [
        {
          title: "Access and Correction",
          content: "You can access and update your account information at any time through your dashboard or by contacting us."
        },
        {
          title: "Data Deletion",
          content: "You can request deletion of your personal information, subject to legal requirements and legitimate business needs."
        },
        {
          title: "Marketing Opt-Out",
          content: "You can unsubscribe from marketing communications by clicking the unsubscribe link in our emails or updating your preferences."
        },
        {
          title: "Cookie Preferences",
          content: "You can control cookies through your browser settings, though some features may not function properly if cookies are disabled."
        }
      ]
    },
    {
      title: "International Data Transfers",
      content: "If you are located outside the United States, please note that we may transfer your information to and process it in the United States and other countries where we or our service providers operate."
    },
    {
      title: "Children's Privacy",
      content: "Our services are not directed to individuals under 18 years of age. We do not knowingly collect personal information from children. If you believe we have collected information from a child, please contact us immediately."
    },
    {
      title: "Changes to This Policy",
      content: "We may update this Privacy Policy periodically. We will notify you of significant changes via email or a prominent notice on our website. Your continued use of our services after changes constitutes acceptance of the updated policy."
    },
    {
      title: "Contact Us",
      content: "If you have questions about this Privacy Policy or our privacy practices, please contact us at privacy@codeflow.dev or through the contact information provided on our website."
    }
  ]
}

export const termsOfService: PolicyPage = {
  title: "Terms of Service",
  description: "Please read these terms carefully before using our services.",
  lastUpdated: "December 2, 2024",
  sections: [
    {
      title: "Acceptance of Terms",
      content: "By accessing and using CodeFlow's website and services, you accept and agree to be bound by these Terms of Service and all applicable laws and regulations. If you do not agree with any of these terms, you are prohibited from using our services."
    },
    {
      title: "Description of Services",
      content: "CodeFlow provides website development, software solutions, design services, and related digital products. We reserve the right to modify, suspend, or discontinue any aspect of our services at any time without notice.",
      subsections: [
        {
          title: "Professional Services",
          content: "Our professional services include custom website development, web applications, e-commerce solutions, mobile app development, and digital consulting."
        },
        {
          title: "Service Level",
          content: "We strive to maintain high availability and performance, but we do not guarantee uninterrupted or error-free service. Scheduled maintenance may occur with reasonable notice."
        }
      ]
    },
    {
      title: "User Accounts",
      content: "To access certain features, you may be required to create an account. You are responsible for maintaining the confidentiality of your account credentials and all activities under your account.",
      subsections: [
        {
          title: "Account Security",
          content: "You must choose a strong password and keep it confidential. Notify us immediately if you suspect unauthorized access to your account."
        },
        {
          title: "Account Termination",
          content: "We reserve the right to suspend or terminate accounts that violate these terms, engage in fraudulent activity, or for any other reason at our discretion."
        }
      ]
    },
    {
      title: "Payment and Billing",
      content: "Payment terms are specified in your service agreement or invoice. All fees are non-refundable unless otherwise stated in our Refund Policy.",
      subsections: [
        {
          title: "Project Deposits",
          content: "Most projects require an upfront deposit before work begins. Deposit amounts and payment schedules are outlined in your project proposal."
        },
        {
          title: "Late Payments",
          content: "Late payments may result in service suspension and late fees as specified in your agreement. We reserve the right to pause work on projects with outstanding invoices."
        },
        {
          title: "Price Changes",
          content: "We reserve the right to change our pricing at any time. Price changes will not affect existing contracts but will apply to new agreements."
        }
      ]
    },
    {
      title: "Intellectual Property Rights",
      content: "The content, design, code, and materials on our website and in our services are protected by copyright, trademark, and other intellectual property laws.",
      subsections: [
        {
          title: "CodeFlow Property",
          content: "All CodeFlow branding, templates, proprietary code, and methodologies remain our exclusive property unless otherwise specified in a written agreement."
        },
        {
          title: "Client Work Product",
          content: "Upon full payment, clients receive ownership rights to their custom deliverables as specified in the project agreement. This does not include our proprietary tools, frameworks, or reusable components."
        },
        {
          title: "Portfolio Rights",
          content: "We reserve the right to showcase completed projects in our portfolio, case studies, and marketing materials unless a non-disclosure agreement specifies otherwise."
        }
      ]
    },
    {
      title: "User Responsibilities",
      content: "You agree to use our services responsibly and in compliance with all applicable laws and these terms.",
      subsections: [
        {
          title: "Prohibited Activities",
          content: "You may not use our services to transmit harmful content, infringe on intellectual property, distribute malware, engage in illegal activities, or disrupt our systems."
        },
        {
          title: "Content Responsibility",
          content: "You are solely responsible for all content, data, and materials you provide. You warrant that you have all necessary rights and permissions."
        }
      ]
    },
    {
      title: "Warranties and Disclaimers",
      content: "While we strive for excellence, our services are provided \"as is\" without warranties of any kind, express or implied, including but not limited to warranties of merchantability, fitness for a particular purpose, or non-infringement."
    },
    {
      title: "Limitation of Liability",
      content: "To the maximum extent permitted by law, CodeFlow shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising from your use of our services. Our total liability shall not exceed the amount paid by you for the specific service giving rise to the claim."
    },
    {
      title: "Indemnification",
      content: "You agree to indemnify and hold CodeFlow harmless from any claims, damages, losses, or expenses arising from your use of our services, violation of these terms, or infringement of any third-party rights."
    },
    {
      title: "Dispute Resolution",
      content: "Any disputes arising from these terms or our services shall be resolved through binding arbitration in accordance with commercial arbitration rules, except where prohibited by law."
    },
    {
      title: "Governing Law",
      content: "These Terms of Service are governed by the laws of the State of California, United States, without regard to conflict of law principles."
    },
    {
      title: "Changes to Terms",
      content: "We may modify these terms at any time. Continued use of our services after changes constitutes acceptance. We will notify users of material changes via email or website notice."
    },
    {
      title: "Contact Information",
      content: "For questions about these Terms of Service, contact us at legal@codeflow.dev or through our website contact form."
    }
  ]
}

export const cookiePolicy: PolicyPage = {
  title: "Cookie Policy",
  description: "Learn about how we use cookies and similar technologies to enhance your experience.",
  lastUpdated: "December 2, 2024",
  sections: [
    {
      title: "What Are Cookies",
      content: "Cookies are small text files that are placed on your device when you visit a website. They help websites remember your preferences, analyze traffic, and provide personalized experiences."
    },
    {
      title: "How We Use Cookies",
      content: "We use cookies and similar technologies to improve functionality, analyze performance, and deliver relevant content.",
      subsections: [
        {
          title: "Essential Cookies",
          content: "These cookies are necessary for the website to function properly. They enable core functionality such as security, authentication, and maintaining your session."
        },
        {
          title: "Performance Cookies",
          content: "These cookies help us understand how visitors interact with our website by collecting and reporting anonymous information about page views, navigation paths, and error messages."
        },
        {
          title: "Functional Cookies",
          content: "These cookies allow us to remember your preferences (such as language, region, or theme) and provide enhanced, personalized features."
        },
        {
          title: "Marketing Cookies",
          content: "These cookies track your browsing habits to deliver targeted advertising and measure campaign effectiveness. They may be set by us or third-party advertising partners."
        }
      ]
    },
    {
      title: "Third-Party Cookies",
      content: "We may allow trusted third parties to place cookies on your device for analytics and advertising purposes.",
      subsections: [
        {
          title: "Analytics Services",
          content: "We use analytics services like Google Analytics to understand user behavior and improve our website. These services use cookies to collect anonymous usage data."
        },
        {
          title: "Social Media",
          content: "Social media platforms may set cookies when you interact with sharing buttons or embedded content from their services."
        },
        {
          title: "Advertising Networks",
          content: "Our advertising partners may use cookies to show you relevant ads based on your interests and browsing history across different websites."
        }
      ]
    },
    {
      title: "Managing Your Cookie Preferences",
      content: "You have control over cookie usage and can manage your preferences through various methods:",
      subsections: [
        {
          title: "Browser Settings",
          content: "Most browsers allow you to view, manage, and delete cookies through their settings. You can typically block all cookies, accept only first-party cookies, or receive notifications before cookies are set."
        },
        {
          title: "Cookie Consent Tool",
          content: "When you first visit our website, you can accept or decline non-essential cookies through our consent banner. You can update your preferences at any time."
        },
        {
          title: "Opt-Out Links",
          content: "For third-party cookies, you can opt out directly through the provider's website or use industry opt-out tools like the Network Advertising Initiative opt-out page."
        }
      ]
    },
    {
      title: "Impact of Disabling Cookies",
      content: "While you can disable cookies, doing so may affect your experience on our website. Some features may not function properly, and we may not be able to remember your preferences or provide personalized content."
    },
    {
      title: "Other Tracking Technologies",
      content: "In addition to cookies, we may use web beacons, pixels, and local storage to collect information about your interactions with our website and emails."
    },
    {
      title: "Updates to This Policy",
      content: "We may update this Cookie Policy to reflect changes in technology, legal requirements, or our practices. The \"Last Updated\" date at the top indicates when changes were last made."
    },
    {
      title: "Contact Us",
      content: "If you have questions about our use of cookies or this Cookie Policy, please contact us at privacy@codeflow.dev."
    }
  ]
}

export const contentPolicy: PolicyPage = {
  title: "Content Policy",
  description: "Guidelines for content creation, submission, and acceptable use on CodeFlow platforms.",
  lastUpdated: "December 2, 2024",
  sections: [
    {
      title: "Overview",
      content: "This Content Policy outlines the standards and guidelines for all content created, submitted, or displayed through CodeFlow's services. We are committed to maintaining a professional, respectful, and legally compliant environment."
    },
    {
      title: "Acceptable Content",
      content: "Content provided for our services must meet professional standards and legal requirements.",
      subsections: [
        {
          title: "Professional Standards",
          content: "Content should be accurate, high-quality, and appropriate for business purposes. We encourage clear communication, original ideas, and creative expression within professional boundaries."
        },
        {
          title: "Legal Compliance",
          content: "All content must comply with applicable laws, including copyright, trademark, privacy, and data protection regulations. You must have all necessary rights and permissions for content you provide."
        },
        {
          title: "Truthful Representation",
          content: "Content must not be misleading, deceptive, or fraudulent. Claims about products or services must be substantiated and accurate."
        }
      ]
    },
    {
      title: "Prohibited Content",
      content: "The following types of content are strictly prohibited on our platform:",
      subsections: [
        {
          title: "Illegal Content",
          content: "Content that violates any laws, promotes illegal activities, or facilitates criminal behavior is prohibited. This includes but is not limited to content related to illegal substances, weapons, fraud, or exploitation."
        },
        {
          title: "Harmful or Offensive Content",
          content: "Content that is hateful, discriminatory, harassing, threatening, violent, or promotes harm to individuals or groups based on race, ethnicity, religion, gender, sexual orientation, disability, or other protected characteristics."
        },
        {
          title: "Intellectual Property Infringement",
          content: "Content that infringes on copyrights, trademarks, patents, or other intellectual property rights of others. This includes unauthorized use of images, text, logos, or other protected materials."
        },
        {
          title: "Adult or Explicit Content",
          content: "Pornographic, sexually explicit, or age-restricted content that is not appropriate for business or professional contexts."
        },
        {
          title: "Spam and Deceptive Practices",
          content: "Spam, phishing attempts, misleading links, malware, viruses, or any content designed to deceive, manipulate, or harm users."
        },
        {
          title: "Private Information",
          content: "Content that discloses personal information of others without consent, including addresses, phone numbers, financial information, or other sensitive data."
        }
      ]
    },
    {
      title: "Content Ownership and Licensing",
      content: "Clients retain ownership of their content, but grant CodeFlow necessary licenses to perform services.",
      subsections: [
        {
          title: "Client Content",
          content: "You retain all ownership rights to content you provide. By submitting content, you grant CodeFlow a license to use, modify, and display the content as necessary to deliver services."
        },
        {
          title: "CodeFlow Content",
          content: "Content created by CodeFlow as part of our services is governed by your service agreement. Typically, you receive ownership upon full payment, excluding our proprietary frameworks and tools."
        },
        {
          title: "Stock Resources",
          content: "Stock photos, fonts, icons, and other third-party resources used in projects are licensed according to their respective terms. Clients are responsible for maintaining valid licenses."
        }
      ]
    },
    {
      title: "Content Review and Moderation",
      content: "CodeFlow reserves the right to review, modify, or remove content that violates this policy.",
      subsections: [
        {
          title: "Review Process",
          content: "We may review submitted content to ensure compliance with this policy and applicable laws. We reserve the right to request changes or decline projects involving prohibited content."
        },
        {
          title: "Removal Rights",
          content: "We may remove or disable access to content that violates this policy without prior notice. Repeated violations may result in service termination."
        },
        {
          title: "No Monitoring Obligation",
          content: "While we may review content, we are not obligated to monitor all content and cannot guarantee that all content complies with this policy."
        }
      ]
    },
    {
      title: "User-Generated Content",
      content: "If you submit content through forms, comments, or other interactive features:",
      subsections: [
        {
          title: "Responsibility",
          content: "You are solely responsible for content you submit. Ensure it complies with this policy and does not infringe on third-party rights."
        },
        {
          title: "License Grant",
          content: "By submitting content, you grant CodeFlow a worldwide, royalty-free license to use, reproduce, and display the content for business purposes, including marketing and portfolio showcases."
        },
        {
          title: "Removal Requests",
          content: "If you wish to remove content you submitted, contact us. We will make reasonable efforts to accommodate removal requests, subject to legal and operational requirements."
        }
      ]
    },
    {
      title: "Content Accessibility",
      content: "We strive to create accessible content that complies with WCAG (Web Content Accessibility Guidelines) standards. We encourage clients to provide accessible content and will assist in making content more inclusive where possible."
    },
    {
      title: "Reporting Violations",
      content: "If you encounter content that violates this policy, please report it to us at legal@codeflow.dev with details about the violation. We will investigate and take appropriate action."
    },
    {
      title: "Policy Changes",
      content: "We may update this Content Policy to address new challenges or legal requirements. Changes will be communicated through our website, and continued use of our services constitutes acceptance."
    },
    {
      title: "Contact Us",
      content: "For questions about this Content Policy or to report violations, contact us at legal@codeflow.dev or through our website contact form."
    }
  ]
}

export const acceptableUsePolicy: PolicyPage = {
  title: "Acceptable Use Policy",
  description: "Rules and guidelines for using CodeFlow's services responsibly and ethically.",
  lastUpdated: "December 2, 2024",
  sections: [
    {
      title: "Purpose",
      content: "This Acceptable Use Policy defines the rules for using CodeFlow's services. By using our services, you agree to comply with this policy. Violations may result in service suspension or termination."
    },
    {
      title: "General Principles",
      content: "Users must use our services lawfully, ethically, and respectfully. You must not engage in activities that harm CodeFlow, our users, or third parties."
    },
    {
      title: "Prohibited Activities",
      content: "The following activities are strictly prohibited when using CodeFlow's services:",
      subsections: [
        {
          title: "Illegal Activities",
          content: "Using our services for any illegal purpose, including but not limited to fraud, money laundering, distribution of illegal content, or violation of any laws or regulations."
        },
        {
          title: "Security Violations",
          content: "Attempting to gain unauthorized access to our systems, networks, or accounts; circumventing security measures; distributing malware or viruses; or engaging in hacking, phishing, or other security threats."
        },
        {
          title: "Service Disruption",
          content: "Interfering with or disrupting our services, servers, or networks; overwhelming systems with excessive requests (DoS/DDoS attacks); or degrading performance for other users."
        },
        {
          title: "Misrepresentation",
          content: "Impersonating CodeFlow, our employees, or other users; providing false information; or creating fake accounts for deceptive purposes."
        },
        {
          title: "Spam and Abuse",
          content: "Sending unsolicited communications, spam, or bulk messages; using our services for mass marketing without permission; or engaging in abusive behavior toward our team or other users."
        },
        {
          title: "Data Scraping",
          content: "Using automated tools to scrape, harvest, or collect data from our website or services without written permission; reverse engineering our systems or attempting to extract proprietary information."
        },
        {
          title: "Intellectual Property Violations",
          content: "Infringing on CodeFlow's or third parties' intellectual property rights; unauthorized use of trademarks, copyrighted materials, or proprietary code."
        },
        {
          title: "Harmful Content Distribution",
          content: "Using our services to host, store, or distribute content that violates our Content Policy, including illegal, harmful, or offensive materials."
        }
      ]
    },
    {
      title: "Service-Specific Guidelines",
      content: "Additional guidelines apply to specific aspects of our services:",
      subsections: [
        {
          title: "Dashboard and Account Usage",
          content: "Keep your login credentials secure; do not share accounts; use accounts only for legitimate business purposes; report security issues immediately."
        },
        {
          title: "Communication Services",
          content: "Use contact forms and communication tools professionally; do not send spam or offensive messages; respect our team's time and response schedules."
        },
        {
          title: "Website and Application Use",
          content: "Do not attempt to exploit vulnerabilities; respect rate limits and usage quotas; avoid activities that could harm site performance or user experience."
        }
      ]
    },
    {
      title: "Resource Usage",
      content: "Users must use resources fairly and reasonably. Excessive resource consumption that impacts service quality may result in throttling, additional fees, or service restrictions."
    },
    {
      title: "Compliance with Laws",
      content: "You must comply with all applicable international, federal, state, and local laws and regulations when using our services. This includes but is not limited to data protection laws, export control laws, and industry-specific regulations."
    },
    {
      title: "Monitoring and Enforcement",
      content: "CodeFlow reserves the right to monitor usage for compliance with this policy.",
      subsections: [
        {
          title: "Investigation Rights",
          content: "We may investigate suspected violations of this policy and cooperate with law enforcement as required or permitted by law."
        },
        {
          title: "Remedial Actions",
          content: "Violations may result in warnings, service restrictions, temporary suspension, permanent termination, or legal action as appropriate to the severity and nature of the violation."
        },
        {
          title: "No Liability for Enforcement",
          content: "We are not obligated to monitor all usage and are not liable for failing to detect or prevent violations. However, we take violations seriously and will act when made aware."
        }
      ]
    },
    {
      title: "Reporting Violations",
      content: "If you become aware of any violations of this Acceptable Use Policy, please report them to abuse@codeflow.dev. Include relevant details to help us investigate effectively."
    },
    {
      title: "Consequences of Violations",
      content: "Depending on the severity and frequency of violations, consequences may include: written warnings, temporary service suspension, permanent account termination, legal action, and liability for damages caused."
    },
    {
      title: "Appeals Process",
      content: "If your service is restricted or terminated due to a violation, you may appeal by contacting legal@codeflow.dev with an explanation and evidence. We will review appeals fairly but our decisions are final."
    },
    {
      title: "Policy Updates",
      content: "We may update this Acceptable Use Policy to address evolving challenges and legal requirements. Updates will be posted on our website with the revision date. Continued use after updates constitutes acceptance."
    },
    {
      title: "Contact Information",
      content: "For questions about this policy or to report violations, contact us at legal@codeflow.dev or through our website contact form."
    }
  ]
}

export const refundPolicy: PolicyPage = {
  title: "Refund & Cancellation Policy",
  description: "Understand our policies regarding refunds, cancellations, and project modifications.",
  lastUpdated: "December 2, 2024",
  sections: [
    {
      title: "Overview",
      content: "At CodeFlow, we are committed to delivering exceptional results. This Refund & Cancellation Policy outlines the terms for refunds, cancellations, and changes to projects and services."
    },
    {
      title: "Deposit and Payment Policy",
      content: "Most projects require an upfront deposit before work begins. Deposit amounts vary based on project scope and are specified in your proposal or service agreement.",
      subsections: [
        {
          title: "Deposits",
          content: "Deposits secure your project slot and cover initial planning and resource allocation. Deposits are non-refundable once work has commenced, except in specific circumstances outlined below."
        },
        {
          title: "Milestone Payments",
          content: "Large projects typically follow a milestone-based payment schedule. Each milestone must be approved and paid before proceeding to the next phase."
        },
        {
          title: "Final Payment",
          content: "Final payment is due upon project completion and before final deliverables are released. Ownership rights transfer to the client upon receipt of final payment."
        }
      ]
    },
    {
      title: "Refund Eligibility",
      content: "Refunds are considered on a case-by-case basis and may be granted in the following circumstances:",
      subsections: [
        {
          title: "Services Not Provided",
          content: "If CodeFlow fails to provide services as outlined in the agreement and we cannot remedy the situation, you may be eligible for a full or partial refund of unused services."
        },
        {
          title: "Mutual Agreement",
          content: "If both parties mutually agree to cancel the project before work commences, deposits may be refundable minus any administrative fees or costs already incurred."
        },
        {
          title: "Force Majeure",
          content: "In cases of unforeseen circumstances that prevent service delivery (natural disasters, major technical failures beyond our control), we will work with you to find a fair resolution, which may include refunds or service credits."
        }
      ]
    },
    {
      title: "Non-Refundable Services",
      content: "The following services and fees are non-refundable:",
      subsections: [
        {
          title: "Work Already Completed",
          content: "Payment for work that has been completed, including design concepts, development hours, consultations, and delivered milestones, is non-refundable."
        },
        {
          title: "Third-Party Costs",
          content: "Costs for third-party services such as stock images, fonts, plugins, hosting, domain registrations, or software licenses purchased for your project are non-refundable."
        },
        {
          title: "Consultation and Discovery",
          content: "Time spent on project planning, strategy sessions, discovery calls, and proposal creation is non-refundable once delivered."
        },
        {
          title: "Change of Mind",
          content: "If you decide you no longer want the service after work has begun, no refund will be provided for completed work or resources allocated."
        }
      ]
    },
    {
      title: "Project Cancellation",
      content: "Clients may cancel projects at any time, subject to the following terms:",
      subsections: [
        {
          title: "Client-Initiated Cancellation",
          content: "You may cancel by providing written notice. You will be charged for all work completed up to the cancellation date, including any third-party costs incurred."
        },
        {
          title: "Cancellation Before Work Begins",
          content: "If you cancel before work begins, the deposit may be refundable minus a cancellation fee (typically 10-25% of deposit) to cover administrative costs and lost opportunity."
        },
        {
          title: "Cancellation After Work Begins",
          content: "Once work has started, you will be charged for all completed work, work in progress, and non-recoverable costs. Any remaining balance may be refunded."
        },
        {
          title: "CodeFlow-Initiated Cancellation",
          content: "We reserve the right to cancel projects if payment is not received, if the project violates our policies, or if circumstances make it impossible to continue. In such cases, you will only be charged for work completed."
        }
      ]
    },
    {
      title: "Project Modifications and Scope Changes",
      content: "Changes to project scope, features, or requirements after work has begun may affect timeline and cost:",
      subsections: [
        {
          title: "Change Requests",
          content: "All change requests must be submitted in writing. We will provide a revised quote and timeline. Work on changes will not begin until approved and any additional fees are paid."
        },
        {
          title: "Scope Creep",
          content: "Significant scope increases beyond the original agreement will require a formal amendment and additional payment. Minor adjustments within the original scope are typically accommodated."
        },
        {
          title: "Delays Due to Changes",
          content: "Timeline extensions caused by scope changes are not eligible for refunds. Original delivery dates may be adjusted to accommodate approved changes."
        }
      ]
    },
    {
      title: "Revision and Approval Policy",
      content: "Most projects include a specified number of revision rounds. Additional revisions beyond the agreed amount may incur additional fees.",
      subsections: [
        {
          title: "Included Revisions",
          content: "The number of included revision rounds is specified in your project agreement (typically 2-3 rounds for most projects)."
        },
        {
          title: "Revision Timelines",
          content: "Clients must provide feedback and approval requests within the timeframes specified in the agreement (typically 5-10 business days per round)."
        },
        {
          title: "Unlimited Revisions",
          content: "Requests for unlimited revisions beyond what was agreed upon are subject to additional hourly fees based on the time required."
        }
      ]
    },
    {
      title: "Refund Request Process",
      content: "If you believe you are eligible for a refund:",
      subsections: [
        {
          title: "Submit a Request",
          content: "Send a written refund request to billing@codeflow.dev including your project details, reason for the request, and any supporting documentation."
        },
        {
          title: "Review Process",
          content: "We will review your request within 5-10 business days and respond with our decision and any additional information needed."
        },
        {
          title: "Refund Processing",
          content: "If approved, refunds will be processed within 10-15 business days using the original payment method. Some payment processors may take additional time to credit your account."
        }
      ]
    },
    {
      title: "Service Credits",
      content: "In some cases, instead of a cash refund, we may offer service credits that can be applied to future projects or services. Service credits are valid for 12 months from issuance and are non-transferable."
    },
    {
      title: "Dispute Resolution",
      content: "If you are dissatisfied with our refund decision, you may request mediation or arbitration as outlined in our Terms of Service. We are committed to finding fair solutions and will work with you in good faith to resolve disputes."
    },
    {
      title: "Subscription Services",
      content: "For subscription-based services (if applicable), you may cancel at any time. No refunds will be provided for the current billing period, but you will retain access until the end of the paid period."
    },
    {
      title: "Policy Changes",
      content: "We may update this Refund & Cancellation Policy periodically. Changes will not affect projects already in progress unless mutually agreed. Updated policies apply to new agreements."
    },
    {
      title: "Contact Us",
      content: "For questions about this policy or to request a refund, contact us at billing@codeflow.dev or through our website contact form. We are here to ensure your satisfaction."
    }
  ]
}

// Export all policies as a collection
export const legalPolicies = {
  privacy: privacyPolicy,
  terms: termsOfService,
  cookies: cookiePolicy,
  content: contentPolicy,
  acceptableUse: acceptableUsePolicy,
  refund: refundPolicy
}
