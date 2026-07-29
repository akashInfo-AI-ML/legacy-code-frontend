import { useEffect, useState } from 'react'
import {
  Box,
  Typography,
  CircularProgress,
  Button,
  Paper,
  Chip
} from '@mui/material'
import {
  Timeline,
  TimelineItem,
  TimelineSeparator,
  TimelineConnector,
  TimelineContent,
  TimelineDot,
  TimelineOppositeContent
} from '@mui/lab'
import TrendingUpIcon from '@mui/icons-material/TrendingUp'
import axios from 'axios'

interface RecommendationsPanelProps {
  projectId: string
}

export default function RecommendationsPanel({ projectId }: RecommendationsPanelProps) {
  const [loading, setLoading] = useState(true)
  const [recommendations, setRecommendations] = useState<any>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchRecommendations = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/recommendations/${projectId}`)
        setRecommendations(response.data)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch recommendations')
      } finally {
        setLoading(false)
      }
    }

    fetchRecommendations()
  }, [projectId])

  const getEffortColor = (effort: string) => {
    switch (effort.toLowerCase()) {
      case 'low':
        return 'success'
      case 'medium':
        return 'warning'
      default:
        return 'error'
    }
  }

  const getImpactColor = (impact: string) => {
    switch (impact.toLowerCase()) {
      case 'high':
      case 'very_high':
        return '#d32f2f'
      case 'medium':
        return '#f57c00'
      default:
        return '#388e3c'
    }
  }

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: 400 }}>
        <CircularProgress />
      </Box>
    )
  }

  if (error) {
    return <Typography color="error">{error}</Typography>
  }

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
        Modernization Roadmap
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 4 }}>
        Strategic recommendations for modernizing your legacy application
      </Typography>

      <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>⚡ Quick Wins</Typography>
      {recommendations?.quick_wins?.map((item: any) => (
        <Paper
          key={item.id}
          elevation={0}
          sx={{
            p: 3,
            mb: 2,
            borderRadius: 3,
            background: 'linear-gradient(135deg, rgba(76, 175, 80, 0.05) 0%, rgba(139, 195, 74, 0.05) 100%)',
            border: '1px solid rgba(76, 175, 80, 0.2)',
            transition: 'all 0.3s ease',
            '&:hover': {
              transform: 'translateY(-2px)',
              boxShadow: '0 8px 25px rgba(76, 175, 80, 0.15)'
            }
          }}
        >
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', mb: 2 }}>
            <Typography variant="h6" sx={{ fontWeight: 600 }}>{item.title}</Typography>
            <Box sx={{ display: 'flex', gap: 1 }}>
              <Chip
                label={item.effort}
                size="small"
                sx={{
                  background: item.effort.toLowerCase() === 'low'
                    ? 'linear-gradient(135deg, #4caf50 0%, #8bc34a 100%)'
                    : item.effort.toLowerCase() === 'medium'
                      ? 'linear-gradient(135deg, #ff9800 0%, #ff5722 100%)'
                      : 'linear-gradient(135deg, #f44336 0%, #e91e63 100%)',
                  color: 'white',
                  fontWeight: 600
                }}
              />
              <Chip
                label={item.impact}
                size="small"
                sx={{
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  color: 'white',
                  fontWeight: 600
                }}
              />
            </Box>
          </Box>
          <Typography variant="body1" sx={{ lineHeight: 1.7 }}>{item.description}</Typography>
        </Paper>
      ))}

      <Typography variant="h6" sx={{ mt: 4, mb: 2, fontWeight: 600 }}>🔧 Major Refactoring</Typography>
      {recommendations?.refactoring?.map((item: any) => (
        <Paper
          key={item.id}
          elevation={0}
          sx={{
            p: 3,
            mb: 2,
            borderRadius: 3,
            background: 'linear-gradient(135deg, rgba(102, 126, 234, 0.05) 0%, rgba(118, 75, 162, 0.05) 100%)',
            border: '1px solid rgba(102, 126, 234, 0.2)',
            transition: 'all 0.3s ease',
            '&:hover': {
              transform: 'translateY(-2px)',
              boxShadow: '0 8px 25px rgba(102, 126, 234, 0.15)'
            }
          }}
        >
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', mb: 2 }}>
            <Typography variant="h6" sx={{ fontWeight: 600 }}>{item.title}</Typography>
            <Box sx={{ display: 'flex', gap: 1 }}>
              <Chip
                label={item.effort}
                size="small"
                sx={{
                  background: item.effort.toLowerCase() === 'low'
                    ? 'linear-gradient(135deg, #4caf50 0%, #8bc34a 100%)'
                    : item.effort.toLowerCase() === 'medium'
                      ? 'linear-gradient(135deg, #ff9800 0%, #ff5722 100%)'
                      : 'linear-gradient(135deg, #f44336 0%, #e91e63 100%)',
                  color: 'white',
                  fontWeight: 600
                }}
              />
              <Chip
                label={item.impact}
                size="small"
                sx={{
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  color: 'white',
                  fontWeight: 600
                }}
              />
            </Box>
          </Box>
          <Typography variant="body1" sx={{ lineHeight: 1.7 }}>{item.description}</Typography>
        </Paper>
      ))}

      <Typography variant="h6" sx={{ mt: 4, mb: 3, fontWeight: 600 }}>📅 Modernization Timeline</Typography>
      <Timeline position="alternate">
        {recommendations?.modernization_path?.map((phase: any) => (
          <TimelineItem key={phase.phase}>
            <TimelineOppositeContent
              color="textSecondary"
              sx={{ fontWeight: 600 }}
            >
              {phase.duration}
            </TimelineOppositeContent>
            <TimelineSeparator>
              <TimelineDot
                sx={{
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  boxShadow: '0 4px 15px rgba(102, 126, 234, 0.4)'
                }}
              >
                <TrendingUpIcon />
              </TimelineDot>
              {phase.phase < (recommendations?.modernization_path?.length || 0) && (
                <TimelineConnector sx={{ background: 'linear-gradient(180deg, #667eea 0%, #764ba2 100%)' }} />
              )}
            </TimelineSeparator>
            <TimelineContent>
              <Paper
                elevation={0}
                sx={{
                  p: 3,
                  borderRadius: 3,
                  background: 'rgba(255, 255, 255, 0.9)',
                  border: '1px solid rgba(102, 126, 234, 0.2)',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    boxShadow: '0 8px 25px rgba(102, 126, 234, 0.15)',
                    transform: 'scale(1.02)'
                  }
                }}
              >
                <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
                  {`Phase ${phase.phase}: ${phase.title}`}
                </Typography>
                <Box sx={{ mt: 2, display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                  {phase.items?.map((item: string) => (
                    <Chip
                      key={item}
                      label={item}
                      size="small"
                      sx={{
                        background: 'rgba(102, 126, 234, 0.1)',
                        color: '#667eea',
                        fontWeight: 500
                      }}
                    />
                  ))}
                </Box>
              </Paper>
            </TimelineContent>
          </TimelineItem>
        ))}
      </Timeline>

      <Paper sx={{ p: 3, mt: 4, backgroundColor: '#e8f5e9' }}>
        <Typography variant="h6" sx={{ mb: 1 }}>Next Steps</Typography>
        <Box component="ol" sx={{ pl: 2 }}>
          <Typography component="li" variant="body2">Review all recommendations with your architecture team</Typography>
          <Typography component="li" variant="body2">Prioritize quick wins for immediate implementation</Typography>
          <Typography component="li" variant="body2">Plan major refactoring in phases</Typography>
          <Typography component="li" variant="body2">Schedule regular health score reviews</Typography>
          <Typography component="li" variant="body2">Set up CI/CD for continuous monitoring</Typography>
        </Box>
      </Paper>

      <Button
        variant="contained"
        size="large"
        fullWidth
        sx={{ mt: 3 }}
        onClick={() => window.location.reload()}
      >
        Analyze Another Project
      </Button>
    </Box>
  )
}