import React, { useState } from 'react';
import {
  Box,
  Typography,
  Button,
  IconButton,
  TextField,
  Grid,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Card,
  CardContent,
  CardMedia,
  Chip
} from '@mui/material';
import { Add as AddIcon, Edit as EditIcon, Delete as DeleteIcon } from '@mui/icons-material';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import VideoLibraryIcon from '@mui/icons-material/VideoLibrary';

const MenuManagement = () => {
  const [menuItems, setMenuItems] = useState([
    {
      id: 1,
      name: 'Phở bò',
      description: 'Phở bò truyền thống với nước dùng đậm đà',
      price: 50000,
      category: 'Món chính',
      image: 'https://images.unsplash.com/photo-1677837914128-2367031a11e7?auto=format&fit=crop&w=1200&q=80',
      status: 'active',
      hasVideo: true,
      preparationTime: 15
    },
    {
      id: 2,
      name: 'Bánh mì thịt nướng',
      description: 'Bánh mì giòn với thịt nướng thơm lừng',
      price: 25000,
      category: 'Món nhẹ',
      image: 'https://images.unsplash.com/photo-1599719455360-ff0be7c4dd06?auto=format&fit=crop&w=1200&q=80',
      status: 'active',
      hasVideo: false,
      preparationTime: 10
    },
    {
      id: 3,
      name: 'Bún bò Huế',
      description: 'Bún bò Huế cay nồng đặc trưng miền Trung',
      price: 55000,
      category: 'Món chính',
      image: 'https://images.unsplash.com/photo-1710702418104-6bf5419ab03d?auto=format&fit=crop&w=1200&q=80',
      status: 'active',
      hasVideo: true,
      preparationTime: 20
    }
  ]);

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    category: '',
    image: '',
    preparationTime: ''
  });
  const [imagePreview, setImagePreview] = useState('');

  const formatPrice = (price) => new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);

  const handleEdit = (item) => {
    setEditingItem(item);
    setFormData({
      name: item.name,
      description: item.description,
      price: String(item.price),
      category: item.category,
      image: item.image,
      preparationTime: String(item.preparationTime)
    });
    setImagePreview(item.image);
    setIsDialogOpen(true);
  };

  const handleAdd = () => {
    setEditingItem(null);
    setFormData({ name: '', description: '', price: '', category: '', image: '', preparationTime: '' });
    setImagePreview('');
    setIsDialogOpen(true);
  };

  const handleSave = () => {
    if (!formData.name || !formData.price) {
      setIsDialogOpen(false);
      return;
    }
    if (editingItem) {
      setMenuItems((items) => items.map((it) => (
        it.id === editingItem.id
          ? {
              ...it,
              ...formData,
              price: parseInt(formData.price, 10) || 0,
              preparationTime: parseInt(formData.preparationTime, 10) || 0
            }
          : it
      )));
    } else {
      const newItem = {
        id: Date.now(),
        ...formData,
        price: parseInt(formData.price, 10) || 0,
        preparationTime: parseInt(formData.preparationTime, 10) || 0,
        status: 'active',
        hasVideo: false
      };
      setMenuItems((items) => [newItem, ...items]);
    }
    setIsDialogOpen(false);
  };

  const handleDelete = (id) => setMenuItems((items) => items.filter((it) => it.id !== id));

  const toggleStatus = (id) => {
    setMenuItems((items) => items.map((it) => (
      it.id === id ? { ...it, status: it.status === 'active' ? 'inactive' : 'active' } : it
    )));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files && e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      const imageData = reader.result;
      setFormData((prev) => ({ ...prev, image: imageData }));
      setImagePreview(imageData);
    };
    reader.readAsDataURL(file);
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: { xs: 2.5, sm: 3 }, p: { xs: 2, sm: 3, md: 0 } }}>
      <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, justifyContent: 'space-between', alignItems: { xs: 'flex-start', sm: 'center' }, gap: { xs: 2, sm: 0 } }}>
        <Box>
          <Typography variant="h6" sx={{ fontSize: { xs: '20px', sm: '22px' }, fontWeight: 700, letterSpacing: '-0.01em', color: '#18181b', mb: { xs: 0.5, sm: 0.8 } }}>Quản lý món ăn</Typography>
          <Typography variant="body2" color="text.secondary" sx={{ fontSize: { xs: '14px', sm: '15px' }, letterSpacing: '0.01em' }}>Quản lý menu và món ăn của shop</Typography>
        </Box>
        <Button variant="contained" startIcon={<AddIcon />} onClick={handleAdd} sx={{ bgcolor: '#ff6900', '&:hover': { bgcolor: '#e55a3a' }, width: { xs: '100%', sm: 'auto' }, height: { xs: 46, sm: 42 }, fontSize: { xs: '15px', sm: '15px' }, fontWeight: 600, borderRadius: { xs: '10px', sm: '10px' } }}>
          Thêm món mới
        </Button>
      </Box>

      <Grid container spacing={{ xs: 2, sm: 2.5, md: 3 }}>
        {menuItems.map((item) => (
          <Grid item xs={12} sm={6} md={4} key={item.id}>
            <Card sx={{ overflow: 'hidden', borderRadius: { xs: '12px', sm: '14px' }, border: '1px solid rgba(0,0,0,0.06)' }}>
              <Box sx={{ position: 'relative' }}>
                <CardMedia component="img" height="200" image={item.image} alt={item.name} />
                {item.hasVideo && (
                  <Chip size="small" color="error" icon={<VideoLibraryIcon sx={{ fontSize: 16 }} />} label="Video" sx={{ position: 'absolute', top: 10, right: 10, fontWeight: 600 }} />
                )}
              </Box>
              <CardContent sx={{ p: { xs: 2, sm: 2.5 } }}>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: { xs: 1.2, sm: 1.5 } }}>
                  <Box>
                    <Typography fontWeight={700} noWrap sx={{ fontSize: { xs: '16px', sm: '17px' }, letterSpacing: '-0.01em', color: '#18181b', mb: 0.5 }}>{item.name}</Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden', fontSize: { xs: '14px', sm: '14px' }, lineHeight: 1.5, letterSpacing: '0.01em' }}>
                      {item.description}
                    </Typography>
                  </Box>

                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 1 }}>
                    <Chip label={item.category} variant="outlined" size="small" sx={{ fontSize: { xs: '12px', sm: '12px' }, height: { xs: '26px', sm: '28px' }, fontWeight: 500 }} />
                    <Chip label={item.status === 'active' ? 'Đang bán' : 'Tạm ngưng'} size="small" color={item.status === 'active' ? 'success' : 'default'} sx={{ fontSize: { xs: '12px', sm: '12px' }, height: { xs: '26px', sm: '28px' }, fontWeight: 600 }} />
                  </Box>

                  <Box sx={{ display: 'flex', alignItems: 'center', gap: { xs: 1.5, sm: 2 }, color: 'text.secondary', flexWrap: 'wrap' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                      <AttachMoneyIcon sx={{ fontSize: { xs: 18, sm: 18 } }} />
                      <Typography color="text.primary" fontWeight={600} sx={{ fontSize: { xs: '14px', sm: '15px' }, letterSpacing: '-0.01em' }}>{formatPrice(item.price)}</Typography>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                      <AccessTimeIcon sx={{ fontSize: { xs: 18, sm: 18 } }} />
                      <Typography sx={{ fontSize: { xs: '14px', sm: '14px' } }}>{item.preparationTime} phút</Typography>
                    </Box>
                  </Box>

                  <Box sx={{ display: 'flex', gap: { xs: 1, sm: 1 }, pt: { xs: 0.5, sm: 1 }, flexWrap: { xs: 'wrap', sm: 'nowrap' } }}>
                    <Button variant="outlined" size="small" startIcon={<EditIcon />} onClick={() => handleEdit(item)} sx={{ flex: { xs: '1 1 100%', sm: 1 }, fontSize: { xs: '14px', sm: '14px' }, height: { xs: 38, sm: 36 }, borderRadius: '8px', fontWeight: 500 }}>Sửa</Button>
                    <Button variant="outlined" size="small" onClick={() => toggleStatus(item.id)} sx={{ flex: { xs: '1 1 45%', sm: 'auto' }, fontSize: { xs: '14px', sm: '14px' }, height: { xs: 38, sm: 36 }, borderRadius: '8px', fontWeight: 500 }}>
                      {item.status === 'active' ? 'Ẩn' : 'Bán'}
                    </Button>
                    <IconButton size="small" onClick={() => handleDelete(item.id)} sx={{ flex: { xs: '0 0 auto', sm: 'auto' }, width: { xs: 38, sm: 36 }, height: { xs: 38, sm: 36 } }}>
                      <DeleteIcon fontSize="small" />
                    </IconButton>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {menuItems.length === 0 && (
        <Card sx={{ p: { xs: 4, sm: 6 }, textAlign: 'center', borderRadius: { xs: '12px', sm: '14px' } }}>
          <Typography fontWeight={700} sx={{ mb: 1, fontSize: { xs: '17px', sm: '18px' } }}>Chưa có món ăn nào</Typography>
          <Typography color="text.secondary" sx={{ mb: 2.5, fontSize: { xs: '14px', sm: '15px' } }}>Hãy thêm món ăn đầu tiên cho menu của bạn</Typography>
          <Button variant="contained" startIcon={<AddIcon />} onClick={handleAdd} sx={{ bgcolor: '#ff6900', '&:hover': { bgcolor: '#e55a3a' }, height: { xs: 46, sm: 42 }, fontSize: { xs: '15px', sm: '15px' }, fontWeight: 600, borderRadius: '10px' }}>Thêm món đầu tiên</Button>
        </Card>
      )}

      <Dialog
        open={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        maxWidth="sm"
        fullWidth
        fullScreen={false}
        slotProps={{ backdrop: { sx: { zIndex: 1500 } } }}
        sx={{ 
          '& .MuiDialog-paper': { 
            zIndex: 1600,
            m: { xs: 2, sm: 4 },
            maxHeight: { xs: 'calc(100% - 32px)', sm: 'calc(100% - 64px)' },
            borderRadius: { xs: '14px', sm: '16px' }
          } 
        }}
      >
        <DialogTitle sx={{ fontSize: { xs: '19px', sm: '20px' }, fontWeight: 700, letterSpacing: '-0.01em' }}>{editingItem ? 'Chỉnh sửa món ăn' : 'Thêm món ăn mới'}</DialogTitle>
        <DialogContent dividers>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: { xs: 2, sm: 2.5 } }}>
            <TextField label="Tên món" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} fullWidth size="small" InputProps={{ sx: { fontSize: { xs: '15px', sm: '15px' } } }} InputLabelProps={{ sx: { fontSize: { xs: '15px', sm: '15px' } } }} />
            <TextField label="Mô tả" value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} fullWidth size="small" multiline minRows={3} InputProps={{ sx: { fontSize: { xs: '15px', sm: '15px' } } }} InputLabelProps={{ sx: { fontSize: { xs: '15px', sm: '15px' } } }} />
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField type="number" label="Giá (VND)" value={formData.price} onChange={(e) => setFormData({ ...formData, price: e.target.value })} fullWidth size="small" InputProps={{ sx: { fontSize: { xs: '15px', sm: '15px' } } }} InputLabelProps={{ sx: { fontSize: { xs: '15px', sm: '15px' } } }} />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField type="number" label="Thời gian (phút)" value={formData.preparationTime} onChange={(e) => setFormData({ ...formData, preparationTime: e.target.value })} fullWidth size="small" InputProps={{ sx: { fontSize: { xs: '15px', sm: '15px' } } }} InputLabelProps={{ sx: { fontSize: { xs: '15px', sm: '15px' } } }} />
              </Grid>
            </Grid>
            <TextField label="Danh mục" value={formData.category} onChange={(e) => setFormData({ ...formData, category: e.target.value })} fullWidth size="small" InputProps={{ sx: { fontSize: { xs: '15px', sm: '15px' } } }} InputLabelProps={{ sx: { fontSize: { xs: '15px', sm: '15px' } } }} />
            <Box>
              <Typography variant="body2" sx={{ mb: 1, fontSize: { xs: '14px', sm: '15px' }, fontWeight: 500 }}>Hình ảnh</Typography>
              <input type="file" accept="image/*" onChange={handleImageUpload} style={{ width: '100%', fontSize: '15px' }} />
            </Box>
            {imagePreview && (
              <Box sx={{ mt: 1, border: '1px solid rgba(0,0,0,0.1)', borderRadius: { xs: '8px', sm: '10px' }, overflow: 'hidden' }}>
                <img src={imagePreview} alt="Preview" style={{ width: '100%', height: 160, objectFit: 'cover' }} />
              </Box>
            )}
          </Box>
        </DialogContent>
        <DialogActions sx={{ flexDirection: { xs: 'column', sm: 'row' }, gap: { xs: 1, sm: 0 }, p: { xs: 2, sm: 1.5 } }}>
          <Button onClick={handleSave} variant="contained" sx={{ width: { xs: '100%', sm: 'auto' }, order: { xs: 1, sm: 0 }, height: { xs: 44, sm: 40 }, fontSize: { xs: '15px', sm: '15px' }, fontWeight: 600, borderRadius: '8px' }}>{editingItem ? 'Cập nhật' : 'Thêm món'}</Button>
          <Button onClick={() => setIsDialogOpen(false)} variant="outlined" sx={{ width: { xs: '100%', sm: 'auto' }, order: { xs: 2, sm: 0 }, height: { xs: 44, sm: 40 }, fontSize: { xs: '15px', sm: '15px' }, fontWeight: 500, borderRadius: '8px' }}>Hủy</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default MenuManagement;


