import React, { useMemo, useState } from 'react';
import {
  Box,
  Typography,
  Paper,
  Grid,
  Chip,
  Stack,
  Button,
  Divider,
  IconButton
} from '@mui/material';
import {
  CheckCircle as CheckCircleIcon,
  Schedule as ScheduleIcon,
  SoupKitchen as CookingIcon,
  ArrowForward as ArrowForwardIcon
} from '@mui/icons-material';

const STATUS = {
  PENDING: 'Chờ xác nhận',
  COOKING: 'Đang chế biến',
  DONE: 'Hoàn tất'
};

const initialOrders = [
  {
    id: '#001',
    status: STATUS.PENDING,
    createdAgo: '5 phút trước',
    customer: { name: 'Nguyễn Văn A', phone: '0123456789', address: '123 Nguyễn Huệ, Q1, TP.HCM' },
    items: [
      { name: 'Phở bò x2', price: 100000 },
      { name: 'Chả cá x1', price: 30000 }
    ],
    total: 130000,
    payment: 'Tiền mặt',
    note: 'Ít hành, nhiều rau'
  },
  {
    id: '#002',
    status: STATUS.COOKING,
    createdAgo: '15 phút trước',
    customer: { name: 'Trần Thị B', phone: '0987654321', address: '456 Lê Lợi, Q3, TP.HCM' },
    items: [
      { name: 'Bún bò Huế x1', price: 55000 }
    ],
    total: 55000,
    payment: 'Chuyển khoản'
  },
  {
    id: '#003',
    status: STATUS.DONE,
    createdAgo: '30 phút trước',
    customer: { name: 'Lê Văn C', phone: '0369852147', address: '789 Trần Hưng Đạo, Q5, TP.HCM' },
    items: [
      { name: 'Cơm tấm x1', price: 45000 },
      { name: 'Nước ngọt x2', price: 30000 }
    ],
    total: 75000,
    payment: 'Tiền mặt',
    note: 'Giao trước 12h'
  },
  {
    id: '#004',
    status: STATUS.PENDING,
    createdAgo: '8 phút trước',
    customer: { name: 'Phạm Thị D', phone: '0741258963', address: '321 Võ Văn Tần, Q3, TP.HCM' },
    items: [
      { name: 'Bánh mì x3', price: 75000 },
      { name: 'Cà phê x2', price: 40000 }
    ],
    total: 115000,
    payment: 'Chuyển khoản',
    note: 'Không cần túi ni lông'
  }
];

const StatCard = ({ label, value, color, icon }) => (
  <Paper
    elevation={0}
    sx={{
      borderRadius: { xs: '12px', sm: '14px' },
      border: '0.8px solid rgba(0,0,0,0.08)',
      p: { xs: 2.5, sm: 2.5 },
      height: { xs: 'auto', sm: 100 },
      minHeight: { xs: 90, sm: 100 },
      background: 'linear-gradient(180deg, #ffffff 0%, #fdfdfd 100%)',
      transition: 'box-shadow 200ms ease, transform 200ms ease',
      '&:hover': {
        boxShadow: '0 8px 24px rgba(0,0,0,0.06)',
        transform: 'translateY(-2px)'
      }
    }}
  >
    <Stack direction="row" alignItems="center" justifyContent="space-between">
      <Box sx={{ flex: 1, minWidth: 0 }}>
        <Typography sx={{ color: '#717182', fontSize: { xs: 13, sm: 14 }, fontWeight: 500, letterSpacing: '0.01em', mb: 0.5 }}>{label}</Typography>
        <Typography sx={{ fontWeight: 800, fontSize: { xs: 26, sm: 28 }, color, letterSpacing: '-0.02em' }}>{value}</Typography>
      </Box>
      <Box sx={{
        width: { xs: 42, sm: 44 }, 
        height: { xs: 42, sm: 44 }, 
        borderRadius: { xs: '10px', sm: '12px' },
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        backgroundColor: `${color}1a`, // 10% tint
        flexShrink: 0
      }}>
        {icon}
      </Box>
    </Stack>
  </Paper>
);

