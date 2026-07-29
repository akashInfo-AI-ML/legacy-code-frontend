import { useState } from 'react'
import {
  Box,
  Button,
  Typography,
  CircularProgress,
  Alert,
  LinearProgress,
  Paper,
  Grid
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
      const response = await axios.post(`https://legacy-code-backend.onrender.com/upload`, formData, {
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
    <Box>
      {/* Header */}
      <Box sx={{ textAlign: 'center', mb: 5 }}>
        <Typography
          variant="h4"
          sx={{
            mb: 2,
            fontWeight: 700,
            color: '#333'
          }}
        >
          Upload Your .NET Solution
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ maxWidth: 650, mx: 'auto', lineHeight: 1.7 }}>
          Begin your modernization journey by uploading your .NET solution file or source code.
          Our AI will analyze the architecture and provide comprehensive insights.
        </Typography>
      </Box>

      {/* Feature Cards */}
      <Grid container spacing={3} sx={{ mb: 5 }}>
        <Grid item xs={12} md={4}>
          <Paper
            elevation={0}
            sx={{
              p: 3,
              textAlign: 'center',
              border: '1px solid #e0e0e0',
              borderRadius: 2,
              transition: 'all 0.3s ease',
              '&:hover': {
                borderColor: '#667eea',
                boxShadow: '0 4px 12px rgba(102, 126, 234, 0.15)',
                transform: 'translateY(-2px)'
              }
            }}
          >
            <CheckIcon sx={{ fontSize: 48, color: '#667eea', mb: 2 }} />
            <Typography variant="h6" sx={{ mb: 1, fontWeight: 600 }}>
              Fast Analysis
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Get comprehensive insights in seconds with AI-powered scanning
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} md={4}>
          <Paper
            elevation={0}
            sx={{
              p: 3,
              textAlign: 'center',
              border: '1px solid #e0e0e0',
              borderRadius: 2,
              transition: 'all 0.3s ease',
              '&:hover': {
                borderColor: '#667eea',
                boxShadow: '0 4px 12px rgba(102, 126, 234, 0.15)',
                transform: 'translateY(-2px)'
              }
            }}
          >
            <CheckIcon sx={{ fontSize: 48, color: '#667eea', mb: 2 }} />
            <Typography variant="h6" sx={{ mb: 1, fontWeight: 600 }}>
              Secure Processing
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Your code is analyzed securely with enterprise-grade protection
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} md={4}>
          <Paper
            elevation={0}
            sx={{
              p: 3,
              textAlign: 'center',
              border: '1px solid #e0e0e0',
              borderRadius: 2,
              transition: 'all 0.3s ease',
              '&:hover': {
                borderColor: '#667eea',
                boxShadow: '0 4px 12px rgba(102, 126, 234, 0.15)',
                transform: 'translateY(-2px)'
              }
            }}
          >
            <CheckIcon sx={{ fontSize: 48, color: '#667eea', mb: 2 }} />
            <Typography variant="h6" sx={{ mb: 1, fontWeight: 600 }}>
              Actionable Insights
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Get clear modernization recommendations and next steps
            </Typography>
          </Paper>
        </Grid>
      </Grid>

      {/* Upload Zone */}
      <Box
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        sx={{
          border: dragActive ? '2px dashed #667eea' : '2px dashed #e0e0e0',
          borderRadius: 3,
          p: 6,
          mb: 3,
          textAlign: 'center',
          cursor: 'pointer',
          background: dragActive ? 'rgba(102, 126, 234, 0.05)' : 'transparent',
          transition: 'all 0.3s ease',
          '&:hover': {
            background: 'rgba(102, 126, 234, 0.02)',
            borderColor: '#667eea'
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
            <Box>
              <FileIcon sx={{ fontSize: 64, color: '#667eea', mb: 2 }} />
              <Typography variant="h6" sx={{ mb: 1, fontWeight: 600, color: '#333' }}>
                {fileName}
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                {file.size && formatFileSize(file.size)}
              </Typography>
              <Button
                variant="text"
                size="small"
                onClick={(e) => {
                  e.preventDefault()
                  setFile(null)
                  setFileName(null)
                }}
              >
                Change File
              </Button>
            </Box>
          ) : (
            <Box>
              <CloudUploadIcon sx={{ fontSize: 64, color: '#667eea', mb: 2 }} />
              <Typography variant="h6" sx={{ mb: 1, fontWeight: 600, color: '#333' }}>
                Drag & drop your file here
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                or click to browse
              </Typography>
              <Typography variant="caption" color="text.secondary">
                Supported: .ZIP, .SLN, .CS • Max 100MB
              </Typography>
            </Box>
          )}
        </label>
      </Box>

      {/* Progress */}
      {loading && (
        <Box sx={{ mb: 3 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1 }}>
            <Typography variant="body2" color="text.secondary">
              Analyzing your code...
            </Typography>
            <Typography variant="body2" fontWeight="600" color="primary">
              {uploadProgress}%
            </Typography>
          </Box>
          <LinearProgress
            variant="determinate"
            value={uploadProgress}
            sx={{ height: 8, borderRadius: 4 }}
          />
        </Box>
      )}

      {/* Tip */}
      <Alert
        severity="info"
        icon={<FileIcon />}
        sx={{ mb: 3, borderRadius: 2 }}
      >
        <Typography variant="body2">
          <strong>Tip:</strong> For best results, upload a complete solution file (.sln) or a ZIP archive
          containing your entire project structure.
        </Typography>
      </Alert>

      {/* Action Button */}
      <Button
        variant="contained"
        size="large"
        onClick={handleUpload}
        disabled={!file || loading}
        startIcon={loading ? <CircularProgress size={20} color="inherit" /> : <CloudUploadIcon />}
        fullWidth
        sx={{
          py: 1.5,
          fontSize: '1rem',
          fontWeight: 600,
          borderRadius: 2,
          textTransform: 'none',
          boxShadow: !file || loading ? 'none' : '0 4px 12px rgba(102, 126, 234, 0.3)',
          '&:hover': {
            boxShadow: !file || loading ? 'none' : '0 6px 16px rgba(102, 126, 234, 0.4)'
          }
        }}
      >
        {loading ? 'Analyzing...' : 'Upload & Analyze'}
      </Button>
    </Box>
  )
}
