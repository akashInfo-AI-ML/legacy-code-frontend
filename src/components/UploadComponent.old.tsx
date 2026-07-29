import { useState } from 'react'
import {
  Box,
  Button,
  Typography,
  CircularProgress,
  Alert,
  LinearProgress,
  Paper,
  Grid,
  Fade
} from '@mui/material'
import {
  CloudUpload as CloudUploadIcon,
  CheckCircle as CheckIcon,
  InsertDriveFile as FileIcon
} from '@mui/icons-material'
import axios from 'axios'

interface UploadComponentProps {
  onSuccess: (projectId: string) => void
  onError: (error: string) => void
}

export default function UploadComponent({ onSuccess, onError }: UploadComponentProps) {
  const [loading, setLoading] = useState(false)
  const [fileName, setFileName] = useState<string | null>(null)
  const [file, setFile] = useState<File | null>(null)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [dragActive, setDragActive] = useState(false)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      setFile(e.target.files[0])
      setFileName(e.target.files[0].name)
    }
  }

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true)
    } else if (e.type === "dragleave") {
      setDragActive(false)
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setFile(e.dataTransfer.files[0])
      setFileName(e.dataTransfer.files[0].name)
    }
  }

  const handleUpload = async () => {
    if (!file) {
      onError('Please select a file')
      return
    }

    setLoading(true)
    setUploadProgress(0)
    const formData = new FormData()
    formData.append('file', file)

    try {
      const response = await axios.post('http://localhost:8000/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
        onUploadProgress: (progressEvent) => {
          const progress = progressEvent.total
            ? Math.round((progressEvent.loaded * 100) / progressEvent.total)
            : 0
          setUploadProgress(progress)
        }
      })
      onSuccess(response.data.project_id)
    } catch (err) {
      onError(err instanceof Error ? err.message : 'Upload failed')
    } finally {
      setLoading(false)
      setUploadProgress(0)
    }
  }

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i]
  }

  return (
    <Box sx={{ minHeight: 'calc(100vh - 100px)', display: 'flex', flexDirection: 'column' }}>
      {/* Hero Section */}
      <Box 
        sx={{ 
          textAlign: 'center', 
          mb: 6,
          py: 8,
          background: 'linear-gradient(135deg, rgba(102, 126, 234, 0.1) 0%, rgba(118, 75, 162, 0.1) 100%)',
          borderRadius: 4,
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(102, 126, 234, 0.2)',
          position: 'relative',
          overflow: 'hidden',
          animation: 'fadeIn 0.8s ease-out'
        }}
      >
        {/* Animated background circles */}
        <Box
          className="float-animation"
          sx={{
            position: 'absolute',
            top: -50,
            right: -50,
            width: 200,
            height: 200,
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(102, 126, 234, 0.2) 0%, transparent 70%)',
            filter: 'blur(40px)',
            animationDelay: '0s'
          }}
        />
        <Box
          className="float-animation"
          sx={{
            position: 'absolute',
            bottom: -50,
            left: -50,
            width: 250,
            height: 250,
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(118, 75, 162, 0.2) 0%, transparent 70%)',
            filter: 'blur(40px)',
            animationDelay: '1s'
          }}
        />
        
        <Box sx={{ position: 'relative', zIndex: 1 }}>
          <Typography
            variant="h2"
            sx={{
              mb: 2,
              fontWeight: 800,
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 50%, #3b82f6 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              fontSize: { xs: '2.5rem', md: '3.5rem' },
              letterSpacing: '-0.02em',
              animation: 'slideUp 0.8s ease-out'
            }}
          >
            Project ATLAS
          </Typography>
          <Typography 
            variant="h5" 
            sx={{ 
              mb: 3, 
              color: 'rgba(255,255,255,0.8)',
              fontWeight: 300,
              animation: 'slideUp 0.8s ease-out 0.2s backwards'
            }}
          >
            Legacy .NET Intelligence Platform
          </Typography>
          <Typography 
            variant="body1" 
            sx={{ 
              color: 'rgba(255,255,255,0.6)', 
              maxWidth: 700, 
              mx: 'auto',
              fontSize: '1.1rem',
              lineHeight: 1.8,
              animation: 'slideUp 0.8s ease-out 0.4s backwards'
            }}
          >
            Transform your legacy .NET applications with AI-powered analysis. Get instant insights,
            architecture visualization, and modernization roadmaps in seconds.
          </Typography>
        </Box>
      </Box>

      {/* Feature Cards with 3D effect */}
      <Grid container spacing={3} sx={{ mb: 6 }}>
        {[
          { 
            icon: '⚡', 
            title: 'Lightning Fast', 
            desc: 'AI-powered analysis in seconds',
            delay: '0s'
          },
          { 
            icon: '🔒', 
            title: 'Enterprise Secure', 
            desc: 'Your code never leaves your infrastructure',
            delay: '0.1s'
          },
          { 
            icon: '🎯', 
            title: 'Actionable Insights', 
            desc: 'Strategic modernization roadmap',
            delay: '0.2s'
          }
        ].map((feature, idx) => (
          <Grid item xs={12} md={4} key={idx}>
            <Paper
              elevation={0}
              className="glow-animation"
              sx={{
                p: 4,
                textAlign: 'center',
                background: 'linear-gradient(135deg, rgba(102, 126, 234, 0.15) 0%, rgba(118, 75, 162, 0.15) 100%)',
                border: '1px solid rgba(102, 126, 234, 0.3)',
                borderRadius: 3,
                transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                backdropFilter: 'blur(10px)',
                position: 'relative',
                overflow: 'hidden',
                animation: `slideUp 0.6s ease-out ${feature.delay} backwards`,
                '&:hover': {
                  transform: 'translateY(-8px) scale(1.02)',
                  boxShadow: '0 20px 60px rgba(102, 126, 234, 0.4)',
                  border: '1px solid rgba(102, 126, 234, 0.6)',
                  '&::before': {
                    opacity: 1
                  }
                },
                '&::before': {
                  content: '""',
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  background: 'linear-gradient(135deg, rgba(102, 126, 234, 0.1) 0%, rgba(118, 75, 162, 0.1) 100%)',
                  opacity: 0,
                  transition: 'opacity 0.3s ease'
                }
              }}
            >
              <Typography sx={{ fontSize: '3rem', mb: 2, position: 'relative', zIndex: 1 }}>
                {feature.icon}
              </Typography>
              <Typography 
                variant="h6" 
                sx={{ 
                  mb: 1.5, 
                  fontWeight: 700,
                  color: 'white',
                  position: 'relative',
                  zIndex: 1
                }}
              >
                {feature.title}
              </Typography>
              <Typography 
                variant="body2" 
                sx={{ 
                  color: 'rgba(255,255,255,0.7)',
                  lineHeight: 1.7,
                  position: 'relative',
                  zIndex: 1
                }}
              >
                {feature.desc}
              </Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>

      {/* Upload Zone with impressive styling */}
      <Box
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        sx={{
          border: dragActive
            ? '3px dashed #667eea'
            : '2px dashed rgba(102, 126, 234, 0.4)',
          borderRadius: 4,
          p: 8,
          mb: 3,
          textAlign: 'center',
          cursor: 'pointer',
          background: dragActive
            ? 'linear-gradient(135deg, rgba(102, 126, 234, 0.2) 0%, rgba(118, 75, 162, 0.2) 100%)'
            : 'linear-gradient(135deg, rgba(15, 23, 42, 0.7) 0%, rgba(30, 41, 59, 0.7) 100%)',
          backdropFilter: 'blur(20px)',
          transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
          position: 'relative',
          overflow: 'hidden',
          '&:hover': {
            background: 'linear-gradient(135deg, rgba(102, 126, 234, 0.15) 0%, rgba(118, 75, 162, 0.15) 100%)',
            borderColor: '#667eea',
            transform: 'scale(1.01)',
            boxShadow: '0 20px 60px rgba(102, 126, 234, 0.3)',
            '& .upload-icon': {
              transform: 'translateY(-5px) scale(1.1)',
              color: '#667eea'
            }
          },
          '&::before': {
            content: '""',
            position: 'absolute',
            top: '-50%',
            left: '-50%',
            width: '200%',
            height: '200%',
            background: dragActive 
              ? 'radial-gradient(circle, rgba(102, 126, 234, 0.1) 0%, transparent 70%)'
              : 'none',
            animation: dragActive ? 'rotate 10s linear infinite' : 'none'
          }
        }}
      >
        <input
          type="file"
          id="file-input"
          style={{ display: 'none' }}
          onChange={handleFileChange}
          accept=".zip,.sln,.cs"
        />
        <label htmlFor="file-input" style={{ cursor: 'pointer', width: '100%', display: 'block' }}>
          {file ? (
            <Fade in={true}>
              <Box>
                <FileIcon sx={{ fontSize: 64, color: '#667eea', mb: 2 }} />
                <Typography variant="h6" sx={{ mb: 1, fontWeight: 600 }}>
                  {fileName}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {file.size ? formatFileSize(file.size) : ''}
                </Typography>
                <Button
                  variant="text"
                  size="small"
                  sx={{ mt: 2 }}
                  onClick={(e) => {
                    e.preventDefault()
                    setFile(null)
                    setFileName(null)
                  }}
                >
                  Change File
                </Button>
              </Box>
            </Fade>
          ) : (
            <Box sx={{ position: 'relative', zIndex: 1 }}>
              <CloudUploadIcon 
                className="upload-icon"
                sx={{ 
                  fontSize: 100, 
                  color: '#667eea', 
                  mb: 3,
                  transition: 'all 0.3s ease',
                  filter: 'drop-shadow(0 0 20px rgba(102, 126, 234, 0.5))'
                }} 
              />
              <Typography 
                variant="h5" 
                sx={{ 
                  mb: 2, 
                  fontWeight: 700,
                  color: 'white',
                  textShadow: '0 0 20px rgba(102, 126, 234, 0.5)'
                }}
              >
                Drop Your Solution Here
              </Typography>
              <Typography 
                variant="body1" 
                sx={{ 
                  mb: 3,
                  color: 'rgba(255,255,255,0.7)',
                  fontSize: '1.1rem'
                }}
              >
                or click to browse your files
              </Typography>
              <Box
                sx={{
                  display: 'inline-block',
                  px: 3,
                  py: 1,
                  background: 'linear-gradient(135deg, rgba(102, 126, 234, 0.2) 0%, rgba(118, 75, 162, 0.2) 100%)',
                  border: '1px solid rgba(102, 126, 234, 0.4)',
                  borderRadius: 2,
                  backdropFilter: 'blur(10px)'
                }}
              >
                <Typography 
                  variant="caption" 
                  sx={{ 
                    color: 'rgba(255,255,255,0.8)',
                    fontWeight: 500,
                    letterSpacing: '0.5px'
                  }}
                >
                  📎 ZIP, SLN, CS • ⚡ Max 100MB
                </Typography>
              </Box>
            </Box>
          )}
        </label>
      </Box>

      {loading && (
        <Fade in={true}>
          <Box 
            sx={{ 
              mb: 3,
              p: 3,
              background: 'linear-gradient(135deg, rgba(102, 126, 234, 0.1) 0%, rgba(118, 75, 162, 0.1) 100%)',
              borderRadius: 3,
              border: '1px solid rgba(102, 126, 234, 0.3)',
              backdropFilter: 'blur(10px)'
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <CircularProgress size={24} sx={{ color: '#667eea' }} />
                <Typography variant="body1" sx={{ fontWeight: 600, color: 'white' }}>
                  Analyzing Your Code...
                </Typography>
              </Box>
              <Typography 
                variant="h6" 
                sx={{ 
                  fontWeight: 700,
                  color: '#667eea',
                  textShadow: '0 0 10px rgba(102, 126, 234, 0.5)'
                }}
              >
                {uploadProgress}%
              </Typography>
            </Box>
            <LinearProgress
              variant="determinate"
              value={uploadProgress}
              sx={{
                height: 12,
                borderRadius: 2,
                backgroundColor: 'rgba(102, 126, 234, 0.2)',
                '& .MuiLinearProgress-bar': {
                  borderRadius: 2,
                  background: 'linear-gradient(90deg, #667eea 0%, #764ba2 50%, #3b82f6 100%)',
                  boxShadow: '0 0 20px rgba(102, 126, 234, 0.6)'
                }
              }}
            />
          </Box>
        </Fade>
      )}

      <Alert
        severity="info"
        icon={<FileIcon sx={{ color: '#667eea' }} />}
        sx={{
          mb: 3,
          borderRadius: 3,
          background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.1) 0%, rgba(102, 126, 234, 0.1) 100%)',
          border: '1px solid rgba(59, 130, 246, 0.3)',
          backdropFilter: 'blur(10px)',
          color: 'rgba(255,255,255,0.9)'
        }}
      >
        <Typography variant="body2" sx={{ fontWeight: 500, color: 'white' }}>
          <strong style={{ color: '#667eea' }}>💡 Pro Tip:</strong> Upload a complete solution (.sln) or ZIP archive
          for comprehensive analysis. We'll scan all dependencies, patterns, and generate actionable insights.
        </Typography>
      </Alert>

      <Box sx={{ textAlign: 'center' }}>
        <Button
          variant="contained"
          size="large"
          onClick={handleUpload}
          disabled={!file || loading}
          startIcon={loading ? <CircularProgress size={20} sx={{ color: 'white' }} /> : <CloudUploadIcon />}
          sx={{
            minWidth: 300,
            py: 2,
            fontSize: '1.2rem',
            fontWeight: 700,
            borderRadius: 3,
            background: !file || loading
              ? 'linear-gradient(135deg, rgba(102, 126, 234, 0.3) 0%, rgba(118, 75, 162, 0.3) 100%)'
              : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            boxShadow: !file || loading
              ? 'none'
              : '0 10px 40px rgba(102, 126, 234, 0.5)',
            transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
            position: 'relative',
            overflow: 'hidden',
            '&:hover': {
              background: !file || loading
                ? 'linear-gradient(135deg, rgba(102, 126, 234, 0.3) 0%, rgba(118, 75, 162, 0.3) 100%)'
                : 'linear-gradient(135deg, #5568d3 0%, #6b3f8e 100%)',
              transform: !file || loading ? 'none' : 'translateY(-3px) scale(1.02)',
              boxShadow: !file || loading
                ? 'none'
                : '0 15px 60px rgba(102, 126, 234, 0.7)'
            },
            '&:disabled': {
              background: 'linear-gradient(135deg, rgba(102, 126, 234, 0.2) 0%, rgba(118, 75, 162, 0.2) 100%)',
              color: 'rgba(255,255,255,0.3)'
            },
            '&::before': {
              content: '\"\"',
              position: 'absolute',
              top: 0,
              left: '-100%',
              width: '100%',
              height: '100%',
              background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)',
              transition: 'left 0.6s ease'
            },
            '&:hover::before': {
              left: '100%'
            }
          }}
        >
          {loading ? '🚀 Analyzing Magic...' : '✨ Start AI Analysis'}
        </Button>
      </Box>
    </Box>
  )
}
