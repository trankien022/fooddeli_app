import React from 'react';
import { Typography, Box, Grid, Paper, Stack, Chip, LinearProgress, Divider } from '@mui/material';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const Dashboard = () => {
  const revenueData = [
    { month: 'T1', revenue: 18500000, orders: 156 },
    { month: 'T2', revenue: 22100000, orders: 189 },
    { month: 'T3', revenue: 19800000, orders: 167 },
    { month: 'T4', revenue: 25600000, orders: 223 },
    { month: 'T5', revenue: 28900000, orders: 245 },
    { month: 'T6', revenue: 31200000, orders: 278 },
    { month: 'T7', revenue: 29800000, orders: 256 },
    { month: 'T8', revenue: 33400000, orders: 289 },
    { month: 'T9', revenue: 26700000, orders: 234 },
    { month: 'T10', revenue: 28900000, orders: 251 },
    { month: 'T11', revenue: 31200000, orders: 267 },
    { month: 'T12', revenue: 35600000, orders: 298 }
  ];

  const totalRevenue = revenueData.reduce((sum, item) => sum + item.revenue, 0);
  const averageRevenue = Math.round(totalRevenue / revenueData.length);
  const maxMonth = revenueData.reduce((max, item) => item.revenue > max.revenue ? item : max);
  const totalOrders = revenueData.reduce((sum, item) => sum + item.orders, 0);

  const StatCard = ({ title, value, sub, iconBg, icon }) => (
    <Paper 
      elevation={0} 
      sx={{ 
        p: { xs: 2.5, sm: 3 }, 
        borderRadius: { xs: '14px', sm: '16px' },
        border: '1px solid rgba(0,0,0,0.08)', 
        height: { xs: '110px', sm: '120px' },
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        transition: 'all 0.2s ease-in-out',
        '&:hover': {
          transform: 'translateY(-2px)',
          boxShadow: '0 8px 25px rgba(0,0,0,0.1)',
          border: '1px solid rgba(249, 112, 75, 0.2)'
        }
      }}
    >
      <Box sx={{ flex: 1, minWidth: 0 }}>
        <Typography variant="body2" sx={{ color: '#717182', fontSize: { xs: '13px', sm: '14px' }, mb: { xs: 1, sm: 1.2 }, fontWeight: 500, letterSpacing: '0.01em' }}>
          {title}
        </Typography>
        <Typography variant="h4" sx={{ fontWeight: 700, fontSize: { xs: '22px', sm: '24px', md: '28px' }, color: '#000', mb: 0.5, lineHeight: 1.2, letterSpacing: '-0.02em' }}>
          {value}
        </Typography>
        <Typography variant="caption" sx={{ color: '#717182', fontSize: { xs: '12px', sm: '13px' }, fontWeight: 500, letterSpacing: '0.01em' }}>
          {sub}
        </Typography>
      </Box>
      <Box 
        sx={{ 
          width: { xs: 44, sm: 48 }, 
          height: { xs: 44, sm: 48 }, 
          borderRadius: { xs: '10px', sm: '12px' },
          backgroundColor: iconBg,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
        }}
      >
        <Typography sx={{ fontSize: { xs: '22px', sm: '24px' } }}>
          {icon}
        </Typography>
      </Box>
    </Paper>
  );

  const OrderItem = ({ id, statusText, statusColor, customer, items, time }) => (
    <Box 
      sx={{ 
        border: '1px solid rgba(0,0,0,0.08)', 
        borderRadius: { xs: '10px', sm: '12px' },
        p: { xs: 2, sm: 2.2 }, 
        mb: 2,
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'space-between',
        transition: 'all 0.2s ease-in-out',
        '&:hover': {
          border: '1px solid rgba(249, 112, 75, 0.2)',
          boxShadow: '0 2px 8px rgba(0,0,0,0.08)'
        }
      }}
    >
      <Box sx={{ flex: 1, minWidth: 0, mr: { xs: 1.5, sm: 2 } }}>
        <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: { xs: 0.8, sm: 1 } }}>
          <Typography variant="body2" sx={{ fontWeight: 700, fontSize: { xs: '15px', sm: '16px' }, flexShrink: 0, letterSpacing: '-0.01em' }}>
            {id}
          </Typography>
          <Chip 
            label={statusText} 
            size="small" 
            sx={{ backgroundColor: statusColor.bg, color: statusColor.text, fontSize: { xs: '11px', sm: '12px' }, height: { xs: '22px', sm: '24px' }, px: { xs: 0.8, sm: 1 }, borderRadius: '8px', fontWeight: 600, flexShrink: 0 }} 
          />
        </Stack>
        <Typography variant="body2" sx={{ color: '#717182', fontSize: { xs: '14px', sm: '14px' }, mb: { xs: 0.8, sm: 1 }, fontWeight: 500, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', letterSpacing: '0.01em' }}>
          {customer}
        </Typography>
        <Typography variant="body2" sx={{ fontSize: { xs: '14px', sm: '14px' }, fontWeight: 500, maxHeight: '2.8em', lineHeight: 1.4, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden', textOverflow: 'ellipsis', color: '#3f3f46', letterSpacing: '0.01em' }}>
          {items}
        </Typography>
      </Box>
      <Typography variant="caption" sx={{ color: '#717182', fontSize: { xs: '12px', sm: '13px' }, fontWeight: 500, flexShrink: 0, minWidth: 'fit-content', textAlign: 'right', letterSpacing: '0.01em' }}>
        {time}
      </Typography>
    </Box>
  );

  return (
    <Box sx={{ minHeight: '100vh', backgroundColor: '#f9fafb', p: { xs: 2, sm: 3, md: 4 } }}>
      <Box sx={{ maxWidth: 1200, mx: 'auto' }}>
      <Box sx={{ mb: { xs: 3, sm: 3, md: 4 } }}>
        <Typography variant="h4" sx={{ fontWeight: 700, fontSize: { xs: '24px', sm: '26px', md: '28px' }, mb: { xs: 0.8, sm: 1 }, letterSpacing: '-0.02em', color: '#18181b' }}>
          Tổng quan
        </Typography>
        <Typography variant="body2" sx={{ color: '#717182', fontSize: { xs: '15px', sm: '16px' }, fontWeight: 500, letterSpacing: '0.01em' }}>
          Hiệu suất hoạt động cửa hàng hôm nay
        </Typography>
      </Box>

      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: 'repeat(2, minmax(0, 1fr))', sm: 'repeat(2, minmax(0, 1fr))', md: 'repeat(4, minmax(0, 1fr))' }, gap: { xs: 1.5, sm: 2, md: 3 }, mb: { xs: 3, sm: 4 } }}>
        <StatCard title="Tổng món ăn" value="24" sub="Đang phục vụ" iconBg="#dbeafe" icon="🍲" />
        <StatCard title="Video Reviews" value="18" sub="Video đã upload" iconBg="#f3e8ff" icon="🎬" />
        <StatCard title="Đơn hàng hôm nay" value="42" sub="+12% so với hôm qua" iconBg="#dcfce7" icon="🧾" />
        <StatCard title="Doanh thu" value="1.2M VND" sub="Trong ngày" iconBg="#ffedd4" icon="$" />
      </Box>

      {/* Revenue Chart */}
      <Paper elevation={0} sx={{ p: { xs: 2.5, sm: 3 }, borderRadius: { xs: '14px', sm: '16px' }, border: '1px solid rgba(0,0,0,0.08)', mb: { xs: 3, sm: 4 }, boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
        <Box sx={{ mb: { xs: 2.5, sm: 3 } }}>
          <Typography variant="h6" sx={{ fontWeight: 700, fontSize: { xs: '17px', sm: '18px' }, mb: { xs: 0.8, sm: 1 }, letterSpacing: '-0.01em', color: '#18181b' }}>
            Doanh thu theo tháng
          </Typography>
          <Typography variant="body2" sx={{ color: '#717182', fontSize: { xs: '14px', sm: '15px' }, fontWeight: 500, letterSpacing: '0.01em' }}>
            Tổng quan doanh thu 12 tháng trong năm
          </Typography>
        </Box>
        <Box sx={{ height: { xs: 250, sm: 300, md: 350 } }}>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={revenueData} margin={{ top: 8, right: 16, left: -8, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="month" stroke="#6b7280" fontSize={12} tickLine={false} axisLine={false} />
              <YAxis stroke="#6b7280" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(v) => `${(v/1000000).toFixed(0)}M`} />
              <Tooltip 
                formatter={(value) => [`${(value/1000000).toFixed(1)}M ₫`, 'Doanh thu']}
                labelStyle={{ color: '#111827' }}
                contentStyle={{ backgroundColor: '#ffffff', border: '1px solid #e5e7eb', borderRadius: 8, boxShadow: '0 4px 12px rgba(0,0,0,0.08)' }}
              />
              <Line type="monotone" dataKey="revenue" stroke="#ff6900" strokeWidth={3} dot={{ r: 4, fill: '#ff6900' }} activeDot={{ r: 6, strokeWidth: 2 }} />
            </LineChart>
          </ResponsiveContainer>
        </Box>
      </Paper>

      <Paper elevation={0} sx={{ p: { xs: 2.5, sm: 3 }, borderRadius: { xs: '14px', sm: '16px' }, border: '1px solid rgba(0,0,0,0.08)', mb: { xs: 3, sm: 4 }, boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
        <Box sx={{ mb: { xs: 2.5, sm: 3 } }}>
          <Typography variant="h6" sx={{ fontWeight: 700, fontSize: { xs: '17px', sm: '18px' }, mb: { xs: 0.8, sm: 1 }, letterSpacing: '-0.01em', color: '#18181b' }}>
            Tóm tắt hiệu suất
          </Typography>
          <Typography variant="body2" sx={{ color: '#717182', fontSize: { xs: '14px', sm: '15px' }, fontWeight: 500, letterSpacing: '0.01em' }}>
            Tổng quan nhanh về doanh thu và đơn hàng
          </Typography>
        </Box>

        <Grid container spacing={{ xs: 2, sm: 3 }}>
          <Grid item xs={6} sm={6} md={3}>
            <Box sx={{ textAlign: 'center', p: { xs: 2, sm: 2.5 }, borderRadius: { xs: '10px', sm: '12px' }, backgroundColor: 'rgba(0, 166, 62, 0.05)', border: '1px solid rgba(0, 166, 62, 0.1)' }}>
              <Typography variant="body2" sx={{ color: '#717182', fontSize: { xs: '13px', sm: '14px' }, mb: { xs: 0.8, sm: 1 }, fontWeight: 500, letterSpacing: '0.01em' }}>Tổng doanh thu</Typography>
              <Typography variant="h6" sx={{ color: '#00a63e', fontWeight: 700, fontSize: { xs: '17px', sm: '19px' }, letterSpacing: '-0.01em' }}>
                {(totalRevenue / 1000000).toFixed(1)}M $
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={6} sm={6} md={3}>
            <Box sx={{ textAlign: 'center', p: { xs: 2, sm: 2.5 }, borderRadius: { xs: '10px', sm: '12px' }, backgroundColor: 'rgba(0,0,0,0.02)', border: '1px solid rgba(0,0,0,0.08)' }}>
              <Typography variant="body2" sx={{ color: '#717182', fontSize: { xs: '13px', sm: '14px' }, mb: { xs: 0.8, sm: 1 }, fontWeight: 500, letterSpacing: '0.01em' }}>TB/tháng</Typography>
              <Typography variant="h6" sx={{ fontWeight: 700, fontSize: { xs: '17px', sm: '19px' }, letterSpacing: '-0.01em' }}>
                {(averageRevenue / 1000000).toFixed(1)}M $
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={6} sm={6} md={3}>
            <Box sx={{ textAlign: 'center', p: { xs: 2, sm: 2.5 }, borderRadius: { xs: '10px', sm: '12px' }, backgroundColor: 'rgba(245, 73, 0, 0.05)', border: '1px solid rgba(245, 73, 0, 0.1)' }}>
              <Typography variant="body2" sx={{ color: '#717182', fontSize: { xs: '13px', sm: '14px' }, mb: { xs: 0.8, sm: 1 }, fontWeight: 500, letterSpacing: '0.01em' }}>Tháng cao nhất</Typography>
              <Typography variant="h6" sx={{ color: '#f54900', fontWeight: 700, fontSize: { xs: '17px', sm: '19px' }, letterSpacing: '-0.01em' }}>
                {maxMonth.month}
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={6} sm={6} md={3}>
            <Box sx={{ textAlign: 'center', p: { xs: 2, sm: 2.5 }, borderRadius: { xs: '10px', sm: '12px' }, backgroundColor: 'rgba(249, 112, 75, 0.05)', border: '1px solid rgba(249, 112, 75, 0.1)' }}>
              <Typography variant="body2" sx={{ color: '#717182', fontSize: { xs: '13px', sm: '14px' }, mb: { xs: 0.8, sm: 1 }, fontWeight: 500, letterSpacing: '0.01em' }}>Tổng đơn hàng</Typography>
              <Typography variant="h6" sx={{ fontWeight: 700, fontSize: { xs: '17px', sm: '19px' }, color: '#F9704B', letterSpacing: '-0.01em' }}>
                {totalOrders.toLocaleString()}
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Paper>

      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: 'repeat(2, minmax(0, 1fr))' }, gap: { xs: 2.5, sm: 3 } }}>
        <Paper elevation={0} sx={{ p: { xs: 2.5, sm: 3 }, borderRadius: { xs: '14px', sm: '16px' }, border: '1px solid rgba(0,0,0,0.08)', height: { xs: 'auto', md: '542px' }, boxShadow: '0 2px 8px rgba(0,0,0,0.04)', display: 'flex', flexDirection: 'column' }}>
            <Box sx={{ mb: { xs: 2.5, sm: 3 }, flexShrink: 0 }}>
              <Typography variant="h6" sx={{ fontWeight: 700, fontSize: { xs: '17px', sm: '18px' }, mb: { xs: 0.8, sm: 1 }, letterSpacing: '-0.01em', color: '#18181b' }}>
                Đơn hàng gần đây
              </Typography>
              <Typography variant="body2" sx={{ color: '#717182', fontSize: { xs: '14px', sm: '15px' }, fontWeight: 500, letterSpacing: '0.01em' }}>
                Các đơn hàng mới nhất trong hệ thống
              </Typography>
            </Box>
            <Box sx={{ flex: 1, overflowY: 'auto', overflowX: 'hidden' }}>
              <OrderItem id="#001" statusText="chờ" statusColor={{ bg: '#fef9c2', text: '#894b00' }} customer="Nguyễn Văn A" items="Phở bò, Chả cá, Bánh mì thịt nướng, Cà phê sữa đá, Trà sữa trân châu" time="2 phút trước" />
              <OrderItem id="#002" statusText="chế biến" statusColor={{ bg: '#dbeafe', text: '#193cb8' }} customer="Trần Thị B" items="Bún bò Huế, Nem nướng, Chả cá Lã Vọng, Bánh bèo, Nước mía" time="5 phút trước" />
              <OrderItem id="#003" statusText="hoàn tất" statusColor={{ bg: '#dcfce7', text: '#016630' }} customer="Lê Văn C" items="Cơm tấm, Nước ngọt, Bánh flan, Chè đậu đỏ" time="10 phút trước" />
            </Box>
        </Paper>
        <Paper elevation={0} sx={{ p: { xs: 2.5, sm: 3 }, borderRadius: { xs: '14px', sm: '16px' }, border: '1px solid rgba(0,0,0,0.08)', height: { xs: 'auto', md: '542px' }, boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
            <Box sx={{ mb: { xs: 2.5, sm: 3 } }}>
              <Typography variant="h6" sx={{ fontWeight: 700, fontSize: { xs: '17px', sm: '18px' }, mb: { xs: 0.8, sm: 1 }, letterSpacing: '-0.01em', color: '#18181b' }}>
                Hiệu suất hôm nay
              </Typography>
              <Typography variant="body2" sx={{ color: '#717182', fontSize: { xs: '14px', sm: '15px' }, fontWeight: 500, letterSpacing: '0.01em' }}>
                Tỷ lệ hoàn thành đơn hàng
              </Typography>
            </Box>
            <Stack spacing={2.5} sx={{ mb: 3 }}>
              <Box>
                <Stack direction="row" justifyContent="space-between" sx={{ mb: 1.5 }}>
                  <Typography variant="body2" sx={{ fontSize: { xs: '14px', sm: '14px' }, fontWeight: 500, letterSpacing: '0.01em' }}>Đơn hoàn tất</Typography>
                  <Typography variant="body2" sx={{ fontSize: { xs: '14px', sm: '14px' }, fontWeight: 700, color: '#00a63e', letterSpacing: '-0.01em' }}>85%</Typography>
                </Stack>
                <LinearProgress variant="determinate" value={85} sx={{ height: { xs: 9, sm: 8 }, borderRadius: '999px', backgroundColor: 'rgba(0, 166, 62, 0.1)', '& .MuiLinearProgress-bar': { backgroundColor: '#00a63e' } }} />
              </Box>
              <Box>
                <Stack direction="row" justifyContent="space-between" sx={{ mb: 1.5 }}>
                  <Typography variant="body2" sx={{ fontSize: { xs: '14px', sm: '14px' }, fontWeight: 500, letterSpacing: '0.01em' }}>Đơn đang chế biến</Typography>
                  <Typography variant="body2" sx={{ fontSize: { xs: '14px', sm: '14px' }, fontWeight: 700, color: '#155dfc', letterSpacing: '-0.01em' }}>12%</Typography>
                </Stack>
                <LinearProgress variant="determinate" value={12} sx={{ height: { xs: 9, sm: 8 }, borderRadius: '999px', backgroundColor: 'rgba(21, 93, 252, 0.1)', '& .MuiLinearProgress-bar': { backgroundColor: '#155dfc' } }} />
              </Box>
              <Box>
                <Stack direction="row" justifyContent="space-between" sx={{ mb: 1.5 }}>
                  <Typography variant="body2" sx={{ fontSize: { xs: '14px', sm: '14px' }, fontWeight: 500, letterSpacing: '0.01em' }}>Đơn chờ xử lý</Typography>
                  <Typography variant="body2" sx={{ fontSize: { xs: '14px', sm: '14px' }, fontWeight: 700, color: '#d08700', letterSpacing: '-0.01em' }}>3%</Typography>
                </Stack>
                <LinearProgress variant="determinate" value={3} sx={{ height: { xs: 9, sm: 8 }, borderRadius: '999px', backgroundColor: 'rgba(208, 135, 0, 0.1)', '& .MuiLinearProgress-bar': { backgroundColor: '#d08700' } }} />
              </Box>
            </Stack>
            <Divider sx={{ my: 3 }} />
            <Grid container spacing={2}>
              <Grid item xs={4}>
                <Stack alignItems="center" spacing={{ xs: 0.8, sm: 1 }}>
                  <Typography variant="h5" sx={{ color: '#00a63e', fontWeight: 700, fontSize: { xs: '22px', sm: '24px' }, letterSpacing: '-0.02em' }}>36</Typography>
                  <Typography variant="caption" sx={{ color: '#717182', fontSize: { xs: '12px', sm: '13px' }, fontWeight: 500, letterSpacing: '0.01em' }}>Hoàn tất</Typography>
                </Stack>
              </Grid>
              <Grid item xs={4}>
                <Stack alignItems="center" spacing={{ xs: 0.8, sm: 1 }}>
                  <Typography variant="h5" sx={{ color: '#155dfc', fontWeight: 700, fontSize: { xs: '22px', sm: '24px' }, letterSpacing: '-0.02em' }}>5</Typography>
                  <Typography variant="caption" sx={{ color: '#717182', fontSize: { xs: '12px', sm: '13px' }, fontWeight: 500, letterSpacing: '0.01em' }}>Đang chế biến</Typography>
                </Stack>
              </Grid>
              <Grid item xs={4}>
                <Stack alignItems="center" spacing={{ xs: 0.8, sm: 1 }}>
                  <Typography variant="h5" sx={{ color: '#d08700', fontWeight: 700, fontSize: { xs: '22px', sm: '24px' }, letterSpacing: '-0.02em' }}>1</Typography>
                  <Typography variant="caption" sx={{ color: '#717182', fontSize: { xs: '12px', sm: '13px' }, fontWeight: 500, letterSpacing: '0.01em' }}>Chờ xử lý</Typography>
                </Stack>
              </Grid>
            </Grid>
        </Paper>
      </Box>
      </Box>
    </Box>
  );
};

export default Dashboard;