const StatusBadge = ({ status }) => {
  if (status === STATUS.PENDING) {
    return (
      <Chip
        label={STATUS.PENDING}
        size="small"
        sx={{ backgroundColor: '#fef9c2', color: '#894b00', borderRadius: '8px', height: { xs: 24, sm: 22 }, fontSize: { xs: 13, sm: 12 }, fontWeight: 600, px: { xs: 0.5, sm: 0 } }}
      />
    );
  }
  if (status === STATUS.COOKING) {
    return (
      <Chip
        label={STATUS.COOKING}
        size="small"
        sx={{ backgroundColor: '#dbe7ff', color: '#193cb8', borderRadius: '8px', height: { xs: 24, sm: 22 }, fontSize: { xs: 13, sm: 12 }, fontWeight: 600, px: { xs: 0.5, sm: 0 } }}
      />
    );
  }
  return (
    <Chip
      label={STATUS.DONE}
      size="small"
      sx={{ backgroundColor: '#dcfce7', color: '#016630', borderRadius: '8px', height: { xs: 24, sm: 22 }, fontSize: { xs: 13, sm: 12 }, fontWeight: 600, px: { xs: 0.5, sm: 0 } }}
    />
  );
};

const OrderCard = ({ order, onAdvance }) => {
  const progressByStatus = (status) => {
    if (status === STATUS.PENDING) return { pct: 33, color: '#d08700' };
    if (status === STATUS.COOKING) return { pct: 66, color: '#155dfc' };
    return { pct: 100, color: '#00a63e' };
  };
  const { pct, color } = progressByStatus(order.status);
  return (
  <Paper
    elevation={0}
    sx={{
      borderRadius: { xs: '12px', sm: '14px' },
      border: '0.8px solid rgba(0,0,0,0.1)',
      p: 0,
      overflow: 'hidden'
    }}
  >
    <Box sx={{ px: { xs: 2.5, sm: 3 }, pt: { xs: 2.5, sm: 3 } }}>
      <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ mb: { xs: 1.5, sm: 2 } }}>
        <Stack direction="row" alignItems="center" spacing={{ xs: 1.2, sm: 1.5 }}>
          <Typography sx={{ fontSize: { xs: 17, sm: 18 }, fontWeight: 700, letterSpacing: '-0.01em', color: '#18181b' }}>{order.id}</Typography>
          <StatusBadge status={order.status} />
        </Stack>
        <Typography sx={{ fontSize: { xs: 13, sm: 14 }, color: '#717182', fontWeight: 500, letterSpacing: '0.01em' }}>{order.createdAgo}</Typography>
      </Stack>
      <Box sx={{ height: { xs: 9, sm: 8 }, backgroundColor: 'rgba(3,2,19,0.12)', borderRadius: 99, overflow: 'hidden' }}>
        <Box
          sx={{
            height: '100%',
            borderRadius: 99,
            backgroundColor: color,
            width: `${pct}%`,
            transition: 'width 300ms ease'
          }}
        />
      </Box>
    </Box>

    <Box sx={{ px: { xs: 2.5, sm: 3 }, py: { xs: 2, sm: 2 } }}>
      <Grid container spacing={{ xs: 2, sm: 2 }}>
        <Grid item xs={12} md={6}>
          <Stack spacing={{ xs: 1.2, sm: 1.5 }}>
            <Stack direction="row" alignItems="center" spacing={1}>
              <Box sx={{ width: 16, height: 16, borderRadius: 0.5, backgroundColor: '#e5e7eb', flexShrink: 0 }} />
              <Typography sx={{ fontSize: { xs: 14, sm: 14 }, wordBreak: 'break-word', fontWeight: 500, letterSpacing: '0.01em' }}>{order.customer.name}</Typography>
            </Stack>
            <Stack direction="row" alignItems="center" spacing={1}>
              <Box sx={{ width: 16, height: 16, borderRadius: 0.5, backgroundColor: '#e5e7eb', flexShrink: 0 }} />
              <Typography sx={{ fontSize: { xs: 14, sm: 14 }, wordBreak: 'break-word', letterSpacing: '0.01em' }}>{order.customer.phone}</Typography>
            </Stack>
            <Stack direction="row" alignItems="center" spacing={1}>
              <Box sx={{ width: 16, height: 16, borderRadius: 0.5, backgroundColor: '#e5e7eb', flexShrink: 0 }} />
              <Typography sx={{ fontSize: { xs: 14, sm: 14 }, wordBreak: 'break-word', lineHeight: 1.5, letterSpacing: '0.01em' }}>{order.customer.address}</Typography>
            </Stack>
          </Stack>
        </Grid>
        <Grid item xs={12} md={6}>
          <Typography sx={{ fontSize: { xs: 16, sm: 16 }, fontWeight: 700, mb: { xs: 1, sm: 1.2 }, letterSpacing: '-0.01em', color: '#18181b' }}>Món đã đặt:</Typography>
          {order.items.map((it, idx) => (
            <Stack key={idx} direction="row" alignItems="center" justifyContent="space-between" sx={{ mb: 0.8, gap: 1.5 }}>
              <Typography sx={{ fontSize: { xs: 14, sm: 14 }, flex: 1, minWidth: 0, wordBreak: 'break-word', fontWeight: 500, letterSpacing: '0.01em' }}>{it.name}</Typography>
              <Typography sx={{ fontSize: { xs: 14, sm: 14 }, flexShrink: 0, fontWeight: 600, letterSpacing: '-0.01em' }}>{it.price.toLocaleString('vi-VN')} ₫</Typography>
            </Stack>
          ))}
          <Divider sx={{ my: 1.5 }} />
          <Stack direction="row" alignItems="center" justifyContent="space-between">
            <Typography sx={{ fontSize: { xs: 15, sm: 16 }, fontWeight: 600, letterSpacing: '0.01em' }}>Tổng cộng:</Typography>
            <Typography sx={{ fontSize: { xs: 16, sm: 17 }, color: '#00a63e', fontWeight: 700, letterSpacing: '-0.01em' }}>{order.total.toLocaleString('vi-VN')} ₫</Typography>
          </Stack>
          <Typography sx={{ mt: 1, fontSize: { xs: 14, sm: 14 }, color: '#717182', fontWeight: 500, letterSpacing: '0.01em' }}>Thanh toán: {order.payment}</Typography>
        </Grid>
      </Grid>

      {order.note && (
        <Box sx={{ mt: 2, backgroundColor: '#fff7db', borderRadius: { xs: '8px', sm: '10px' }, px: { xs: 2, sm: 2 }, py: { xs: 1.5, sm: 1.5 } }}>
          <Typography sx={{ fontWeight: 700, fontSize: { xs: 14, sm: 14 }, mr: 1, display: 'inline', letterSpacing: '0.01em' }}>Ghi chú:</Typography>
          <Typography sx={{ fontSize: { xs: 14, sm: 14 }, display: 'inline', letterSpacing: '0.01em' }}>{order.note}</Typography>
        </Box>
      )}

      <Box sx={{ mt: { xs: 2, sm: 2.5 } }}>
        <Divider sx={{ mb: { xs: 1.5, sm: 1.5 } }} />
        <Box sx={{ display: 'flex', justifyContent: { xs: 'stretch', sm: 'flex-end' } }}>
          {order.status === STATUS.PENDING ? (
            <Button
              variant="contained"
              endIcon={<ArrowForwardIcon />}
              sx={{
                backgroundColor: '#F9704B',
                '&:hover': { backgroundColor: '#e55a3a' },
                borderRadius: { xs: '8px', sm: '10px' },
                height: { xs: 46, sm: 40 },
                px: { xs: 2.5, sm: 2.5 },
                minWidth: { xs: '100%', sm: 180 },
                textTransform: 'none',
                fontWeight: 600,
                fontSize: { xs: '15px', sm: '15px' },
                letterSpacing: '0.01em'
              }}
              onClick={() => onAdvance(order.id)}
            >
              Xác nhận đơn
            </Button>
          ) : order.status === STATUS.COOKING ? (
            <Button
              variant="contained"
              endIcon={<ArrowForwardIcon />}
              sx={{
                backgroundColor: '#00a63e',
                '&:hover': { backgroundColor: '#049335' },
                borderRadius: { xs: '8px', sm: '10px' },
                height: { xs: 46, sm: 40 },
                px: { xs: 2.5, sm: 2.5 },
                minWidth: { xs: '100%', sm: 160 },
                textTransform: 'none',
                fontWeight: 600,
                fontSize: { xs: '15px', sm: '15px' },
                letterSpacing: '0.01em'
              }}
              onClick={() => onAdvance(order.id)}
            >
              Hoàn tất
            </Button>
          ) : null}
        </Box>
      </Box>
    </Box>
  </Paper>
  );
};

