
-- Core Entities Schema for Client Dashboard System

-- Users table (enhanced from existing)
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  name VARCHAR(255) NOT NULL,
  avatar_url TEXT,
  phone VARCHAR(20),
  company VARCHAR(255),
  role ENUM('user', 'admin', 'client') DEFAULT 'user',
  tier ENUM('basic', 'premium', 'enterprise') DEFAULT 'basic',
  timezone VARCHAR(50) DEFAULT 'UTC',
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  last_login TIMESTAMP
);

-- Projects table (core business entity)
CREATE TABLE projects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  name VARCHAR(255) NOT NULL,
  slug VARCHAR(255) UNIQUE NOT NULL,
  type ENUM('website', 'mobile', 'ecommerce', 'saas', 'consulting', 'branding') NOT NULL,
  status ENUM('planning', 'development', 'testing', 'deployment', 'completed', 'on-hold', 'cancelled') DEFAULT 'planning',
  priority ENUM('low', 'medium', 'high', 'urgent') DEFAULT 'medium',
  progress INTEGER DEFAULT 0 CHECK (progress >= 0 AND progress <= 100),
  budget DECIMAL(12,2) NOT NULL,
  spent DECIMAL(12,2) DEFAULT 0,
  start_date DATE NOT NULL,
  expected_completion DATE,
  actual_completion DATE,
  description TEXT,
  requirements JSONB,
  deliverables JSONB,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Project team assignments
CREATE TABLE project_team (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID REFERENCES projects(id) ON DELETE CASCADE,
  team_member_name VARCHAR(255) NOT NULL,
  role VARCHAR(100),
  assigned_at TIMESTAMP DEFAULT NOW()
);

