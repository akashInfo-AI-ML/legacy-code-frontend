import { useState } from 'react'
import {
  Box,
  Drawer,
  AppBar,
  Toolbar,
  Typography,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Container,
  Paper,
  Alert,
  Chip,
  Avatar,
  Divider,
  IconButton,
  Tooltip
} from '@mui/material'
import {
  CloudUpload as UploadIcon,
  Architecture as ArchIcon,
  Psychology as AIIcon,
  Timeline as ImpactIcon,
  HealthAndSafety as HealthIcon,
  Recommend as RecommendIcon,
  DashboardCustomize as DashboardIcon,
  Code as CodeIcon,
  GitHub as GitHubIcon,
  Gavel as RulesIcon,
  Timer as EffortIcon,
  Map as RoadmapIcon
} from '@mui/icons-material'
import UploadComponent from './components/UploadComponent'
import ArchitectureViewer from './components/ArchitectureViewer'
import AIAnalysisPanel from './components/AIAnalysisPanel'
import ImpactAnalysisPanel from './components/ImpactAnalysisPanel'
import HealthScorePanel from './components/HealthScorePanel'
import RecommendationsPanel from './components/RecommendationsPanel'
import BusinessRulesPanel from './components/BusinessRulesPanel'
import EffortEstimationPanel from './components/EffortEstimationPanel'
import MigrationRoadmapPanel from './components/MigrationRoadmapPanel'

const DRAWER_WIDTH = 280

interface NavItem {
  id: number
  label: string
  icon: JSX.Element
  requiresProject: boolean
}

const navItems: NavItem[] = [
  { id: 0, label: 'Upload Solution', icon: <UploadIcon />, requiresProject: false },
  { id: 1, label: 'Architecture', icon: <ArchIcon />, requiresProject: true },
  { id: 2, label: 'AI Analysis', icon: <AIIcon />, requiresProject: true },
  { id: 3, label: 'Business Rules', icon: <RulesIcon />, requiresProject: true },
  { id: 4, label: 'Effort Estimation', icon: <EffortIcon />, requiresProject: true },
  { id: 5, label: 'Migration Roadmap', icon: <RoadmapIcon />, requiresProject: true },
  { id: 6, label: 'Impact Analysis', icon: <ImpactIcon />, requiresProject: true },
  { id: 7, label: 'Health Score', icon: <HealthIcon />, requiresProject: true },
  { id: 8, label: 'Recommendations', icon: <RecommendIcon />, requiresProject: true },
]

