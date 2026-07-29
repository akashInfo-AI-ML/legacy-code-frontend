import { useEffect, useState } from 'react'
import {
    Box,
    Typography,
    CircularProgress,
    Paper,
    Accordion,
    AccordionSummary,
    AccordionDetails,
    Chip,
    Grid,
    Card,
    CardContent,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Alert,
    Divider,
    List,
    ListItem,
    ListItemIcon,
    ListItemText
} from '@mui/material'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import {
    CheckCircle as ValidationIcon,
    Calculate as CalculationIcon,
    AccountTree as WorkflowIcon,
    Security as AuthIcon,
    Speed as ConstraintIcon,
    Warning as WarningIcon,
    TrendingUp as ExternalizeIcon,
    CheckCircleOutline as CheckIcon
} from '@mui/icons-material'
import axios from 'axios'

interface BusinessRulesPanelProps {
    projectId: string
}

const categoryIcons: Record<string, JSX.Element> = {
    validation: <ValidationIcon />,
    calculation: <CalculationIcon />,
    workflow: <WorkflowIcon />,
    authorization: <AuthIcon />,
    constraint: <ConstraintIcon />
}

const getCriticalityColor = (criticality: string) => {
    switch (criticality.toLowerCase()) {
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

const getComplexityColor = (complexity: string) => {
    switch (complexity.toLowerCase()) {
        case 'high':
            return '#d32f2f'
        case 'medium':
            return '#f57c00'
        default:
            return '#388e3c'
    }
}

export default function BusinessRulesPanel({ projectId }: BusinessRulesPanelProps) {
    const [loading, setLoading] = useState(true)
    const [data, setData] = useState<any>(null)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        const fetchBusinessRules = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/business-rules/${projectId}`)
                setData(response.data)
            } catch (err) {
                setError(err instanceof Error ? err.message : 'Failed to fetch business rules')
            } finally {
                setLoading(false)
            }
        }

        fetchBusinessRules()
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

    const summary = data?.summary || {}
    const businessRules = data?.business_rules || []
    const conflicts = data?.rule_conflicts || []
    const externalizationCandidates = data?.externalization_candidates || []

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
                Business Rules Analysis
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 4 }}>
                Extracted business rules, constraints, and logic patterns from your codebase
            </Typography>

            {/* Summary Cards */}
            <Grid container spacing={3} sx={{ mb: 4 }}>
                <Grid item xs={12} md={3}>
                    <Card elevation={0} sx={{ border: '1px solid #e0e0e0', borderRadius: 2 }}>
                        <CardContent>
                            <Typography variant="h3" sx={{ mb: 1, fontWeight: 700, color: '#667eea' }}>
                                {summary.total_rules || 0}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                Total Rules Identified
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12} md={3}>
                    <Card elevation={0} sx={{ border: '1px solid #e0e0e0', borderRadius: 2 }}>
                        <CardContent>
                            <Typography variant="h3" sx={{ mb: 1, fontWeight: 700, color: '#d32f2f' }}>
                                {summary.high_criticality_count || 0}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                High/Critical Priority
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12} md={3}>
                    <Card elevation={0} sx={{ border: '1px solid #e0e0e0', borderRadius: 2 }}>
                        <CardContent>
                            <Typography variant="h3" sx={{ mb: 1, fontWeight: 700, color: '#f57c00' }}>
                                {conflicts.length}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                Rule Conflicts
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12} md={3}>
                    <Card elevation={0} sx={{ border: '1px solid #e0e0e0', borderRadius: 2 }}>
                        <CardContent>
                            <Typography variant="h3" sx={{ mb: 1, fontWeight: 700, color: '#388e3c' }}>
                                {externalizationCandidates.length}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                Externalization Candidates
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>

            {/* Categories Distribution */}
            {summary.by_category && Object.keys(summary.by_category).length > 0 && (
                <Paper elevation={0} sx={{ p: 3, mb: 4, border: '1px solid #e0e0e0', borderRadius: 2 }}>
                    <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
                        📊 Rules by Category
                    </Typography>
                    <Grid container spacing={2}>
                        {Object.entries(summary.by_category).map(([category, count]: [string, any]) => (
                            <Grid item key={category}>
                                <Chip
                                    icon={categoryIcons[category] || <CheckIcon />}
                                    label={`${category}: ${count}`}
                                    variant="outlined"
                                    sx={{ textTransform: 'capitalize' }}
                                />
                            </Grid>
                        ))}
                    </Grid>
                </Paper>
            )}

            {/* Recommendations */}
            {summary.recommendations && summary.recommendations.length > 0 && (
                <Alert severity="info" sx={{ mb: 4 }}>
                    <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1 }}>
                        Recommendations:
                    </Typography>
                    <List dense>
                        {summary.recommendations.map((rec: string, index: number) => (
                            <ListItem key={index}>
                                <ListItemText primary={rec} />
                            </ListItem>
                        ))}
                    </List>
                </Alert>
            )}

            {/* Business Rules */}
            <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
                📋 Detailed Business Rules
            </Typography>
            {businessRules.map((rule: any) => (
                <Accordion
                    key={rule.id}
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
                            <Box sx={{ color: '#667eea' }}>
                                {categoryIcons[rule.category] || <CheckIcon />}
                            </Box>
                            <Box sx={{ flex: 1 }}>
                                <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                                    {rule.name}
                                </Typography>
                                <Box sx={{ display: 'flex', gap: 1, mt: 0.5 }}>
                                    <Chip
                                        label={rule.category}
                                        size="small"
                                        variant="outlined"
                                        sx={{ textTransform: 'capitalize' }}
                                    />
                                    <Chip
                                        label={`Criticality: ${rule.criticality}`}
                                        size="small"
                                        color={getCriticalityColor(rule.criticality) as any}
                                        sx={{ textTransform: 'capitalize' }}
                                    />
                                    <Chip
                                        label={`Complexity: ${rule.complexity}`}
                                        size="small"
                                        sx={{
                                            backgroundColor: getComplexityColor(rule.complexity),
                                            color: 'white',
                                            textTransform: 'capitalize'
                                        }}
                                    />
                                </Box>
                            </Box>
                        </Box>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Box sx={{ pl: 6 }}>
                            <Typography variant="body2" sx={{ mb: 2, lineHeight: 1.7 }}>
                                {rule.description}
                            </Typography>

                            <Divider sx={{ my: 2 }} />

                            <Grid container spacing={2}>
                                <Grid item xs={12} md={6}>
                                    <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1 }}>
                                        Implementation:
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        {rule.implementation}
                                    </Typography>
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1 }}>
                                        Source Components:
                                    </Typography>
                                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                        {rule.source_components?.map((comp: string, idx: number) => (
                                            <Chip key={idx} label={comp} size="small" variant="outlined" />
                                        ))}
                                    </Box>
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1 }}>
                                        Dependencies:
                                    </Typography>
                                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                        {rule.dependencies?.map((dep: string, idx: number) => (
                                            <Chip key={idx} label={dep} size="small" />
                                        ))}
                                    </Box>
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1 }}>
                                        Recommended Action:
                                    </Typography>
                                    <Chip
                                        label={rule.recommended_action}
                                        color={rule.recommended_action === 'Externalize' ? 'warning' : 'default'}
                                        size="small"
                                    />
                                </Grid>
                            </Grid>
                        </Box>
                    </AccordionDetails>
                </Accordion>
            ))}

            {/* Rule Conflicts */}
            {conflicts.length > 0 && (
                <>
                    <Typography variant="h6" sx={{ mb: 2, mt: 4, fontWeight: 600 }}>
                        ⚠️ Rule Conflicts
                    </Typography>
                    {conflicts.map((conflict: any, index: number) => (
                        <Paper
                            key={index}
                            elevation={0}
                            sx={{
                                p: 3,
                                mb: 2,
                                border: '1px solid #f57c00',
                                borderRadius: 2,
                                backgroundColor: 'rgba(245, 124, 0, 0.05)'
                            }}
                        >
                            <Box sx={{ display: 'flex', alignItems: 'start', gap: 2 }}>
                                <WarningIcon sx={{ color: '#f57c00', mt: 0.5 }} />
                                <Box sx={{ flex: 1 }}>
                                    <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1 }}>
                                        Conflicting Rules: {conflict.rule_ids?.join(', ')}
                                    </Typography>
                                    <Typography variant="body2" sx={{ mb: 1 }}>
                                        {conflict.description}
                                    </Typography>
                                    <Typography variant="body2" sx={{ fontWeight: 600, color: '#388e3c' }}>
                                        Resolution: {conflict.resolution}
                                    </Typography>
                                </Box>
                            </Box>
                        </Paper>
                    ))}
                </>
            )}

            {/* Externalization Candidates */}
            {externalizationCandidates.length > 0 && (
                <>
                    <Typography variant="h6" sx={{ mb: 2, mt: 4, fontWeight: 600 }}>
                        🎯 Externalization Candidates
                    </Typography>
                    <TableContainer component={Paper} elevation={0} sx={{ border: '1px solid #e0e0e0' }}>
                        <Table>
                            <TableHead>
                                <TableRow sx={{ backgroundColor: '#f5f5f5' }}>
                                    <TableCell sx={{ fontWeight: 600 }}>Rule ID</TableCell>
                                    <TableCell sx={{ fontWeight: 600 }}>Reason</TableCell>
                                    <TableCell sx={{ fontWeight: 600 }}>Suggested Approach</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {externalizationCandidates.map((candidate: any, index: number) => (
                                    <TableRow key={index} hover>
                                        <TableCell>
                                            <Chip label={candidate.rule_id} size="small" color="primary" />
                                        </TableCell>
                                        <TableCell>{candidate.reason}</TableCell>
                                        <TableCell>{candidate.approach}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </>
            )}
        </Box>
    )
}
