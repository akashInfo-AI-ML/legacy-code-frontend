import { useEffect, useState } from 'react'
import {
  Box,
  Typography,
  CircularProgress,
  Button,
  Paper,
  LinearProgress,
  Alert,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip
} from '@mui/material'
import ErrorIcon from '@mui/icons-material/Error'
import axios from 'axios'

interface HealthScorePanelProps {
  projectId: string
}

export default function HealthScorePanel({ projectId }: HealthScorePanelProps) {
  const [loading, setLoading] = useState(true)
  const [health, setHealth] = useState<any>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchHealth = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/health/${projectId}`)
        setHealth(response.data)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch health score')
      } finally {
        setLoading(false)
      }
    }

    fetchHealth()
  }, [projectId])

  const getScoreColor = (score: number) => {
    if (score >= 80) return '#4caf50'
    if (score >= 60) return '#ff9800'
    return '#f44336'
  }

  const getScoreGradient = (score: number) => {
    if (score >= 80) return 'linear-gradient(135deg, #4caf50 0%, #8bc34a 100%)'
    if (score >= 60) return 'linear-gradient(135deg, #ff9800 0%, #ff5722 100%)'
    return 'linear-gradient(135deg, #f44336 0%, #e91e63 100%)'
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
        Codebase Health Score
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 4 }}>
        Comprehensive health metrics and quality assessment
      </Typography>

      <Paper
        elevation={0}
        sx={{
          p: 4,
          mb: 4,
          textAlign: 'center',
          background: getScoreGradient(health?.overall_score),
          borderRadius: 4,
          color: 'white',
          boxShadow: '0 8px 30px rgba(0, 0, 0, 0.15)'
        }}
      >
        <Typography variant="h1" sx={{ fontWeight: 700, mb: 1 }}>
          {health?.overall_score?.toFixed(1)}
        </Typography>
        <Typography variant="h5" sx={{ opacity: 0.9, fontWeight: 500 }}>Overall Health Score</Typography>
        <Typography variant="body2" sx={{ mt: 1, opacity: 0.8 }}>
          {health?.overall_score >= 80 ? '🎉 Excellent' : health?.overall_score >= 60 ? '⚠️ Needs Attention' : '🚨 Critical'}
        </Typography>
      </Paper>

      <Box sx={{ mb: 4 }}>
        <Box sx={{ mb: 3 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
            <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>🏛️ Architecture Quality</Typography>
            <Typography variant="subtitle1" sx={{ fontWeight: 700, color: getScoreColor(health?.architecture_score) }}>
              {health?.architecture_score?.toFixed(1)}
            </Typography>
          </Box>
          <LinearProgress
            variant="determinate"
            value={health?.architecture_score}
            sx={{
              height: 12,
              borderRadius: 6,
              backgroundColor: 'rgba(0, 0, 0, 0.05)',
              '& .MuiLinearProgress-bar': {
                background: getScoreGradient(health?.architecture_score),
                borderRadius: 6
              }
            }}
          />
        </Box>

        <Box sx={{ mb: 3 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
            <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>🔧 Complexity Management</Typography>
            <Typography variant="subtitle1" sx={{ fontWeight: 700, color: getScoreColor(health?.complexity_score) }}>
              {health?.complexity_score?.toFixed(1)}
            </Typography>
          </Box>
          <LinearProgress
            variant="determinate"
            value={health?.complexity_score}
            sx={{
              height: 12,
              borderRadius: 6,
              backgroundColor: 'rgba(0, 0, 0, 0.05)',
              '& .MuiLinearProgress-bar': {
                background: getScoreGradient(health?.complexity_score),
                borderRadius: 6
              }
            }}
          />
        </Box>

        <Box sx={{ mb: 3 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
            <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>🔨 Maintainability</Typography>
            <Typography variant="subtitle1" sx={{ fontWeight: 700, color: getScoreColor(health?.maintainability_score) }}>
              {health?.maintainability_score?.toFixed(1)}
            </Typography>
          </Box>
          <LinearProgress
            variant="determinate"
            value={health?.maintainability_score}
            sx={{
              height: 12,
              borderRadius: 6,
              backgroundColor: 'rgba(0, 0, 0, 0.05)',
              '& .MuiLinearProgress-bar': {
                background: getScoreGradient(health?.maintainability_score),
                borderRadius: 6
              }
            }}
          />
        </Box>
      </Box>

      {health?.issues?.length > 0 && (
        <>
          <Typography variant="h6" sx={{ mt: 3, mb: 2, fontWeight: 600 }}>⚠️ Issues Found</Typography>
          {health?.issues?.map((issue: any, idx: number) => (
            <Alert
              key={idx}
              severity={issue.severity === 'high' ? 'error' : 'warning'}
              icon={<ErrorIcon />}
              elevation={0}
              sx={{
                mb: 2,
                borderRadius: 2,
                border: '1px solid',
                borderColor: issue.severity === 'high' ? 'error.light' : 'warning.light'
              }}
            >
              <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>{issue.title}</Typography>
              <Typography variant="body2" sx={{ mt: 0.5 }}>{issue.description}</Typography>
            </Alert>
          ))}
        </>
      )}
    </Box>
  )
}
