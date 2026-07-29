import { useEffect, useState } from 'react'
import {
    Box,
    Typography,
    CircularProgress,
    Paper,
    Grid,
    Card,
    CardContent,
    Chip,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Alert,
    Accordion,
    AccordionSummary,
    AccordionDetails,
    LinearProgress,
    List,
    ListItem,
    ListItemText,
    Divider
} from '@mui/material'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import {
    Assessment as AnalysisIcon,
    Build as RefactorIcon,
    BugReport as TestingIcon,
    Flight as MigrationIcon,
    Description as DocsIcon,
    Warning as WarningIcon,
    TrendingUp as ConfidenceIcon
} from '@mui/icons-material'
import axios from 'axios'

interface EffortEstimationPanelProps {
    projectId: string
}

const phaseIcons: Record<string, JSX.Element> = {
    'analysis_and_planning': <AnalysisIcon />,
    'code_refactoring': <RefactorIcon />,
    'testing_and_qa': <TestingIcon />,
    'migration_execution': <MigrationIcon />,
    'documentation': <DocsIcon />
}

const getSeverityColor = (severity: string) => {
    switch (severity.toLowerCase()) {
        case 'critical':
            return 'error'
        case 'high':
            return 'warning'
        case 'medium':
            return 'info'
        default:
            return 'success'
    }
}