const TabsBar = ({ tabs, current, onChange }) => (
  <Box sx={{ backgroundColor: '#ececf0', borderRadius: { xs: '12px', sm: '14px' }, height: { xs: 44, sm: 38 }, px: 0.5 }}>
    <Box sx={{
      display: 'grid',
      gridTemplateColumns: `repeat(${tabs.length}, minmax(0, 1fr))`,
      gap: 0.5,
      alignItems: 'center',
      height: '100%'
    }}>
      {tabs.map((t) => {
        const active = current === t.key;
        return (
          <Button
            key={t.key}
            aria-selected={active}
            onClick={() => onChange(t.key)}
            sx={{
              width: '100%',
              minWidth: 0,
              px: { xs: 1, sm: 1.2 },
              py: { xs: 0.8, sm: 0.7 },
              height: { xs: 37, sm: 31 },
              borderRadius: { xs: '10px', sm: '12px' },
              textTransform: 'none',
              fontSize: { xs: 14, sm: 14 },
              fontWeight: active ? 600 : 500,
              color: active ? '#030213' : '#030213',
              backgroundColor: active ? '#ffffff' : 'transparent',
              boxShadow: active ? '0 2px 6px rgba(0,0,0,0.08)' : 'none',
              border: active ? '0.8px solid rgba(0,0,0,0.06)' : '0.8px solid transparent',
              letterSpacing: active ? '-0.01em' : '0.01em',
              '&:hover': {
                backgroundColor: active ? '#ffffff' : 'rgba(255,255,255,0.5)'
              }
            }}
          >
            {t.label}
          </Button>
        );
      })}
    </Box>
  </Box>
);

