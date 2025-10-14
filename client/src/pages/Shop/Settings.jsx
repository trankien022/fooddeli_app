import React from 'react';
import { 
  Box, 
  Typography, 
  Paper, 
  Grid, 
  Switch, 
  FormControlLabel,
  TextField,
  Button,
  Divider,
  Avatar
} from '@mui/material';
import { 
  Person as PersonIcon,
  Store as StoreIcon,
  Notifications as NotificationsIcon,
  Security as SecurityIcon,
  Palette as PaletteIcon
} from '@mui/icons-material';

const ShopSettings = () => {
  return (
    <Box sx={{ minHeight: '100vh', backgroundColor: '#f9fafb' }}>
      <Box sx={{ p: { xs: 2, sm: 3, md: 3 } }}>
        {/* Header */}
        <Box sx={{ mb: { xs: 3, sm: 3.5 } }}>
          <Typography variant="h4" sx={{ fontWeight: 700, fontSize: { xs: '24px', sm: '26px' }, mb: { xs: 0.8, sm: 1 }, letterSpacing: '-0.02em', color: '#18181b' }}>
            Cài đặt
          </Typography>
          <Typography variant="body2" sx={{ color: '#717182', fontSize: { xs: '15px', sm: '16px' }, fontWeight: 500, letterSpacing: '0.01em' }}>
            Quản lý cài đặt cửa hàng của bạn
          </Typography>
        </Box>

        <Grid container spacing={{ xs: 2.5, sm: 3 }}>
          {/* Profile Settings */}
          <Grid item xs={12} md={6}>
            <Paper 
              elevation={0} 
              sx={{ 
                p: { xs: 2.5, sm: 3 }, 
                borderRadius: { xs: '12px', sm: '14px' },
                border: '0.8px solid rgba(0,0,0,0.1)',
                height: 'fit-content'
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', mb: { xs: 2.5, sm: 3 } }}>
                <PersonIcon sx={{ color: '#F9704B', mr: 1, fontSize: { xs: 22, sm: 24 } }} />
                <Typography variant="h6" sx={{ fontWeight: 700, fontSize: { xs: '17px', sm: '18px' }, letterSpacing: '-0.01em', color: '#18181b' }}>
                  Thông tin cá nhân
                </Typography>
              </Box>
              
              <Box sx={{ display: 'flex', alignItems: 'center', mb: { xs: 2.5, sm: 3 } }}>
                <Avatar 
                  sx={{ 
                    width: { xs: 60, sm: 64 }, 
                    height: { xs: 60, sm: 64 }, 
                    backgroundColor: '#F9704B',
                    fontSize: { xs: '22px', sm: '24px' },
                    mr: 2,
                    fontWeight: 600
                  }}
                >
                  A
                </Avatar>
                <Box>
                  <Typography variant="h6" sx={{ fontWeight: 700, mb: 0.5, fontSize: { xs: '17px', sm: '18px' }, letterSpacing: '-0.01em', color: '#18181b' }}>
                    Admin
                  </Typography>
                  <Typography variant="body2" sx={{ color: '#717182', fontSize: { xs: '14px', sm: '14px' }, letterSpacing: '0.01em' }}>
                    Quản trị viên
                  </Typography>
                </Box>
              </Box>

              <TextField
                fullWidth
                label="Tên cửa hàng"
                defaultValue="Bobo Food"
                sx={{ mb: { xs: 2, sm: 2.5 } }}
                size="small"
                InputProps={{ sx: { fontSize: { xs: '15px', sm: '15px' } } }}
                InputLabelProps={{ sx: { fontSize: { xs: '15px', sm: '15px' } } }}
              />
              <TextField
                fullWidth
                label="Email"
                defaultValue="admin@bobofood.com"
                sx={{ mb: { xs: 2, sm: 2.5 } }}
                size="small"
                InputProps={{ sx: { fontSize: { xs: '15px', sm: '15px' } } }}
                InputLabelProps={{ sx: { fontSize: { xs: '15px', sm: '15px' } } }}
              />
              <TextField
                fullWidth
                label="Số điện thoại"
                defaultValue="+84 123 456 789"
                sx={{ mb: { xs: 2.5, sm: 3 } }}
                size="small"
                InputProps={{ sx: { fontSize: { xs: '15px', sm: '15px' } } }}
                InputLabelProps={{ sx: { fontSize: { xs: '15px', sm: '15px' } } }}
              />
              
              <Button 
                variant="contained" 
                fullWidth
                sx={{ 
                  backgroundColor: '#F9704B',
                  '&:hover': { backgroundColor: '#e55a3a' },
                  height: { xs: 46, sm: 42 },
                  fontSize: { xs: '15px', sm: '15px' },
                  fontWeight: 600,
                  borderRadius: { xs: '8px', sm: '10px' }
                }}
              >
                Cập nhật thông tin
              </Button>
            </Paper>
          </Grid>

          {/* Store Settings */}
          <Grid item xs={12} md={6}>
            <Paper 
              elevation={0} 
              sx={{ 
                p: { xs: 2.5, sm: 3 }, 
                borderRadius: { xs: '12px', sm: '14px' },
                border: '0.8px solid rgba(0,0,0,0.1)',
                height: 'fit-content'
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', mb: { xs: 2.5, sm: 3 } }}>
                <StoreIcon sx={{ color: '#F9704B', mr: 1, fontSize: { xs: 22, sm: 24 } }} />
                <Typography variant="h6" sx={{ fontWeight: 700, fontSize: { xs: '17px', sm: '18px' }, letterSpacing: '-0.01em', color: '#18181b' }}>
                  Cài đặt cửa hàng
                </Typography>
              </Box>

              <TextField
                fullWidth
                label="Địa chỉ cửa hàng"
                defaultValue="123 Đường ABC, Quận 1, TP.HCM"
                sx={{ mb: { xs: 2, sm: 2.5 } }}
                size="small"
                InputProps={{ sx: { fontSize: { xs: '15px', sm: '15px' } } }}
                InputLabelProps={{ sx: { fontSize: { xs: '15px', sm: '15px' } } }}
              />
              <TextField
                fullWidth
                label="Giờ mở cửa"
                defaultValue="08:00"
                sx={{ mb: { xs: 2, sm: 2.5 } }}
                size="small"
                InputProps={{ sx: { fontSize: { xs: '15px', sm: '15px' } } }}
                InputLabelProps={{ sx: { fontSize: { xs: '15px', sm: '15px' } } }}
              />
              <TextField
                fullWidth
                label="Giờ đóng cửa"
                defaultValue="22:00"
                sx={{ mb: { xs: 2.5, sm: 3 } }}
                size="small"
                InputProps={{ sx: { fontSize: { xs: '15px', sm: '15px' } } }}
                InputLabelProps={{ sx: { fontSize: { xs: '15px', sm: '15px' } } }}
              />
              
              <Button 
                variant="contained" 
                fullWidth
                sx={{ 
                  backgroundColor: '#F9704B',
                  '&:hover': { backgroundColor: '#e55a3a' },
                  height: { xs: 46, sm: 42 },
                  fontSize: { xs: '15px', sm: '15px' },
                  fontWeight: 600,
                  borderRadius: { xs: '8px', sm: '10px' }
                }}
              >
                Cập nhật cửa hàng
              </Button>
            </Paper>
          </Grid>

          {/* Notification Settings */}
          <Grid item xs={12} md={6}>
            <Paper 
              elevation={0} 
              sx={{ 
                p: { xs: 2.5, sm: 3 }, 
                borderRadius: { xs: '12px', sm: '14px' },
                border: '0.8px solid rgba(0,0,0,0.1)'
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', mb: { xs: 2.5, sm: 3 } }}>
                <NotificationsIcon sx={{ color: '#F9704B', mr: 1, fontSize: { xs: 22, sm: 24 } }} />
                <Typography variant="h6" sx={{ fontWeight: 700, fontSize: { xs: '17px', sm: '18px' }, letterSpacing: '-0.01em', color: '#18181b' }}>
                  Thông báo
                </Typography>
              </Box>

              <Box sx={{ mb: { xs: 1.5, sm: 2 } }}>
                <FormControlLabel
                  control={<Switch defaultChecked />}
                  label={<Typography sx={{ fontSize: { xs: '15px', sm: '15px' }, letterSpacing: '0.01em' }}>Thông báo đơn hàng mới</Typography>}
                />
              </Box>
              <Box sx={{ mb: { xs: 1.5, sm: 2 } }}>
                <FormControlLabel
                  control={<Switch defaultChecked />}
                  label={<Typography sx={{ fontSize: { xs: '15px', sm: '15px' }, letterSpacing: '0.01em' }}>Thông báo đánh giá</Typography>}
                />
              </Box>
              <Box sx={{ mb: { xs: 1.5, sm: 2 } }}>
                <FormControlLabel
                  control={<Switch />}
                  label={<Typography sx={{ fontSize: { xs: '15px', sm: '15px' }, letterSpacing: '0.01em' }}>Thông báo khuyến mãi</Typography>}
                />
              </Box>
              <Box sx={{ mb: 0 }}>
                <FormControlLabel
                  control={<Switch defaultChecked />}
                  label={<Typography sx={{ fontSize: { xs: '15px', sm: '15px' }, letterSpacing: '0.01em' }}>Thông báo hệ thống</Typography>}
                />
              </Box>
            </Paper>
          </Grid>

          {/* Security Settings */}
          <Grid item xs={12} md={6}>
            <Paper 
              elevation={0} 
              sx={{ 
                p: { xs: 2.5, sm: 3 }, 
                borderRadius: { xs: '12px', sm: '14px' },
                border: '0.8px solid rgba(0,0,0,0.1)'
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', mb: { xs: 2.5, sm: 3 } }}>
                <SecurityIcon sx={{ color: '#F9704B', mr: 1, fontSize: { xs: 22, sm: 24 } }} />
                <Typography variant="h6" sx={{ fontWeight: 700, fontSize: { xs: '17px', sm: '18px' }, letterSpacing: '-0.01em', color: '#18181b' }}>
                  Bảo mật
                </Typography>
              </Box>

              <TextField
                fullWidth
                label="Mật khẩu hiện tại"
                type="password"
                sx={{ mb: { xs: 2, sm: 2.5 } }}
                size="small"
                InputProps={{ sx: { fontSize: { xs: '15px', sm: '15px' } } }}
                InputLabelProps={{ sx: { fontSize: { xs: '15px', sm: '15px' } } }}
              />
              <TextField
                fullWidth
                label="Mật khẩu mới"
                type="password"
                sx={{ mb: { xs: 2, sm: 2.5 } }}
                size="small"
                InputProps={{ sx: { fontSize: { xs: '15px', sm: '15px' } } }}
                InputLabelProps={{ sx: { fontSize: { xs: '15px', sm: '15px' } } }}
              />
              <TextField
                fullWidth
                label="Xác nhận mật khẩu mới"
                type="password"
                sx={{ mb: { xs: 2.5, sm: 3 } }}
                size="small"
                InputProps={{ sx: { fontSize: { xs: '15px', sm: '15px' } } }}
                InputLabelProps={{ sx: { fontSize: { xs: '15px', sm: '15px' } } }}
              />
              
              <Button 
                variant="outlined" 
                fullWidth
                sx={{ 
                  borderColor: '#F9704B',
                  color: '#F9704B',
                  height: { xs: 46, sm: 42 },
                  fontSize: { xs: '15px', sm: '15px' },
                  fontWeight: 600,
                  borderRadius: { xs: '8px', sm: '10px' },
                  '&:hover': { 
                    borderColor: '#e55a3a',
                    backgroundColor: 'rgba(249, 112, 75, 0.04)'
                  }
                }}
              >
                Đổi mật khẩu
              </Button>
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default ShopSettings;