function App() {
  const [activeView, setActiveView] = useState(0)
  const [projectId, setProjectId] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  const handleUploadSuccess = (id: string) => {
    setProjectId(id)
    setActiveView(1)
    setError(null)
  }

  const handleError = (msg: string) => {
    setError(msg)
  }

  const handleNavClick = (viewId: number) => {
    setActiveView(viewId)
    setError(null)
  }

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh' }}>
      {/* Sidebar Navigation */}
      <Drawer
        variant="permanent"
        sx={{
          width: DRAWER_WIDTH,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: DRAWER_WIDTH,
            boxSizing: 'border-box',
            background: 'white',
            borderRight: '1px solid #e0e0e0',
            color: '#333'
          },
        }}
      >
        {/* Logo & Title */}
        <Box sx={{ p: 3, textAlign: 'center', borderBottom: '1px solid #e0e0e0' }}>
          <Avatar
            sx={{
              width: 60,
              height: 60,
              margin: '0 auto 12px',
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              boxShadow: '0 4px 12px rgba(102, 126, 234, 0.3)'
            }}
          >
            <CodeIcon sx={{ fontSize: 32 }} />
          </Avatar>
          <Typography variant="h5" sx={{ fontWeight: 700, mb: 0.5, color: '#333' }}>
            ATLAS
          </Typography>
          <Typography variant="caption" sx={{ color: '#666', fontSize: '0.75rem' }}>
            Legacy .NET Intelligence
          </Typography>
        </Box>

        {/* Project Status */}
        <Box sx={{ p: 2, borderBottom: '1px solid #e0e0e0' }}>
          {projectId ? (
            <Chip
              icon={<DashboardIcon />}
              label="Project Loaded"
              size="small"
              color="success"
              sx={{ width: '100%', fontWeight: 600 }}
            />
          ) : (
            <Chip
              icon={<UploadIcon />}
              label="No Project"
              size="small"
              variant="outlined"
              sx={{ width: '100%' }}
            />
          )}
        </Box>

        {/* Navigation Items */}
        <List sx={{ px: 1, py: 2, flex: 1 }}>
          {navItems.map((item) => {
            const isDisabled = item.requiresProject && !projectId
            const isActive = activeView === item.id

            return (
              <ListItem key={item.id} disablePadding sx={{ mb: 1 }}>
                <Tooltip title={isDisabled ? '⚠️ Upload a solution first' : ''} placement="right" arrow>
                  <span style={{ width: '100%' }}>
                    <ListItemButton
                      selected={isActive}
                      disabled={isDisabled}
                      onClick={() => !isDisabled && handleNavClick(item.id)}
                      sx={{
                        borderRadius: 2,
                        mb: 0.5,
                        '&.Mui-selected': {
                          background: 'rgba(102, 126, 234, 0.1)',
                          borderLeft: '3px solid #667eea',
                          '&:hover': {
                            background: 'rgba(102, 126, 234, 0.15)'
                          }
                        },
                        '&:hover': {
                          background: 'rgba(0, 0, 0, 0.04)'
                        },
                        '&.Mui-disabled': {
                          opacity: 0.4
                        }
                      }}
                    >
                      <ListItemIcon sx={{ color: isActive ? '#667eea' : 'inherit', minWidth: 40 }}>
                        {item.icon}
                      </ListItemIcon>
                      <ListItemText
                        primary={item.label}
                        primaryTypographyProps={{
                          fontSize: '0.95rem',
                          fontWeight: isActive ? 600 : 400
                        }}
                      />
                    </ListItemButton>
                  </span>
                </Tooltip>
              </ListItem>
            )
          })}
        </List>

        <Box sx={{ flexGrow: 1 }} />

        {/* Footer */}
        <Box sx={{ p: 2, borderTop: '1px solid #e0e0e0', textAlign: 'center' }}>
          <Typography variant="caption" sx={{ display: 'block', color: '#666', mb: 1 }}>
            Version 1.0.0
          </Typography>
          <IconButton size="small" sx={{ color: '#666' }}>
            <GitHubIcon fontSize="small" />
          </IconButton>
        </Box>
      </Drawer>

      {/* Main Content */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          background: '#f5f7fa'
        }}
      >
        {/* Top Bar */}
        <AppBar
          position="static"
          elevation={0}
          sx={{
            background: 'white',
            borderBottom: '1px solid #e0e0e0',
            color: '#333'
          }}
        >
          <Toolbar sx={{ py: 1 }}>
            <Box sx={{ flexGrow: 1 }}>
              <Typography variant="h6" sx={{ fontWeight: 600, color: '#333' }}>
                {navItems[activeView].label}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {projectId ? 'Project analysis in progress' : 'Upload a solution to begin'}
              </Typography>
            </Box>
            {projectId && (
              <Chip
                label={`ID: ${projectId.substring(0, 8)}...`}
                size="small"
                variant="outlined"
                sx={{
                  fontFamily: 'monospace',
                  fontSize: '0.75rem'
                }}
              />
            )}
          </Toolbar>
        </AppBar>

        {/* Content Area */}
        <Container
          maxWidth="xl"
          sx={{
            py: 4,
            flex: 1,
            display: 'flex',
            flexDirection: 'column'
          }}
        >
          {error && (
            <Alert
              severity="error"
              sx={{
                mb: 3,
                borderRadius: 3,
                background: 'linear-gradient(135deg, rgba(211, 47, 47, 0.15) 0%, rgba(183, 28, 28, 0.15) 100%)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(211, 47, 47, 0.4)',
                color: 'white',
                boxShadow: '0 8px 30px rgba(211, 47, 47, 0.2)',
                '& .MuiAlert-icon': {
                  color: '#ff6b6b'
                }
              }}
              onClose={() => setError(null)}
            >
              {error}
            </Alert>
          )}

          <Paper
            className="fade-in"
            sx={{
              p: 4,
              flex: 1,
              borderRadius: 2,
              background: 'white',
              boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
              minHeight: '600px'
            }}
          >
            {activeView === 0 && (
              <UploadComponent onSuccess={handleUploadSuccess} onError={handleError} />
            )}

            {projectId && activeView === 1 && (
              <ArchitectureViewer projectId={projectId} />
            )}

            {projectId && activeView === 2 && (
              <AIAnalysisPanel projectId={projectId} />
            )}

            {projectId && activeView === 3 && (
              <BusinessRulesPanel projectId={projectId} />
            )}

            {projectId && activeView === 4 && (
              <EffortEstimationPanel projectId={projectId} />
            )}

            {projectId && activeView === 5 && (
              <MigrationRoadmapPanel projectId={projectId} />
            )}

            {projectId && activeView === 6 && (
              <ImpactAnalysisPanel projectId={projectId} />
            )}

            {projectId && activeView === 7 && (
              <HealthScorePanel projectId={projectId} />
            )}

            {projectId && activeView === 8 && (
              <RecommendationsPanel projectId={projectId} />
            )}
          </Paper>
        </Container>
      </Box>
    </Box>
  )
}

export default App
