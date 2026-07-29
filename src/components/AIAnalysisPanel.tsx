import { useEffect, useState } from 'react'
import {
  Box,
  Typography,
  CircularProgress,
  Button,
  Paper,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip
} from '@mui/material'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import axios from 'axios'

interface AIAnalysisPanelProps {
  projectId: string
}

export default function AIAnalysisPanel({ projectId }: AIAnalysisPanelProps) {
  const [loading, setLoading] = useState(true)
  const [analysis, setAnalysis] = useState<any>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchAnalysis = async () => {
      try {
        const response = await axios.post('http://localhost:8000/ai/analyze', {
          project_id: projectId,
          context: 'Legacy .NET application analysis'
        })
        setAnalysis(response.data)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch analysis')
      } finally {
        setLoading(false)
      }
    }

    fetchAnalysis()
  }, [projectId])

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
        AI Analysis & Insights
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 4 }}>
        AI-powered business capability extraction and architectural insights
      </Typography>

      <Paper
        elevation={0}
        sx={{
          p: 3,
          mb: 4,
          background: 'linear-gradient(135deg, rgba(102, 126, 234, 0.1) 0%, rgba(118, 75, 162, 0.1) 100%)',
          border: '1px solid rgba(102, 126, 234, 0.2)',
          borderRadius: 3
        }}
      >
        <Typography variant="h6" sx={{ mb: 2, fontWeight: 600, color: '#667eea' }}>📋 Executive Summary</Typography>
        <Typography variant="body1" sx={{ lineHeight: 1.8 }}>{analysis?.summary}</Typography>
      </Paper>

      <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>🎯 Business Capabilities</Typography>
      {analysis?.business_capabilities?.map((cap: any) => (
        <Accordion
          key={cap.id}
          elevation={0}
          sx={{
            mb: 2,
            borderRadius: 2,
            border: '1px solid rgba(0, 0, 0, 0.08)',
            '&:before': { display: 'none' },
            '&:hover': {
              boxShadow: '0 4px 15px rgba(102, 126, 234, 0.1)'
            }
          }}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            sx={{
              '&:hover': { background: 'rgba(102, 126, 234, 0.02)' }
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', width: '100%', gap: 2 }}>
              <Typography variant="body1" sx={{ fontWeight: 600, flexGrow: 1 }}>{cap.name}</Typography>
              <Chip
                label={cap.criticality}
                size="small"
                sx={{
                  background: cap.criticality === 'critical'
                    ? 'linear-gradient(135deg, #f44336 0%, #e91e63 100%)'
                    : cap.criticality === 'high'
                      ? 'linear-gradient(135deg, #ff9800 0%, #ff5722 100%)'
                      : 'linear-gradient(135deg, #4caf50 0%, #8bc34a 100%)',
                  color: 'white',
                  fontWeight: 600
                }}
              />
              <Chip
                label={cap.complexity}
                size="small"
                variant="outlined"
                sx={{ fontWeight: 500 }}
              />
            </Box>
          </AccordionSummary>
          <AccordionDetails sx={{ background: 'rgba(102, 126, 234, 0.02)' }}>
            <Typography variant="body2" sx={{ mb: 2, lineHeight: 1.7 }}>{cap.description}</Typography>
            <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1 }}>Related Modules:</Typography>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
              {cap.modules.map((mod: string) => (
                <Chip
                  key={mod}
                  label={mod}
                  size="small"
                  sx={{
                    background: 'rgba(102, 126, 234, 0.1)',
                    color: '#667eea',
                    fontWeight: 500
                  }}
                />
              ))}
            </Box>
          </AccordionDetails>
        </Accordion>
      ))}

      <Typography variant="h6" sx={{ mt: 4, mb: 2, fontWeight: 600 }}>🏗️ Architecture Patterns</Typography>
      <TableContainer
        component={Paper}
        elevation={0}
        sx={{
          mb: 3,
          border: '1px solid rgba(0, 0, 0, 0.08)',
          borderRadius: 2
        }}
      >
        <Table size="small">
          <TableHead>
            <TableRow sx={{ background: 'linear-gradient(135deg, rgba(102, 126, 234, 0.05) 0%, rgba(118, 75, 162, 0.05) 100%)' }}>
              <TableCell sx={{ fontWeight: 600 }}>Pattern</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {analysis?.patterns_detected?.map((pattern: string) => (
              <TableRow key={pattern} sx={{ '&:hover': { background: 'rgba(102, 126, 234, 0.02)' } }}>
                <TableCell sx={{ fontWeight: 500 }}>{pattern}</TableCell>
                <TableCell>
                  <Chip
                    label="Detected"
                    size="small"
                    sx={{
                      background: 'linear-gradient(135deg, #4caf50 0%, #8bc34a 100%)',
                      color: 'white',
                      fontWeight: 600
                    }}
                  />
                </TableCell>
              </TableRow>
            ))}
            {analysis?.anti_patterns?.map((pattern: string) => (
              <TableRow key={pattern} sx={{ '&:hover': { background: 'rgba(244, 67, 54, 0.02)' } }}>
                <TableCell sx={{ fontWeight: 500 }}>{pattern}</TableCell>
                <TableCell>
                  <Chip
                    label="Anti-pattern"
                    size="small"
                    sx={{
                      background: 'linear-gradient(135deg, #f44336 0%, #e91e63 100%)',
                      color: 'white',
                      fontWeight: 600
                    }}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  )
}
