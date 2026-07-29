import { useEffect, useState } from 'react'
import {
  Box,
  Typography,
  CircularProgress,
  Button,
  Paper,
  TextField,
  FormControlLabel,
  Checkbox,
  FormGroup,
  Chip,
  List,
  ListItem,
  ListItemIcon,
  ListItemText
} from '@mui/material'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import WarningIcon from '@mui/icons-material/Warning'
import axios from 'axios'

interface ImpactAnalysisPanelProps {
  projectId: string
}

export default function ImpactAnalysisPanel({ projectId }: ImpactAnalysisPanelProps) {
  const [loading, setLoading] = useState(false)
  const [impact, setImpact] = useState<any>(null)
  const [changeScope, setChangeScope] = useState('refactoring')
  const [selectedModules, setSelectedModules] = useState<string[]>(['UserService', 'UserController'])

  const modules = ['UserController', 'UserService', 'User', 'Database', 'API Gateway']

  const handleModuleToggle = (module: string) => {
    setSelectedModules(prev =>
      prev.includes(module)
        ? prev.filter(m => m !== module)
        : [...prev, module]
    )
  }

  const handleAnalyze = async () => {
    setLoading(true)
    try {
      const response = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/impact`, {
        project_id: projectId,
        change_scope: changeScope,
        affected_modules: selectedModules
      })
      setImpact(response.data)
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
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
        Impact Analysis
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 4 }}>
        Simulate the impact of changes on your application architecture
      </Typography>

      <Paper
        elevation={0}
        sx={{
          p: 3,
          mb: 3,
          borderRadius: 3,
          background: 'rgba(255, 255, 255, 0.7)',
          border: '1px solid rgba(0, 0, 0, 0.08)'
        }}
      >
        <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>🎯 Define Change Scope</Typography>
        <TextField
          select
          fullWidth
          value={changeScope}
          onChange={(e) => setChangeScope(e.target.value)}
          SelectProps={{ native: true }}
          sx={{
            mb: 3,
            '& .MuiOutlinedInput-root': {
              borderRadius: 2
            }
          }}
        >
          <option value="bug-fix">Bug Fix</option>
          <option value="feature">Feature Addition</option>
          <option value="refactoring">Refactoring</option>
          <option value="migration">Migration</option>
        </TextField>

        <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>📦 Affected Modules</Typography>
        <FormGroup sx={{ mb: 3, pl: 1 }}>
          {modules.map(module => (
            <FormControlLabel
              key={module}
              control={
                <Checkbox
                  checked={selectedModules.includes(module)}
                  onChange={() => handleModuleToggle(module)}
                  sx={{
                    '&.Mui-checked': {
                      color: '#667eea'
                    }
                  }}
                />
              }
              label={<Typography sx={{ fontWeight: 500 }}>{module}</Typography>}
            />
          ))}
        </FormGroup>

        <Button
          variant="contained"
          onClick={handleAnalyze}
          disabled={loading || selectedModules.length === 0}
          fullWidth
          size="large"
          sx={{
            py: 1.5,
            fontWeight: 600,
            borderRadius: 2,
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            '&:hover': {
              background: 'linear-gradient(135deg, #5568d3 0%, #6b3f8e 100%)'
            }
          }}
        >
          {loading ? <CircularProgress size={24} /> : 'Analyze Impact'}
        </Button>
      </Paper>

      {impact && (
        <>
          <Paper
            elevation={0}
            sx={{
              p: 3,
              mb: 3,
              borderRadius: 3,
              background: 'rgba(255, 255, 255, 0.7)',
              border: '1px solid rgba(0, 0, 0, 0.08)'
            }}
          >
            <Typography variant="h6" sx={{ mb: 3, fontWeight: 600 }}>📈 Impact Summary</Typography>
            <Box sx={{ display: 'flex', gap: 3, mb: 4, justifyContent: 'center' }}>
              <Paper
                elevation={0}
                sx={{
                  p: 3,
                  textAlign: 'center',
                  flex: 1,
                  background: impact?.risk_level === 'high'
                    ? 'linear-gradient(135deg, rgba(244, 67, 54, 0.1) 0%, rgba(233, 30, 99, 0.1) 100%)'
                    : impact?.risk_level === 'medium'
                      ? 'linear-gradient(135deg, rgba(255, 152, 0, 0.1) 0%, rgba(255, 193, 7, 0.1) 100%)'
                      : 'linear-gradient(135deg, rgba(76, 175, 80, 0.1) 0%, rgba(139, 195, 74, 0.1) 100%)',
                  border: '1px solid',
                  borderColor: impact?.risk_level === 'high' ? 'rgba(244, 67, 54, 0.3)' : impact?.risk_level === 'medium' ? 'rgba(255, 152, 0, 0.3)' : 'rgba(76, 175, 80, 0.3)',
                  borderRadius: 2
                }}
              >
                <Typography variant="h4" sx={{ fontWeight: 700, mb: 1, textTransform: 'uppercase' }}>
                  {impact?.risk_level}
                </Typography>
                <Typography variant="body2" color="textSecondary" sx={{ fontWeight: 500 }}>Risk Level</Typography>
              </Paper>
              <Paper
                elevation={0}
                sx={{
                  p: 3,
                  textAlign: 'center',
                  flex: 1,
                  background: 'linear-gradient(135deg, rgba(102, 126, 234, 0.1) 0%, rgba(118, 75, 162, 0.1) 100%)',
                  border: '1px solid rgba(102, 126, 234, 0.3)',
                  borderRadius: 2
                }}
              >
                <Typography variant="h4" sx={{ fontWeight: 700, mb: 1, textTransform: 'uppercase' }}>
                  {impact?.estimated_effort}
                </Typography>
                <Typography variant="body2" color="textSecondary" sx={{ fontWeight: 500 }}>Estimated Effort</Typography>
              </Paper>
            </Box>

            <Typography variant="subtitle1" sx={{ mb: 1, fontWeight: 600 }}>🧪 Testing Scope:</Typography>
            <Typography variant="body1" sx={{ mb: 3, p: 2, background: 'rgba(102, 126, 234, 0.05)', borderRadius: 2 }}>
              {impact?.testing_scope}
            </Typography>

            <Typography variant="subtitle1" sx={{ mb: 2, fontWeight: 600 }}>📦 Affected Services:</Typography>
            <Box sx={{ mb: 3, display: 'flex', flexWrap: 'wrap', gap: 1 }}>
              {impact?.affected_services?.map((service: string) => (
                <Chip
                  key={service}
                  label={service}
                  sx={{
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    color: 'white',
                    fontWeight: 500
                  }}
                />
              ))}
            </Box>

            <Typography variant="subtitle1" sx={{ mb: 2, fontWeight: 600 }}>✅ Recommendations:</Typography>
            <List sx={{ background: 'rgba(76, 175, 80, 0.03)', borderRadius: 2, p: 1 }}>
              {impact?.recommendations?.map((rec: string, idx: number) => (
                <ListItem key={idx} sx={{ py: 1 }}>
                  <ListItemIcon>
                    <CheckCircleIcon sx={{ color: '#4caf50' }} />
                  </ListItemIcon>
                  <ListItemText
                    primary={rec}
                    primaryTypographyProps={{ fontWeight: 500 }}
                  />
                </ListItem>
              ))}
            </List>
          </Paper>
        </>
      )}
    </Box>
  )
}