export default function EffortEstimationPanel({ projectId }: EffortEstimationPanelProps) {
    const [loading, setLoading] = useState(true)
    const [data, setData] = useState<any>(null)
    const [error, setError] = useState<string | null>(null)
    const [selectedScenario, setSelectedScenario] = useState('medium_team')

    useEffect(() => {
        const fetchEffortEstimate = async () => {
            try {
                const response = await axios.get(`http://localhost:8000/effort-estimate/${projectId}`)
                setData(response.data)
            } catch (err) {
                setError(err instanceof Error ? err.message : 'Failed to fetch effort estimate')
            } finally {
                setLoading(false)
            }
        }

        fetchEffortEstimate()
    }, [projectId])

    if (loading) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: 400 }}>
                <CircularProgress />
            </Box>
        )
    }

    if (error) {
        return <Alert severity="error">{error}</Alert>
    }

    const storyPoints = data?.story_points || {}
    const timeEstimates = data?.time_estimates || {}
    const costEstimates = data?.cost_estimates || {}
    const risks = data?.risks || []
    const phaseBreakdown = data?.phase_breakdown || []
    const confidenceLevel = data?.confidence_level || 'medium'

    const currentScenario = timeEstimates.scenarios?.[selectedScenario] || {}
    const currentCostScenario = costEstimates.scenarios?.[selectedScenario] || {}

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
                Effort Estimation & Planning
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 4 }}>
                Comprehensive effort estimation with story points, time, and cost analysis
            </Typography>

            {/* Confidence Level */}
            <Alert
                severity={confidenceLevel === 'high' ? 'success' : confidenceLevel === 'medium' ? 'info' : 'warning'}
                icon={<ConfidenceIcon />}
                sx={{ mb: 4 }}
            >
                <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                    Confidence Level: {confidenceLevel.toUpperCase()}
                </Typography>
                <Typography variant="body2">
                    {confidenceLevel === 'high' && 'High confidence based on comprehensive code analysis and good code health.'}
                    {confidenceLevel === 'medium' && 'Medium confidence. Some assumptions made due to limited data or moderate code health.'}
                    {confidenceLevel === 'low' && 'Low confidence. Significant unknowns or poor code health detected. Consider detailed discovery phase.'}
                </Typography>
            </Alert>

            {/* Story Points Overview */}
            <Paper elevation={0} sx={{ p: 3, mb: 4, border: '1px solid #e0e0e0', borderRadius: 2 }}>
                <Typography variant="h6" sx={{ mb: 3, fontWeight: 600 }}>
                    📊 Story Points Breakdown
                </Typography>
                <Grid container spacing={3}>
                    <Grid item xs={12} md={4}>
                        <Box sx={{ textAlign: 'center' }}>
                            <Typography variant="h2" sx={{ fontWeight: 700, color: '#667eea', mb: 1 }}>
                                {storyPoints.total_story_points || 0}
                            </Typography>
                            <Typography variant="body1" color="text.secondary">
                                Total Story Points
                            </Typography>
                            {storyPoints.ai_adjustment && (
                                <Chip
                                    label={`AI Adjusted (×${storyPoints.ai_adjustment})`}
                                    size="small"
                                    color="primary"
                                    sx={{ mt: 1 }}
                                />
                            )}
                        </Box>
                    </Grid>
                    <Grid item xs={12} md={8}>
                        <Grid container spacing={2}>
                            {storyPoints.breakdown && Object.entries(storyPoints.breakdown).map(([key, value]: [string, any]) => (
                                <Grid item xs={12} sm={6} key={key}>
                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                                        <Box sx={{ color: '#667eea' }}>
                                            {phaseIcons[key] || <AnalysisIcon />}
                                        </Box>
                                        <Box sx={{ flex: 1 }}>
                                            <Typography variant="body2" color="text.secondary" sx={{ textTransform: 'capitalize' }}>
                                                {key.replace(/_/g, ' ')}
                                            </Typography>
                                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                                <LinearProgress
                                                    variant="determinate"
                                                    value={(value / storyPoints.total_story_points) * 100}
                                                    sx={{ flex: 1, height: 6, borderRadius: 3 }}
                                                />
                                                <Typography variant="h6" sx={{ fontWeight: 600, minWidth: 40 }}>
                                                    {value}
                                                </Typography>
                                            </Box>
                                        </Box>
                                    </Box>
                                </Grid>
                            ))}
                        </Grid>
                    </Grid>
                </Grid>
            </Paper>

            {/* Team Scenario Selector */}
            <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
                ⏱️ Time & Cost Estimates
            </Typography>
            <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
                {['small_team', 'medium_team', 'large_team'].map((scenario) => (
                    <Chip
                        key={scenario}
                        label={scenario.replace(/_/g, ' ').replace(/\b\w/g, (l) => l.toUpperCase())}
                        onClick={() => setSelectedScenario(scenario)}
                        color={selectedScenario === scenario ? 'primary' : 'default'}
                        sx={{ textTransform: 'capitalize', cursor: 'pointer' }}
                    />
                ))}
            </Box>

            {/* Time and Cost Cards */}
            <Grid container spacing={3} sx={{ mb: 4 }}>
                <Grid item xs={12} md={4}>
                    <Card elevation={0} sx={{ border: '1px solid #e0e0e0', borderRadius: 2, height: '100%' }}>
                        <CardContent>
                            <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                                Team Size
                            </Typography>
                            <Typography variant="h5" sx={{ fontWeight: 600, mb: 1 }}>
                                {currentScenario.team_size}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                Velocity: {currentScenario.velocity} SP/sprint
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12} md={4}>
                    <Card elevation={0} sx={{ border: '1px solid #e0e0e0', borderRadius: 2, height: '100%' }}>
                        <CardContent>
                            <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                                Estimated Duration
                            </Typography>
                            <Typography variant="h5" sx={{ fontWeight: 600, mb: 1 }}>
                                {currentScenario.months} months
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                {currentScenario.weeks} weeks / {currentScenario.sprints} sprints
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12} md={4}>
                    <Card elevation={0} sx={{ border: '1px solid #e0e0e0', borderRadius: 2, height: '100%' }}>
                        <CardContent>
                            <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                                Estimated Cost
                            </Typography>
                            <Typography variant="h5" sx={{ fontWeight: 600, mb: 1, color: '#667eea' }}>
                                ${currentCostScenario.total_cost?.toLocaleString()}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                ${currentCostScenario.cost_per_week?.toLocaleString()}/week
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>

            {/* Cost Breakdown */}
            <Paper elevation={0} sx={{ p: 3, mb: 4, border: '1px solid #e0e0e0', borderRadius: 2 }}>
                <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
                    💰 Cost Breakdown
                </Typography>
                <Grid container spacing={2}>
                    <Grid item xs={12} md={4}>
                        <Typography variant="body2" color="text.secondary">
                            Base Cost
                        </Typography>
                        <Typography variant="h6" sx={{ fontWeight: 600 }}>
                            ${currentCostScenario.base_cost?.toLocaleString()}
                        </Typography>
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <Typography variant="body2" color="text.secondary">
                            Contingency (20%)
                        </Typography>
                        <Typography variant="h6" sx={{ fontWeight: 600 }}>
                            ${currentCostScenario.contingency?.toLocaleString()}
                        </Typography>
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <Typography variant="body2" color="text.secondary">
                            Blended Rate
                        </Typography>
                        <Typography variant="h6" sx={{ fontWeight: 600 }}>
                            ${currentCostScenario.blended_rate}/hour
                        </Typography>
                    </Grid>
                </Grid>
                <Divider sx={{ my: 2 }} />
                <Alert severity="info" sx={{ mt: 2 }}>
                    <Typography variant="body2">
                        <strong>Includes:</strong> Development, Testing, Architecture, and Project Management.
                        Costs may vary based on location and seniority levels.
                    </Typography>
                </Alert>
            </Paper>

            {/* Phase Breakdown */}
            <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
                📅 Phased Delivery Plan
            </Typography>
            {phaseBreakdown.map((phase: any) => (
                <Accordion
                    key={phase.phase}
                    elevation={0}
                    sx={{
                        mb: 2,
                        border: '1px solid #e0e0e0',
                        borderRadius: '8px !important',
                        '&:before': { display: 'none' }
                    }}
                >
                    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, width: '100%' }}>
                            <Chip
                                label={`Phase ${phase.phase}`}
                                color="primary"
                                size="small"
                            />
                            <Box sx={{ flex: 1 }}>
                                <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                                    {phase.name}
                                </Typography>
                                <Box sx={{ display: 'flex', gap: 1, mt: 0.5 }}>
                                    <Chip label={`${phase.story_points} SP`} size="small" variant="outlined" />
                                    <Chip label={`${phase.percentage}% of total`} size="small" variant="outlined" />
                                </Box>
                            </Box>
                        </Box>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Box sx={{ pl: 2 }}>
                            <Grid container spacing={3}>
                                <Grid item xs={12} md={6}>
                                    <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1 }}>
                                        Activities:
                                    </Typography>
                                    <List dense>
                                        {phase.activities?.map((activity: string, idx: number) => (
                                            <ListItem key={idx}>
                                                <ListItemText primary={activity} />
                                            </ListItem>
                                        ))}
                                    </List>
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1 }}>
                                        Deliverables:
                                    </Typography>
                                    <List dense>
                                        {phase.deliverables?.map((deliverable: string, idx: number) => (
                                            <ListItem key={idx}>
                                                <ListItemText primary={deliverable} />
                                            </ListItem>
                                        ))}
                                    </List>
                                </Grid>
                            </Grid>
                        </Box>
                    </AccordionDetails>
                </Accordion>
            ))}

            {/* Risks */}
            {risks.length > 0 && (
                <>
                    <Typography variant="h6" sx={{ mb: 2, mt: 4, fontWeight: 600 }}>
                        ⚠️ Risk Assessment
                    </Typography>
                    <Grid container spacing={2}>
                        {risks.map((risk: any, index: number) => (
                            <Grid item xs={12} key={index}>
                                <Paper
                                    elevation={0}
                                    sx={{
                                        p: 3,
                                        border: `1px solid ${risk.severity === 'critical' ? '#d32f2f' : risk.severity === 'high' ? '#f57c00' : '#1976d2'}`,
                                        borderRadius: 2,
                                        backgroundColor: risk.severity === 'critical' ? 'rgba(211, 47, 47, 0.05)' : risk.severity === 'high' ? 'rgba(245, 124, 0, 0.05)' : 'rgba(25, 118, 210, 0.05)'
                                    }}
                                >
                                    <Box sx={{ display: 'flex', alignItems: 'start', gap: 2 }}>
                                        <WarningIcon sx={{ color: risk.severity === 'critical' ? '#d32f2f' : risk.severity === 'high' ? '#f57c00' : '#1976d2', mt: 0.5 }} />
                                        <Box sx={{ flex: 1 }}>
                                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                                                <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                                                    {risk.title}
                                                </Typography>
                                                <Chip
                                                    label={risk.severity}
                                                    size="small"
                                                    color={getSeverityColor(risk.severity) as any}
                                                    sx={{ textTransform: 'capitalize' }}
                                                />
                                                <Chip
                                                    label={risk.category}
                                                    size="small"
                                                    variant="outlined"
                                                    sx={{ textTransform: 'capitalize' }}
                                                />
                                            </Box>
                                            <Typography variant="body2" sx={{ mb: 1 }}>
                                                {risk.description}
                                            </Typography>
                                            <Grid container spacing={2} sx={{ mt: 1 }}>
                                                <Grid item xs={12} md={6}>
                                                    <Typography variant="subtitle2" sx={{ fontWeight: 600, color: '#d32f2f' }}>
                                                        Impact: {risk.impact}
                                                    </Typography>
                                                </Grid>
                                                <Grid item xs={12} md={6}>
                                                    <Typography variant="subtitle2" sx={{ fontWeight: 600, color: '#388e3c' }}>
                                                        Mitigation: {risk.mitigation}
                                                    </Typography>
                                                </Grid>
                                            </Grid>
                                        </Box>
                                    </Box>
                                </Paper>
                            </Grid>
                        ))}
                    </Grid>
                </>
            )}

            {/* AI Insights */}
            {data?.ai_insights && (
                <Paper
                    elevation={0}
                    sx={{
                        p: 3,
                        mt: 4,
                        background: 'linear-gradient(135deg, rgba(102, 126, 234, 0.1) 0%, rgba(118, 75, 162, 0.1) 100%)',
                        border: '1px solid rgba(102, 126, 234, 0.2)',
                        borderRadius: 2
                    }}
                >
                    <Typography variant="h6" sx={{ mb: 2, fontWeight: 600, color: '#667eea' }}>
                        🤖 AI-Enhanced Insights
                    </Typography>
                    <Typography variant="body2" sx={{ mb: 2 }}>
                        <strong>Rationale:</strong> {data.ai_insights.rationale}
                    </Typography>
                    {data.ai_insights.key_challenges?.length > 0 && (
                        <Box sx={{ mb: 2 }}>
                            <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1 }}>
                                Key Challenges:
                            </Typography>
                            <List dense>
                                {data.ai_insights.key_challenges.map((challenge: string, idx: number) => (
                                    <ListItem key={idx}>
                                        <ListItemText primary={challenge} />
                                    </ListItem>
                                ))}
                            </List>
                        </Box>
                    )}
                    {data.ai_insights.recommendations?.length > 0 && (
                        <Box>
                            <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1 }}>
                                Recommendations:
                            </Typography>
                            <List dense>
                                {data.ai_insights.recommendations.map((rec: string, idx: number) => (
                                    <ListItem key={idx}>
                                        <ListItemText primary={rec} />
                                    </ListItem>
                                ))}
                            </List>
                        </Box>
                    )}
                </Paper>
            )}
        </Box>
    )
}