-- Milestones for project tracking
CREATE TABLE project_milestones (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID REFERENCES projects(id) ON DELETE CASCADE,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  due_date DATE,
  completed_date DATE,
  status ENUM('pending', 'in-progress', 'completed', 'overdue') DEFAULT 'pending',
  completion_percentage INTEGER DEFAULT 0,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Invoices table
CREATE TABLE invoices (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  project_id UUID REFERENCES projects(id) ON DELETE SET NULL,
  invoice_number VARCHAR(50) UNIQUE NOT NULL,
  amount DECIMAL(12,2) NOT NULL,
  status ENUM('pending', 'paid', 'overdue', 'cancelled', 'draft') DEFAULT 'pending',
  due_date DATE NOT NULL,
  paid_date DATE,
  description TEXT,
  line_items JSONB,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Support tickets
CREATE TABLE support_tickets (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  project_id UUID REFERENCES projects(id) ON DELETE SET NULL,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  status ENUM('open', 'in-progress', 'resolved', 'closed') DEFAULT 'open',
  priority ENUM('low', 'medium', 'high', 'urgent') DEFAULT 'medium',
  category ENUM('technical', 'billing', 'general', 'feature-request', 'bug-report') DEFAULT 'general',
  assigned_to VARCHAR(255),
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  resolved_at TIMESTAMP
);

-- Support ticket messages
CREATE TABLE ticket_messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  ticket_id UUID REFERENCES support_tickets(id) ON DELETE CASCADE,
  sender_name VARCHAR(255) NOT NULL,
  sender_type ENUM('client', 'support', 'system') DEFAULT 'client',
  message TEXT NOT NULL,
  attachments JSONB,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Notifications for dashboard
CREATE TABLE notifications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  project_id UUID REFERENCES projects(id) ON DELETE SET NULL,
  title VARCHAR(255) NOT NULL,
  message TEXT NOT NULL,
  type ENUM('info', 'success', 'warning', 'error') DEFAULT 'info',
  is_read BOOLEAN DEFAULT FALSE,
  action_label VARCHAR(100),
  action_url VARCHAR(255),
  created_at TIMESTAMP DEFAULT NOW(),
  expires_at TIMESTAMP
);

-- Client analytics and metrics
CREATE TABLE client_analytics (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  metric_date DATE NOT NULL,
  total_projects INTEGER DEFAULT 0,
  active_projects INTEGER DEFAULT 0,
  completed_projects INTEGER DEFAULT 0,
  total_investment DECIMAL(15,2) DEFAULT 0,
  spent_amount DECIMAL(15,2) DEFAULT 0,
  on_time_delivery_rate DECIMAL(5,2) DEFAULT 0,
  satisfaction_score DECIMAL(3,1) DEFAULT 0,
  avg_project_duration DECIMAL(4,1) DEFAULT 0,
  created_at TIMESTAMP DEFAULT NOW(),
  UNIQUE(user_id, metric_date)
);

-- Project activity logs for tracking progress
CREATE TABLE project_activities (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID REFERENCES projects(id) ON DELETE CASCADE,
  user_id UUID REFERENCES users(id) ON DELETE SET NULL,
  activity_type ENUM('status_change', 'milestone_completed', 'payment_received', 'comment_added', 'file_uploaded') NOT NULL,
  description TEXT NOT NULL,
  metadata JSONB,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Client satisfaction surveys
CREATE TABLE satisfaction_surveys (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID REFERENCES projects(id) ON DELETE CASCADE,
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  overall_rating INTEGER CHECK (overall_rating >= 1 AND overall_rating <= 5),
  communication_rating INTEGER CHECK (communication_rating >= 1 AND communication_rating <= 5),
  quality_rating INTEGER CHECK (quality_rating >= 1 AND quality_rating <= 5),
  timeline_rating INTEGER CHECK (timeline_rating >= 1 AND timeline_rating <= 5),
  value_rating INTEGER CHECK (value_rating >= 1 AND value_rating <= 5),
  feedback_text TEXT,
  would_recommend BOOLEAN,
  submitted_at TIMESTAMP DEFAULT NOW()
);

-- Client preferences and settings
CREATE TABLE client_settings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  notification_preferences JSONB DEFAULT '{"email": true, "sms": false, "push": true}',
  dashboard_layout JSONB,
  theme_preferences JSONB DEFAULT '{"theme": "dark", "accent_color": "purple"}',
  language VARCHAR(10) DEFAULT 'en',
  currency VARCHAR(3) DEFAULT 'USD',
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Payment tracking
CREATE TABLE payments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  invoice_id UUID REFERENCES invoices(id) ON DELETE CASCADE,
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  amount DECIMAL(12,2) NOT NULL,
  payment_method VARCHAR(50),
  transaction_id VARCHAR(255),
  payment_processor VARCHAR(50),
  status ENUM('pending', 'completed', 'failed', 'refunded') DEFAULT 'pending',
  processed_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Indexes for performance
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_projects_user_id ON projects(user_id);
CREATE INDEX idx_projects_status ON projects(status);
CREATE INDEX idx_invoices_user_id ON invoices(user_id);
CREATE INDEX idx_invoices_status ON invoices(status);
CREATE INDEX idx_support_tickets_user_id ON support_tickets(user_id);
CREATE INDEX idx_support_tickets_status ON support_tickets(status);
CREATE INDEX idx_notifications_user_id ON notifications(user_id);
CREATE INDEX idx_notifications_read ON notifications(is_read);
CREATE INDEX idx_client_analytics_user_date ON client_analytics(user_id, metric_date);
CREATE INDEX idx_project_activities_project_id ON project_activities(project_id);

-- Views for dashboard statistics
CREATE VIEW user_dashboard_stats AS
SELECT 
  u.id as user_id,
  COUNT(DISTINCT p.id) as total_projects,
  COUNT(DISTINCT CASE WHEN p.status IN ('planning', 'development', 'testing', 'deployment') THEN p.id END) as active_projects,
  COUNT(DISTINCT CASE WHEN p.status = 'completed' THEN p.id END) as completed_projects,
  COALESCE(SUM(p.budget), 0) as total_investment,
  COALESCE(SUM(p.spent), 0) as total_spent,
  COALESCE(AVG(
    CASE 
      WHEN p.actual_completion IS NOT NULL AND p.expected_completion IS NOT NULL
      THEN CASE WHEN p.actual_completion <= p.expected_completion THEN 100 ELSE 0 END
    END
  ), 0) as on_time_delivery_rate,
  COALESCE(AVG(ss.overall_rating), 0) as avg_satisfaction_score,
  COALESCE(AVG(
    CASE 
      WHEN p.actual_completion IS NOT NULL 
      THEN EXTRACT(EPOCH FROM (p.actual_completion - p.start_date)) / (30.44 * 24 * 3600) 
    END
  ), 0) as avg_project_duration_months
FROM users u
LEFT JOIN projects p ON u.id = p.user_id
LEFT JOIN satisfaction_surveys ss ON p.id = ss.project_id
WHERE u.role = 'user'
GROUP BY u.id;

-- Function to update client analytics daily
CREATE OR REPLACE FUNCTION update_client_analytics()
RETURNS void AS $$
BEGIN
  INSERT INTO client_analytics (
    user_id, 
    metric_date, 
    total_projects, 
    active_projects, 
    completed_projects,
    total_investment,
    spent_amount,
    on_time_delivery_rate,
    satisfaction_score,
    avg_project_duration
  )
  SELECT 
    user_id,
    CURRENT_DATE,
    total_projects,
    active_projects,
    completed_projects,
    total_investment,
    total_spent,
    on_time_delivery_rate,
    avg_satisfaction_score,
    avg_project_duration_months
  FROM user_dashboard_stats
  ON CONFLICT (user_id, metric_date) 
  DO UPDATE SET
    total_projects = EXCLUDED.total_projects,
    active_projects = EXCLUDED.active_projects,
    completed_projects = EXCLUDED.completed_projects,
    total_investment = EXCLUDED.total_investment,
    spent_amount = EXCLUDED.spent_amount,
    on_time_delivery_rate = EXCLUDED.on_time_delivery_rate,
    satisfaction_score = EXCLUDED.satisfaction_score,
    avg_project_duration = EXCLUDED.avg_project_duration,
    created_at = NOW();
END;
$$ LANGUAGE plpgsql;

-- Sample data triggers to maintain analytics
CREATE OR REPLACE FUNCTION trigger_update_analytics()
RETURNS trigger AS $$
BEGIN
  -- Update analytics when project status changes
  IF TG_TABLE_NAME = 'projects' THEN
    PERFORM update_client_analytics();
  END IF;
  RETURN COALESCE(NEW, OLD);
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER project_analytics_trigger
  AFTER INSERT OR UPDATE OR DELETE ON projects
  FOR EACH ROW EXECUTE FUNCTION trigger_update_analytics();