const ShopOrders = () => {
  const [currentTab, setCurrentTab] = useState('all');
  const [orders, setOrders] = useState(initialOrders);

  const counts = useMemo(() => {
    const pending = orders.filter(o => o.status === STATUS.PENDING).length;
    const cooking = orders.filter(o => o.status === STATUS.COOKING).length;
    const done = orders.filter(o => o.status === STATUS.DONE).length;
    return { all: orders.length, pending, cooking, done };
  }, [orders]);

  const tabs = [
    { key: 'all', label: `Tất cả (${counts.all})` },
    { key: 'pending', label: `Chờ (${counts.pending})` },
    { key: 'cooking', label: `Chế biến (${counts.cooking})` },
    { key: 'done', label: `Hoàn tất (${counts.done})` }
  ];

  const filtered = useMemo(() => {
    if (currentTab === 'all') return orders;
    if (currentTab === 'pending') return orders.filter(o => o.status === STATUS.PENDING);
    if (currentTab === 'cooking') return orders.filter(o => o.status === STATUS.COOKING);
    return orders.filter(o => o.status === STATUS.DONE);
  }, [currentTab, orders]);

  const handleAdvance = (id) => {
    setOrders(prev => prev.map(o => {
      if (o.id !== id) return o;
      if (o.status === STATUS.PENDING) return { ...o, status: STATUS.COOKING };
      if (o.status === STATUS.COOKING) return { ...o, status: STATUS.DONE };
      return o;
    }));
  };

  return (
    <Box sx={{ minHeight: '100vh', backgroundColor: '#f9fafb', p: { xs: 2, sm: 3, md: 4 } }}>
      <Box sx={{ maxWidth: 1200, mx: 'auto' }}>
        <Box sx={{ mb: { xs: 2.5, sm: 2.5 } }}>
          <Typography variant="h4" sx={{ fontWeight: 700, fontSize: { xs: 24, sm: 26 }, mb: { xs: 0.8, sm: 1 }, letterSpacing: '-0.02em', color: '#18181b' }}>Quản lý đơn hàng</Typography>
          <Typography sx={{ color: '#717182', fontSize: { xs: 15, sm: 16 }, fontWeight: 500, letterSpacing: '0.01em' }}>Theo dõi và xử lý đơn hàng của khách</Typography>
        </Box>

        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: 'repeat(3, minmax(0, 1fr))' }, gap: { xs: 2, sm: 2.5 }, mb: { xs: 2.5, sm: 3 } }}>
          <StatCard label="Chờ xác nhận" value={counts.pending} color="#d08700" icon={<ScheduleIcon sx={{ color: '#d08700', fontSize: { xs: 22, sm: 24 } }} />} />
          <StatCard label="Đang chế biến" value={counts.cooking} color="#155dfc" icon={<CookingIcon sx={{ color: '#155dfc', fontSize: { xs: 22, sm: 24 } }} />} />
          <StatCard label="Hoàn tất" value={counts.done} color="#00a63e" icon={<CheckCircleIcon sx={{ color: '#00a63e', fontSize: { xs: 22, sm: 24 } }} />} />
        </Box>

        <Box sx={{ mb: { xs: 2, sm: 2.5 } }}>
          <TabsBar tabs={tabs} current={currentTab} onChange={setCurrentTab} />
        </Box>

        <Stack spacing={2.5}>
          {filtered.map((o) => (
            <OrderCard key={o.id} order={o} onAdvance={handleAdvance} />
          ))}
        </Stack>
      </Box>
    </Box>
  );
};

export default ShopOrders;


