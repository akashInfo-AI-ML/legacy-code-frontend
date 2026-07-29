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
    Accordion,
    AccordionSummary,
    AccordionDetails,
    Alert,
    List,
    ListItem,
    ListItemText,
    Divider,
    Stepper,
    Step,
    StepLabel,
    StepContent,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow
} from '@mui/material'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import {
    CheckCircle as CheckIcon,
    TrendingUp as TrendingUpIcon,
    Code as CodeIcon,
    Storage as DatabaseIcon,
    Architecture as ArchIcon,
    Security as SecurityIcon,
    CloudUpload as CloudIcon,
    Visibility as ObservabilityIcon,
    CompareArrows as ParallelIcon,
    Undo as RollbackIcon,
    EmojiEvents as MetricsIcon,
    Timeline as TimelineIcon
} from '@mui/icons-material'
import axios from 'axios'

interface MigrationRoadmapPanelProps {
    projectId: string
}

const categoryIcons: Record<string, JSX.Element> = {
    preparation: <CodeIcon />,
    analysis: <ArchIcon />,
    foundation: <DatabaseIcon />,
    database: <DatabaseIcon />,
    architecture: <ArchIcon />,
    api: <CloudIcon />,
    business_logic: <CodeIcon />,
    performance: <TrendingUpIcon />,
    security: <SecurityIcon />,
    observability: <ObservabilityIcon />,
    deployment: <CloudIcon />
}

const getPriorityColor = (priority: string) => {
    switch (priority?.toLowerCase()) {
        case 'critical':
            return 'error'
        case 'high':
            return 'warning'
        case 'medium':
            return 'info'
        default:
            return 'default'
    }
}

