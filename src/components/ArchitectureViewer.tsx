import { useEffect, useState } from 'react'
import {
  Box,
  Typography,
  CircularProgress,
  Paper,
  Grid,
  Chip,
  Card,
  CardContent,
  Tabs,
  Tab,
  Alert,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Divider
} from '@mui/material'
import {
  CheckCircle as CheckIcon,
  Warning as WarningIcon,
  TrendingUp as ImprovementIcon,
  Architecture as ArchIcon,
  ArrowForward as ArrowIcon
} from '@mui/icons-material'
import axios from 'axios'

interface ArchitectureViewerProps {
  projectId: string
}

interface TabPanelProps {
  children?: React.ReactNode
  index: number
  value: number
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props
  return (
    <div role="tabpanel" hidden={value !== index} {...other}>
      {value === index && <Box sx={{ py: 3 }}>{children}</Box>}
    </div>
  )
}

export default function ArchitectureViewer({ projectId }: ArchitectureViewerProps) {
  const [loading, setLoading] = useState(true)
  const [architecture, setArchitecture] = useState<any>(null)
  const [aiAnalysis, setAiAnalysis] = useState<any>(null)
  const [error, setError] = useState<string | null>(null)
  const [tabValue, setTabValue] = useState(0)

  useEffect(() => {
    const fetchData = async () => {
      try {
        // First scan
        await axios.post(`http://localhost:8000/scan/${projectId}`)

        // Get architecture
        const archResponse = await axios.get(`http://localhost:8000/architecture/${projectId}`)
        setArchitecture(archResponse.data)

        // Get AI analysis for architecture patterns
        const aiResponse = await axios.post('http://localhost:8000/ai/analyze', {
          project_id: projectId,
          context: 'Architecture analysis and modernization recommendations'
        })
        setAiAnalysis(aiResponse.data)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch architecture data')
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [projectId])

  if (loading) {
    return (
      <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', minHeight: 400, gap: 2 }}>
        <CircularProgress size={60} />
        <Typography variant="body1" color="text.secondary">
          Analyzing architecture...
        </Typography>
      </Box>
    )
  }

  if (error) {
    return <Alert severity="error">{error}</Alert>
  }

  const currentArch = aiAnalysis?.current_architecture || {}
  const recommendedArch = aiAnalysis?.recommended_architecture || {}

  return (
    <Box>
      <Typography
        variant="h4"
        sx={{
          mb: 1,
          fontWeight: 700,
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent'
        }}
      >
        Architecture Analysis
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 4 }}>
        Comprehensive analysis of your current architecture with modernization recommendations
      </Typography>

      {/* Metrics Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Card elevation={0} sx={{ border: '1px solid #e0e0e0', borderRadius: 2 }}>
            <CardContent>
              <Typography variant="h3" sx={{ fontWeight: 700, color: '#667eea', mb: 1 }}>
                {architecture?.nodes?.length || 0}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Components
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card elevation={0} sx={{ border: '1px solid #e0e0e0', borderRadius: 2 }}>
            <CardContent>
              <Typography variant="h3" sx={{ fontWeight: 700, color: '#667eea', mb: 1 }}>
                {architecture?.edges?.length || 0}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Dependencies
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card elevation={0} sx={{ border: '1px solid #e0e0e0', borderRadius: 2 }}>
            <CardContent>
              <Typography variant="h3" sx={{ fontWeight: 700, color: '#ff9800', mb: 1 }}>
                {architecture?.metrics?.cyclic_complexity || 0}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Circular Dependencies
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card elevation={0} sx={{ border: '1px solid #e0e0e0', borderRadius: 2 }}>
            <CardContent>
              <Typography variant="h3" sx={{ fontWeight: 700, color: '#4caf50', mb: 1 }}>
                {architecture?.layers?.length || 0}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Architectural Layers
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Architecture Comparison Tabs */}
      <Paper elevation={0} sx={{ border: '1px solid #e0e0e0', borderRadius: 2 }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={tabValue} onChange={(e, newValue) => setTabValue(newValue)}>
            <Tab label="Current Architecture" />
            <Tab label="Recommended Architecture" />
            <Tab label="Migration Path" />
          </Tabs>
        </Box>

        {/* Current Architecture Tab */}
        <TabPanel value={tabValue} index={0}>
          <Box sx={{ p: 2 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
              <WarningIcon sx={{ fontSize: 40, color: '#ff9800' }} />
              <Box>
                <Typography variant="h6" sx={{ fontWeight: 600 }}>
                  {currentArch.pattern || 'Current Architecture Pattern'}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {currentArch.description || 'Analyzing current architecture...'}
                </Typography>
              </Box>
            </Box>

            {/* Current Architecture Diagram */}
            <Paper
              elevation={0}
              sx={{
                p: 4,
                mb: 3,
                backgroundColor: '#fafafa',
                border: '2px dashed #e0e0e0',
                borderRadius: 2
              }}
            >
              <Typography variant="subtitle2" sx={{ mb: 3, fontWeight: 600, textAlign: 'center' }}>
                Current Architecture Layers
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, maxWidth: 600, margin: '0 auto' }}>
                {currentArch.layers && currentArch.layers.length > 0 ? (
                  currentArch.layers.map((layer: string, index: number) => (
                    <Box
                      key={index}
                      sx={{
                        p: 2,
                        backgroundColor: 'white',
                        border: '2px solid #667eea',
                        borderRadius: 1,
                        textAlign: 'center',
                        fontWeight: 600,
                        position: 'relative'
                      }}
                    >
                      {layer}
                      {index < currentArch.layers.length - 1 && (
                        <ArrowIcon
                          sx={{
                            position: 'absolute',
                            bottom: -24,
                            left: '50%',
                            transform: 'translateX(-50%) rotate(90deg)',
                            color: '#667eea'
                          }}
                        />
                      )}
                    </Box>
                  ))
                ) : (
                  <Typography color="text.secondary" textAlign="center">
                    Analyzing architecture layers...
                  </Typography>
                )}
              </Box>
            </Paper>

            {/* Issues */}
            {currentArch.issues && currentArch.issues.length > 0 && (
              <Box sx={{ mb: 3 }}>
                <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 2, color: '#d32f2f' }}>
                  Issues & Concerns:
                </Typography>
                <List>
                  {currentArch.issues.map((issue: string, index: number) => (
                    <ListItem key={index}>
                      <ListItemIcon>
                        <WarningIcon sx={{ color: '#ff9800' }} />
                      </ListItemIcon>
                      <ListItemText primary={issue} />
                    </ListItem>
                  ))}
                </List>
              </Box>
            )}

            {/* Metrics */}
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <Paper elevation={0} sx={{ p: 2, border: '1px solid #e0e0e0', textAlign: 'center' }}>
                  <Typography variant="subtitle2" color="text.secondary">
                    Coupling Level
                  </Typography>
                  <Chip
                    label={currentArch.coupling || 'Medium'}
                    color={currentArch.coupling === 'high' ? 'error' : 'warning'}
                    sx={{ mt: 1, textTransform: 'capitalize' }}
                  />
                </Paper>
              </Grid>
              <Grid item xs={6}>
                <Paper elevation={0} sx={{ p: 2, border: '1px solid #e0e0e0', textAlign: 'center' }}>
                  <Typography variant="subtitle2" color="text.secondary">
                    Cohesion Level
                  </Typography>
                  <Chip
                    label={currentArch.cohesion || 'Medium'}
                    color={currentArch.cohesion === 'low' ? 'error' : 'success'}
                    sx={{ mt: 1, textTransform: 'capitalize' }}
                  />
                </Paper>
              </Grid>
            </Grid>
          </Box>
        </TabPanel>

        {/* Recommended Architecture Tab */}
        <TabPanel value={tabValue} index={1}>
          <Box sx={{ p: 2 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
              <ImprovementIcon sx={{ fontSize: 40, color: '#4caf50' }} />
              <Box>
                <Typography variant="h6" sx={{ fontWeight: 600 }}>
                  {recommendedArch.pattern || 'Recommended Modern Architecture'}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {recommendedArch.description || 'Modern, scalable architecture pattern'}
                </Typography>
              </Box>
            </Box>

            {/* Recommended Architecture Diagram */}
            <Paper
              elevation={0}
              sx={{
                p: 4,
                mb: 3,
                background: 'linear-gradient(135deg, rgba(76, 175, 80, 0.1) 0%, rgba(102, 126, 234, 0.1) 100%)',
                border: '2px solid #4caf50',
                borderRadius: 2
              }}
            >
              <Typography variant="subtitle2" sx={{ mb: 3, fontWeight: 600, textAlign: 'center', color: '#4caf50' }}>
                Recommended Modern Architecture
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, maxWidth: 600, margin: '0 auto' }}>
                {recommendedArch.layers && recommendedArch.layers.length > 0 ? (
                  recommendedArch.layers.map((layer: string, index: number) => (
                    <Box
                      key={index}
                      sx={{
                        p: 2,
                        backgroundColor: 'white',
                        border: '2px solid #4caf50',
                        borderRadius: 1,
                        textAlign: 'center',
                        fontWeight: 600,
                        position: 'relative',
                        boxShadow: '0 2px 8px rgba(76, 175, 80, 0.2)'
                      }}
                    >
                      {layer}
                      {index < recommendedArch.layers.length - 1 && (
                        <ArrowIcon
                          sx={{
                            position: 'absolute',
                            bottom: -24,
                            left: '50%',
                            transform: 'translateX(-50%) rotate(90deg)',
                            color: '#4caf50'
                          }}
                        />
                      )}
                    </Box>
                  ))
                ) : (
                  <Typography color="text.secondary" textAlign="center">
                    Generating recommendations...
                  </Typography>
                )}
              </Box>
            </Paper>

            {/* Benefits */}
            {recommendedArch.benefits && recommendedArch.benefits.length > 0 && (
              <Box sx={{ mb: 3 }}>
                <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 2, color: '#4caf50' }}>
                  Benefits:
                </Typography>
                <List>
                  {recommendedArch.benefits.map((benefit: string, index: number) => (
                    <ListItem key={index}>
                      <ListItemIcon>
                        <CheckIcon sx={{ color: '#4caf50' }} />
                      </ListItemIcon>
                      <ListItemText primary={benefit} />
                    </ListItem>
                  ))}
                </List>
              </Box>
            )}

            <Alert severity="success" sx={{ mt: 3 }}>
              <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1 }}>
                Modernization Impact
              </Typography>
              <Typography variant="body2">
                Adopting this architecture will improve testability, maintainability, and scalability while
                reducing technical debt and making your system more adaptable to future changes.
              </Typography>
            </Alert>
          </Box>
        </TabPanel>

        {/* Migration Path Tab */}
        <TabPanel value={tabValue} index={2}>
          <Box sx={{ p: 2 }}>
            <Typography variant="h6" sx={{ fontWeight: 600, mb: 3 }}>
              Migration Steps
            </Typography>

            {recommendedArch.migration_steps && recommendedArch.migration_steps.length > 0 ? (
              <List>
                {recommendedArch.migration_steps.map((step: string, index: number) => (
                  <ListItem
                    key={index}
                    sx={{
                      mb: 2,
                      backgroundColor: index % 2 === 0 ? '#f5f5f5' : 'white',
                      borderRadius: 1,
                      border: '1px solid #e0e0e0'
                    }}
                  >
                    <ListItemIcon>
                      <Box
                        sx={{
                          width: 32,
                          height: 32,
                          borderRadius: '50%',
                          backgroundColor: '#667eea',
                          color: 'white',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontWeight: 600
                        }}
                      >
                        {index + 1}
                      </Box>
                    </ListItemIcon>
                    <ListItemText primary={step} />
                  </ListItem>
                ))}
              </List>
            ) : (
              <Alert severity="info">
                Visit the Migration Roadmap tab for a detailed step-by-step migration plan.
              </Alert>
            )}

            <Divider sx={{ my: 3 }} />

            <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 2 }}>
              Before & After Comparison
            </Typography>
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <Paper elevation={0} sx={{ p: 3, border: '2px solid #ff9800', borderRadius: 2 }}>
                  <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 2, color: '#ff9800' }}>
                    Current State
                  </Typography>
                  <List dense>
                    <ListItem>
                      <ListItemText primary="High coupling between components" />
                    </ListItem>
                    <ListItem>
                      <ListItemText primary="Difficult to test" />
                    </ListItem>
                    <ListItem>
                      <ListItemText primary="Hard to maintain" />
                    </ListItem>
                    <ListItem>
                      <ListItemText primary="Limited scalability" />
                    </ListItem>
                  </List>
                </Paper>
              </Grid>
              <Grid item xs={12} md={6}>
                <Paper elevation={0} sx={{ p: 3, border: '2px solid #4caf50', borderRadius: 2 }}>
                  <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 2, color: '#4caf50' }}>
                    Future State
                  </Typography>
                  <List dense>
                    <ListItem>
                      <ListItemText primary="Low coupling, high cohesion" />
                    </ListItem>
                    <ListItem>
                      <ListItemText primary="Highly testable" />
                    </ListItem>
                    <ListItem>
                      <ListItemText primary="Easy to maintain and extend" />
                    </ListItem>
                    <ListItem>
                      <ListItemText primary="Highly scalable" />
                    </ListItem>
                  </List>
                </Paper>
              </Grid>
            </Grid>
          </Box>
        </TabPanel>
      </Paper>

      {/* Layers Information */}
      {architecture?.layers && architecture.layers.length > 0 && (
        <Paper elevation={0} sx={{ p: 3, mt: 3, border: '1px solid #e0e0e0', borderRadius: 2 }}>
          <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
            Detected Layers
          </Typography>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
            {architecture.layers.map((layer: string, index: number) => (
              <Chip
                key={index}
                label={layer}
                icon={<ArchIcon />}
                variant="outlined"
                sx={{ fontWeight: 500 }}
              />
            ))}
          </Box>
        </Paper>
      )}
    </Box>
  )
}