export default function MigrationRoadmapPanel({ projectId }: MigrationRoadmapPanelProps) {
    const [loading, setLoading] = useState(true)
    const [data, setData] = useState<any>(null)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        const fetchRoadmap = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/migration-roadmap/${projectId}`)
                setData(response.data)
            } catch (err) {
                setError(err instanceof Error ? err.message : 'Failed to fetch migration roadmap')
            } finally {
                setLoading(false)
            }
        }

        fetchRoadmap()
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

    const strategy = data?.strategy || {}
    const modernizationSteps = data?.modernization_steps || []
    const techStack = data?.technology_stack || {}
    const parallelStrategy = data?.parallel_run_strategy || {}
    const rollbackPlan = data?.rollback_plan || {}
    const successMetrics = data?.success_metrics || {}
    const timeline = data?.timeline || {}

    const recommendedStrategy = strategy.details || {}

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
                Migration Roadmap
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 4 }}>
                Strategic plan for modernizing your legacy application
            </Typography>

            {/* Timeline Overview */}
            <Grid container spacing={3} sx={{ mb: 4 }}>
                <Grid item xs={12} md={3}>
                    <Card elevation={0} sx={{ border: '1px solid #e0e0e0', borderRadius: 2 }}>
                        <CardContent>
                            <TimelineIcon sx={{ fontSize: 40, color: '#667eea', mb: 1 }} />
                            <Typography variant="h4" sx={{ fontWeight: 700, color: '#667eea', mb: 1 }}>
                                {timeline.total_duration_months}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                Months Duration
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12} md={3}>
                    <Card elevation={0} sx={{ border: '1px solid #e0e0e0', borderRadius: 2 }}>
                        <CardContent>
                            <TrendingUpIcon sx={{ fontSize: 40, color: '#667eea', mb: 1 }} />
                            <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>
                                {strategy.recommended_approach?.replace(/_/g, ' ').replace(/\b\w/g, (l: string) => l.toUpperCase())}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                Recommended Strategy
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12} md={3}>
                    <Card elevation={0} sx={{ border: '1px solid #e0e0e0', borderRadius: 2 }}>
                        <CardContent>
                            <CodeIcon sx={{ fontSize: 40, color: '#667eea', mb: 1 }} />
                            <Typography variant="h4" sx={{ fontWeight: 700, color: '#667eea', mb: 1 }}>
                                {modernizationSteps.length}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                Modernization Steps
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12} md={3}>
                    <Card elevation={0} sx={{ border: '1px solid #e0e0e0', borderRadius: 2 }}>
                        <CardContent>
                            <CheckIcon sx={{ fontSize: 40, color: '#388e3c', mb: 1 }} />
                            <Typography variant="h4" sx={{ fontWeight: 700, color: '#388e3c', mb: 1 }}>
                                {timeline.phases?.length || 5}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                Delivery Phases
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>

            {/* Migration Strategy */}
            <Paper
                elevation={0}
                sx={{
                    p: 3,
                    mb: 4,
                    background: 'linear-gradient(135deg, rgba(102, 126, 234, 0.1) 0%, rgba(118, 75, 162, 0.1) 100%)',
                    border: '1px solid rgba(102, 126, 234, 0.2)',
                    borderRadius: 2
                }}
            >
                <Typography variant="h6" sx={{ mb: 2, fontWeight: 600, color: '#667eea' }}>
                    🎯 {recommendedStrategy.name}
                </Typography>
                <Typography variant="body1" sx={{ mb: 2 }}>
                    {recommendedStrategy.description}
                </Typography>
                <Alert severity="info" sx={{ mb: 2 }}>
                    <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                        Why this approach?
                    </Typography>
                    <Typography variant="body2">{recommendedStrategy.rationale}</Typography>
                </Alert>
                <Grid container spacing={2}>
                    <Grid item xs={12} md={6}>
                        <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1 }}>
                            ✅ Advantages:
                        </Typography>
                        <List dense>
                            {recommendedStrategy.advantages?.map((adv: string, idx: number) => (
                                <ListItem key={idx}>
                                    <ListItemText primary={adv} />
                                </ListItem>
                            ))}
                        </List>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1 }}>
                            ⚠️ Challenges:
                        </Typography>
                        <List dense>
                            {recommendedStrategy.challenges?.map((challenge: string, idx: number) => (
                                <ListItem key={idx}>
                                    <ListItemText primary={challenge} />
                                </ListItem>
                            ))}
                        </List>
                    </Grid>
                </Grid>
            </Paper>

            {/* Modernization Steps */}
            <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
                🚀 Modernization Steps
            </Typography>
            <Stepper orientation="vertical" sx={{ mb: 4 }}>
                {modernizationSteps.map((step: any, index: number) => (
                    <Step key={index} active>
                        <StepLabel
                            icon={
                                <Box
                                    sx={{
                                        width: 40,
                                        height: 40,
                                        borderRadius: '50%',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        backgroundColor: '#667eea',
                                        color: 'white'
                                    }}
                                >
                                    {categoryIcons[step.category] || <CodeIcon />}
                                </Box>
                            }
                        >
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                                    {step.title}
                                </Typography>
                                <Chip
                                    label={step.priority}
                                    size="small"
                                    color={getPriorityColor(step.priority) as any}
                                    sx={{ textTransform: 'capitalize' }}
                                />
                                <Chip
                                    label={step.estimated_duration}
                                    size="small"
                                    variant="outlined"
                                />
                            </Box>
                        </StepLabel>
                        <StepContent>
                            <Typography variant="body2" sx={{ mb: 2 }}>
                                {step.description}
                            </Typography>
                            <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1 }}>
                                Tasks:
                            </Typography>
                            <List dense>
                                {step.tasks?.map((task: string, idx: number) => (
                                    <ListItem key={idx}>
                                        <ListItemText primary={task} />
                                    </ListItem>
                                ))}
                            </List>
                            {step.dependencies?.length > 0 && (
                                <Alert severity="info" sx={{ mt: 2 }}>
                                    <Typography variant="body2">
                                        <strong>Dependencies:</strong> Requires completion of step(s) {step.dependencies.join(', ')}
                                    </Typography>
                                </Alert>
                            )}
                        </StepContent>
                    </Step>
                ))}
            </Stepper>

            {/* Technology Stack Recommendations */}
            <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
                🛠️ Technology Stack Recommendations
            </Typography>
            {Object.entries(techStack).map(([category, techs]: [string, any]) => (
                <Accordion
                    key={category}
                    elevation={0}
                    sx={{
                        mb: 2,
                        border: '1px solid #e0e0e0',
                        borderRadius: '8px !important',
                        '&:before': { display: 'none' }
                    }}
                >
                    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                        <Typography variant="subtitle1" sx={{ fontWeight: 600, textTransform: 'capitalize' }}>
                            {category.replace(/_/g, ' ')}
                        </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Grid container spacing={3}>
                            {Object.entries(techs).map(([key, value]: [string, any]) => (
                                <Grid item xs={12} md={6} key={key}>
                                    <Paper elevation={0} sx={{ p: 2, border: '1px solid #e0e0e0', borderRadius: 2 }}>
                                        <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1, textTransform: 'capitalize' }}>
                                            {key.replace(/_/g, ' ')}
                                        </Typography>
                                        <Chip
                                            label={value.recommended}
                                            color="primary"
                                            size="small"
                                            sx={{ mb: 1 }}
                                        />
                                        <Typography variant="body2" sx={{ mb: 1, fontSize: '0.85rem' }}>
                                            {value.rationale}
                                        </Typography>
                                        {value.alternatives?.length > 0 && (
                                            <Box>
                                                <Typography variant="caption" color="text.secondary">
                                                    Alternatives: {value.alternatives.join(', ')}
                                                </Typography>
                                            </Box>
                                        )}
                                    </Paper>
                                </Grid>
                            ))}
                        </Grid>
                    </AccordionDetails>
                </Accordion>
            ))}

            {/* Parallel Run Strategy */}
            <Paper elevation={0} sx={{ p: 3, mb: 4, mt: 4, border: '1px solid #e0e0e0', borderRadius: 2 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                    <ParallelIcon sx={{ fontSize: 32, color: '#667eea' }} />
                    <Typography variant="h6" sx={{ fontWeight: 600 }}>
                        {parallelStrategy.approach}
                    </Typography>
                </Box>
                <Typography variant="body2" sx={{ mb: 3 }}>
                    {parallelStrategy.description}
                </Typography>
                <Stepper orientation="vertical">
                    {parallelStrategy.phases?.map((phase: any, index: number) => (
                        <Step key={index} active>
                            <StepLabel>
                                <Box>
                                    <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                                        {phase.name}
                                    </Typography>
                                    <Chip label={phase.duration} size="small" variant="outlined" sx={{ mt: 0.5 }} />
                                </Box>
                            </StepLabel>
                            <StepContent>
                                <Typography variant="body2" sx={{ mb: 2 }}>
                                    {phase.description}
                                </Typography>
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
                                <Alert severity="success" sx={{ mt: 2 }}>
                                    <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 0.5 }}>
                                        Success Criteria:
                                    </Typography>
                                    <List dense>
                                        {phase.success_criteria?.map((criteria: string, idx: number) => (
                                            <ListItem key={idx}>
                                                <ListItemText primary={criteria} />
                                            </ListItem>
                                        ))}
                                    </List>
                                </Alert>
                            </StepContent>
                        </Step>
                    ))}
                </Stepper>
            </Paper>

            {/* Rollback Plan */}
            <Paper elevation={0} sx={{ p: 3, mb: 4, border: '1px solid #f57c00', borderRadius: 2, backgroundColor: 'rgba(245, 124, 0, 0.05)' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                    <RollbackIcon sx={{ fontSize: 32, color: '#f57c00' }} />
                    <Typography variant="h6" sx={{ fontWeight: 600 }}>
                        Rollback Plan: {rollbackPlan.strategy}
                    </Typography>
                </Box>
                <Grid container spacing={2}>
                    {rollbackPlan.levels?.map((level: any, index: number) => (
                        <Grid item xs={12} key={index}>
                            <Paper elevation={0} sx={{ p: 2, border: '1px solid #e0e0e0', borderRadius: 2, backgroundColor: 'white' }}>
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                                    <Chip label={`Level ${level.level}`} size="small" color="warning" />
                                    <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                                        {level.name}
                                    </Typography>
                                    <Chip label={level.time_to_rollback} size="small" variant="outlined" />
                                </Box>
                                <Typography variant="body2" sx={{ mb: 1 }}>
                                    <strong>Trigger:</strong> {level.trigger}
                                </Typography>
                                <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 0.5 }}>
                                    Procedure:
                                </Typography>
                                <List dense>
                                    {level.procedure?.map((step: string, idx: number) => (
                                        <ListItem key={idx}>
                                            <ListItemText primary={step} />
                                        </ListItem>
                                    ))}
                                </List>
                            </Paper>
                        </Grid>
                    ))}
                </Grid>
            </Paper>

            {/* Success Metrics */}
            <Paper elevation={0} sx={{ p: 3, mb: 4, border: '1px solid #388e3c', borderRadius: 2, backgroundColor: 'rgba(56, 142, 60, 0.05)' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
                    <MetricsIcon sx={{ fontSize: 32, color: '#388e3c' }} />
                    <Typography variant="h6" sx={{ fontWeight: 600 }}>
                        Success Metrics
                    </Typography>
                </Box>
                {Object.entries(successMetrics).map(([category, metrics]: [string, any]) => (
                    <Box key={category} sx={{ mb: 3 }}>
                        <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 2, textTransform: 'capitalize' }}>
                            {category.replace(/_/g, ' ')}
                        </Typography>
                        <TableContainer>
                            <Table size="small">
                                <TableHead>
                                    <TableRow sx={{ backgroundColor: '#f5f5f5' }}>
                                        <TableCell sx={{ fontWeight: 600 }}>Metric</TableCell>
                                        <TableCell sx={{ fontWeight: 600 }}>Target</TableCell>
                                        <TableCell sx={{ fontWeight: 600 }}>Measurement</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {metrics.map((metric: any, idx: number) => (
                                        <TableRow key={idx} hover>
                                            <TableCell>{metric.metric}</TableCell>
                                            <TableCell>
                                                <Chip label={metric.target} size="small" color="success" />
                                            </TableCell>
                                            <TableCell>{metric.measurement}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Box>
                ))}
            </Paper>

            {/* Timeline Milestones */}
            <Paper elevation={0} sx={{ p: 3, border: '1px solid #e0e0e0', borderRadius: 2 }}>
                <Typography variant="h6" sx={{ mb: 3, fontWeight: 600 }}>
                    📅 Key Milestones
                </Typography>
                <Grid container spacing={2}>
                    {timeline.milestones?.map((milestone: any, index: number) => (
                        <Grid item xs={12} md={6} key={index}>
                            <Card elevation={0} sx={{ border: '1px solid #e0e0e0', borderRadius: 2 }}>
                                <CardContent>
                                    <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 1 }}>
                                        {milestone.name}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        Target: {new Date(milestone.target_date).toLocaleDateString()}
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </Paper>
        </Box>
    )
}
